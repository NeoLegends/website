---
title: "BILDQUADRAT Website"
date: 2018-09-16T12:36:20+02:00
draft: true
tags:
  - "static page"
  - "gatsby"
  - "react"
categories:
  - "project"
description: Beautiful and performant homepage with a headless CMS
---

I was tasked with implementing the new homepage for german media production company [BILDQUADRAT](https://bildquadrat.com) together with [Leo Bernard](https://leolabs.org/). The site makes use of the [Gatsby](https://gatsbyjs.org/) static site generator together with headless CMS [Storyblok](https://storyblok.com/) for content management.

[Go check it out!](https://bildquadrat.com/)

## Technical Details

JAM-Stack architecture

- Gatsby static page
- Storyblok Headless CMS
- Netlify hosting

Through the use of Gatsbyjs BILDQUADRAT is able to benefit from the loading speed of static pages and the interactivity of a classical React web application. This is possible by implementing every page with React components, serving a pre-rendered version of each page on the first request and then dynamically upgrading the page once the necessary JS has loaded. Gatsby automates this process while also bringing some niceties like automatic image resizing, code splitting and service workers to the table.
