describe('ModalQuestionController', function(){
    beforeEach(module('angularEvaluation'));

    var controller, scope, modalInstance, typeOfQuestion;

    beforeEach(inject(function($controller, $rootScope){
        scope = $rootScope.$new();
        modalInstance = {
            close: jasmine.createSpy('modalInstance.close'),
            dismiss: jasmine.createSpy('modalInstance.dismiss'),
            result: {
                then: jasmine.createSpy('modalInstance.result.then')
            }
        };
        controller = $controller('ModalQuestionController', {
            $scope: scope,
            $modalInstance: modalInstance,
            typeOfQuestion: typeOfQuestion
        });
    }));


    describe('new question', function(){
        it('should instantiate the controller properly', function () {
            expect(controller).toBeDefined();
        });

        it('should dismiss the modal when cancelled', function(){
            scope.cancel();
            expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel');
        });

        it('should be invalid question type and not call close', function(){
            //Arrange:
            scope.question.Type = 'bull';
            scope.newCourseQuestionForm = { 
                questionType: { $invalid: undefined },
                $valid: undefined
            };
            //Act:
            scope.finish();
            //Assert:
            expect(scope.newCourseQuestionForm.questionType.$invalid).toBeTruthy();
            expect(scope.newCourseQuestionForm.$valid).not.toBeTruthy();
            expect(modalInstance.close).not.toHaveBeenCalled();
        });

        it('should be invalid question answer and not call close', function(){
            //Arrange:
            scope.question.Type = 'single';
            scope.question.Answers.length = 0;
            scope.newCourseQuestionForm = {
                questionAnswers: { $invalid: undefined },
                $valid: undefined
            };
            //Act:
            scope.finish();
            //Assert:
            expect(scope.newCourseQuestionForm.questionAnswers.$invalid).toBeTruthy();
            expect(scope.newCourseQuestionForm.$valid).not.toBeTruthy();
            expect(modalInstance.close).not.toHaveBeenCalled();
        });

        it('should be a valid question and call close', function(){
            //Arrange:
            scope.question.Type = 'multiple';
            scope.question.Answers.length = 5;
            scope.newCourseQuestionForm = {
                questionType : { $invalid: undefined },
                questionAnswers: { $invalid: undefined },
                $valid: undefined
            };
            //Act:
            scope.finish();
            //Assert:
            expect(scope.newCourseQuestionForm.questionAnswers.$invalid).not.toBeTruthy();
            expect(scope.newCourseQuestionForm.questionType.$invalid).not.toBeTruthy();
            expect(scope.newCourseQuestionForm.$valid).toBeTruthy();
            expect(modalInstance.close).toHaveBeenCalled();
        });

        it('should be a valid text question and let answers be empty', function(){
            //Arrange:
            scope.question.Type = 'text';
            scope.newCourseQuestionForm = {
                questionType: { $invalid: undefined },
                questionAnswers: { $invalid: undefined },
                $valid: undefined
            };
            //Act:
            scope.finish();
            //Assert:
            expect(scope.newCourseQuestionForm.$valid).toBeTruthy();
            expect(scope.question.Answers).toEqual([]);
            expect(modalInstance.close).toHaveBeenCalled();
        });

        it('should have showInputAnswer as true', function(){
            scope.inputAnswer();
            expect(scope.showInputAnswer).toBeTruthy();
        });

        it('should add answer if answer form was valid', function(){
            //Arrange:
            scope.answerForm = {
                $valid: true,
                $submitted : undefined
            };
            scope.newCourseQuestionForm = {
                questionAnswers: { $invalid: undefined },
            };
            //Act:
            scope.addAnswer();
            //Assert:
            expect(scope.showInputAnswer).not.toBeTruthy();
            expect(scope.answer).toBe("");
            expect(scope.answerForm.$submitted).not.toBeTruthy();
            expect(scope.newCourseQuestionForm.questionAnswers.$invalid).not.toBeTruthy();
        });
    });
});
