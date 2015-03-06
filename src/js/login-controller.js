angular.module('angularEvaluation').controller('LoginController', ['$scope', '$rootScope', '$routeParams', '$route', '$location', 'dispatch',
        function ($scope,$rootScope, $routeParams, $route, $location, dispatch) {
            $scope.login = function() {
                if($scope.loginForm.$valid) {
                    dispatch.login($scope.user.name, $scope.user.pass).
                        success(function(data, status, headers, config) {
                            console.log("success! data => ", data);
                            console.log("success! status=> ", status);
                            console.log("success! headers=> ", headers);
                            console.log("success! config=> ", config);
                            //$scope.data = data;
                            $rootScope.data = data;
                            if(data.User.Role == 'student') {
                                $location.path('/front-page-student');
                            }
                            else {
                                $location.path('/front-page-teacher');
                            }
                        }).
                        error(function(data, status, headers, config) {
                            console.log("error! data=> ", data);
                            console.log("error! status=> ", status);
                            console.log("error! headers=> ", headers);
                            console.log("error! config=> ", config);
                        });
                }
            }
        }]);
