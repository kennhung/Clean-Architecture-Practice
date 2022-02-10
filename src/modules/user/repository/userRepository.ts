import { User, UserId } from "../domain/user.entity";

export interface UserRepository {
    nextId(): Promise<UserId>;
    checkEmailUsed(email: string): Promise<boolean>;

    fromId(id: UserId): Promise<User | null>;
    save(user: User): Promise<void>;
}
