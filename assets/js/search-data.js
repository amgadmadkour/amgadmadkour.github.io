// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "Blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-publications",
          title: "Publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-talks",
          title: "Talks",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/talks/";
          },
        },{id: "nav-news",
          title: "News",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/news/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-review-modernbert",
      
        title: "Review - ModernBert",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2025/modernbert/";
        
      },
    },{id: "post-introduction-to-machine-learning",
      
        title: "Introduction to Machine Learning",
      
      description: "",
      section: "Posts",
      handler: () => {
        
          window.location.href = "/blog/2024/ml-intro/";
        
      },
    },{id: "news-joined-microsoft-research-as-a-research-intern-for-summer-2015",
          title: 'Joined Microsoft Research as a Research Intern for Summer 2015.',
          description: "",
          section: "News",},{id: "news-joined-microsoft-knowledge-graph-satori-as-a-data-amp-amp-applied-scientist-intern-for-summer-2018",
          title: 'Joined Microsoft Knowledge Graph (Satori) as a Data &amp;amp;amp; Applied Scientist Intern for...',
          description: "",
          section: "News",},{id: "news-giving-two-lectures-at-purdue-titled-introduction-to-semantic-web-databases",
          title: 'Giving two lectures at Purdue titled: “Introduction to Semantic Web Databases”.',
          description: "",
          section: "News",},{id: "news-our-paper-titled-sparti-scalable-rdf-data-management-using-query-centric-semantic-partitioning-has-been-accepted-in-semantic-big-data-sbd18-at-sigmod-2018",
          title: 'Our paper titled “SPARTI: Scalable RDF Data Management Using Query-Centric Semantic Partitioning” has...',
          description: "",
          section: "News",},{id: "news-our-paper-titled-trueweb-a-proposal-for-scalable-semantically-guided-data-management-and-truth-finding-in-heterogeneous-web-sources-has-been-accepted-in-semantic-big-data-sbd18-at-sigmod-2018",
          title: 'Our paper titled “TrueWeb: A Proposal for Scalable Semantically-Guided Data Management and Truth...',
          description: "",
          section: "News",},{id: "news-our-paper-titled-worq-workload-driven-rdf-query-processing-has-been-accepted-in-international-semantic-web-conference-iswc-2018",
          title: 'Our paper titled “WORQ: Workload Driven RDF Query Processing” has been accepted in...',
          description: "",
          section: "News",},{id: "news-successfully-defended-my-thesis-dissertation-titled-efficient-query-processing-over-web-scale-rdf-data",
          title: 'Successfully defended my thesis dissertation titled “Efficient Query Processing Over Web-Scale RDF Data”....',
          description: "",
          section: "News",},{id: "news-joined-microsoft-knowledge-graph-satori-team-as-a-full-time-data-amp-amp-applied-scientist",
          title: 'Joined Microsoft Knowledge Graph (Satori) team as a full-time Data &amp;amp;amp; Applied Scientist....',
          description: "",
          section: "News",},{id: "news-our-paper-titled-bionetapp-an-interactive-visual-data-analysis-platform-for-molecular-expressions-has-been-accepted-in-plos-one-journal",
          title: 'Our paper titled “BioNetApp: An Interactive Visual Data Analysis Platform for Molecular Expressions”...',
          description: "",
          section: "News",},{id: "news-gave-a-talk-titled-entity-life-cycle-in-search-centric-knowledge-graphs-in-the-knowledge-graph-conference-2021-kgc-2021",
          title: 'Gave a talk titled “Entity Life Cycle In Search-Centric Knowledge Graphs” in the...',
          description: "",
          section: "News",},{id: "news-joined-microsoft-shopping-team-as-a-data-amp-amp-applied-scientist",
          title: 'Joined Microsoft Shopping team as a Data &amp;amp;amp; Applied Scientist.',
          description: "",
          section: "News",},{id: "news-selected-for-a-data-science-manager-role-at-microsoft-ai-leading-shopping-product-tracking",
          title: 'Selected for a Data Science manager role at Microsoft AI leading shopping product...',
          description: "",
          section: "News",},{id: "projects-project-1",
          title: 'project 1',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%61%6D%67%61%64.%6D%61%64%6B%6F%75%72@%6F%75%74%6C%6F%6F%6B.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/amgadmadkour", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/amgadmadkour", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=s4jIlGEAAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
