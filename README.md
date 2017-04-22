# HacknakronTeamF

Client web application that enables users to search for land parcels on record for the City of Akron exposed in its data api.

The searches are performed by selecting a Land use Category, then Land Use options within the category.

The Api returns all parcel data matching the specified Land Use options, including aggregated appraisal and sale data.

## Get Up And Running
### Requirements

* [node.js](https://nodejs.org/en/)
* [this repository](https://github.com/sgwatgit/hacknakron-team-f)
 * `git clone https://github.com/sgwatgit/hacknakron-team-f`
 * `cd hacknakron-team-f`
 * `npm install`
 * `npm start`

The client app expects the API to be exposted at the `baseApiUrl` property specified in the `environment` object (`src/environments/environment.prod.ts`)

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build. The build does Ahead of Time compilation of the source code. The `dist/` directory can be deployed to a web server and served from.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.