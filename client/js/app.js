var app = angular.module('app', ['ngRoute', 'jkAngularRatingStars']);

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/products', {
      template: '<products></products>'
    })
    .when('/review/:productId', {
      template: '<review></review>'
    })
    .otherwise({redirectTo: '/products'});
    $locationProvider.html5Mode(true);
});
