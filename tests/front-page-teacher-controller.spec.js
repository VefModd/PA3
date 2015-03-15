describe('FrontPageTeacherController', function(){
    beforeEach(module('angularEvaluation'));

    var $controller;

    var mockDispatchTeacher = {
        evaluationTemplates: function() {
            return {
                success: function(fn) {
                    var fakeEvalTpls = {
                        data: 'fakeTemplate'
                    };
                    fn(fakeEvalTpls);
                    return {
                        error: function(errorFn) {
                            if (fakeEvalTpls.data !== 'fakeTemplate'){
                                errorFn();
                            }
                        }
                    };
                }
            };
        },
        evaluations: function() {
            return {
                success: function(fn) {
                    var fakeEvals = {
                        data: 'fakeEval'
                    };
                    return {
                        error: function(errorFn) {
                            if (fakeEvals.data !== 'fakeEval'){
                                errorFn();
                            }
                        }
                    };
                }
            };
        }
    };


    beforeEach(inject(function (_$controller_){
        $controller = _$controller_;
    }));

    describe('$scope.evaluationTemplates', function(){
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
        /*
        it('should relocate the teacher to the eval tmpl site', function(){
            //Arrange

            //Act
            $scope.newEvaluationTemplate();
            //Assert
            expect($location.path).toHaveBeenCalled();
        });
        */
    });
});
