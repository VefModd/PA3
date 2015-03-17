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
            },

            addEvaluation:
            function(evaluation) {
                var config = {
                    headers: {
                        'Authorization': 'Basic ' + $rootScope.data.Token
                    }
                };
                return $http.post(SERVER_URL + 'evaluations', evaluation, config);
            },

            evaluations:
            function() {
                var config = {
                    headers: {
                        'Authorization': 'Basic ' + $rootScope.data.Token
                    }
                };
                return $http.get(SERVER_URL + 'evaluations', config);
            },

            getEvaluationResultsById:
            function(id) {
                var config = {
                    headers: {
                        'Authorization': 'Basic ' + $rootScope.data.Token
                    }
                };
                return $http.get(SERVER_URL + 'evaluations/' + id, config);
            },

        };
    });
