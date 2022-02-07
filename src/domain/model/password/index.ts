import crypto from 'crypto';
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
            const salt = crypto.randomBytes(128).toString("base64");

            const password = crypto.scryptSync(plantPasswordOrProps, salt, 64).toString("hex");

            super({
                salt, password
            });
        } else {
            super(plantPasswordOrProps);
        }
    }

    verify(password: string): boolean {
        const result = crypto.scryptSync(password, this.props.salt, 64).toString("hex");
        return result === this.props.password;
    }

}
