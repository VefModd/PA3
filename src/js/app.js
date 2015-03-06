angular.module('angularEvaluation', [
        'ngRoute',
        'ui.bootstrap'
        ]);

angular.module('angularEvaluation').config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/login', {
                    templateUrl: 'src/html/login.html',
                    controller: 'LoginController'
                }).
                otherwise({
                    redirectTo: '/login'
                });
        }]);
