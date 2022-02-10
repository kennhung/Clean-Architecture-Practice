import { nanoid } from "nanoid";
import { GeneralInMemoryRepository } from "../../../infrastructure/repository/generalInMemoryRepository";
import { PostRepository } from "../../../modules/post/repository/postRepository";
import { Post, PostId } from "../domain/post.entity";

export class InMemoryPostRepository
    extends GeneralInMemoryRepository<PostId, Post>
    implements PostRepository {
    async nextId(): Promise<PostId> {
        return new PostId(nanoid());
    }
}
