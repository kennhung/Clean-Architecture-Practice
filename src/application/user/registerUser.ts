import { nanoid } from 'nanoid';
import { User, UserId } from "../../domain/model/user";
import { UserRepository } from "../../domain/model/user/userRepository";
import { ApplicationService } from "../../types/applicationService";

interface RegisterUserInput {
    name: string;
}

interface UserDto {
    name: string;
}

interface RegisterUserOutput {
    user: UserDto;
}

export class RegisterUser implements ApplicationService<RegisterUserInput, RegisterUserOutput> {

    private userRepo: UserRepository;

    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo;
    }

    async execute(input: RegisterUserInput): Promise<RegisterUserOutput> {

        const newUser = User.createUser({ id: new UserId(nanoid()), name: input.name });

        await this.userRepo.save(newUser);

        return {
            user: {
                name: newUser.name,
            },
        }
    }

}
