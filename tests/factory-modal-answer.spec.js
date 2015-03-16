describe('dispatchModalAnswer', function() {
    beforeEach(module('angularEvaluation'));

    var factory,
        url,
        template = "WOW SUCH FAKE";

    beforeEach(inject(function(dispatchModalAnswer, _$httpBackend_, _$rootScope_, _SERVER_URL_) {
        service = dispatchModalAnswer;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_
        url = _SERVER_URL_;
        $rootScope.data = { Token: "FAKETOKEN"};
    }));


    describe("retrieving course teachers", function() {

        it("should return the data", function() {

        // Constructing url regex to accept correct url formats
        var regex = new RegExp(url + "courses\/(T\-[0-9]{3}\-[a-zA-Z0-9]{4})\/[0-9]{5}\/teachers", "");

            $httpBackend.whenGET(regex, function(header) {
                expect(header.Authorization).toBe("Basic " + $rootScope.data.Token);
                return true;
            }).respond(template);

            service.getTeachers('T-101-WEPO', '20151').then(function(d) {
                // Success...
                expect(d.data).toBe(template);
            });

            $httpBackend.flush();
        });

        it("should fail to retrieve the data", function() {

        // Constructing url regex to accept correct url formats
        var regex = new RegExp(url + "courses\/(T\-[0-9]{3}\-[a-zA-Z0-9]{4})\/[0-9]{5}\/teachers", "");

            $httpBackend.whenGET(regex, function(header) {
                expect(header.Authorization).not.toBe("Basic WRONGTOKEN");
                return true;
            }).respond(500, { message: "An error has occurred." });

            service.getTeachers('T-101-WEPO', '20151').then(function(d) {
                // Success...
            }, function(e) {
                // Error...
                expect(e.status).toBe(500);
            });

            $httpBackend.flush();
        });
    });
});
