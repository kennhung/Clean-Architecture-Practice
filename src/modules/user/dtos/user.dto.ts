import { User } from "../domain/user.entity";

export class UserDto {

    constructor(userEntityOrDto: User | UserDto) {
        if (userEntityOrDto instanceof User) {
            this.id = userEntityOrDto.id.toValue();
            this.email = userEntityOrDto.email;
            this.name = userEntityOrDto.name;
        } else {
            this.id = userEntityOrDto.id;
            this.email = userEntityOrDto.email;
            this.name = userEntityOrDto.name;
        }
    }

    id: string;
    email: string;
    name: string;
}
