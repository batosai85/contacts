'use strict';

// Declare app level module which depends on views, and components
angular.module('myCont', [
  'ngRoute',
  'firebase',
  'myContacts'
    
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/contacts'});
}]);
