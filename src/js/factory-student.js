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
            },

            getEvaluation:
            function(course, semester, evalID) {
                var config = {
                    headers: {
                        'Authorization': 'Basic ' + $rootScope.data.Token
                    }
                };
                return $http.get(SERVER_URL + 'courses/' + course + '/' + semester + '/evaluations/' + evalID, config);
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

            saveAnswer:
            function(course, semester, evalID, questionID, teacherSSN, value) {
                var config = {
                    headers: {
                        'Authorization': 'Basic ' + $rootScope.data.Token
                    }
                };
                return $http.post(SERVER_URL + 'courses/' + course + '/' + semester + '/evaluations/' + evalID, questionID, teacherSSN, value, config);
            }
        };
    });
