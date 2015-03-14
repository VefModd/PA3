describe('FrontPageStudentController', function(){
    beforeEach(module('angularEvaluation'));

    var $controller;

    var mockDispatchStudent = {
        myCourses: function() {
            return {
                success: function(fn){
                    var fakeCourses = {
                        data: 'fakeData'
                    };
                    fn(fakeCourses);
                    return {
                        error: function(errorFn) {
                        }
                    };
                }
            };
        },
        myEvaluations: function(){
            return {
                success: function(fn){
                    var fakeEvals = {
                        data: 'fakeEval'
                    };
                    fn(fakeEvals);
                    return {
                        error: function(errorFn){
                        }
                    };
                }
            };
        }
    };

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe('$scope.myCourses', function(){

    });
    
    describe('$scope.myEvaluations', function(){
    
    
    });

});
