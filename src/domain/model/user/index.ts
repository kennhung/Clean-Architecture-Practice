import { AggregateRoot } from "../../../types/aggregateRoot";
import { EntityId } from "../../../types/entityId";
import { Password } from "../password";

export class UserId extends EntityId<string> { };

export interface UserProps {
    email: string;
    name: string;
    password: Password;
}

export class User extends AggregateRoot<UserId, UserProps> {

    get name(): string {
        return this.props.name;
    }

    get email(): string {
        return this.props.email;
    }

    static createUser(params: { id: UserId, email: string, name: string, password: string }) {
        return new User(params.id, { name: params.name, email: params.email, password: new Password(params.password) });
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
