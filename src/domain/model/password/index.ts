import bcrypt from 'bcrypt';
import { ValueObject } from "../../../types/valueObject";

export interface PasswordProps {
    password: string;
}

export class Password extends ValueObject<PasswordProps> {

    constructor(props: PasswordProps)
    constructor(plantPassword: string)
    constructor(plantPasswordOrProps: PasswordProps | string) {
        if (typeof plantPasswordOrProps == "string") {
            const password = bcrypt.hashSync(plantPasswordOrProps, 10);

            super({
                password
            });
        } else {
            super(plantPasswordOrProps);
        }
    }

    verify(password: string): boolean {
        return bcrypt.compareSync(password, this.props.password);
    }

}
