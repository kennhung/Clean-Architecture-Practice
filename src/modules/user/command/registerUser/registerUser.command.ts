import { Command, CommandProps } from "../../../../types/application/command/command";

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
