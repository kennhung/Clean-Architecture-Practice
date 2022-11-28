import { Query } from "../../../../types/application/query/query";
import { RequireField } from "../../../../types/requireField";
import { UserId } from "../../domain/user.entity";

export class FindUserQuery extends Query {

    constructor(props: FindUserQuery) {
        super();

        this.userId = props.userId;
    }

    readonly userId: string;
}

