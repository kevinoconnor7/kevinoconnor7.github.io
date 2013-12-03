---
layout: post
title: "Don't Commit Your Passwords"
description: "Rookie security mistake"
category: security
tags: 
- security
---

There's a fairly popular [post](http://blog.shubh.am/prezi-bug-bounty/) on the frontpage of hacker news today that involves a developer that mistakenly committed a configuration settings file that includes the path for a repository artifacts service. He also happened to include his username and password. In plaintext. Publicly accessible. Indexed by Google.

It's should be obvious why this is a big no-no, but it's actually fairly common. It should be clear that config files should **never** be committed into a repository. You may commit sample config files to define the structure of the configuration, but the live configuration should not be present. There are some exceptions to this rule, but you should never commit a setting that could be changed for particular environments. This tends to be popular when if you have base settings which get extended for a particular deployment (for example, having a base settings file, then a base dev environment settings file, then finally having the particular deployment config that extends in that order).

## Use .gitignore

Whenever you start a project, you should know how your settings are going to be named or the folder that they will be present in. Immediately add those those to your .gitignore. Don't slack on this, someone will did a ```git add .``` at some point.

However, all developers should be aware of their development environment. Sublime Text is a fairly popular editor right now and many people are using a rather large collection of plugins. You should be aware of artifacts these plugins leave in your projects and immediately add them to your [global gitignore](https://help.github.com/articles/ignoring-files#global-gitignore).

## Is this really a big issue?

Yes. Using my example of Sublime Text, the [FTP Sync](https://github.com/NoxArt/SublimeText2-FTPSync) plugin is fairly popular. Unfortunately the plugin leaves a ```ftpsync.settings``` file as an artifact. The file also includes your username and password for your FTP server in plaintext. As such a simple advanced search on Github yields [86 code matches](https://github.com/search?q=ftpsync+extension%3A.settings&type=Code&ref=searchresults) for the file ```ftpsync.settings```, most of which including host, username, and password in plaintext.

Very similar results can be found if you can think of any artifact files that might be not be ignored.
