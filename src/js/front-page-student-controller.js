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
                            $scope.result = data;
                            console.log("MODAL answer ===> ", $scope.result);
                            console.log("CourseResult:");
                            for(var i = 0; i < $scope.result.CourseResult.length; i++) {
                                if($scope.result.CourseResult[i].question.Type === 'multiple') {
                                    console.log("multiple");
                                    console.log("QuestionID: ", $scope.result.CourseResult[i].question.ID);
                                    console.log("TeacherSSN: ", undefined);
                                    console.log("Value: ", $scope.result.CourseResult[i].answers);
                                }
                                else if($scope.result.CourseResult[i].question.Type === 'single'){
                                    console.log("single");
                                    console.log("QuestionID: ", $scope.result.CourseResult[i].question.ID);
                                    console.log("TeacherSSN: ", undefined);
                                    console.log("Value: ", $scope.result.CourseResult[i].answers);
                                }
                                else {
                                    console.log("text");
                                    console.log("QuestionID: ", $scope.result.CourseResult[i].question.ID);
                                    console.log("TeacherSSN: ", undefined);
                                    console.log("Value: ", $scope.result.CourseResult[i].answers);
                                }
                            }

                            console.log("TeacherResult:");
                            for(var j = 0; j < $scope.result.TeacherResult.length; j++) {
                                for(var k = 0; k < $scope.result.TeacherResult[j].teacherQuestions.length; k++) {
                                    if($scope.result.TeacherResult[j].teacherQuestions[k].question.Type === 'multiple') {
                                        console.log("multiple");
                                        console.log("QuestionID: ", $scope.result.TeacherResult[j].teacherQuestions[k].question.ID);
                                        console.log("TeacherSSN: ", $scope.result.TeacherResult[j].SSN);
                                        console.log("Value: ", $scope.result.TeacherResult[j].teacherQuestions[k].answers);
                                    }
                                    else if($scope.result.TeacherResult[j].teacherQuestions[k].question.Type === 'single') {
                                        console.log("single");
                                        console.log("QuestionID: ", $scope.result.TeacherResult[j].teacherQuestions[k].question.ID);
                                        console.log("TeacherSSN: ", $scope.result.TeacherResult[j].SSN);
                                        console.log("Value: ", $scope.result.TeacherResult[j].teacherQuestions[k].answers);
                                    }
                                    else {
                                        console.log("text");
                                        console.log("QuestionID: ", $scope.result.TeacherResult[j].teacherQuestions[k].question.ID);
                                        console.log("TeacherSSN: ", $scope.result.TeacherResult[j].SSN);
                                        console.log("Value: ", $scope.result.TeacherResult[j].teacherQuestions[k].answers);
                                    }
                                }
                            }
                        });

                    }).
                    error(function() {
                        console.log("ERROR!");
                    });
            };
        }]);
