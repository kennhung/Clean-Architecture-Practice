import { nanoid } from 'nanoid';
import { UserRepository } from "../../../modules/user/repository/userRepository";
import { UserRoleType } from '../../../modules/user/domain/userRoleType';
import { User, UserId } from '../../../modules/user/domain/user.entity';
import { Command, CommandProps } from '../../../types/application/command/command';
import { CommandHandler } from '../../../types/application/command/commandHandler';

export class RegisterUserCommand extends Command {
    readonly email: string;
    readonly name: string;
    readonly password: string;

    constructor(props: CommandProps<RegisterUserCommand>) {
        super(props);

        this.email = props.email;
        this.name = props.name;
        this.password = props.password;
    }
}

interface UserDto {
    id: string;
    email: string;
    name: string;
}

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
