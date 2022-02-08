import { AggregateRoot } from "../../../types/aggregateRoot";
import { EntityId } from "../../../types/entityId";
import { DiscussionId } from "../discussion/discussionId";
import { UserId } from "../user";

export class PostId extends EntityId<string> { }

export interface PostProps {
    discussionId: DiscussionId;
    content: string;
    authorId: UserId;
    postAt: Date;
}

export class Post extends AggregateRoot<PostId, PostProps> {
    get discussionId() {
        return this.props.discussionId;
    }

    get content() {
        return this.props.content;
    }

    get authorId() {
        return this.props.authorId;
    }

    get postAt() {
        return this.props.postAt;
    }
    
}
