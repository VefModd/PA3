angular.module('angularEvaluation', [ 'ngRoute', 'ui.bootstrap' ]).
    config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/login', {
                templateUrl: 'src/html/login.html',
                controller: 'LoginController'
            }).
            when('/front-page-student/:studentUsername', {
                templateUrl: 'src/html/front-page-student.html',
                controller: 'FrontPageStudentController'
            }).
            when('front-page-teacher', {
                templateUrl: 'src/html/front-page-teacher.html',
                constroller: 'LoginController'
            }).
            otherwise({
                redirectTo: '/login'
            });
    }]);
