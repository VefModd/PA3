describe('filter', function(){
    beforeEach(module('angularEvaluation'));

    describe('isStatus', function(){
        var $filter;

        beforeEach(function () {
            module('isStatus');
            inject(function (_$filter_) {
                $filter = _$filter_;
            });
        });

        it('should...', function(){
            //Arrange:
            var fakeEval = [], result = [];
            for(var i = 0; i < 10; i++){
                if(i % 2 === 1) fakeEval.status = 'bla';
                else fakeEval.status = 'kalli';
            }
            //Act:
            result = $filter('isStatus')(fakeEval, 'bla');
            //Assert:
            expect(result.size).toBe(5);
        });
    });
});
