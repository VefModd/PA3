angular.module('angularEvaluation').controller('FrontPageTeacherController', ['$scope', '$routeParams', '$route', '$location', 'dispatchTeacher',
    function($scope, $routeParams, $route, $location, dispatchTeacher) {
        console.log("Inside FrontPageTeacherController!");
        dispatchTeacher.evaluationTemplates().
            success(function(data) {
                console.log("evaluationTemplates - SUCCESS!");
                $scope.evaluationTemplates = data;
            }).
            error(function() {
                console.log("evaluationTemplates - ERROR!");
            });

        $scope.newEvaluationTemplate = function() {
            $location.path('/new-evaluation-template');
        };
    }]);
