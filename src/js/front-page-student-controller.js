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

                    $scope.postAnswer = function(answer) {
                        dispatchStudent.saveAnswer(courseID, semester, evaluationID, answer).
                            success(function() {
                                // SUCCESS
                            }).
                            error(function() {
                                // ERROR
                            });
                    };

                    modalInstance.result.then(function(data) {
                        $scope.result = data;
                        $scope.answers = [];
                        for(var i = 0; i < $scope.result.CourseResult.length; i++) {
                            if($scope.result.CourseResult[i].question.Type === 'multiple') {
                                var courseAnswerMult = {
                                    QuestionID : $scope.result.CourseResult[i].question.ID,
                                    TeacherSSN : undefined,
                                    Value : $scope.result.CourseResult[i].answers
                                };

                                if(courseAnswerMult.Value === undefined || courseAnswerMult.Value.length === 0) {
                                    courseAnswerMult.Value = '';
                                }

                                $scope.answers.push(courseAnswerMult);
                            }
                            else {
                                var courseAnswerSinglOrText = {
                                    QuestionID : $scope.result.CourseResult[i].question.ID,
                                    TeacherSSN : undefined,
                                    Value : $scope.result.CourseResult[i].answers
                                };

                                if(courseAnswerSinglOrText.Value === undefined || courseAnswerSinglOrText.Value.length === 0) {
                                    courseAnswerSinglOrText.Value = '';
                                }

                                $scope.answers.push(courseAnswerSinglOrText);
                            }
                        }

                        for(var j = 0; j < $scope.result.TeacherResult.length; j++) {
                            for(var k = 0; k < $scope.result.TeacherResult[j].teacherQuestions.length; k++) {
                                if($scope.result.TeacherResult[j].teacherQuestions[k].question.Type === 'multiple') {
                                    var teacherAnswerMult = {
                                        QuestionID : $scope.result.TeacherResult[j].teacherQuestions[k].question.ID,
                                        TeacherSSN : $scope.result.TeacherResult[j].SSN,
                                        Value : $scope.result.TeacherResult[j].teacherQuestions[k].answers
                                    };

                                    if(teacherAnswerMult.Value === undefined || teacherAnswerMult.Value.length === 0) {
                                        teacherAnswerMult.Value = '';
                                    }

                                    $scope.answers.push(teacherAnswerMult);
                                }
                                else {
                                    var teacherAnswerSinglOrText = {
                                        QuestionID : $scope.result.TeacherResult[j].teacherQuestions[k].question.ID,
                                        TeacherSSN : $scope.result.TeacherResult[j].SSN,
                                        Value : $scope.result.TeacherResult[j].teacherQuestions[k].answers
                                    };

                                    if(teacherAnswerSinglOrText.Value === undefined || teacherAnswerSinglOrText.Value.length === 0) {
                                        teacherAnswerSinglOrText.Value = '';
                                    }

                                    $scope.answers.push(teacherAnswerSinglOrText);
                                }
                            }
                        }
                        $scope.postAnswer($scope.answers);
                    });

                }).
                error(function() {
                    //ERROR
                });
        };
    }]);
