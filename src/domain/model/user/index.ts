import { AggregateRoot } from "../../../types/aggregateRoot";
import { EntityId } from "../../../types/entityId";

export class UserId extends EntityId<string> { };

export interface UserProps {
    name: string;
}

export class User extends AggregateRoot<UserId, UserProps> {

    get name(): string {
        return this.props.name;
    }

    static createUser(params: { id: UserId, name: string }) {
        return new User(params.id, { name: params.name });
    }

    changeName(newName: string) {
        this.props.name = newName;
    }
}
