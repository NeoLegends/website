---
title: "fit-html"
date: 2018-07-27T13:23:38+02:00
draft: false
tags:
  - "lit-html"
  - "web components"
categories:
  - "project"
description: Lightweight library for creating web components with lit-html and Redux
img: images/posts/fit-html/fit-html-3x2-shot
img_type: jpg
---

[fit-html](https://github.com/Festify/fit-html) is a lightweight librarry for creating web components that render with lit-html and get their data from a Redux store.

It was born during Festify development, because we wanted a clean application architecture (Polymer doesn't really provide this, Redux does), performant rendering, reduce JS bloat and stay close to the platform with web components. fit-html is very similar to react-redux. It takes a component (or a lit-html template function) that is responsible for rendering, and connects it via `mapStateToProps` and `mapDispatchToProps` to a redux store.

fit-html is loosely coupled and mixin based, so that the Redux store part can be omitted if necessary. In this case, fit-html takes a lit-html template function and outputs a simple web component. The whole library, including lit-html and Redux (!), weighs in at just about 3kB. This considerably helps reduce application loading time, because the browser needs to spend less time loading, parsing and executing JavaScript.

We used fit-html when building Festify v3, as well as two other projects by now. We've also seen people from the internet adopt it for their projects, but we haven't gotten any feedback in this direction so far. For the future, we're currently evaluating making fit-html based on [SkateJS](https://github.com/skatejs/skatejs) for a more battle-tested base. This would, however, increase the binary size of the library a bit. To follow development you can [star the repo](https://github.com/Festify/fit-html) on Github.

### Simple example

{{< gist NeoLegends 42f3922358dc5f7f575e416753c648d8 "simple.js" >}}

### Real-World Example

{{< gist NeoLegends 42f3922358dc5f7f575e416753c648d8 "user-invite.js" >}}
