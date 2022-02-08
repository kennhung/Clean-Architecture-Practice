import { Password } from ".";

describe("Password VO", () => {

    it("should looks different when password is same", () => {
        const password1 = new Password("test");
        const password2 = new Password("test");

        expect(password1.equals(password2)).toBeFalsy();
    });

    describe("verify", () => {
        it("should pass if password match", () => {
            const password = new Password("test");

            expect(password.verify("test")).toBeTruthy();
        });
    });

});
