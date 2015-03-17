describe('ModalAnswerController', function(){
    beforeEach(module('angularEvaluation'));

    var controller,
        modalInstance, 
        evaluation = { 
            TeacherQuestions: [], 
            CourseQuestions: [] 
        }, 
        courseName, 
        courseID,
        semester,
        ok;

    var mockDispatchModalAnswer = {
        getTeachers: function(){
            return {
                success: function(fn){
                    var fakeTeacher = {
                        data: "fakeTeacher"
                    };
                    if(ok){ fn([fakeTeacher]); dump("Success!"); }
                    return {
                        error: function(errorFn){
                            if(!ok) { errorFn(); dump("Error!");}
                        }
                    }
                }
            };
        }
    };

    beforeEach(inject(function (_$controller_, _$location_, _$modal_, _$route_, _$rootScope_){
        modalInstance = {
            close: jasmine.createSpy('modalInstance.close'),
            dismiss: jasmine.createSpy('modalInstance.dismiss'),
            result: {
                then: jasmine.createSpy('modalInstance.result.then')
            }
        };
        $modalInstance = modalInstance;
        $controller = _$controller_;
        $location = _$location_;
        $modal = _$modal_;
        $route = _$route_;
        $scope = $rootScope.$new();
        evaluation = evaluation;

    }));

    describe('getTeachers SUCCESS', function(){
        beforeEach(function(){
            // When true success function is called
            ok = true;
            controller = $controller('ModalAnswerController', {
                $scope: $scope,
                $modalInstance: $modalInstance,
                evaluation: evaluation,
                courseName: courseName,
                courseID: courseID,
                semester: semester,
                dispatchModalAnswer: mockDispatchModalAnswer
            });
        });
        it('should test that data goes through', function(){
            // Assert:
            expect($scope.teachers).toBeDefined();
            expect($scope.teachers[0].data).toBe("fakeTeacher");
        });
    });

    describe('getTeachers ERROR', function(){
        beforeEach(function(){
            // When true success function is called
            ok = false;
            controller = $controller('ModalAnswerController', {
                $scope: $scope,
                $modalInstance: $modalInstance,
                evaluation: evaluation,
                courseName: courseName,
                courseID: courseID,
                semester: semester,
                dispatchModalAnswer: mockDispatchModalAnswer
            });
        });
        it('should test that data goes through', function(){
            // Assert:
            expect($scope.teachers).not.toBeDefined();
        });
    });

    describe('modalAnswerController', function(){
        beforeEach(function() {
            controller = $controller('ModalAnswerController', {
                $scope: $scope,
                $modalInstance: $modalInstance,
                evaluation: evaluation,
                courseName: courseName,
                courseID: courseID,
                semester: semester,
                dispatchModalAnswer: mockDispatchModalAnswer
            });
        });
        it('should instantiate the controller properly', function () {
            expect(controller).toBeDefined();
        });

        it('should dismiss the modal when cancelled', function(){
            $scope.cancel();
            expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel');
        });

        it('should be a valid form and call close with result', function(){
            //Arrange:
            $scope.answerEvaluationForm = {
                $valid: true
            };
            //Act:
            $scope.finishEvaluation();
            //Assert:
            expect($scope.result).toBeDefined();
            expect(modalInstance.close).toHaveBeenCalledWith($scope.result);
        });

        it('should not be a valid form and not call close with result', function(){
            //Arrange:
            $scope.answerEvaluationForm = {
                $valid: false
            };
            //Act:
            $scope.finishEvaluation();
            //Assert:
            expect($scope.result).not.toBeDefined();
            expect(modalInstance.close).not.toHaveBeenCalled();
        });
    });
});
