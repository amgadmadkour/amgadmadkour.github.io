---
layout: post
title: Review of ModernBert
date: 2025-01-04 00:00:00
description:
tags: introduction review encoder 
categories: nlp
related_posts: false
sitemap: true
---

{::nomarkdown}
{% assign jupyter_path = "assets/jupyter/nlp/modernbert.ipynb" | relative_url %}
{% capture notebook_exists %}{% file_exists assets/jupyter/nlp/modernbert.ipynb %}{% endcapture %}
{% if notebook_exists == "true" %}
    {% jupyter_notebook jupyter_path %}
{% else %}
    <p>Sorry, the notebook you are looking for does not exist.</p>
{% endif %}
{:/nomarkdown}