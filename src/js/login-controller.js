angular.module('angularEvaluation').controller('LoginController', ['$scope', '$rootScope', '$routeParams', '$route', '$location', 'dispatch',
        function ($scope,$rootScope, $routeParams, $route, $location, dispatch) {
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
