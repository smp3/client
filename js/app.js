'use strict';

var smp3App = angular.module('smp3App', [
    'ngRoute',
    'angular-jwt',
    'angular-storage',
    'ngAudio',
    'Smp3Controllers'
]).config(function Config($httpProvider, jwtInterceptorProvider) {
    jwtInterceptorProvider.tokenGetter = ['myService', function (myService) {
            myService.doSomething();
            return localStorage.getItem('jwt');
        }];

    $httpProvider.interceptors.push('jwtInterceptor');
}).config(function Config($httpProvider, jwtInterceptorProvider) {
    jwtInterceptorProvider.tokenGetter = ['config', function (config) {

            if (config.url.substr(config.url.length - 5) == '.html') {
                return null;
            }

            return localStorage.getItem('jwt');
        }];

    $httpProvider.interceptors.push('jwtInterceptor');
});

smp3App.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
                when('/login', {
                    templateUrl: 'partials/login.html',
                    controller: 'Smp3LoginCtrl'
                }).
                when('/config', {
                   templateUrl: 'partials/config.html' 
                }).
                when('/', {
                    templateUrl: 'partials/main.html',
                    controller: 'Smp3MainCtrl'
                })

                ;
    }]);