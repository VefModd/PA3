angular.module('angularEvaluation', [ 'ngRoute', 'ui.bootstrap', 'ui.bootstrap.tpls' ]).
    config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/login', {
                templateUrl: 'src/html/login.html',
                controller: 'LoginController'
            }).
            when('/front-page-student', {
                templateUrl: 'src/html/front-page-student.html',
                controller: 'FrontPageStudentController'
            }).
            when('/front-page-teacher', {
                templateUrl: 'src/html/front-page-teacher.html',
                controller: 'FrontPageTeacherController'
            }).
            when('/new-evaluation-template', {
                templateUrl: 'src/html/new-evaluation-template.html',
                controller: 'NewEvaluationTemplateController'
            }).
            otherwise({
                redirectTo: '/login'
            });
    }]);
