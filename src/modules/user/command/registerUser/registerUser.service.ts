import { nanoid } from 'nanoid';
import { UserRepository } from "../../repository/userRepository";
import { UserRoleType } from '../../domain/userRoleType';
import { User, UserId } from '../../domain/user.entity';
import { CommandHandler } from '../../../../types/application/command/commandHandler';
import { RegisterUserCommand } from './registerUser.command';
import { UserDto } from '../../dtos/user.dto';

interface RegisterUserCommandOutput {
    user: UserDto;
}

export class RegisterUser implements CommandHandler<RegisterUserCommand, RegisterUserCommandOutput> {

    private userRepo: UserRepository;

    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo;
    }

    async execute(input: RegisterUserCommand): Promise<RegisterUserCommandOutput> {

        if (await this.userRepo.checkEmailUsed(input.email)) {
            throw new Error("Email used");
        }

        const newUser = User.createUser({
            id: new UserId(nanoid()),
            email: input.email,
            name: input.name,
            password: input.password,
            role: UserRoleType.Admin
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
