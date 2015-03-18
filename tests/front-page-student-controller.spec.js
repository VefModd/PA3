describe('FrontPageStudentController', function(){
    beforeEach(module('angularEvaluation'));

    var $controller,
        dispatchStudent,
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
        getEvaluation: function(courseName, courseID, semester, evaluationId){
            return{
                success: function(fn){
                    if(courseID === 1337){
                        fn();
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
            //constructing a fake environment
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

    describe('answer', function() {
        var fakeModal = {
            result: {
                then: function(confirmCallback) {
                    var fakeAnswer = {
                        courseName: 'CompSci',
                        courseID: 1337,
                        semester: '20141',
                        evaluationID: 1234
                    };
                    confirmCallback(fakeAnswer);
                }
            },
        };

        beforeEach(function() {
            spyOn($modal, 'open').and.returnValue(fakeModal);
            spyOn($route, 'reload');

            controller = $controller('FrontPageStudentController', {
                $scope: $scope,
                $modal: $modal,
                dispatchStudent: mockDispatchStudent
            });

        });

        it('should succeed in adding the answer', function() {
            // Act:
            $scope.answer('CompSci', 1337, '20141', 1234);

            // Assert:
            expect($scope.answer.courseID).toBe(1337);
            expect($modal.open).toHaveBeenCalled();
            //expect($route.reload).toHaveBeenCalled();
        });
    });
});
