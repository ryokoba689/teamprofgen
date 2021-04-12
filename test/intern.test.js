const Intern = require("../Library/Intern");

test("Can set school via constructor", () => {
    const testValue = "UW";
    const e = new Intern("Brian", 1, "test@test.com", testValue, "Intern");
    expect(e.school).toBe(testValue);
});

test("getRole() should return \"Intern\"", () => {
    const testValue = "Intern";
    const e = new Intern("Brian", 1, "test@test.com", "UCLA", "Intern");
    expect(e.getRole()).toBe(testValue);
});

test("Can get school via getSchool()", () => {
    const testValue = "UW";
    const e = new Intern("Brian", 1, "test@test.com", testValue, "Intern");
    expect(e.getSchool()).toBe(testValue);
});
