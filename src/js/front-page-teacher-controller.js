angular.module('angularEvaluation').controller('FrontPageTeacherController', ['$scope', '$routeParams', '$route', '$location', '$modal', 'dispatchTeacher', 
    function($scope, $routeParams, $route, $location, $modal, dispatchTeacher) {
        dispatchTeacher.evaluationTemplates().
            success(function(data) {
                console.log("evaluationTemplates - SUCCESS!");
                $scope.evaluationTemplates = data;
            }).
            error(function() {
                console.log("evaluationTemplates - ERROR!");
                $scope.evalTplsFail = true;
            });

        dispatchTeacher.evaluations().
            success(function(data) {
                console.log("evaluations: ", data);
                $scope.evaluations = data;
            }).
            error(function() {
                console.log("evaluations - ERROR!");
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
                       $route.reload();
                       console.log("addEvaluation - SUCCESS");
                   }).
                   error(function() {
                       console.log("addEvaluation - ERRROR");
                   });
            });

        };

        $scope.getResultsById = function(evaluationID) {
            console.log("Inside getResultByID. evaluationID: ", evaluationID);

            dispatchTeacher.getEvaluationResultsById(evaluationID).
                success(function(data) {
                    console.log("SUCCESS! - data:", data);

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
                    console.log("ERROR!");
                });
        };


    }]);
