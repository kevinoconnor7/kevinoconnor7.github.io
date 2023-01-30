---
categories:
- code
date: "2013-08-14T00:00:00Z"
tags:
- request tracker
- perl
- Active Directory
- code
title: Request Tracker - Map AD OU to Queue
aliases: [/code/2013/08/14/request-tracker-map-ad-ou-to-queue/]
---

While working for a school district that ran a windows shop I decided to branch out and use
[Request Tracker](http://www.bestpractical.com/rt/) for support tickets. The software allowed us to
handle issue more efficently, however, it had a major drawback in that someone would need to
manually assign tickets that came in to the proper queue. Since each school building had its own
tech(s) we gave each building a queue and then made that buildings tech(s) masters of those queues.
The manual labor of assigning tickets was definitely an issue.

By default Request Tracker's LDAP integration will just download the data from LDAP when a user is
created and that's about it. We needed it to use LDAP info when a ticket is being created to map it
to the proper queue. To do this we needed to use a Scrip (yes, without the t). Scrips are RT's
answer to exentsionability, sadly written in Perl.

Alas, I decided to tackle this challenge with the following Scrip.

## Final Code
{% gist 6235387 %}

## Configuration
You'll need to add a Scrip by going to Tools -> Configuration -> Global -> Scrips -> Create and fill
out the form with the following information:

<dl>
	<dt>Description</dt>
	<dd>
		Give any description you want that let's you know what this Scrip does. **Prefix your 
		description so that it will be first when sorted alphabetically (this is the order in which 
		scrips are run).** This is important since you'll want to change the queue before the Scrip 
		that notifies the queue is run.
	</dd>
	<dt>Condition</dt>
	<dd>On Create</dd>
	<dt>Action</dt>
	<dd>User Defined</dd>
	<dt>Template</dt>
	<dd>Global Template: Blank</dd>
	<dt>Stage</dt>
	<dd>TransactionCreate</dd>
	<dt>Custom Condition</dt>
	<dd>Leave empty</dd>
	<dt>Custom action preparation code</dt>
	<dd>Fill this with code from above (make sure to fill in your configuration)</dd>
	<dt>Custom action cleanup code</dt>
	<dd>return 1;</dd>
</dl>

Now save and you should be all set.

**Note:** This has only been tested on 4.0 <= RT version <= 4.0.13.

