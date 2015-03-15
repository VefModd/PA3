describe('LoginController', function (){
    beforeEach(module('angularEvaluation'));

    var $controller, $location, $rootScope;
    // Mock of the dispatch factory where login authentication
    // is requested from the API server.
    var mockDispatch = {
        login:
        function(user, pass) {
            return {
                success: function (fn) {
                    // Providing two possible accepted usernames
                     if((user === 'dabs' || user === 'admin') && pass !== '') {
                         // Calling the success function with some fake data
                        var role = (user === 'dabs') ? 'student' : 'admin';
                        var data = { User : { Role : role } };
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

    beforeEach(inject(function (_$controller_, _$location_, _$rootScope_) {
        $controller = _$controller_;
        $location = _$location_;
        $rootScope = _$rootScope_;
    }));

    describe('$scope.login', function () {
        var $scope, controller;
        beforeEach(function() {
            // Constructing a fake enviroment
            $scope = {
                loginForm: { $valid: true },
                user: {
                    name: '',
                    pass: ''
                }
            };

            // Spying on functions that should or shouldn't be called
            spyOn(mockDispatch, 'login').and.callThrough();
            spyOn($location, 'path');

            // Constructing the controller
            controller = $controller('LoginController', {
                $scope: $scope,
                dispatchLogin: mockDispatch,
                $location : $location,
                $rootScope : $rootScope
            });
        });

        it('should fail the login because of invalid user', function() {
            // Arrange:
            $scope.user.name = 'ekkidabs';
            $scope.user.pass = '123456';

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
            $scope.user.pass = '123456';

            // Act:
            $scope.login();

            // Assert:
            expect(mockDispatch.login).toHaveBeenCalled();
            expect($scope.loginFail).not.toBeTruthy();
            expect($location.path).toHaveBeenCalledWith('/front-page-student');
            expect($rootScope.data).toBeDefined();
        });

        it('should relocate the teacher/admin and save the user info in rootscope', function() {
            // Arrange:
            $scope.user.name = 'admin';
            $scope.user.pass = '123456';

            // Act:
            $scope.login();

            // Assert:
            expect(mockDispatch.login).toHaveBeenCalled();
            expect($scope.loginFail).not.toBeTruthy();
            expect($location.path).toHaveBeenCalledWith('/front-page-teacher');
            expect($rootScope.data).toBeDefined();
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
            expect($rootScope.data).not.toBeDefined();
        });

    });
});

