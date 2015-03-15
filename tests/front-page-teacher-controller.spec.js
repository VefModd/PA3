describe('FrontPageTeacherController', function(){
    beforeEach(module('angularEvaluation'));

    var $controller,
        dispatchTeacher,
        ok,
        $scope = {},
        controller,
        $locationi,
        $modal,
        $route;

    var mockDispatchTeacher = {
        evaluationTemplates: function() {
            return {
                success: function(fn) {
                    var fakeEvalTpls = {
                        data: "fakeTemplate"
                    };
                    if(ok) { fn([fakeEvalTpls]); }
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
                    if(ok) { fn([fakeEvals]); }
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
                    if(eval.TemplateID === 1337){
                        fn()
                    }
                    return {
                        error: function(errorFn) {
                            if(eval.TemplateID !== 1337){
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
    }));

    describe('evaluationTemplates, evaluations SUCCESS', function(){
        beforeEach(function(){
            // When true success function is called
            ok = true;
            //constructing the controller
            controller = $controller('FrontPageTeacherController', {
                $scope : $scope,
                dispatchTeacher: mockDispatchTeacher
            });
        });
        it('should test that data goes through', function(){
            // Act:
            mockDispatchTeacher.evaluationTemplates();

            // Assert:
            expect($scope.evaluationTemplates).toBeDefined();
            expect($scope.evalTplsFail).not.toBeDefined();
        });

        it('should test that data goes through', function(){
            // Act:
            mockDispatchTeacher.evaluations();

            // Assert:
            expect($scope.evaluations).toBeDefined();
            expect($scope.evalTplsFail).not.toBeDefined();
        });
    });

    describe('evaluationTemplates, evaluations ERROR', function(){
        beforeEach(function(){
            // When true success function is called
            ok = false;
            //constructing the controller
            //constructing the controller
            controller = $controller('FrontPageTeacherController', {
                $scope : $scope,
                dispatchTeacher: mockDispatchTeacher
            });
        });
        it('should test that data goes through', function(){
            // Act:
            mockDispatchTeacher.evaluationTemplates();

            // Assert:
            expect($scope.evaluationTemplates.length).toBe(0);
            expect($scope.evalTplsFail).toBeDefined();
        });

        it('should test that data goes through', function(){
            // Act:
            mockDispatchTeacher.evaluations();

            // Assert:
            expect($scope.evaluations.length).toBe(0);
            expect($scope.evalTplsFail).toBeDefined();
        });
    });

    describe('redirecting to new evaluation template', function() {
        beforeEach(function() {
            spyOn($location, 'path');
            controller = $controller('FrontPageTeacherController', {
                $scope: $scope,
                $location: $location,
                dispatchTeacher: mockDispatchTeacher
            });
        });

        it('should redirect to correct location', function() {
            $scope.newEvaluationTemplate();
            expect($location.path).toHaveBeenCalledWith('/new-evaluation-template');
        });
    });

    describe('new evaluation', function() {
        var fakeModal = {
            result: {
                then: function(confirmCallback) {
                    // Happy modal :)
                    var fakeEvaluation = {
                        TemplateID: 1337,
                        StartDate: new Date(),
                        EndDate: new Date()
                    };
                    confirmCallback(fakeEvaluation);
                }
            },
        };

        beforeEach(function() {
            spyOn($modal, 'open').and.returnValue(fakeModal);
            spyOn($route, 'reload');

            controller = $controller('FrontPageTeacherController', {
                $scope: $scope,
                $modal: $modal,
                dispatchTeacher: mockDispatchTeacher
            });

        });

        it('should succeed in adding the template', function() {
            // Act:
            $scope.newEvaluation(1337);

            // Assert:
            expect($scope.evaluation.TemplateID).toBe(1337);
            expect($modal.open).toHaveBeenCalled();
            expect($route.reload).toHaveBeenCalled();
        });

        it('should fail in adding the template', function() {
            // Act:
            $scope.newEvaluation(80085);

            // Assert:
            expect($scope.evaluation.TemplateID).not.toBe(1337);
            expect($modal.open).toHaveBeenCalled();
            expect($route.reload).not.toHaveBeenCalled();
        });
    });

});
