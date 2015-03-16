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
                            console.log("WHAT?");
                            for(var i = 0; i < data.CourseResult.length; i++) {
                                console.log("data.CourseResult[i] ==> ", data.CourseResult[i]);
                                console.log("Result: ", data.CourseResult[i].Result);
                                console.log("Object: ", data.CourseResult[i].Result[data.CourseResult[i].Result.length - 1]);
                                console.log("CourseID: ", data.CourseResult[i].Result[data.CourseResult[i].Result.length - 1].QuestionID);
                                console.log("TeacherSSN: ", undefined);
                                console.log("Value: ", data.CourseResult[i].Result[data.CourseResult[i].Result.length - 1].Value);
                                console.log("CourseReuslt finished!!");
                            }
                            for(var j = 0; j < data.TeacherResult.length; j++) {
                                console.log("data.TeacherResult[i] ==> ", data.TeacherResult[j]);
                                console.log("Result: ", data.TeacherResult[j].Result);
                                console.log("length: ", data.TeacherResult[j].Result.length - 1);
                                console.log("Object: ", data.TeacherResult[j].Result[data.TeacherResult[j].Result.length - 1]);
                            }
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
