describe('dispatchTeacher', function() {
    beforeEach(module('angularEvaluation'));

    var factory,
        $httpBackend,
        $rootScope,
        url,
        template = "WOW SUCH FAKE";

    beforeEach(inject(function(dispatchTeacher, _$httpBackend_, _$rootScope_, _SERVER_URL_) {
        service = dispatchTeacher;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_
        url = _SERVER_URL_;
    }));

    describe("retrieving evaluation templates", function() {
        it("should return the data", function() {
            $rootScope.data = { Token: "FAKETOKEN"};

            $httpBackend.whenGET(url + "evaluationtemplates", function(header) {
                expect(header.Authorization).toBe("Basic " + $rootScope.data.Token);
                return true;
            }).respond(template);

            service.evaluationTemplates().then(function(d) {
                expect(d.data).toBe(template);
            });

            $httpBackend.flush();
        });

        it("should fail!", function() {
            $rootScope.data = { Token: "FAKETOKEN"};

            $httpBackend.whenGET(url + "evaluationtemplates", function(header) {
                expect(header.Authorization).not.toBe("Basic WRONGTOKEN");
                return true;
            }).respond(500, { message: "An error has occurred." });

            service.evaluationTemplates().then(function(d) {
                dump("Heyhey", d);
            }, function(e) {
                expect(e.status).toBe(500);
            });

            $httpBackend.flush();
        });
    });

    describe("retrieving evaluatios", function() {
        it("should return the data", function() {
            $rootScope.data = { Token: "FAKETOKEN"};

            $httpBackend.whenGET(url + "evaluations", function(header) {
                expect(header.Authorization).toBe("Basic " + $rootScope.data.Token);
                return true;
            }).respond(template);

            service.evaluations().then(function(d) {
                expect(d.data).toBe(template);
            });

            $httpBackend.flush();
        });

        it("should fail!", function() {
            $rootScope.data = { Token: "FAKETOKEN"};

            $httpBackend.whenGET(url + "evaluations", function(header) {
                expect(header.Authorization).not.toBe("Basic WRONGTOKEN");
                return true;
            }).respond(500, { message: "An error has occurred." });

            service.evaluations().then(function(d) {
                dump("Heyhey", d);
            }, function(e) {
                expect(e.status).toBe(500);
            });

            $httpBackend.flush();
        });
    });

    describe("adding new evaluation", function() {
        it("should return ok 200", function() {

            $rootScope.data = { Token: "FAKETOKEN"};

            var post = {
                TemplateID: 1337,
                StartDate: Date.parse(new Date()),
                EndDate: Date.parse(new Date())
            }

            $httpBackend.when("POST", url + "evaluations", function (postdata) {
                var data = JSON.parse(postdata);
                expect(data.TemplateID).toBe(post.TemplateID);
                expect(data.StartDate).toBe(post.StartDate);
                expect(data.EndDate).toBe(post.EndDate);
                return true;
            }).respond(200, true);

            service.addEvaluation(post).then(function(d) {
                expect(d).toBeTruthy();
            });

            $httpBackend.flush();
        });
    });
});
