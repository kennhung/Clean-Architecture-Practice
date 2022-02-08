import { User, UserId } from ".";

export interface UserRepository {
    nextId(): Promise<UserId>;
    checkEmailUsed(email: string): Promise<boolean>;

    fromId(id: UserId): Promise<User | null>;
    save(user: User): Promise<void>;
}
