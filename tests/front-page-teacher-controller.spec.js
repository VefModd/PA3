describe('FrontPageTeacherController', function(){
    beforeEach(module('angularEvaluation'));

    var $controller;

    beforeEach(inject(function (_$controller_){
        $controller = _$controller_;
    }));

    describe('$scope.newEvaluationTemplate', function(){
        var $location, $scope, controller;
        beforeEach(function(){
            //constructing a fake environment
            $location = {
                path : function(p) {
                    return p;
                }
            };
            $scope = {};
            spyOn($location, 'path');

            //constructing the controller
            controller = $controller('FrontPageTeacherController', {
                $scope : $scope,
                $location : $location,
            });
        });
        it('should relocate the teacher to the eval tmpl site', function(){
            //Arrange

            //Act
            $scope.newEvaluationTemplate();
            //Assert
            expect($location.path).toHaveBeenCalled();
        });
    });
});
