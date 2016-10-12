console.log('app.js');

var smp3App = angular.module('smp3App', [
    'ngRoute',
    'angular-jwt',
    'angular-storage',
    'ngAudio',
    'angular-blocks',
    'ngDraggable',
    'Smp3Controllers',
]).config(function Config($httpProvider, jwtInterceptorProvider) {
    jwtInterceptorProvider.tokenGetter = ['myService', function (myService) {
            myService.doSomething();
            return localStorage.getItem('jwt');
        }];

    $httpProvider.interceptors.push('jwtInterceptor');
}).config(function Config($httpProvider, jwtInterceptorProvider) {
    jwtInterceptorProvider.tokenGetter = ['config', 'store', '$location', function (configuration, store, $location) {

            if (configuration.url.substr(configuration.url.length - 5) == '.html') {
                return null;
            }

            return localStorage.getItem('jwt');
        }];

    $httpProvider.interceptors.push('jwtInterceptor');
}).config(function ($httpProvider) {
    $httpProvider.interceptors.push(function ($q, $location) {
        return {
            'responseError': function (rejection) {
                if (rejection.status == 401) {
                    $location.path('/login');
                }
                return $q.reject(rejection);
            },
            'request': function (config, store, $location) {
                var configuration = angular.fromJson(localStorage.getItem('config'));
               // console.log('exc', sconfiguration.excempt_urls);
                if (config.url.substr(config.url.length - 5) != '.html'
//                        && !hasUrl(sconfiguration.excempt_urls, configuration.url)
                        ) {
                    config.url = configuration.server_url + config.url;
                }

                return config || $q.when(config);

            }

        }
    });
});

smp3App.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
                when('/login', {
                    templateUrl: 'partials/login.html',
                    controller: 'Smp3LoginCtrl'
                }).
                when('/config', {
                    templateUrl: 'partials/config.html',
                    controller: 'Smp3ConfigCtrl'
                }).
                when('/users', {
                    templateUrl: 'partials/users.html',
                    controller: 'Smp3UsersCtrl'
                }).
                when('/user/edit/:id', {
                    templateUrl: 'partials/edit_user.html',
                    controller: 'Smp3UsersCtrl'
                }).
                when('/user/new', {
                    templateUrl: 'partials/edit_user.html',
                    controller: 'Smp3UsersCtrl'
                }).
                when('/', {
                    templateUrl: 'partials/main.html',
                    controller: 'Smp3MainCtrl'
                });
    }]);



var Smp3Controllers = angular.module('Smp3Controllers', [
    'angular-storage'

]);