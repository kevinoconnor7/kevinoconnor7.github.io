---
layout: post
title: Kunaki PHP Class
category: code
tags:
- Kunaki
- php
- api
---
### Overview

[Kunaki](http://Kunaki.com) is a popular disk publishing service that is fully
automated and low-overhead. I went ahead and created an interface layer
between Kunaki's XML web service and PHP. It's incredibly straight-forward and
simple to use and sticts to OOP. It's fully documented (to the best of my
ability, limited by Kunaki's documentation) and provides example uses.

### Simple Example

Here's a really simple example getting shipping options and pricing for an
order:

{% highlight php %}
$order = new Kunaki_Order();
$order->addProductId($ProductId, 10);
$order->PostalCode = 10004;
$order->Country = United States;
$order->State_Province = NY;
$shipping = $Kunaki->getShippingOptions($order);
{% endhighlight %}

From here you can have the pick the shipping method you want, fill in the rest
of the customer infromation (though you likely already have it), and submit
the order.

### Notes

It should be noted though that you once you submit an order, it still has to
be approved in your Kunaki panel. Also, depending on the input data and what
you allow, it might not line up with what Kunaki wants and might error out
when you submit a request. Error response checking is important and making
sure the order gets resubmitted if you've already taken payment.

There is no API method to being able to approve orders so I would suggest
trying to submit the order first, fix data or prompt the user to fix it if it
fails, and then taking payment. Then store the Kunaki order number and the
payment gateway information (ex. Paypal order ID) in a table and then using
that to approve orders on Kunaki. This _should_ cover your bases but
application-specific circumstances always arise. Just be mindful of the
limitations of this API.

### Download & Documentation

You can find my full documentation and code over at the [Github
repo](https://github.com/kevinoconnor7/PHP-Kunaki).

### License

This software is released under the GPLv3 license. If you want to have some
bonding time with the license you can do so
[here](http://www.gnu.org/licenses/gpl-3.0.txt).

