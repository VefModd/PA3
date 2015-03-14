angular.module("angularEvaluation").factory("dispatchNewEvaluation",
    function($http, $rootScope, SERVER_URL) {
        return {
            newEvaluationTemplate:
            function(evaluationTemplate) {
                var config = {
                    headers: {
                        'Authorization': 'Basic ' + $rootScope.data.Token
                    }
                };
                return $http.post(SERVER_URL + 'evaluationtemplates', evaluationTemplate, config);
            }
        };
    });
