import { DiscussionId } from "../../../domain/model/discussion/discussionId";
import { AggregateRoot } from "../../../types/domain/aggregateRoot";
import { EntityId } from "../../../types/domain/entityId";
import { UserId } from "../../user/domain/user.entity";

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
