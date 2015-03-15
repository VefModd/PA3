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
                    if(ok) { fn(fakeEvalTpls); }
                    return {
                        error: function(errorFn) {
                            if(!ok) { errorFn(); }
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
                    if(ok) { fn(fakeEvals); }
                    return {
                        error: function(errorFn) {
                            if(!ok) { errorFn(); }
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

    describe('evaluationTemplates, evaluations SUCCESS', function(){
        var $scope, controller, $rootScope;
        beforeEach(function(){
            //constructing a fake environment
            $scope = {};
            // When true success function is called
            ok = true;
            //constructing the controller
            controller = $controller('FrontPageTeacherController', {
                $scope : $scope,
                dispatchTeacher: mockDispatchTeacher
            });
        });
        it('should test that data goes through', function(){
            // Arrange:

            // Act:
            mockDispatchTeacher.evaluationTemplates();

            // Assert:
            expect($scope.evaluationTemplates).toBeDefined();
        });

        it('should test that data goes through', function(){
            // Arrange:

            // Act:
            mockDispatchTeacher.evaluations();

            // Assert:
            expect($scope.evaluations).toBeDefined();
        });
    });
});
