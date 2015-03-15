describe('FrontPageStudentController', function(){
    beforeEach(module('angularEvaluation'));

    var $controller,
        dispatchStudent,
        ok;

    var mockDispatchStudent = {
        myCourses: function() {
            return {
                success: function(fn){
                    var fakeCourses = {
                        data: 'fakeCourse'
                    };
                    if(ok){ fn(fakeCourses); }
                    return {
                        error: function(errorFn) {
                            if(!ok) { errorFn(); }
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
                    if(ok){ fn(fakeEvals); }
                    return {
                        error: function(errorFn){
                            if(!ok){ errorFn(); }
                        }
                    };
                }
            };
        }
    };

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe('myCourses SUCCESS', function(){
        var $scope, controller;
        beforeEach(function(){
            //constructing a fake environment
            $scope = {};
            //when true success function is called
            ok = true;
            //constructing controller
            controller = $controller('FrontPageStudentController', {
                $scope: $scope,
                dispatchStudent: mockDispatchStudent
            });
        });
        /*
        it('should fail the myCourses because of invalid course', function(){
            //Arrange
            $scope.data = "blabladata";
            //Act
            mockDispatchStudent.myCourses();
            //Assert
            expect($scope.courseListFail).toBeTruthy();
            expect(mockDispatchStudent.myCourses).toHaveBeenCalled();
            expect($location.path).not.toHaveBeenCalled();
        
        });
        */
    });
    
    describe('$scope.myEvaluations', function(){
        var $scope, $location, controller;
        beforeEach(function(){
            $scope = {
                data : ''
            };
            $location = {
                path: function(p){
                    return p;
                }
            };
            controller = $controller('FrontPageStudentController', {
                $scope: $scope,
                dispatchStudent: mockDispatchStudent,
                $location: $location
            });
        });
    });

});
