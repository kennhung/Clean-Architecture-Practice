import { nanoid } from "nanoid";
import { Id } from "../../domain/id";

export class CommandId extends Id<string> { };

export type CommandProps<T> = Omit<T, 'id'> & Partial<Command>;

export class Command {

    public readonly id: CommandId;

    constructor(props: CommandProps<unknown>) {
        this.id = props.id || new CommandId(nanoid());
    }

}
