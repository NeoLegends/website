---
title: "Festify"
date: 2018-07-28T13:42:40+02:00
draft: false
tags:
  - "serverless"
  - "full-stack"
  - "firebase"
  - "web-app"
  - "fit-html"
  - "web components"
categories:
  - "project"
description: Democratic social jukebox web app for Spotify
img: images/posts/festify/festify-3x2-shot
img_type: jpg
---

{{< figure
    alt="Festify Logo"
    src="https://festify.rocks/img/festify-logo.svg"
    class="figure figure-post-header"
>}}

[Festify](https://festify.rocks/) is a social jukebox web-app I developed with two friends from Düsseldorf. Fes­tify is a free Spo­tify-pow­ered app for the browser that al­lows you to let your guests choose which mu­sic should be played at your party.

The development started in 2013, after we attended a party where a laptop with Spotify was set up to play the music. At first, things went fine, people queued songs they wanted to hear and everybody was happy. But then, somebody decided to just play his track skipping the current track and emptying the queue for the rest. People then started fighting about whose track to play next, skipping the current song, etc.

We observed the situation for a while and knew there needed to be a better way for a crowd to manage playback, without going all-in on a dedicated DJ. This is where Festify comes in. Festify...

- ...automatically manages the track list and playback
- ...provides a democratic way for people to queue their songs and vote for others using their smartphones
- ...has simplified playback controls to avoid excessive "fussing-around" with the playback
- ...only allows the party host to skip and / or remove tracks from the queue

Festify is very easy to use. All it takes is three steps:

1. Head over to [festify.us](https://festify.us) and sign in with your Spotify _Premium_ account.
1. Create a party and note down the party code.
1. Give the party code to your guests. They can use it to join the party on [festify.us](https://festify.us) and start voting for tracks.

Festify was originally designed for small-ish parties, but we found people have started using it at restaurants, bars, in their offices and even on large [Festivals](https://twitter.com/GetFestify/status/995694823238787072). If you want to try it out, head over to [festify.rocks](https://festify.rocks)!

## Technical details

JAM-Stack architecture

Front-End:

- Web Components + Redux
- Built on lightweight micro-framework fit-html that integrates web components, Redux and lit-html

Back-End:

- Firebase Realtime Database
- Firebase Functions
- Netlify Hosting

### Development History

Back in 2013 client-side web applications made their baby steps. The [LAMP](https://en.wikipedia.org/wiki/LAMP_(software_bundle))-stack was getting old and [MEAN](https://en.wikipedia.org/wiki/MEAN_(software_bundle)) was the hot and shiny new thing everybody wanted to get their hands on. As such, we built Festify v1 using Angular v1 in the front-end, MongoDB and a NodeJS express server in the backend + redis and socket.io for realtime synchronization.
Additionally, we wrote two desktop apps (MacOS and Windows) that would host the parties and manage playback and the TV mode. The MacOS-App was built using Electron's predecessor node-webkit while the Windows version was written in C# + WPF. The reason for the split was that at the time, I was proficient in C# and XAML, and the node-library that managed Spotify playback in the node-webkit-Version didn't work on Windows.
What came out was a tool that sometimes ran a little unstable (especially on Windows, deploying .NET applications to clients is [HARD](https://www.google.de/search?q=.net+redistributable)!), but otherwise worked quite well. The backend was hosted on a small VPS at Strato. Our server was so small, we sometimes had to upgrade temporarily to a bigger plan in anticipation of special dates (New years eve, halloween, etc.) to save it from dying under the load.

<div class="figure-row">
    {{< figure
        title="Festify v1 Web App"
        alt="Screenshot of Festify v1 Web App"
        src="images/posts/festify/festify-v1-mobile.png"
        class="figure figure-content"
    >}}

    {{< figure
        title="Festify v1 Host for Windows"
        alt="Screenshot of Festify v1 Host on Windows"
        src="images/posts/festify/festify-v1-windows.png"
        class="figure figure-content"
    >}}
</div>

Both desktop apps internally depended on libspotify. An ancient C-library that Spotify deprecated about a year after we released Festify. The lack of support caused a "degradation" in functionality of the library, rendering it more and more error-prone from day to day. The end result was that Festify was almost unusable by 2015/2016 because libspotify had so many issues at runtime. Additionally, managing a VPS without proper automation is time-consuming (especially in the face of OS updates) and we've had more downtime than we'd like to otherwise have.

2015/2016 was also the time Web Components and [Polymer](https://github.com/Polymer/polymer) became usable in the evergreen browsers and [AWS Lambda](https://aws.amazon.com/en/lambda/) came out. So we decided to give Polymer a try and do a full-on rewrite of the entire thing. We replaced the nodejs backend with the [Firebase Realtime Database](https://firebase.google.com/products/realtime-database/), switched to [Netlify](https://netlify.com/) hosting and based the desktop apps on Electron. This meant we were running completely serverless from that point on, which saved us maintenance time and overhead and was easier on our pockets.

Polymer and Web Components v0, together with the `paper-*`-elements proved to be a solid base for building web applications on. The ["standard library"](https://webcomponents.org/) of web components features a wide range of UI-controls and very capable helper elements for routing and data management.
Not very solid, however, was our side of the code. Polymer doesn't really provide any architecture patterns to keep your code clean in large applications. Mix in two-way data binding and you've got an excellent source of spaghetti code. We released v2 to the public, but never really got rid of all its bugs, and from some point in 2017 on had troubles introducing new features because the code was just so tightly coupled together.

<div class="figure-row">
    {{< figure
        title="Festify v2 in Development"
        alt="Picture of Festify v2 development"
        src="images/posts/festify/festify-v2-development.jpg"
        class="figure figure-content"
    >}}

    {{< figure
        title="Festify v2 Web App"
        alt="Screenshot of Festify v2 User Interface"
        src="images/posts/festify/festify-v2-ui.png"
        class="figure figure-content"
    >}}
</div>

This is when I sat together with [Marcus Weiner](https://marcusweiner.de/) to develop a "v3" between christmas and new years eve of 2017. We were very convinced with the web components approach (Shadow DOM is a godsend! Miles better than anything I've ever seen in the React ecosystem.), but needed to improve on the code-structure side of things. We also wanted to get rid of the desktop apps, and be able to run a party just through the browser. Fortunately, Spotify had just released [a new SDK](https://developer.spotify.com/documentation/web-playback-sdk/) that allows playback through the browser and Google had just released their new DOM templating library, [lit-html](https://github.com/Polymer/lit-html), a month earlier. Over the course of another project of mine for [Fraunhofer FIT](https://fit.fraunhofer.de/) (see [Open Mobility Platform](/projects/open-mobility-platform)), I came in contact with [Redux](https://redux.js.org/) and immediately started loving it.

For Festify v3, we wanted to bring lit-html, Web Components and Redux together. We created a library called [fit-html](https://github.com/Festify/fit-html) (<u>f</u>unctional l<u>it-html</u>), that, very similar to react-redux, creates web components that render their contents with lit-html and are fed by redux data from a central store. fit-html turned out to be extremely lightweight (~3KB including redux and lit-html), while still being a very solid base to build upon. [Go check it out!](https://github.com/Festify/fit-html) We liked the existing v2 UI, so thanks to the interoperability of Web Components, we were able to leave it as-is.

Festify v3 is the currently live version and has proved to be our best release so far:

- We have almost no bugs anymore. Redux + TypeScript allow us to catch most of them at compile time already.
- You can host a party directly through the browser. No downloads anymore!
- The code stays clean and we are able to ship new features in a speed that we weren't even dreaming about before!
- We have used fit-html for two more projects by now, and we're seeing people from the internet adopting it as well.

We invite you to [try Festify out for free](https://festify.rocks/) ☺️.
