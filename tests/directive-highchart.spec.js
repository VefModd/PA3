/*describe('directiveHighchart', function(){
    beforeEach(module('angularEvaluation'));

    beforeEach(inject(function(_$compile_, _$rootScope_, $templateCache){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $templateCache.put('src/html/directive-highchart.html',
            '<div id="chart"></div>');
        $scope.question = { OptionsResults: [{AnswerText: "Answer", Count: 3}] };
    }));

    it('...', function() {

        var element = $compile(
            "<highchart ng-model='question'></highchart>"
            )($scope);
        $rootScope.$digest();
        dump(element);
    });
});*/

// NOTE //
//
// jasmine-jquery dependencies were not working
// only jquery used to display charts and so we
// cannot complete the tests in this file!... <3
