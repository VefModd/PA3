describe('FrontPageTeacherController', function(){
    beforeEach(module('angularEvaluation'));

    var $controller;

    beforeEach(inject(function (_$controller_){
        $controller = _$controller_;
    }));

    describe('$scope.newEvaluationTemplate', function(){
        var $location;
        beforeEach(function(){
            //constructing a fake environment
            $location = {
                path : function(p) {
                    return p;
                }
            }
            spyOn($location, 'path');

        });

    });




});
