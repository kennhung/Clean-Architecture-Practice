import { nanoid } from "nanoid";
import { UserId, User } from "../../../domain/model/user";
import { UserRepository } from "../../../domain/model/user/userRepository";

export class InMemoryUserRepository implements UserRepository {
    private users: User[] = [];

    async nextId(): Promise<UserId> {
        return new UserId(nanoid());
    }

    private fromIdGetIndex(id: UserId): number {
        return this.users.findIndex((user: User) => user.id.equals(id));
    }

    async fromId(id: UserId): Promise<User | null> {
        const index = this.fromIdGetIndex(id);
        return index === -1 ? null : this.users[index];
    }

    async save(user: User): Promise<void> {
        const index = this.fromIdGetIndex(user.id);
        if (index == -1) {
            this.users.concat(user);
        } else {
            this.users[index] = user;
        }
    }

}
