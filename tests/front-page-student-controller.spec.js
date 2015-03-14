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
                            if(fakeCourses.data !== 'fakedata'){
                                errorFn();
                            }
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
                            if(fakeEvals.data !== 'fakeEval'){
                                errorFn();
                            }
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
