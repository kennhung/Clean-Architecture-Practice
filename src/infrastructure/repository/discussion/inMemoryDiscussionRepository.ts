import { nanoid } from "nanoid";
import { Discussion } from "../../../domain/model/discussion";
import { DiscussionId } from "../../../domain/model/discussion/discussionId";
import { DiscussionRepository } from "../../../domain/model/discussion/discussionRepository";
import { GeneralInMemoryRepository } from "../generalInMemoryRepository";

export class InMemoryDiscussionRepository
    extends GeneralInMemoryRepository<DiscussionId, Discussion>
    implements DiscussionRepository {
    async nextId(): Promise<DiscussionId> {
        return new DiscussionId(nanoid());
    }
}
