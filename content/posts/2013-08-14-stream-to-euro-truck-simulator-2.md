---
categories:
- games
date: "2013-08-14T00:00:00Z"
tags:
- games
- protips
title: Stream to Euro Truck Simulator 2
aliases: [/games/2013/08/14/stream-to-euro-truck-simulator-2/]
---

Oddly enough, I've recently become addicted to [Euro Truck Simulator 2](http://www.eurotrucksimulator2.com/),
a very good trucking simulator. One of the great features of the game is that it has built in 
suppport to play MP3 streams within the game. It comes prepacked with a bunch of European stations,
but I wanted to add some of my local stations that are on [iHeartRadio](http://www.iheart.com/).

This led to two problems: finding the stream URL and then transcoding the stream to MP3.

## Getting the stream

This is a very varying step since each stream might be streamed through different applications, but 
in general you can do some packet inspection to find out the stream source. In my case, someone very
kindly compiled a TSV file of stations on iHeartRadio along with their 
[stream URLs](http://pastebin.com/YYamKGgr). Unforauntely, these streams are not given in MP3.

## Transcoding

One of my favorite applications that is very commonly installed these days is 
[VLC](http://www.videolan.org/) which came quite in handy here. Once you have the stream URL, follow
these steps:

1. In VLC go to **Media** -> **Stream...**
2. Select the **Network** tab and enter the URL
3. Click **Stream** button
4. On the next screen click on **Destination Setup**
5. Under **Destinations** -> **New Destination** option select **HTTP**
6. Click **Add**
7. Leave the default options or change **Port** from 8080 if it's in use
8. Ensure that **Active Transcoding** is checked.
9. Under **Transcoding options** -> **Profile** select **Audio - MP3**
10. Click **Stream**
11. Note that the stream URL is now **http://localhost:8080** (or another port you selected)

Simply repeat these steps for any stream you want transcoded. Once you have setup this stream in
the game you will not have to redo the configuration in the game.

## Adding stream to game

1. Open **My Documents** -> **Euro Truck Simulator 2**. Open the file **live_streams.sii** in a
text editor.
2. Copy and paste the last line that looks like **stream_data[###]: "http://someurl:8080| Name"**
on the line below it.
3. Change the ### to the next sequential number and the URL to be a valid MP3 stream.
Change the stream name after the | (pipe) to be **Localhost** or another distinctive name.
