describe('ModalDateController', function(){
    beforeEach(module('angularEvaluation'));

    var controller, scope, modalInstance;

    beforeEach(inject(function($controller, $rootScope){
        scope = $rootScope.$new();
        modalInstance = {
            close: jasmine.createSpy('modalInstance.close'),
            dismiss: jasmine.createSpy('modalInstance.dismiss'),
            result: {
                then: jasmine.createSpy('modalInstance.result.then')
            }
        };
        controller = $controller('ModalDateController', {
            $scope: scope,
            $modalInstance: modalInstance
        });
    }));

    describe('new date', function(){
        it('should instantiate the controller properly', function () {
            expect(controller).toBeDefined();
        });
        
        it('should dismiss the modal when cancelled', function(){
            scope.cancel();
            expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel');
        });

        it('should close the modal when accepted', function () {
            //Arrange:
            scope.newEvaluationForm = { $valid: true };
            //Act:
            scope.finishEvaluation();
            //Assert:
            expect(modalInstance.close).toHaveBeenCalled();
        });

        it('should fail if the eval form was not valid', function(){
            //Arrange:
            scope.newEvaluationForm = { $valid: false };
            //Act:
            scope.finishEvaluation();
            //Assert:
            expect(modalInstance.close).not.toHaveBeenCalled();
        });


    });
});
