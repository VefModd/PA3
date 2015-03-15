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

            $scope.answer = function(courseName, semester, evaluationID) {
                console.log("inside answer!");
                console.log("coursName: ", courseName);
                console.log("semester: ", semester);
                console.log("evaluationID: ", evaluationID);

                dispatchStudent.getEvaluation(courseName, semester, evaluationID).
                    success(function(data) {
                        console.log("SUCCESS! - data: ", data);
                    }).
                    error(function() {
                        console.log("ERROR!");
                    });
            };

            $scope.getResultsById = function(evaluationID) {
                console.log("evaluationID: ", evaluationID);

                dispatchStudent.getEvaluationResultsById(evaluationID).
                    success(function(data) {
                        console.log("SUCCESS! - data:", data);
                    }).
                    error(function() {
                        console.log("ERROR!");
                    });
            };
        }]);
