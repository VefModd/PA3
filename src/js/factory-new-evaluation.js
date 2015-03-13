angular.module("angularEvaluation").factory("dispatchNewEvaluation",
    function($http, $rootScope, SERVER_URL) {
        return {
            newEvaluationTemplate:
            function(evaluationTemplate) {
                $http.post(SERVER_URL + 'evaluationtemplates', evaluationTemplate);
            }
        };
    });
