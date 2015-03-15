describe('FrontPageTeacherController', function(){
    beforeEach(module('angularEvaluation'));

    var $controller,
        dispatchTeacher,
        ok;

    var mockDispatchTeacher = {
        evaluationTemplates: function() {
            return {
                success: function(fn) {
                    var fakeEvalTpls = {
                        data: "fakeTemplate"
                    };
                    if(ok) {
                        fn(fakeEvalTpls);
                    }
                    return {
                        error: function(errorFn) {
                            if(!ok) {
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
                        data: "fakeEval"
                    };
                    return {
                        error: function(errorFn) {
                            if (fakeEvals.data !== "fakeEval"){
                                errorFn();
                            }
                        }
                    };
                }
            };
        },
        addEvaluation: function(eval) {
            return {
                success: function(fn) {
                    if(eval.ID === 1337){
                        fn()
                    }
                    return {
                        error: function(errorFn) {
                            if(eval.ID !== 1337){
                                errorFn();
                            }
                        }
                    };
                }
            };
        }
    };


    beforeEach(inject(function (_$controller_, _$rootScope_){
        $controller = _$controller_;
        $rootScope = _$rootScope_;
    }));

    describe('$scope.evaluationTemplates', function(){
        var $location, $scope, controller, $rootScope;
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
                dispatchTeacher: mockDispatchTeacher
            });
        });
        it('should test', function(){
            ok = true;
            mockDispatchTeacher.evaluationTemplates();
        });
    });
});
