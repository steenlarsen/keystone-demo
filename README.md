Keystone CMS Demo on Openshift
==============================

This repository contains a slightly modified version of the [Keystone](http://keystonejs.com) demo application which enables quick installation on Openshift. This provides a quick and easy way of running your own demo application without worrying about installing mongodb, nodejs, etc.

Openshift is a complete open source container application platform based on Docker and Kubernetes.

Note: this page is about the Javascript nodejs based Keystone CMS which should not be confused with the OpenStack identity service which is also called Keystone.

For more information about Keystone CMS and the Keystone demo application please visit http://keystonejs.com and https://github.com/JedWatson/keystone-demo.git

## Howto run the Keystone Demo on Openshift

This example assumes that you have git and the openshift "oc" command installed on your PC and that you are logged into Openshift:

    git clone https://github.com/steenlarsen/keystone-demo.git
    cd keystone-demo
    oc new-project keynotedemo
    oc new-app -f ./openshift_template.json

After entering the above commands you have to wait approx 10 minutes while Openshift builds and activates your site. You can use the Openshift web console or use "oc status" to see the web address on which your demo site is now available.

If this works out for you the demo site can be modified and costumised to become your own Keystone site if you prefer. Hower, see below.

## Using this as a basis for your own project

The Keystone authors recommend you use the new [Yeoman Generator](https://github.com/JedWatson/generator-keystone) as the basis for new projects, as this demo site contains code specific to runing a public demo (like user account protection, etc).

If you do want to use this as a starting point however, you are welcome. It should also give you an idea regarding howto host a Keynote CMS on Openshift.

## Howto get Openshift

You can get a free or paid-for Openshift cloud account here : https://manage.openshift.com
Alternatively you can install a small openshift platform on your own laptop/PC using [minishift](https://docs.openshift.org/latest/minishift/index.html)

## Technical background information

The Openshift template file "openshift_template.json" instructs your openshift platform to create two hosts/pods:

* mongodb server with a persistent volume to store data
* nodejs server wich runs the Keynote CMS (a route is published so that this site can be accessed from the outside)

The difference between this repository and the original Keynote demo site repository is very small :

* the keystone.js file was slightly modified to allow Keystone to receive information from Openshift regarding generated mongodb usernames, passwords, IP address, etc.
* the "openshift_template.json" file, containing information about how Openshift should deploy the application, was added.

## License

(The MIT License)

Copyright (c) 2015 Jed Watson

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
