import { nanoid } from "nanoid";
import { GeneralInMemoryRepository } from "../../../infrastructure/repository/generalInMemoryRepository";
import { DiscussionRepository } from "../../../modules/discussion/repository/discussionRepository";
import { Discussion } from "../domain/discussion.entity";
import { DiscussionId } from "../domain/discussion.id";

export class InMemoryDiscussionRepository
    extends GeneralInMemoryRepository<DiscussionId, Discussion>
    implements DiscussionRepository {
    async nextId(): Promise<DiscussionId> {
        return new DiscussionId(nanoid());
    }
}
