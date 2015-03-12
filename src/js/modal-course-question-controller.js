angular.module('angularEvaluation').controller('ModalCourseQuestionController', ['$scope', '$modalInstance',
    function ($scope, $modalInstance) {
        console.log("inside modal controller!");
        console.log("the modal instance: ", $modalInstance);

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

        $scope.finish = function () {
            $modalInstance.close();
        };
        

    }]);
