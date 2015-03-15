angular.module('angularEvaluation').controller('FrontPageStudentController', ['$scope', '$routeParams', '$route', '$modal', 'dispatchStudent',
        function($scope, $routeParams, $route, $modal, dispatchStudent) {
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
                dispatchStudent.getEvaluation(courseName, semester, evaluationID).
                    success(function(data) {
                        console.log("SUCCESS - answer, data: ", data);

                        var modalInstance = $modal.open({
                            templateUrl: 'src/html/modal-answer.html',
                            controller: 'ModalAnswerController',
                            size: 'lg',
                            resolve: {
                                evaluation : function() {
                                    return data;
                                }
                            }
                        });

                        modalInstance.result.then(function(data) {
                            console.log("model answering: ", data);
                        });

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
