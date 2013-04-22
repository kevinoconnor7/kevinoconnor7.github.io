---
layout: post
title: CloudFlare Dynamic DNS
category: code
tags: 
---
So I have an extra computer back home that runs some VMs that I like to have
access to remotely. Easy enough, just some basic DDNS. However, I use
CloudFlare whom doesn't directly offer dynamic DNS. Worry not though, for
CloudFlare does have an awesome API for updating DNS records.

### Final Script:

{% highlight bash %}
#!/bin/sh
WAN_IP=`wget -O - -q http://ifconfig.me/ip`
OLD_WAN_IP=`cat /var/CURRENT_WAN_IP.txt`
if [ "$WAN_IP" = "$OLD_WAN_IP" ]
then
        echo "IP Unchanged"
else
        curl https://www.cloudflare.com/api_json.html \
          -d a=rec_edit \
          -d tkn=8afbe6dea02407989af4dd4c97bb6e25 \
          -d email=sample@example.com \
          -d z=example.com \
          -d id=9001 \
          -d type=A \
          -d name=sub \
          -d ttl=1 \
          -d "content=$WAN_IP"
        echo $WAN_IP > /var/CURRENT_WAN_IP.txt
fi
{% endhighlight %}
    
    

So let's go over how I got here. First things first, you'll need your API key
which you can get from your account settings page. You'll also need to know
the DNS Record ID of the record you which to modify.That's where we'll start

### Getting your DNS Record ID:

If you need help, see [here](http://www.cloudflare.com/docs/client-
api.html#s3.3). To keep it short, run this command:

{% highlight bash %}
curl https://www.cloudflare.com/api_json.html \
  -d a=rec_load_all \
  -d tkn=8afbe6dea02407989af4dd4c97bb6e25 \
  -d email=sample@example.com \
  -d z=example.com
{% endhighlight %}  

If you're confused about what some of this stuff is then let me explain
quickly. **tkn** should be set to your CloudFlare API key. **email** is the
e-mail address of your CloudFlare account (same one that issued the API key).
**z** is the TLD of the domain you want to manage on CloudFlare.

Dealing with the return can be interesting. Your response will be in JSON so
you'll have to scan through there for the record you want to mange and pull
out its ID. If you need it formatted nicer, try using this [online JSON
parser](http://jsonviewer.stack.hu/).

### Editing the Record

Similiar, the official documentation is [here](http://www.cloudflare.com/docs
/client-api.html#s5.2). This time though, there's a little bit more involved:

{% highlight bash %}
curl https://www.cloudflare.com/api_json.html \
  -d a=rec_edit \
  -d tkn=8afbe6dea02407989af4dd4c97bb6e25 \
  -d id=9001 \
  -d email=sample@example.com \
  -d z=example.com \
  -d type=A
  -d name=sub
  -d content=1.2.3.4
{% endhighlight %}    

A lot of the information is overlap from last time but there are a few new
additions.

<dl>
  <dt>id</dt>
  <dd>The DNS Record ID you got in the previous step</dd>
  <dt>type</dt>
  <dd>The type of the DNS record (A, CNAME, AAAA, MX, SRV, etc.)</dd>
  <dt>name</dt>
  <dd>The name of the subdomain (you can give the full domain name)</dd>
  <dt>content</dt>
  <dd>The content of the record. For A records it should be the IP address</dd>
</dl>

### Putting it together

To finalize I grab the current WAN IP from the plaintext service
[[http://ifconfig.me/ip](http://ifconfig.me/ip)](http://ifconfig.me/ip). With
a little work I get the final product at the top of this post. I also create a
[gist](https://gist.github.com/4036347) of this if you prefer to make some
edits.

To automate the process I simply wrote a cron to:

{% highlight bash %} 
*/5	*	*	*	*	~/scripts/cf_dynamic_ip.sh
{% endhighlight %} 

### Some Notes

Right now I have it store the current WAN IP in /var/. You can change it to
your preferred location or you can just get rid of the storing of it and the
comparison. An issue that could arise that if the script fails to set the IP
on CloudFlare, it will not try again until the WAN IP changes.

