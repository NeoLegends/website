---
title: "Open Mobility Platform"
date: 2018-07-20T18:13:25+02:00
draft: false
tags:
  - "web-app"
  - "react"
  - "redux"
  - "fraunhofer"
categories:
  - "project"
---

The goal is to create a tool to ease public transport companies the creation of technical specifications. It contains an XSD editor for creating the actual specification XSD, rich-text editors for writing the verbal documentation and generates a .docx or .pdf file.

I am responsible for the web app and the nodejs application server. The web app is written in TypeScript, using React.js and material-ui for the UI components. One aspect was allowing for real-time collaboration in all aspects of the application, which was archived using [yjs](https://github.com/y-js/yjs).

I am working on this project since August 2017 as part of my student assistant job at [Fraunhofer FIT](https://fit.fraunhofer.de/).

## Technical details

React + Redux Web-App

Front-End:

- React + Redux + material-ui
- Realtime synchronization with backend via yjs

Back-End:

- nodejs application server + Java report generator
- nginx hosting
- Docker orchestration

## UI

<div class="figure-row">
    {{% figure
        title="Project List"
        alt="Screenshot of the OMP Project List"
        src="images/posts/open-mobility-platform/omp-project-list.png"
        class="figure figure-content"
    %}}

    {{% figure
        title="XSD Editor Interface"
        alt="Screenshot of the OMP XSD Editor"
        src="images/posts/open-mobility-platform/omp-xsd-editor.png"
        class="figure figure-content"
    %}}
</div>
