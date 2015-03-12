angular.module("angularEvaluation").constant("SERVER_URL", "http://dispatch.ru.is/h09/api/v1/");

angular.module("angularEvaluation").factory("dispatch",
    function($http, $rootScope, SERVER_URL) {
        return {
            login:
            function(user, pass) {
                return $http.post(SERVER_URL + "login", {"user": user, "pass": pass});
            },

            myCourses:
            function() {
                var config = {
                    headers: {
                        'Authorization': 'Basic ' + $rootScope.data.Token
                    }
                };
                return $http.get(SERVER_URL + 'my/courses', config);
            },

            myEvaluations:
            function() {
                var config = {
                    headers: {
                        'Authorization': 'Basic ' + $rootScope.data.Token
                    }
                };
                return $http.get(SERVER_URL + 'my/evaluations', config);
            }
        };
    });
