describe('NewEvaluationTemplateController', function(){
    beforeEach(module('angularEvaluation'));

    var mockDispatchNewEvaluation = {
        newEvaluationTemplate :
            function(template) {
                return {
                    success:
                        function(successfn) {
                            if(template.Title === "SUCCESS") { successfn(); }
                            return {
                                error:
                                    function(errorfn) {
                                        if(template.Title === "ERROR") { errorfn(); }
                                    }
                            }
                        }
                };
            }
    };

    beforeEach(inject(function (_$controller_, _$location_, _$modal_, _$route_, _$rootScope_){
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $location = _$location_;
        $modal = _$modal_;
        $route = _$route_;
        $scope = $rootScope.$new();
    }));

    describe('creating new evaluation template ', function() {
        var fakeModal = {
            result: {
                then: function(confirmCallback) {
                    var fakeEvaluation = { data: "FAKEDATE" }
                    // Happy modal
                    confirmCallback(fakeEvaluation);
                }
            },
        };

        beforeEach(function() {
            spyOn($modal, 'open').and.returnValue(fakeModal);
            spyOn($location, 'path');

            $scope.templateForm = { courseQuestions : { $invalid : undefined },
                                    teacherQuestions : { $invalid : undefined } };

            controller = $controller('NewEvaluationTemplateController', {
                $scope: $scope,
                $modal: $modal,
                $location: $location,
                $rootScope: $rootScope,
                dispatchNewEvaluation: mockDispatchNewEvaluation
            });
        });

        it('should add a Course question to the evaluation template', function() {
            // Arrange:
            var numQuestions = $scope.evaluationTemplate.CourseQuestions.length;

            // Act:
            $scope.addCourseQuestion();

            // Assert:
            expect($modal.open.calls.mostRecent().args[0].resolve.typeOfQuestion())
                .toBe("courseQuestion");
            expect($scope.evaluationTemplate.CourseQuestions.length).toBe(numQuestions + 1);
            expect($modal.open).toHaveBeenCalled();
        });

        it('should add a Teacher question to the evaluation template', function() {
            // Arrange:
            var numQuestions = $scope.evaluationTemplate.TeacherQuestions.length;

            // Act:
            $scope.addTeacherQuestion();

            // Assert:
            expect($modal.open.calls.mostRecent().args[0].resolve.typeOfQuestion())
                .toBe("teacherQuestion");
            expect($scope.evaluationTemplate.TeacherQuestions.length).toBe(numQuestions + 1);
            expect($modal.open).toHaveBeenCalled();
        });

        it('should stop, no teacher questions, form is invalid', function() {
            // Act:
            $scope.addCourseQuestion();
            $scope.finishTemplate();

            // Assert:
            expect($scope.templateForm.teacherQuestions.$invalid).toBeTruthy();
            expect($scope.templateForm.$valid).not.toBeTruthy();
        });

        it('should stop, no course questions, form is invalid', function() {
            //Act:
            $scope.addTeacherQuestion();
            $scope.finishTemplate();

            // Assert:
            expect($scope.templateForm.courseQuestions.$invalid).toBeTruthy();
            expect($scope.templateForm.$valid).not.toBeTruthy();
        });

        it('should succeed in adding a new evaluation template.', function() {
            // Arrange:
            $scope.evaluationTemplate.Title = "SUCCESS";

            // Act:
            $scope.addTeacherQuestion();
            $scope.addCourseQuestion();
            $scope.finishTemplate();

            // Assert:
            expect($location.path).toHaveBeenCalledWith("/front-page-teacher");
            expect($scope.newEvaluationTemplateFail).toBeUndefined();
        });

        it('should fail in adding a new evaluation template.', function() {
            // Arrange:
            $scope.evaluationTemplate.Title = "ERROR";

            // Act:
            $scope.addTeacherQuestion();
            $scope.addCourseQuestion();
            $scope.finishTemplate();

            // Assert:
            expect($location.path).not.toHaveBeenCalled();
            expect($scope.newEvaluationTemplateFail).toBeTruthy();
        });
    });

    describe('canceling the template creation', function() {
        beforeEach(function() {
            spyOn($location, 'path');
            controller = $controller('NewEvaluationTemplateController', {
                $scope: $scope,
                $location: $location,
            });
        });

        it('should redirect the user', function() {
            // Act:
            $scope.cancel();

            // Assert:
            expect($location.path).toHaveBeenCalledWith("/front-page-teacher");
        });
    });
});
