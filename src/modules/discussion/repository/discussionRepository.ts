import { Discussion } from "../domain/discussion.entity";
import { DiscussionId } from "../domain/discussion.id";

export interface DiscussionRepository {
    nextId(): Promise<DiscussionId>;

    fromId(id: DiscussionId): Promise<Discussion | null>;
    save(discussion: Discussion): Promise<void>;
}
