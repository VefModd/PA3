angular.module('angularEvaluation').controller('FrontPageTeacherController', ['$scope', '$routeParams', '$route', '$location', '$modal', 'dispatchTeacher',
    function($scope, $routeParams, $route, $location, $modal, dispatchTeacher) {
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

        $scope.evaluation = {
            "TemplateID": undefined,
            "StartDate": undefined,
            "EndDate": undefined
        };

        $scope.newEvaluation = function(templateID) {
            console.log("newEvaluatoin");
            $scope.evaluation.TemplateID = templateID;
            var modalInstance = $modal.open({
                templateUrl: 'src/html/modal-new-evaluation.html',
                controller: 'ModalNewEvaluationController',
                size: 'lg'
            });

            modalInstance.result.then(function(data) {
                $scope.evaluation.StartDate = data.startDate;
                $scope.evaluation.EndDate = data.endDate;
            });
        };

        $scope.finishEvaluation = function() {
            // TODO ADD evaluation
            console.log("finishEvaluation");
        };

    }]);
