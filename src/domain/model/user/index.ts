import { AggregateRoot } from "../../../types/aggregateRoot";
import { EntityId } from "../../../types/entityId";
import { Password } from "../password";

export class UserId extends EntityId<string> { };

export interface UserProps {
    name: string;
    password: Password;
}

export class User extends AggregateRoot<UserId, UserProps> {

    get name(): string {
        return this.props.name;
    }

    static createUser(params: { id: UserId, name: string, password: string }) {


        return new User(params.id, { name: params.name, password: new Password(params.password) });
    }

    changeName(newName: string) {
        this.props.name = newName;
    }
}
