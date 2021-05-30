# avoxi-restrict-location

## Description 

*The Problem*

Our product team has heard from several customers that we restrict users to logging in to their UI accounts from selected countries to prevent them from outsourcing their work to others.

*The Solution*

The team has designed a solution where the customer database will hold the white listed countries and the API gateway will capture the requesting IP address, check the target customer for restrictions, and send the data elements to a new service. We have now built this new service.

`avoxi-restrict-location` is an HTTP-based API that receives an IP address and a white list of countries.  The API returns an indicator if the IP address is within the listed countries.


## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Features](#features)
* [License](#license)
  

## Installation

```shell
npm install
```


## Usage 

*To run application*

```shell
npm run dev
```

*To run tests*

```shell
npm test
```

The mapping data comes from [`maxmind geolite2`](https://github.com/runk/node-maxmind). Rather than implementing a manual solution for updating the data, we will be using the GeoIP Update which is installed on the server. 

## Features

* Includes a Docker file for the running service
* Includes a Kubernetes YAML file for running the service in an existing cluster
* Exposing the service as gRPC in addition to HTTP (planned for the future)


## License

MIT
