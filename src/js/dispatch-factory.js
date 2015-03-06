angular.module("angularEvaluation").constant("SERVER_URL", "http://dispatch.ru.is/demo/api/v1/");

angular.module("angularEvaluation").factory("dispatch", 
    function($http, SERVER_URL) {
        return {
            login: function(user, pass) {
                return $http.post(SERVER_URL + "login", {"user": user, "pass": pass});
            }
        }
    });
