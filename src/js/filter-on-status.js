angular.module("angularEvaluation").filter("isStatus",
    function() {
        return function(evaluations, status) {
            var out = [];

            for(var i = 0; i < evaluations.length; i++) {
                if(evaluations[i].Status === status) {
                    out.push(evaluations[i]);
                }
            }
            return out;
        };
    });
