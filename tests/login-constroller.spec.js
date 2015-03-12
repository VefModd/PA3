describe('LoginController', function (){
    beforeEach(module('angularEvaluation'));

    var $controller;
    var mockDispatch = {
        login: function(user, pass) {
            return {
                success: function (fn) {
                    if(user === 'dabs') {
                        fn();
                    }
                    return {
                        error: function (errorFn) {
                            errorFn();
                        }
                    };
                }
             };
        }
    };
    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe('$scope.login', function () {
        var $scope, controller;
        beforeEach(function(){
            $scope = {};
            spyOn(mockDispatch, 'login').and.callThrough();
            spyOn(toastr, 'success');
            spyOn(toastr, 'error');
            controller = $controller('LoginController',
                {   $scope: $scope,
                    dispatch: mockDispatch});
        });

        it('should fail the login because of invalid user', function() {
            controller.dispatch.login('kalli', '123456');
            expect($scope.loginFail).toBeTruthy();
        });

    });
});
