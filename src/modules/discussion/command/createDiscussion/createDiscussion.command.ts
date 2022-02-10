import { Command, CommandProps } from "../../../../types/application/command/command";

export class CreateDiscussionCommand extends Command {
    readonly authorId: string;
    readonly title: string;
    readonly content: string;

    constructor(props: CommandProps<CreateDiscussionCommand>) {
        super(props);

        this.authorId = props.authorId;
        this.title = props.title;
        this.content = props.content;
    }
}
