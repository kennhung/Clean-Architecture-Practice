import { Discussion } from "../../domain/model/discussion";
import { DiscussionRepository } from "../../domain/model/discussion/discussionRepository";
import { PostRepository } from "../../domain/model/post/postRepository";
import { UserId } from "../../domain/model/user";
import { UserRepository } from "../../domain/model/user/userRepository";
import { ApplicationService } from "../../types/applicationService";

interface CreateDiscussionInput {
    authorId: string;
    title: string;
    content: string;
}

interface DiscussionDto {
    id: string;
    title: string;
    authorId: string;
}

interface PostDto {
    id: string;
    content: string;
    authroId: string;
}

interface CreateDiscussionOutput {
    discussion: DiscussionDto;
    post: PostDto;
}

export class CreateDiscussion implements ApplicationService<CreateDiscussionInput, CreateDiscussionOutput> {
    private discussionRepo: DiscussionRepository;
    private userRepo: UserRepository;
    private postRepo: PostRepository;

    constructor(disscussionRepo: DiscussionRepository, userRepo: UserRepository, postRepo: PostRepository) {
        this.discussionRepo = disscussionRepo;
        this.userRepo = userRepo;
        this.postRepo = postRepo;
    }

    async execute(input: CreateDiscussionInput): Promise<CreateDiscussionOutput> {
        const author = await this.userRepo.fromId(new UserId(input.authorId));
        if (!author) {
            throw new Error("author not found");
        }

        const discussion = Discussion.createDiscussion({
            id: await this.discussionRepo.nextId(),
            title: input.title,
            author: author.id,
        });

        const post = discussion.createPost({
            id: await this.postRepo.nextId(),
            content: input.content,
            author: author.id,
        });

        await this.discussionRepo.save(discussion);
        await this.postRepo.save(post);

        return {
            discussion: {
                id: discussion.id.toValue(),
                title: discussion.title,
                authorId: discussion.authorId.toValue(),
            },
            post: {
                id: post.id.toValue(),
                content: post.content,
                authroId: post.authorId.toValue(),
            }
        }
    }
}
