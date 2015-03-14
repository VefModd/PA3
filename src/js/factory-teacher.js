angular.module("angularEvaluation").factory("dispatchTeacher",
    function($http, $rootScope, SERVER_URL) {
        return {
            evaluationTemplates:
            function() {
                var config = {
                    headers: {
                        'Authorization': 'Basic ' + $rootScope.data.Token
                    }
                };
                return $http.get(SERVER_URL + 'evaluationtemplates', config);
            }
        };
    });
