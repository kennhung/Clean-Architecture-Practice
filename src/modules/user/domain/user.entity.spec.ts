import { UserRoleType } from "./userRoleType";
import { User, UserId } from "./user.entity";

describe('User register', () => {
    const defaultProps = {
        id: new UserId("testId"),
        name: "john doe",
        email: "john@test.com",
        password: "test123",
        role: UserRoleType.Admin,
    }

    it('should pass', () => {
        const props = {
            ...defaultProps,
        }

        const user = User.createUser(props);

        expect(user.id.equals(props.id)).toBeTruthy();
        expect(user.name).toBe(props.name);
        expect(user.email).toBe(props.email);
        expect(user.password.verify(props.password)).toBeTruthy();
    });
});
