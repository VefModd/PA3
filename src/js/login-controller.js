angular.module('angularEvaluation').controller('LoginController', ['$scope', 'dispatch', '$rootScope', '$routeParams', '$location',
        function ($scope, dispatch, $rootScope, $routeParams, $location) {
            $scope.login = function() {
                if($scope.loginForm.$valid) {
                    dispatch.login($scope.user.name, $scope.user.pass).
                        success(function(data) {
                            $rootScope.data = data;
                            if(data.User.Role === 'student') {
                                $location.path('/front-page-student');
                            }
                            else {
                                $location.path('/front-page-teacher');
                            }
                        }).
                        error(function() {
                            $scope.loginFail = true;
                        });
                }
            };
        }]);
