angular.module('ngWaitstaffApp', ['ngRoute'])

.constant('DEFAULT_TAX_RATE', 7.35)

.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl : './home.html',
        controller : 'HomeCtrl'
    })
})

.controller('HomeCtrl', function($scope) {
    console.log("In the HomeCtrl");
});

