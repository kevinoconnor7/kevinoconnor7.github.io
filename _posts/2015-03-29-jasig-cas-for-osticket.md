---
layout: post
title: "JASIG CAS for osTicket"
description: "Rookie security mistake"
category: code
tags:
- code
- release
---

**Update 2015-06-03:** I have moved this plugin to its own [project](https://github.com/kevinoconnor7/osTicket-auth-cas/). The post below
has been updated to reflect this.

Back when I was working at [RPI](http://union.rpi.edu) I had setup a ticketing
system to handle the volume of support related requests that were coming in via
e-mail. I turned to [osTicket](http://osticket.com/) but their authentication
system has always been a bit.. err.. not user friendly. Given that many college
campuses, including my own, utilize [CAS](http://jasig.github.io/cas/) I figured
it was time to get that hacked into osTicket. Thankfully osTicket has built a
plugin system that is fairly easy to use, albeit undocumented.

I wrote a nice [PR](https://github.com/osTicket/core-plugins/pull/31) for the
support to go in but given that there has been radio silence since proposing it,
I have decided to document how to include it on your own instance.

## Features
 - CAS extended attributes for user name and e-mail addresses.
 - Optionally appending a suffix to user names to allow mapping to e-mail addresses.
 - Login for both agents and clients (can be toggled for neither, either, or both).
 - Certificate validation (can be disabled for testing).
 - Auto creates clients if not already in osTicket.

## How to install
  1. [Download](https://github.com/kevinoconnor7/osTicket-auth-cas/releases/latest)
  the source or compiled PHAR package.
  2. If you downloaded the PHAR package skip to step #8.
  3. Expand the downloaded compressed container.
  4. Clone [core-plugins](https://github.com/osTicket/core-plugins) into another
  directory.
  5. In your php.ini file ensure that `phar.readonly = Off`
  6. In the expanded folder run `php ../core-plugins/make.php build auth-cas`
  7. In your php.ini file ensure that `phar.readonly = On`
  8. Move the `auth-cas.phar` file to your `<osticket root>/include/plugins/`
  9. Login to the SCP of osTicket and navigate to Admin Panel > Manage > Plugins
  10. Select `Add New Plugin`
  11. Install the `JASIG CAS Authentication` plugin
  12. Click on the plugin title to configure the plugin
  13. Once configured go back to the plugins menu and enable the plugin

## Notes
 * If in production please do not leave `phar.readonly = Off` in your php.ini
 file. Heck, don't even build the package on your production instance.
 * If you get PHP errors after enabling the plugin you can manually delete the
 `auth-cas.phar` file from your plugin directory.
