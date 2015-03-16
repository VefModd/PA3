describe('dispatchStudent', function() {
    beforeEach(module('angularEvaluation'));

    var factory,
        url,
        template = "WOW SUCH FAKE";

    beforeEach(inject(function(dispatchStudent, _$httpBackend_, _$rootScope_, _SERVER_URL_) {
        service = dispatchStudent;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_
        url = _SERVER_URL_;
        $rootScope.data = { Token: "FAKETOKEN"};
    }));

    describe("retrieving student cources", function() {
        it("should return the data", function() {

            $httpBackend.whenGET(url + "my/courses", function(header) {
                expect(header.Authorization).toBe("Basic " + $rootScope.data.Token);
                return true;
            }).respond(template);

            service.myCourses().then(function(d) {
                // Success...
                expect(d.data).toBe(template);
            });

            $httpBackend.flush();
        });

        it("should fail to retrieve the data", function() {

            $httpBackend.whenGET(url + "my/courses", function(header) {
                expect(header.Authorization).not.toBe("Basic WRONGTOKEN");
                return true;
            }).respond(500, { message: "An error has occurred." });

            service.myCourses().then(function(d) {
                // Success...
            }, function(e) {
                // Error...
                expect(e.status).toBe(500);
            });

            $httpBackend.flush();
        });
    });

    describe("retrieving student evaluations", function() {
        it("should return the data", function() {

            $httpBackend.whenGET(url + "my/evaluations", function(header) {
                expect(header.Authorization).toBe("Basic " + $rootScope.data.Token);
                return true;
            }).respond(template);

            service.myEvaluations().then(function(d) {
                // Success...
                expect(d.data).toBe(template);
            });

            $httpBackend.flush();
        });

        it("should fail to retrieve the data", function() {

            $httpBackend.whenGET(url + "my/evaluations", function(header) {
                expect(header.Authorization).not.toBe("Basic WRONGTOKEN");
                return true;
            }).respond(500, { message: "An error has occurred." });

            service.myEvaluations().then(function(d) {
                // Success...
            }, function(e) {
                // Error...
                expect(e.status).toBe(500);
            });

            $httpBackend.flush();
        });
    });

    describe("retrieving student evaluation", function() {

        it("should return the data", function() {

        // Constructing url regex to accept correct url formats
        var regex = new RegExp(url + "courses\/(T\-[0-9]{3}\-[a-zA-Z0-9]{4})\/[0-9]{5}\/evaluations\/[0-9]+", "");

            $httpBackend.whenGET(regex, function(header) {
                expect(header.Authorization).toBe("Basic " + $rootScope.data.Token);
                return true;
            }).respond(template);

            service.getEvaluation('T-101-WEPO', '20151', 1337).then(function(d) {
                // Success...
                expect(d.data).toBe(template);
            });

            $httpBackend.flush();
        });

        it("should fail to retrieve the data", function() {

        // Constructing url regex to accept correct url formats
        var regex = new RegExp(url + "courses\/(T\-[0-9]{3}\-[a-zA-Z0-9]{4})\/[0-9]{5}\/evaluations\/[0-9]+", "");

            $httpBackend.whenGET(regex, function(header) {
                expect(header.Authorization).not.toBe("Basic WRONGTOKEN");
                return true;
            }).respond(500, { message: "An error has occurred." });

            service.getEvaluation('T-101-WEPO', '20151', 1337).then(function(d) {
                // Success...
            }, function(e) {
                // Error...
                expect(e.status).toBe(500);
            });

            $httpBackend.flush();
        });
    });

    describe("retrieving student evaluation results by id", function() {

        it("should return the data", function() {

        // Constructing url regex to accept correct url formats
        var regex = new RegExp(url + "evaluations\/[0-9]+", "");

            $httpBackend.whenGET(regex, function(header) {
                expect(header.Authorization).toBe("Basic " + $rootScope.data.Token);
                return true;
            }).respond(template);

            service.getEvaluationResultsById(1337).then(function(d) {
                // Success...
                expect(d.data).toBe(template);
            });

            $httpBackend.flush();
        });

        it("should fail to retrieve the data", function() {

        // Constructing url regex to accept correct url formats
        var regex = new RegExp(url + "evaluations\/[0-9]+", "");

            $httpBackend.whenGET(regex, function(header) {
                expect(header.Authorization).not.toBe("Basic WRONGTOKEN");
                return true;
            }).respond(500, { message: "An error has occurred." });

            service.getEvaluationResultsById(1337).then(function(d) {
                // Success...
            }, function(e) {
                // Error...
                expect(e.status).toBe(500);
            });

            $httpBackend.flush();
        });
    });
});
