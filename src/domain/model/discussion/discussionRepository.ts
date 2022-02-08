import { Discussion } from ".";
import { DiscussionId } from "./discussionId";

export interface DiscussionRepository {
    nextId(): Promise<DiscussionId>;

    fromId(id: DiscussionId): Promise<Discussion | null>;
    save(discussion: Discussion): Promise<void>;
}
