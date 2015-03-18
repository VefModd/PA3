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
                        
                        $scope.postAnswer = function(answer) {
                            dispatchStudent.saveAnswer(courseID, semester, evaluationID, answer).
                                success(function() {
                                    console.log("postAnswer -SUCCESS!");
                                }).
                                error(function() {
                                    console.log("postAnswer -ERROR!");
                                });
                        };

                        modalInstance.result.then(function(data) {
                            $scope.result = data;
                            $scope.answers = [];
                            console.log("MODAL answer ===> ", $scope.result);
                            console.log("CourseResult:");
                            for(var i = 0; i < $scope.result.CourseResult.length; i++) {
                                if($scope.result.CourseResult[i].question.Type === 'multiple') {
                                    console.log("multiple");
                                    var courseAnswerMult = {
                                        QuestionID : $scope.result.CourseResult[i].question.ID,
                                        TeacherSSN : undefined,
                                        Value : $scope.result.CourseResult[i].answers
                                    };

                                    if(courseAnswerMult.Value === undefined || courseAnswerMult.Value.length === 0) {
                                        courseAnswerMult.Value = '';
                                    }

                                    console.log("answer: ", courseAnswerMult);
                                    $scope.answers.push(courseAnswerMult);
                                }
                                else {
                                    console.log("single or text");
                                    var courseAnswerSinglOrText = {
                                        QuestionID : $scope.result.CourseResult[i].question.ID,
                                        TeacherSSN : undefined,
                                        Value : $scope.result.CourseResult[i].answers
                                    };

                                    if(courseAnswerSinglOrText.Value === undefined || courseAnswerSinglOrText.Value.length === 0) {
                                        courseAnswerSinglOrText.Value = '';
                                    }

                                    console.log("answer: ", courseAnswerSinglOrText);
                                    $scope.answers.push(courseAnswerSinglOrText);
                                }
                            }

                            console.log("TeacherResult:");
                            for(var j = 0; j < $scope.result.TeacherResult.length; j++) {
                                for(var k = 0; k < $scope.result.TeacherResult[j].teacherQuestions.length; k++) {
                                    if($scope.result.TeacherResult[j].teacherQuestions[k].question.Type === 'multiple') {
                                        console.log("multiple");
                                        var teacherAnswerMult = {
                                            QuestionID : $scope.result.TeacherResult[j].teacherQuestions[k].question.ID,
                                            TeacherSSN : $scope.result.TeacherResult[j].SSN,
                                            Value : $scope.result.TeacherResult[j].teacherQuestions[k].answers
                                        };

                                        if(teacherAnswerMult.Value === undefined || teacherAnswerMult.Value.length === 0) {
                                            teacherAnswerMult.Value = '';
                                        }

                                        console.log("answer: ", teacherAnswerMult);
                                        $scope.answers.push(teacherAnswerMult);
                                    }
                                    else {
                                        console.log("single or text");
                                        var teacherAnswerSinglOrText = {
                                            QuestionID : $scope.result.TeacherResult[j].teacherQuestions[k].question.ID,
                                            TeacherSSN : $scope.result.TeacherResult[j].SSN,
                                            Value : $scope.result.TeacherResult[j].teacherQuestions[k].answers
                                        };

                                        if(teacherAnswerSinglOrText.Value === undefined || teacherAnswerSinglOrText.Value.length === 0) {
                                            teacherAnswerSinglOrText.Value = '';
                                        }

                                        console.log("answer: ", teacherAnswerSinglOrText);
                                        $scope.answers.push(teacherAnswerSinglOrText);
                                    }
                                }
                            }
                            console.log("answers:: ", $scope.answers);
                            $scope.postAnswer($scope.answers);
                        });

                    }).
                    error(function() {
                        console.log("ERROR!");
                    });
            };
        }]);
