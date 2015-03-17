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

            $scope.myCourses = [];
            $scope.myEvaluations = [];

            $scope.answer = function(courseName, courseID, semester, evaluationID) {
                dispatchStudent.getEvaluation(courseID, semester, evaluationID).
                    success(function(data) {
                        console.log("SUCCESS - answer, data: ", data);
                        console.log("courseName: ", courseName);

                        var modalInstance = $modal.open({
                            templateUrl: 'src/html/modal-answer.html',
                            controller: 'ModalAnswerController',
                            size: 'lg',
                            resolve: {
                                evaluation : function() {
                                    return data;
                                },
                                courseName : function() {
                                    return courseName;
                                },
                                courseID : function() {
                                    return courseID;
                                },
                                semester: function() {
                                    return semester;
                                }
                            }
                        });

                        modalInstance.result.then(function(data) {
                            console.log("MODAL answer ===> ", data);
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
