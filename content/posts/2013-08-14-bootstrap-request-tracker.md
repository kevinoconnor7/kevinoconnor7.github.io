---
categories:
- code
date: "2013-08-14T00:00:00Z"
tags:
- bootstrap
- request tracker
- css
- code
title: Bootstrap Request Tracker
aliases: [/code/2013/08/14/bootstrap-request-tracker/]
---

At one of my previous jobs I had setup [Request Tracker](http://www.bestpractical.com/rt/) to handle
support tickets. Request tracker is actually a very powerful piece of software that is unfortunately
stucking using a quite ugly theme. They did recently modernize the code behind the theme but it's
still far from perfect.

To that end I decided to include some [Bootstrap](http://getbootstrap.com/2.3.2/) (pre-version 3) to
the theme to help spice things up a little bit. I've decided to share my custom CSS with the world.

## Custom CSS
Apply this stylesheet in Tools -> Configuration -> Tools -> Theme -> Custom CSS (Advanced)
{% gist 6234883 %}

**Note:** This has only been tested on 4.0 <= RT version <= 4.0.13.

## Custom background
In the CSS I set a custom background image. I choose a nice background from 
[Subtle Patterns](http://subtlepatterns.com/) like 
[this](http://subtlepatterns.com/grey-washed-wall/) to help spice up the background. Put that file
in the noauth section of RT on the filesystem and name it custbg.png. If you name it something else
just find and replace in the custom CSS.