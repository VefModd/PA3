angular.module('angularEvaluation').controller('LoginController', ['$scope', 'dispatch', '$rootScope', '$routeParams', '$location',
        function ($scope, dispatch, $rootScope, $routeParams, $location) {
            $scope.login = function() {
                if($scope.loginForm.$valid) {
                    console.log("Valid!");
                    dispatch.login($scope.user.name, $scope.user.pass).
                        success(function(data) {
                            console.log(data.User.Role);
                            $rootScope.data = data;
                            if(data.User.Role === 'student') {
                                $location.path('/front-page-student');
                            }
                            if (data.User.Role === 'teacher' || data.User.Role === 'admin'){
                                $location.path('/front-page-teacher');
                            }
                        }).
                        error(function() {
                            console.log("error");
                            $scope.loginFail = true;
                        });
                }
            };
        }]);
