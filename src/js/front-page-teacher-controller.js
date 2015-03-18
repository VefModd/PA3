angular.module('angularEvaluation').controller('FrontPageTeacherController', ['$scope', '$routeParams', '$route', '$location', '$modal', 'dispatchTeacher', 
    function($scope, $routeParams, $route, $location, $modal, dispatchTeacher) {
        dispatchTeacher.evaluationTemplates().
            success(function(data) {
                $scope.evaluationTemplates = data;
            }).
            error(function() {
                $scope.evalTplsFail = true;
            });

        dispatchTeacher.evaluations().
            success(function(data) {
                $scope.evaluations = data;
            }).
            error(function() {
                $scope.evalsFail = true;
            });

        $scope.evaluations = [];
        $scope.evaluationTemplates = [];

        $scope.newEvaluationTemplate = function() {
            $location.path('/new-evaluation-template');
        };

        $scope.newEvaluation = function(templateID) {
            $scope.evaluation = {
                TemplateID: templateID,
                StartDate: undefined,
                EndDate: undefined
            };

            var modalInstance = $modal.open({
                templateUrl: 'src/html/modal-date.html',
                controller: 'ModalDateController',
                size: 'lg'
            });

            modalInstance.result.then(function(data) {
                $scope.evaluation.StartDate = data.StartDate;
                $scope.evaluation.EndDate = data.EndDate;

                dispatchTeacher.addEvaluation($scope.evaluation).
                   success(function() {
                       $route.reload();
                   }).
                   error(function() {
                       // ERROR
                   });
            });

        };

        $scope.getResultsById = function(evaluationID) {
            dispatchTeacher.getEvaluationResultsById(evaluationID).
                success(function(data) {
                    $modal.open({
                        templateUrl: 'src/html/modal-result.html',
                        controller: 'ModalResultController',
                        size: 'lg',
                        resolve: {
                            results : function() {
                                return data;
                            }
                        }
                    });

                }).
                error(function() {
                    // ERROR
                });
        };


    }]);
