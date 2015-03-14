angular.module('angularEvaluation').controller('FrontPageTeacherController', ['$scope', '$routeParams', '$route', '$location', '$modal', 'dispatchTeacher',
    function($scope, $routeParams, $route, $location, $modal, dispatchTeacher) {
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

        $scope.newEvaluation = function(templateID) {
            $scope.evaluation = {
                "TemplateID": templateID,
                "StartDate": undefined,
                "EndDate": undefined
            };

            //$scope.evaluation.TemplateID = templateID;
            var modalInstance = $modal.open({
                templateUrl: 'src/html/modal-date.html',
                controller: 'ModalDateController',
                size: 'lg'
            });

            modalInstance.result.then(function(data) {
                $scope.evaluation.StartDate = data.StartDate;
                $scope.evaluation.EndDate = data.EndDate;
                console.log("$scope.evaluation befor adding it to database: ", $scope.evaluation);

                dispatchTeacher.addEvaluation($scope.evaluation).
                   success(function() {
                       console.log("addEvaluation - SUCCESS");
                   }).
                   error(function() {
                       console.log("addEvaluation - ERRROR");
                   });
            });

        };

    }]);
