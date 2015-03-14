angular.module('angularEvaluation').controller('FrontPageStudentController', ['$scope', '$routeParams', '$route', 'dispatchStudent',
        function($scope, $routeParams, $route, dispatchStudent) {
            dispatchStudent.myCourses().
                success(function(data) {
                    $scope.courses = data;
                }).
                error(function() {
                    $scope.courseListFail = true;
                });

            dispatchStudent.myEvaluations().
                success(function(data) {
                    $scope.evaluations = data;
                }).
                error(function() {
                    $scope.evalListFail = true;
                });
        }]);
