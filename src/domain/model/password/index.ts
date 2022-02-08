import bcrypt from 'bcrypt';
import { ValueObject } from "../../../types/valueObject";

export interface PasswordProps {
    salt: string;
    password: string;
}

export class Password extends ValueObject<PasswordProps> {

    constructor(props: PasswordProps)
    constructor(plantPassword: string)
    constructor(plantPasswordOrProps: PasswordProps | string) {
        if (typeof plantPasswordOrProps == "string") {
            const salt = bcrypt.genSaltSync();

            const password = bcrypt.hashSync(plantPasswordOrProps, salt);

            super({
                salt, password
            });
        } else {
            super(plantPasswordOrProps);
        }
    }

    verify(password: string): boolean {
        const result = bcrypt.hashSync(password, this.props.salt);
        return result === this.props.password;
    }

}
