---
layout: post
title: "JASIG CAS for osTicket"
description: "Rookie security mistake"
category: code
tags:
- code
- release
---
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
  1. [Download](https://github.com/kevinoconnor7/core-plugins/releases/)
  the source or compiled PHAR package.
  2. If you downloaded the PHAR package skip to step #7.
  3. Expand the downloaded compressed container.
  4. In your php.ini file ensure that `phar.readonly = Off`
  5. In the expanded folder run `php make.php build auth-cas`
  6. In your php.ini file ensure that `phar.readonly = On`
  7. Move the `auth-cas.phar` file to your `<osticket root>/include/plugins/`
  8. Login to the SCP of osTicket and navigate to Admin Panel > Manage > Plugins
  9. Select `Add New Plugin`
  10. Install the `JASIG Cas Authentication` plugin
  11. Click on the plugin title to configure the plugin
  12. Once configured go back to the plugins menu and enable the plugin

## Notes
 * If in production please do not leave `phar.readonly = Off` in your php.ini
 file. Heck, don't even build the package on your production instance.
 * If you get PHP errors after enabling the plugin you can manually delete the
 `auth-cas.phar` file from your plugin directory.
