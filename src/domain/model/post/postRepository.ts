import { Post, PostId } from ".";

export interface PostRepository {
    nextId(): Promise<PostId>;

    fromId(id: PostId): Promise<Post | null>;
    save(post: Post): Promise<void>;
}
