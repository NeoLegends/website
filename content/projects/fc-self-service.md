---
title: "Wi-Fi Self-Service"
date: 2018-07-29T13:26:52+02:00
draft: false
tags:
  - "web-app"
  - "fit-html"
  - "redux"
  - "wi-fi"
categories:
  - "project"
description: Manage VLANs and WPA Enterprise Wi-Fi credentials
img: images/posts/fc-self-service/fc-self-service-3x2-shot
img_type: jpg
---

We created an app that allows tenants of co-working spaces to manage their own Wi-Fi credentials. Each tenant also gets an own VLAN for his devices.

The project was built together with [Marcus Weiner](https://marcusweiner.de/). We were both working on the front- and back-end. Its currently at MVP state and not running in production yet.

## Technical details

JAM-Stack architecture

Front-End:

- fit-html (Web Components + Redux)
- Material Design

Back-End:

- JWT-based authentication and user management using [GoTrue](https://github.com/netlify/GoTrue) (golang) and a radius credential management server ([radau](https://github.com/FactoryCampus/radau), also golang)
- Docker orchestration

## UI

{{< figure
    title="'Generate Wi-Fi Credentials' Screen"
    alt="Screenshot of the 'Generate Wi-Fi Credentials' view in the web app"
    src="images/posts/fc-self-service/fc-self-service-3x2-shot.jpg"
    class="figure figure-content"
>}}
