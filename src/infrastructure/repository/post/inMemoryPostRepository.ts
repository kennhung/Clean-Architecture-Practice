import { nanoid } from "nanoid";
import { Post, PostId } from "../../../domain/model/post";
import { PostRepository } from "../../../domain/model/post/postRepository";
import { GeneralInMemoryRepository } from "../generalInMemoryRepository";

export class InMemoryPostRepository
    extends GeneralInMemoryRepository<PostId, Post>
    implements PostRepository {
    async nextId(): Promise<PostId> {
        return new PostId(nanoid());
    }
}
