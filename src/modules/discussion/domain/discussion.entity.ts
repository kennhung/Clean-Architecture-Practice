import { AggregateRoot } from "../../../types/domain/aggregateRoot";
import { Post, PostId } from "../../post/domain/post.entity";
import { UserId } from "../../user/domain/user.entity";
import { DiscussionId } from "./discussion.id";

export interface DiscussionProps {
    title: string;
    authorId: UserId;
    postAt: Date;
}

export class Discussion extends AggregateRoot<DiscussionId, DiscussionProps> {
    get title() {
        return this.props.title;
    }

    get authorId() {
        return this.props.authorId;
    }

    get postAt() {
        return this.props.postAt;
    }

    static createDiscussion(props: { id: DiscussionId, title: string, author: UserId, postAt?: Date }): Discussion {
        const postAt = props.postAt ?? new Date();

        return new Discussion(props.id, {
            title: props.title,
            authorId: props.author,
            postAt
        });
    }

    createPost(props: { id: PostId, content: string, author: UserId, postAt?: Date }): Post {
        const postAt = props.postAt ?? new Date();

        return new Post(props.id, {
            discussionId: this.id,
            authorId: props.author,
            content: props.content,
            postAt,
        })
    }
}
