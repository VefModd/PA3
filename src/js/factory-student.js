angular.module("angularEvaluation").factory("dispatchStudent",
    function($http, $rootScope, SERVER_URL) {
        return {
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