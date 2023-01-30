---
categories:
- code
date: "2023-01-29T00:00:00Z"
tags:
- code
- home assistant
- authelia
title: Home Assistant Command Line Authentication for Authelia
aliases: [/code/2023/01/29/authelia-home-assistant-auth/]
---

Want to integrate [Authelia](https://www.authelia.com/) with [Home Assistant](https://www.home-assistant.io)? Unfortunately Home Assistant [lacks support for SSO](https://www.home-assistant.io/docs/authentication/providers/), but it does support a rather unique [command line authentication mode](https://www.home-assistant.io/docs/authentication/providers/#command-line).

In short: Home Assistant will execute a script, passing in the provided username/password from the client. If the script exits with code `0` then the login is accepted, if not it's rejected.

Authelia, in turn, has a handy `/api/verify` [endpoint](https://www.authelia.com/integration/proxies/introduction/) that can be used by proxies to implement forward authetication with.

Combing these together, we can simply use `curl` in a command line authentication script to verify the credentials with Authelia. Additionally, we can pass the `X-Original-URL` header to allow Authelia to perform authorization.

There are some drawbacks:
  - 2FA is not supported. You'll need to configure Authelia to use 1FA for your Home Assistant service.
  - Since the request comes from the Home Assistant server, you'll need to ensure that abuse counter-measures don't block your sever (ex. fail2ban).

## How to Use

  1. Save the [code](https://gist.github.com/kevinoconnor7/76817712e35951f60b9e28810e4c6f93) to a script called `authelia.sh` in the same folder as your Home Assistant `configuration.yaml` file.
  1. Ensure the script is executable by running `chmod +x authelia.sh`.
  1. In your `configuration.yaml` add:

```yaml
homeassistant:
  auth_providers:
    - type: command_line
      command: /config/authelia.sh
```

Then restart Home Assistant and you should be all set!

## Code

{{< gist kevinoconnor7 76817712e35951f60b9e28810e4c6f93 >}}
