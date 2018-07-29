---
title: "moritzgunz.de"
date: 2018-07-29T19:50:00+02:00
draft: true
tags:
  - "static page"
  - "hugo"
categories:
  - "project"
description: Sleek home page with contact information and a portfolio
img: images/posts/moritzgunz.de/moritzgunz-3x2-shot
img_type: png
---

This homepage is a static page that was made using the [Hugo](https://gohugo.io/) static page generator. Special emphasis was placed on the loading speed of the site as well as the simple design. The site, of course, also features a responsive, mobile-first, design.

## Technical details

- Hugo Static Site
- SASS styling
- Netlify hosting

All necessary HTML and CSS is sent within the first request, subsequent requests only load images and fonts. The site does not need or use JavaScript (except for some edge cases). On top of this comes Netlify's HTTP/2 hosting and smart ETag caching. All of this adds up to a very performant site that scores well in Google's PageSpeed analysis. In fact, the landing page has a score of 100/100 at the time of writing.
