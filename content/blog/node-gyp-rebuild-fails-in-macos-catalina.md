---
author: simsekismail
path: node-gyp-rebuild-fails-in-macos-catalina
date: 2019-10-29T21:21:21.204Z
title: node-gyp rebuild fails in macOS Catalina
description: How can we solve that stupid issue? What steps can we follow?
---

I have been struggling with this issue and I couldn't find out how to solve till today. I don't know if it is really related to macOS Catalina. But it started to happen after I upgraded my mac.

So let's begin.

> DISCLAIMER

> This is my solution and it worked for me.

> It might not work for you but I think it is the safest way.

### Remove yarn and yarn global folders

Remove Yarn
```sh 
 brew uninstall yarn
``` 
Remove yarn global packages
```sh
rm -rf /Users/[USER_NAME]/.config/yarn
```

Remove yarn global config
```sh
rm /Users/[USER_NAME]/.yarnrc
```

We remove yarn completely with all config. You can save your config file and use it later on.

### Remove node and npm global folders

Remove Node
```sh
brew uninstall node
```

Remove npm global packages
```sh
rm -rf /usr/local/lib/node_modules
```

Remove npm cache
```sh
rm -rf /Users/[USER_NAME]/.npm
```

Remove npm global config
```sh
rm /Users/[USER_NAME]/.npmrc
```

### Remove all caches

In these folders

```sh
/Users/ismail/Library/Caches
```

```sh
/Users/ismail/Library/Application Support
```

remove all yarn or npm related folders.

### Remove node-gyp

Search with this command 
```sh
mdfind kind:folder "node-gyp"
```
and remove all the results.


### Remove xcode-select

I assume you do not have xcode installed. You only use command line tools.

Run this commands

```sh
rm -rf /Library/Developer/CommandLineTools
```

```sh
sudo xcode-select -r
```

Last command prompts you to install software update. Let it install. You basically installing xcode command line tools. If there won't be any prompt run following:

```sh
xcode-select --install
```

3. After installation make sure xcode-select is working from correct path with the following command:

```sh
sudo xcode-select --switch /Library/Developer/CommandLineTools
```

### Install nvm

nvm is Node Version Manager. You can simply use multiple node versions without having any problems.

More information and documentation please visit: https://github.com/nvm-sh/nvm

Install:

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh | bash
```

To verify that nvm has been installed, do:

```sh
command -v nvm
```

which should output `nvm` if the installation was successful. Otherwise add the source lines from the snippet below to your profile (`~/.bash_profile`, `~/.zshrc`, `~/.profile`, or `~/.bashrc`).

<a id="profile_snippet"></a>

```sh

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

```

<sub>**Note:** If the environment variable `$XDG_CONFIG_HOME` is present, it will place the `nvm` files there.</sub>

Install node:

```sh
nvm install [desired_node_version]
nvm use [desired_node_version]
```

<sub>In my case I use latest LTS version which is 12.13.0 when this article was written. You can pick different versions.

i.e For prebid builds I had to use 11.6.0 https://github.com/prebid/Prebid.js/issues/3878#issuecomment-517941800</sub>

### Install yarn

The simplest step:

```sh
brew install yarn
```

### Give it a try

Go to your project folder. Pick your node version with 
```sh
nvm use [desired_and_installed_node_verison]
```
and 
```sh
yarn install
```
 or whatever command you were using before.

References:

- https://github.com/nodejs/node-gyp/issues/1927
- https://github.com/nodejs/node-gyp/issues/1779
- https://github.com/prebid/Prebid.js/issues/3878
