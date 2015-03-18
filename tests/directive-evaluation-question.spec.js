describe('evaluationQuestion', function(){
    beforeEach(module('angularEvaluation'));

    var $compile, $rootScope;

    beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
    }));
    
    it('...', function(){
        $httpBackend.whenGET('src/html/directive-evaluation-question.html').respond({data: 'bla'});
        var element = $compile("<evaluation-question></evaluation-question>")($rootScope);
        $rootScope.$digest();
        
    });
});
