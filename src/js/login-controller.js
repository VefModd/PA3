angular.module('angularEvaluation').controller('LoginController', ['$scope', '$routeParams', '$route', '$location', 'dispatch',
        function ($scope, $routeParams, $route, $location, dispatch) {
            $scope.login = function() {
                dispatch.login($scope.username, $scope.password).
                    success(function(data, status, headers, config) {
                        console.log("success! data => ", data);
                        console.log("success! status=> ", status);
                        console.log("success! headers=> ", headers);
                        console.log("success! config=> ", config);
                        $location.path('/front-page-student/' + $scope.username);
                    }).
                    error(function(data, status, headers, config) {
                        console.log("error! data=> ", data);
                        console.log("error! status=> ", status);
                        console.log("error! headers=> ", headers);
                        console.log("error! config=> ", config);
                    });
            }
        }]);
