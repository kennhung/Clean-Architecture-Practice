import { nanoid } from "nanoid";
import { GeneralInMemoryRepository } from "../../../infrastructure/repository/generalInMemoryRepository";
import { UserRepository } from "../../../modules/user/repository/userRepository";
import { User, UserId } from "../domain/user.entity";

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
