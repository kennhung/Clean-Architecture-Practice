import { User, UserId } from ".";

export interface UserRepository {
    nextId(): Promise<UserId>;
    
    fromId(id: UserId): Promise<User | null>;
    save(user: User): Promise<void>;
}
