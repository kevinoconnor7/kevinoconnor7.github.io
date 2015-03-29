---
layout: post
title: "Playground"
description: ""
category: playground
tags: 
- security
- open source
---

So people might be wondering what this project is an how it's coming along. I wanted to address the project formally and give some updates.

## What is this?
Playground is my new project to try to improve the system for accepting raw code submission, exectuing them, and then returning the output. As an exentension, we can then diff that output or execute another program using that output as the STDIN.

So really this is a project to make a student code submission service. I wanted to do this to help improve the system that is in place at RPI.

I have a few main things that I want to get out of this program:

1. Completely sandboxed submission execution
2. Distributed workers to submissions can be processed in parallel
3. Allow scripting of result checking
4. Limit as much as possible at the kernel level

## So what's going on?
Currently I'm playing around with getting a secure sandbox for executing the code. To that end I've been experiment with SELinux, LXC, PAM, and Docker to get a nice combination of what I find to be secure and give the level of customization I want.

Some of the issue I look into when exploring this options is ensuring that I can get a sandboxed filesystem, I'll have the ability to limit a process' execution in terms of CPU time and memory utilization. Each package has its ups and downs and are honestly very very feature rich with lacking documentation.

## My current setup
Right now I've settle on a setup using a host machine (I currently use a VM for this) that employs SELinux and PAM to limit a process' abilities. Right now my worker recieves a submission, hashes the task id (pretty much to ensure I get a valid username), then I ```useradd -d /home/%user%``` to get a valid user account to execute as. From there I setup a separate tmp directory for it to use.

From there I wrap the execution of the process with ```seunshare``` to override the $HOME and $TMP of the process execution context with my restricted directories created just for this user. Then further wrap with ```ulimit``` to limit CPU time and max memory. From there I capture STDOUT, STERR, and the return code and pass that back over to the MQ.

## Wait wait wait
You said you want separate, isolate filesystems? And where's Docker and LXC in this?

Well, I compromised. You see, having that level of isolation is nice, but at a certain point I've gone overkill. SELinux and PAM are currently providing more than enough security without a large overhead. Plus, I would still need PAM and SELinux even if I isolated further with LXC. The problem became that sure, I could actually limit the LXC container in terms of memory, but that's not actually what I wanted. I want to limit a specific process, not the entire container.

## Why I'm happy with this
Currently I can explicitly state how long a process can run on a CPU (this is not equal to runtime, sleep doesn't use any CPU time) and set memory limits with the process thinking the kernel is the one restricting it. For example, I'm not running ```kill -9``` on your proc after you pass the memmory limit, rather your process actually thinks it's out of memory.

## Going forward
Right now I only have support for Python. I will eventually expand this out and currently plan to add compiled languages. So support this I'm going to break out each language into separate queues (and possibly further by major version) so that not all agents have to have all the operating environments.

Furthermore I'm going to continue working on my SELinux config to tighten down what processes can and cannot do.

I also need to greatly expand the options that can be decided when a process is to be run, this mainly includes setting up a runtime environment to handle the input for the process.

After I'm comfortable with all that then I need to begin working on the checker system. This is going to branch into two direction: static and dynamic checking. Pretty much I'm either going to statically diff your output with expected results, or I'm going to pipe your output into another program that will either give a return code 0, you're good, or anthing else if you failed.

Finally I'll whip up a nice interface to tie this whole thing together.