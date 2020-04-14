---
author: simsekismail
path: run-gatsby-over-custom-ip-and-port
date: 2020-04-14T23:20:08.720Z
title: Run gatsby over custom ip and port
description: >-
  Run gatsby app over custom ip and port so you can check your website via your
  phone or tablet
---
```sh
gatsby develop --host $(ifconfig | awk '/inet 192\.168\.[0-9]+\.[0-9]+/{print $2}') --port 8000
```
