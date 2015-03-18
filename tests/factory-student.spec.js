describe('dispatchStudent', function() {
    beforeEach(module('angularEvaluation'));

    var factory,
        regex,
        template = "WOW SUCH FAKE";

    beforeEach(inject(function(dispatchStudent, _$httpBackend_, _$rootScope_, _SERVER_URL_) {
        service = dispatchStudent;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_
        SERVER_URL = _SERVER_URL_;
        $rootScope.data = { Token: "FAKETOKEN"};
        // Constructing url regex to accept correct url formats
        regex = new RegExp(SERVER_URL +
            "courses\/(T\-[0-9]{3}\-[a-zA-Z0-9]{4})\/[0-9]{5}\/evaluations\/[0-9]+", "");
    }));

    describe("retrieving student cources", function() {
        it("should return the data", function() {

            $httpBackend.whenGET(SERVER_URL + "my/courses", function(header) {
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

            $httpBackend.whenGET(SERVER_URL + "my/courses", function(header) {
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

            $httpBackend.whenGET(SERVER_URL + "my/evaluations", function(header) {
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

            $httpBackend.whenGET(SERVER_URL + "my/evaluations", function(header) {
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

    describe("posting answers to server", function() {
        it("should return ok 200", function() {

            var answers = [{
                QuestionID: 123,
                TeacherSSN: "1234567890",
                Value: "ANSWER"
            }]

            $httpBackend.when("POST", regex, function (postdata) {
                var data = JSON.parse(postdata)[0];
                expect(data.QuestionID).toBe(answers[0].QuestionID);
                expect(data.TeacherSSN).toBe(answers[0].TeacherSSN);
                expect(data.Value).toBe(answers[0].Value);
                return true;
            }).respond(200, true);

            service.saveAnswer('T-101-WEPO', '20151', 1337, answers).then(function(d) {
                expect(d).toBeTruthy();
            });

            $httpBackend.flush();
        });
    });
});
