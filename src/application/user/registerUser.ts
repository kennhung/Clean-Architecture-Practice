import { nanoid } from 'nanoid';
import { User, UserId } from "../../domain/model/user";
import { UserRepository } from "../../domain/model/user/userRepository";
import { ApplicationService } from "../../types/applicationService";

interface RegisterUserInput {
    email: string;
    name: string;
    password: string;
}

interface UserDto {
    id: string;
    email: string;
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

        if (await this.userRepo.checkEmailUsed(input.email)) {
            throw new Error("Email used");
        }

        const newUser = User.createUser({
            id: new UserId(nanoid()),
            email: input.email,
            name: input.name,
            password: input.password
        });

        await this.userRepo.save(newUser);

        return {
            user: {
                id: newUser.id.toValue(),
                email: newUser.email,
                name: newUser.name,
            },
        }
    }

}
