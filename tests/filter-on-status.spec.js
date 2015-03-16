describe('isStatus', function(){
    beforeEach(function () {
        module('angularEvaluation');
        inject(function (_$filter_) {
            $filter = _$filter_;
        });
    });
    it('should filter fakeEval correctly', function(){
        //Arrange:
        var fakeEval = [], result = [];
        for(var i = 0; i < 10; i++){
            if(i % 2 === 1) fakeEval.push({Status: 'bla'});
            else fakeEval.push({Status: 'kalli'});
        }
        //Act:
        result = $filter('isStatus')(fakeEval, 'bla');
        //Assert:
        expect(result.length).toBe(5);
        expect(result[3].Status).toBe('bla');
        expect(result[2].Status).not.toBe('kalli');
    });
});
