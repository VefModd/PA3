angular.module('angularEvaluation').controller('LoginController', ['$scope', '$routeParams', '$route', 'dispatch',
        function ($scope, $routeParams, $route, dispatch) {
            $scope.login = function() {
                dispatch.login($scope.username, $scope.password).
                    success(function(data, status, headers, config) {
                        console.log("success! data => ", data);
                        console.log("success! status=> ", status);
                        console.log("success! headers=> ", headers);
                        console.log("success! config=> ", config);
                    }).
                    error(function(data, status, headers, config) {
                        console.log("error! data=> ", data);
                        console.log("error! status=> ", status);
                        console.log("error! headers=> ", headers);
                        console.log("error! config=> ", config);
                    });
            }
        }]);
