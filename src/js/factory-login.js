angular.module("angularEvaluation").factory("dispatchLogin", function($http, $rootScope, SERVER_URL) {
    return  {
        login:
        function(user, pass) {
            return $http.post(SERVER_URL + "login", {"user": user, "pass": pass});
        },
    };
});
