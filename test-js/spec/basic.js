
describe("Basic Functions", function () {

    it("Exposes the master jsDip object", function () {
        expect(jsDip).toNotEqual(undefined);
    });
    
    it("Exposes the adjudicator", function () {
        expect(jsDip.adjudicator).toNotEqual(undefined);
    });
});