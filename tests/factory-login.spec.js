describe('dispatchLogin', function() {
    beforeEach(module('angularEvaluation'));

    var factory,
        $httpBackend;

    beforeEach(inject(function(dispatchLogin, _$httpBackend_) {
        service = dispatchLogin;
        $httpBackend = _$httpBackend_;
    }));

    describe("log me in", function() {
        it("should return ok 200", function() {

            var post = {
                user: "dabs",
                pass: "123456"
            }

            $httpBackend.when("POST", "http://dispatch.ru.is/h09/api/v1/login", function (postdata) {
                expect(JSON.parse(postdata).user).toBe(post.user);
                expect(JSON.parse(postdata).pass).toBe(post.pass);
                return true;
            }).respond(200, true);

            service.login(post.user, post.pass).then(function(d) {
                expect(d).toBeTruthy();
            });

            $httpBackend.flush();
        });
    });

});
