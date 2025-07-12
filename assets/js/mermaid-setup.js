// Ensure proper initialization order to prevent race conditions
(function () {
  "use strict";

  let initializationAttempts = 0;
  const maxAttempts = 50; // 5 seconds maximum wait
  let mermaidElements = [];
  let originalMermaidCode = []; // Store original code for re-rendering
  let isInitialized = false;

  function getCurrentTheme() {
    let theme = "default";
    if (typeof window.determineComputedTheme !== "undefined") {
      theme = determineComputedTheme();
      // Convert 'light' to 'default' for mermaid
      if (theme === "light") theme = "default";
    } else {
      // Fallback theme detection
      if (
        document.documentElement.classList.contains("dark") ||
        document.body.classList.contains("dark-mode") ||
        (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        theme = "dark";
      } else {
        theme = "default";
      }
    }
    return theme;
  }

  function setupZoom() {
    if (typeof d3 !== "undefined") {
      setTimeout(function () {
        var svgs = d3.selectAll(".mermaid svg");
        svgs.each(function () {
          var svg = d3.select(this);
          svg.html("<g>" + svg.html() + "</g>");
          var inner = svg.select("g");
          var zoom = d3.zoom().on("zoom", function (event) {
            inner.attr("transform", event.transform);
          });
          svg.call(zoom);
        });
      }, 100);
    }
  }

  function renderMermaidDiagrams(theme) {
    if (mermaidElements.length === 0) return;

    try {
      // Re-initialize with new theme
      mermaid.initialize({
        theme: theme,
        startOnLoad: false,
        securityLevel: "loose",
        flowchart: {
          useMaxWidth: true,
          htmlLabels: true,
        },
      });

      // Clear existing content and restore original code
      mermaidElements.forEach((elem, index) => {
        elem.removeAttribute("data-processed");
        elem.innerHTML = originalMermaidCode[index] || elem.textContent;
      });

      // Render with promise-based approach
      Promise.resolve()
        .then(() => {
          mermaid.init(undefined, mermaidElements);
        })
        .then(() => {
          setupZoom();
        })
        .catch((error) => {
          console.error("Error rendering mermaid diagrams:", error);
        });
    } catch (error) {
      console.error("Error initializing mermaid:", error);
    }
  }

  function initMermaid() {
    // Check if required dependencies are available
    if (typeof window.mermaid === "undefined") {
      if (initializationAttempts < maxAttempts) {
        initializationAttempts++;
        setTimeout(initMermaid, 100);
        return;
      } else {
        console.error("Mermaid library failed to load after maximum attempts");
        return;
      }
    }

    // Create mermaid diagram elements
    document.querySelectorAll("pre>code.language-mermaid").forEach((elem) => {
      const svgCode = elem.textContent;
      const backup = elem.parentElement;
      backup.classList.add("unloaded");

      let mermaidDiv = document.createElement("div");
      mermaidDiv.classList.add("mermaid");
      mermaidDiv.textContent = svgCode;
      backup.after(mermaidDiv);

      // Keep track of mermaid elements and their original code
      mermaidElements.push(mermaidDiv);
      originalMermaidCode.push(svgCode);
    });

    // Initial render with current theme
    const currentTheme = getCurrentTheme();
    renderMermaidDiagrams(currentTheme);

    isInitialized = true;

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      let themeChanged = false;
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && (mutation.attributeName === "class" || mutation.attributeName === "data-theme")) {
          themeChanged = true;
        }
      });

      if (themeChanged) {
        const newTheme = getCurrentTheme();
        renderMermaidDiagrams(newTheme);
      }
    });

    // Watch for theme changes on document elements
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });
  }

  // Start initialization when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMermaid);
  } else {
    initMermaid();
  }
})();
