describe('FrontPageStudentController', function(){
    beforeEach(module('angularEvaluation'));

    var dispatchStudent,
        ok,
        modalInstance;

    var mockDispatchStudent = {
        myCourses: function() {
            return {
                success: function(fn){
                    var fakeCourses = {
                        data: 'fakeCourse'
                    };
                    if(ok){ fn(fakeCourses); }
                    return {
                        error: function(errorFn) {
                            if(!ok) { errorFn(); }
                        }
                    };
                }
            };
        },
        myEvaluations: function(){
            return {
                success: function(fn){
                    var fakeEvals = {
                        data: 'fakeEval'
                    };
                    if(ok){ fn(fakeEvals); }
                    return {
                        error: function(errorFn){
                            if(!ok){ errorFn(); }
                        }
                    };
                }
            };
        },
        getEvaluation: function(courseID, semester, evaluationId){
            return{
                success: function(fn){
                    if(courseID === 1337){
                        fn({ID: 10, TemplateID: 13, Title: "FAKEDATA"});
                    }
                    return {
                        error: function(errorFn){
                            if(courseID !== 1337){
                                errorFn();
                            }
                        }
                    };
                }
            };
        },
        saveAnswer: function (courseID, semester, evaluationID, answer) {
            return {
                success: function (fn) {
                    if(evaluationID === 1337) {fn();}
                    return {
                        error: function (errorFn) {
                            if(evaluationID !== 1337) {errorFn();}
                        }
                    };
                }
            };
        }
    };

    beforeEach(inject(function (_$controller_, _$location_, _$modal_, _$route_){
        $controller = _$controller_;
        $location = _$location_;
        $modal = _$modal_;
        $route = _$route_;
        $scope = $rootScope.$new();
    }));

    describe('myCourses, myEvaluations SUCCESS', function(){
        var $scope, controller;
        beforeEach(function(){
            $scope = {};
            //when true, success function is called
            ok = true;
            //constructing controller
            controller = $controller('FrontPageStudentController', {
                $scope: $scope,
                dispatchStudent: mockDispatchStudent
            });
        });
        it("should test that data goes through to myCourses", function(){
            //Act:
            mockDispatchStudent.myCourses();
            //Assert:
            expect($scope.courses).toBeDefined();
            expect($scope.courseListFail).not.toBeDefined();
        });
        it("should test that data goes through to myEvaluations", function(){
            //Act:
            mockDispatchStudent.myEvaluations();
            //Assert:
            expect($scope.evaluations).toBeDefined();
            expect($scope.evalListFail).not.toBeDefined();
        });
    });

    describe('myCourses, myEvaluations ERROR', function(){
        var $scope, controller;
        beforeEach(function(){
            //constructing a fake environment
            $scope = {};
            //when false, error function is called
            ok = false;
            //constructing controller
            controller = $controller('FrontPageStudentController', {
                $scope: $scope,
                dispatchStudent: mockDispatchStudent
            });
        });
        it("should test that data goes through to myCourses", function(){
            //Act:
            mockDispatchStudent.myCourses();
            //Assert:
            expect($scope.myCourses.length).toBe(0);
            expect($scope.courseListFail).toBeDefined();
        });
        it("should test that data goes through to myEvaluations", function(){
            //Act:
            mockDispatchStudent.myEvaluations();
            //Assert:
            expect($scope.myEvaluations.length).toBe(0);
            expect($scope.evalListFail).toBeDefined();
        });
    });

    describe('answer multiple with empty data', function() {
        var fakeModal = {
            result: {
                then: function(confirmCallback) {
                    var fakeAnswer = {
                        CourseResult: [{
                            question: {
                                Type : "multiple",
                                ID: 35},
                            answers: []
                        }],
                        TeacherResult: [{
                            teacherQuestions : [{
                                question: {
                                    Type : "multiple",
                                    ID: 35},
                                answers: []
                            }]
                        }]};
                    confirmCallback(fakeAnswer);
                }
            },
        };

        beforeEach(function() {
            spyOn($modal, 'open').and.returnValue(fakeModal);

            controller = $controller('FrontPageStudentController', {
                $scope: $scope,
                $modal: $modal,
                dispatchStudent: mockDispatchStudent
            });

        });

        it('should succeed in adding the answer', function() {
            // Act:
            $scope.answer('T-101-WEPO', 1337, '20141', 1337);

            // Assert:
            expect($scope.answers[0].QuestionID).toBe(35);
            expect($modal.open).toHaveBeenCalled();
        });
    });

    describe('answer single/text with empty  data', function() {
        var fakeModal = {
            result: {
                then: function(confirmCallback) {
                    var fakeAnswer = {
                        CourseResult: [{
                            question: {
                                Type : "single",
                                ID: 35},
                        answers: []
                        }],
                        TeacherResult: [{
                            teacherQuestions : [{
                                question: {
                                    Type : "text",
                                    ID: 35},
                                answers: []
                            }]
                        }]};
                    confirmCallback(fakeAnswer);
                }
            },
        };

        beforeEach(function() {
            spyOn($modal, 'open').and.returnValue(fakeModal);

            controller = $controller('FrontPageStudentController', {
                $scope: $scope,
                $modal: $modal,
                dispatchStudent: mockDispatchStudent
            });

        });

        it('should succeed in adding the answer', function() {
            // Act:
            $scope.answer('T-101-WEPO', 1337, '20141', 13);

            // Assert:
            expect($modal.open).toHaveBeenCalled();
        });

        it('should succeed in adding the answer', function() {
            // Act:
            $scope.answer('T-101-WEPO', 13, '20141', 13);

            // Assert:
            expect($modal.open).not.toHaveBeenCalled();
        });
    });

    describe('answer single/text with data', function() {
        var fakeModal = {
            result: {
                then: function(confirmCallback) {
                    var fakeAnswer = {
                        CourseResult: [{
                            question: {
                                Type : "single",
                                ID: 35},
                        answers: [{data: "FAKEANSWER"}]
                        }],
                        TeacherResult: [{
                            teacherQuestions : [{
                                question: {
                                    Type : "text",
                                    ID: 35},
                                answers: [{data: "FAKEANSWER"}]
                            }]
                        }]};
                    confirmCallback(fakeAnswer);
                }
            },
        };

        beforeEach(function() {
            spyOn($modal, 'open').and.returnValue(fakeModal);

            controller = $controller('FrontPageStudentController', {
                $scope: $scope,
                $modal: $modal,
                dispatchStudent: mockDispatchStudent
            });

        });

        it('should succeed in adding the answer', function() {
            // Act:
            $scope.answer('T-101-WEPO', 1337, '20141', 13);

            // Assert:
            expect($modal.open).toHaveBeenCalled();
        });
    });

    describe('answer multiple with data', function() {
        var fakeModal = {
            result: {
                then: function(confirmCallback) {
                    var fakeAnswer = {
                        CourseResult: [{
                            question: {
                                Type : "multiple",
                                ID: 35},
                            answers: [{data: "FAKEANSWER"}]
                        }],
                        TeacherResult: [{
                            teacherQuestions : [{
                                question: {
                                    Type : "multiple",
                                    ID: 35},
                                answers: [{data: "FAKEANSWER"}]
                            }]
                        }]};
                    confirmCallback(fakeAnswer);
                }
            },
        };

        beforeEach(function() {
            spyOn($modal, 'open').and.returnValue(fakeModal);

            controller = $controller('FrontPageStudentController', {
                $scope: $scope,
                $modal: $modal,
                dispatchStudent: mockDispatchStudent
            });

        });

        it('should succeed in adding the answer', function() {
            // Act:
            $scope.answer('T-101-WEPO', 1337, '20141', 1337);

            // Assert:
            expect($scope.answers[0].QuestionID).toBe(35);
            expect($modal.open).toHaveBeenCalled();
            expect($modal.open.calls.mostRecent().args[0].resolve.evaluation().ID)
            .toBe(10);
            expect($modal.open.calls.mostRecent().args[0].resolve.courseName())
            .toBe('T-101-WEPO');
            expect($modal.open.calls.mostRecent().args[0].resolve.courseID())
            .toBe(1337);
            expect($modal.open.calls.mostRecent().args[0].resolve.semester())
            .toBe('20141');
        });
    });
});
