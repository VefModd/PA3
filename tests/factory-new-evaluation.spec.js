describe('dispatchNewEvaluation', function() {
    beforeEach(module('angularEvaluation'));

    beforeEach(inject(function(dispatchNewEvaluation, _$httpBackend_, _SERVER_URL_, _$rootScope_) {
        service = dispatchNewEvaluation;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        SERVER_URL = _SERVER_URL_;
    }));

    describe("adding new evaluation template", function() {
        it("should return ok 200", function() {

            $rootScope.data = { Token: "FAKETOKEN"};

            var post = {
                Title: "Fake",
                TitleEN: "FakeEN",
                IntroText: "Intro",
                IntroTextEN: "IntroEN",
                CourseQuestions: [ { question: "Answer" } ],
                TeacherQuestions: [ { question: "Teacher" } ]
            }

            $httpBackend.when("POST", SERVER_URL + "evaluationtemplates", function (postdata) {
                var data = JSON.parse(postdata);
                expect(data.Title).toBe(post.Title);
                expect(data.TitleEN).toBe(post.TitleEN);
                expect(data.IntroText).toBe(post.IntroText);
                expect(data.IntroTextEN).toBe(post.IntroTextEN);
                expect(data.CourseQuestions.length).toBe(1);
                expect(data.TeacherQuestions.length).toBe(1);
                return true;
            }).respond(200, true);

            service.newEvaluationTemplate(post).then(function(d) {
                expect(d).toBeTruthy();
            });

            $httpBackend.flush();
        });
    });
});
