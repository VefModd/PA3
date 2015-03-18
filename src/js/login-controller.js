angular.module('angularEvaluation').controller('LoginController', ['$scope', 'dispatchLogin', '$rootScope', '$routeParams', '$location',
    function ($scope, dispatchLogin, $rootScope, $routeParams, $location) {
        $scope.login = function() {
            if($scope.loginForm.$valid) {
                dispatchLogin.login($scope.user.name, $scope.user.pass).
                    success(function(data) {
                        $rootScope.data = data;
                        if(data.User.Role === 'student') {
                            $location.path('/front-page-student');
                        }
                        if (data.User.Role === 'teacher' || data.User.Role === 'admin'){
                            $location.path('/front-page-teacher');
                        }
                    }).
                    error(function() {
                        $scope.loginFail = true;
                    });
            }
        };
    }]);
