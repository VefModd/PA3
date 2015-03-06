angular.module('angularEvaluation').controller('LoginController', ['$scope', '$routeParams', '$route', '$location', 'dispatch',
        function ($scope, $routeParams, $route, $location, dispatch) {
            $scope.loginFail = false;
            $scope.login = function() {
                if($scope.loginForm.$valid) {
                    dispatch.login($scope.user.name, $scope.user.pass).
                        success(function(data, status, headers, config) {
                            // console.log("success! data => ", data);
                            // console.log("success! status=> ", status);
                            // console.log("success! headers=> ", headers);
                            // console.log("success! config=> ", config);
                            if(data.User.Role == 'student') {
                                $location.path('/front-page-student/' + $scope.username);
                            }
                            else {
                                $location.path('/front-page-teacher/' + $scope.username);
                            }
                        }).
                        error(function(data, status, headers, config) {
                            // console.log("error! data=> ", data);
                            // console.log("error! status=> ", status);
                            // console.log("error! headers=> ", headers);
                            // console.log("error! config=> ", config);
                            $scope.loginFail = true;
                        });
                }
            }
        }]);
