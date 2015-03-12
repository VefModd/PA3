describe('LoginController', function (){
    beforeEach(module('angularEvaluation'));

    var $controller;
    // Mock of the dispatch factory where login authentication
    // is requested from the API server.
    var mockDispatch = {
        login: function(user, pass) {
            return {
                success: function (fn) {
                    // Providing two possible accepted usernames
                    if(user === 'dabs' || user === 'admin') {
                        // Calling the success function with some fake data
                        var data = {
                            User : { Role : 'teacher'}
                        };
                        fn(data);
                    }
                    return {
                        error: function (errorFn) {
                            // If username not accepted call the error function
                            if(user !== 'dabs' && user !== 'admin') {
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

    describe('$scope.login', function () {
        var $scope, $location, controller;
        beforeEach(function() {
            // Constructing a fake enviroment
            // (scope data and location function)
            $scope = {
                loginForm: { $valid: true },
                user: {
                    name: '',
                    pass: ''
                }
            };
            $location = {
                path : function (p) {
                           return p;
                       }
            };
            // Spying on functions that should or shouldn't be called
            spyOn(mockDispatch, 'login').and.callThrough();
            spyOn($location, 'path');

            // Constructing the controller
            controller = $controller('LoginController', {
                $scope: $scope,
                dispatch: mockDispatch,
                $location : $location

            });
        });

        it('should fail the login because of invalid user', function() {
            // Arrange:
            $scope.user.name = 'ekkidabs';
            $scope.user.pass = '123456'

            // Act:
            $scope.login();

            // Assert:
            expect($scope.loginFail).toBeTruthy();
            expect(mockDispatch.login).toHaveBeenCalled();
            expect($location.path).not.toHaveBeenCalled();
        });

        it('should relocate the user and save the user info in rootscope', function() {
            // Arrange:
            $scope.user.name = 'dabs';
            $scope.user.pass = '123456'

            // Act:
            $scope.login();

            // Assert:
            expect(mockDispatch.login).toHaveBeenCalled();
            expect($scope.loginFail).not.toBeTruthy();
            expect($location.path).toHaveBeenCalled();
        });

        it('should fail the login since form was invalid', function() {
            // Arrange:
            $scope.loginForm.$valid = false;

            // Act:
            $scope.login();

            // Assert:
            expect(mockDispatch.login).not.toHaveBeenCalled();
            expect($scope.loginFail).toBe(undefined);
            expect($location.path).not.toHaveBeenCalled();
        });

    });
});

