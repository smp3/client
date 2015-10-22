'use strict';

var smp3App = angular.module('smp3App', [
    'ngRoute',
    'angular-jwt',
    'angular-storage',
    'Smp3Controllers'
]).config(function Config($httpProvider, jwtInterceptorProvider) {
    jwtInterceptorProvider.tokenGetter = ['myService', function (myService) {
            myService.doSomething();
            return localStorage.getItem('jwt');
        }];

    $httpProvider.interceptors.push('jwtInterceptor');
}).config(function Config($httpProvider, jwtInterceptorProvider) {
    jwtInterceptorProvider.tokenGetter = ['config', function (config) {
            // Skip authentication for any requests ending in .html
            if (config.url.substr(config.url.length - 5) == '.html') {
                return null;
            }

            return localStorage.getItem('id_token');
        }];

    $httpProvider.interceptors.push('jwtInterceptor');
});

smp3App.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
                when('/', {
                    templateUrl: 'partials/login.html',
                    controller: 'Smp3LoginCtrl'
                }).
                when('/discover', {
                    templateUrl: 'partials/discover.html',
                    controller: 'Smp3DiscoverCtrl'
                })        
        ;
    }]);