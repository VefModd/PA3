describe('evaluationQuestion', function(){
    beforeEach(module('angularEvaluation'));

    beforeEach(inject(function(_$compile_, _$rootScope_, $templateCache){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $templateCache.put('src/html/directive-evaluation-question.html',
            '<div>TEMPLATE</div>');
    }));

    it('should create the directive with the template, required, undefined answers', function(){
        // Arrange:
        $scope.courseQuestion = { $$hashKey: "23" };

        // Act:
        var element = $compile(
            "<form name='answerEvaluationForm'>" +
                "<evaluation-question ng-model='courseQuestion' isrequired='true' >" +
            "</evaluation-question></form>")($scope);
        $rootScope.$digest();

        // Assert:
        var directiveScope = element.scope().$$childTail;
        expect(element.html()).toContain("TEMPLATE");
        expect(directiveScope.requiredCheck()).toBeTruthy();
        expect(directiveScope.isinValid()).toBeTruthy();
    });

    it('should create the directive with the template, required, empty answers', function(){
        // Arrange:
        $scope.courseQuestion = { $$hashKey: "23", answers: [] };

        // Act:
        var element = $compile(
            "<form name='answerEvaluationForm'>" +
                "<evaluation-question ng-model='courseQuestion' isrequired='true' >" +
            "</evaluation-question></form>")($scope);
        $rootScope.$digest();

        // Assert:
        var directiveScope = element.scope().$$childTail;
        expect(element.html()).toContain("TEMPLATE");
        expect(directiveScope.requiredCheck()).toBeTruthy();
        expect(directiveScope.isinValid()).toBeTruthy();
    });

    it('should create the directive with the template, required, answers', function(){
        // Arrange:
        $scope.courseQuestion = {
            $$hashKey: "23",
            answers: [{
                evaluationID: 1337,
                answer: "FAKE ANSWER"}]
        };

        // Act:
        var element = $compile(
            "<form name='answerEvaluationForm'>" +
                "<evaluation-question ng-model='courseQuestion' isrequired='true' >" +
            "</evaluation-question></form>")($scope);
        $rootScope.$digest();

        // Assert:
        var directiveScope = element.scope().$$childTail;
        expect(element.html()).toContain("TEMPLATE");
        expect(directiveScope.requiredCheck()).toBeTruthy();
        expect(directiveScope.isinValid()).not.toBeTruthy();
    });

    it('should create the directive with the template, not required', function(){
        // Arrange:
        $scope.courseQuestion = { $$hashKey: "23" };

        // Act:
        var element = $compile(
            "<form name='answerEvaluationForm'>" +
                "<evaluation-question ng-model='courseQuestion' isrequired='false' >" +
            "</evaluation-question></form>")($scope);
        $rootScope.$digest();

        // Assert:
        var directiveScope = element.scope().$$childTail;
        expect(element.html()).toContain("TEMPLATE");
        expect(directiveScope.requiredCheck()).not.toBeTruthy();
        expect(directiveScope.isinValid()).not.toBeTruthy();
    });
});
