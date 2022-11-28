import { UserDto } from "../../dtos/user.dto";
import { FindUserQuery } from "./findUser.query";
import { QueryHandler } from "../../../../types/application/query/queryHandler"
import { UserRepository } from "../../repository/userRepository";
import { UserId } from "../../domain/user.entity";

type findUserQueryResult = UserDto | undefined;

export class FindUserQueryHandler implements QueryHandler<FindUserQuery, findUserQueryResult> {
    constructor(private userRepo: UserRepository) { }

    async execute(input: FindUserQuery): Promise<findUserQueryResult> {
        const { userId } = input;
        
        const result = await this.userRepo.fromId(new UserId(userId));

        if (result) {
            return new UserDto(result);
        }

        return undefined;
    }
}
