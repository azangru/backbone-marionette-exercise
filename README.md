# Description

This is an exercise of using Backbone and Handlebars together with Marionette and Webpack.

The [demo](http://azangru.github.io/backbone-marionette-exercise) does the following:

- shows different attributes of a model in different regions of the screen using Marionette’s LayoutView and ItemView;
- displays a navigation (using Marionette’s CollectionView) with items which, when selected, reset the models in other ItemViews and thus change the contents on the page accordingly;
- displays a left and a right navigation arrows for iterating through the models one by one;
- updates the url when navigating between the models and allows the user to show a specific model by entering its id in the url.

## Installation and building

1. `npm install`
2. To start the app in the development mode using webpack-dev-server, type `npm start`
3. For a production build of the app (which will place the bundle file in the `public/assets/js` folder), run `npm run build-prod`
