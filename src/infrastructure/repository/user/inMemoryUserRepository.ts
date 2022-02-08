import { nanoid } from "nanoid";
import { UserId, User } from "../../../domain/model/user";
import { UserRepository } from "../../../domain/model/user/userRepository";
import { GeneralInMemoryRepository } from "../generalInMemoryRepository";

export class InMemoryUserRepository
    extends GeneralInMemoryRepository<UserId, User>
    implements UserRepository {

    async nextId(): Promise<UserId> {
        return new UserId(nanoid());
    }

    async checkEmailUsed(email: string): Promise<boolean> {
        return this.dataArr.findIndex((user) => user.email === email) !== -1;
    }

}
