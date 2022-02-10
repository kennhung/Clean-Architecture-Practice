import { UserRoleType } from "./userRoleType";
import { AggregateRoot } from "../../../types/domain/aggregateRoot";
import { EntityId } from "../../../types/domain/entityId";
import { Password } from "./password.value-object";

export class UserId extends EntityId<string> { };

export interface UserProps {
    email: string;
    name: string;
    password: Password;
    role: UserRoleType;
}

export class User extends AggregateRoot<UserId, UserProps> {

    get name(): string {
        return this.props.name;
    }

    get email(): string {
        return this.props.email;
    }

    get password(): Password {
        return this.props.password;
    }

    static createUser(params: { id: UserId, email: string, name: string, password: string, role: UserRoleType }) {
        return new User(params.id, {
            name: params.name,
            email: params.email,
            password: new Password(params.password),
            role: params.role,
        });
    }

    changeName(newName: string) {
        this.props.name = newName;
    }

    changePassword(newPassword: string) {
        this.props.password = new Password(newPassword);
    }

    changeEmail(newEmail: string) {
        this.props.email = newEmail;
    }
}
