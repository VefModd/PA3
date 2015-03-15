angular.module("angularEvaluation").factory("dispatchModalAnswer",
    function($http, $rootScope, SERVER_URL) {
        return {
            getTeachers:
            function(courseName, semester) {
                var config = {
                    headers: {
                        'Authorization': 'Basic ' + $rootScope.data.Token
                    }
                };
                return $http.get(SERVER_URL + 'courses/' + courseName + '/' + semester + '/teachers', config);
            }
        };
    });
