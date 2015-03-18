describe('ModalResultController', function(){
    beforeEach(module('angularEvaluation'));

    var controller, scope, modalInstance, results = { Courses: undefined };

    beforeEach(inject(function($controller, $rootScope){
        scope = $rootScope.$new();
        modalInstance = {
            close: jasmine.createSpy('modalInstance.close'),
            dismiss: jasmine.createSpy('modalInstance.dismiss'),
            result: {
                then: jasmine.createSpy('modalInstance.result.then')
            }
        };
        controller = $controller('ModalResultController', {
            $scope: scope,
            $modalInstance: modalInstance,
            results: results
        });
    }));

    describe('new result', function(){
        it('should instantiate the controller properly', function () {
            expect(controller).toBeDefined();
        });
        it('should dismiss the modal when cancelled', function(){
            scope.cancel();
            expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel');
        });
    });
});
