import { CommandHandler } from "../../../../types/application/command/commandHandler";
import { PostDto } from "../../../post/dtos/post.dto";
import { PostRepository } from "../../../post/repository/postRepository";
import { UserId } from "../../../user/domain/user.entity";
import { UserRepository } from "../../../user/repository/userRepository";
import { Discussion } from "../../domain/discussion.entity";
import { DiscussionDto } from "../../dtos/discussion.dto";
import { DiscussionRepository } from "../../repository/discussionRepository";
import { CreateDiscussionCommand } from "./createDiscussion.command";

interface CreateDiscussionCommandOutput {
    discussion: DiscussionDto;
    post: PostDto;
}

export class CreateDiscussion implements CommandHandler<CreateDiscussionCommand, CreateDiscussionCommandOutput> {
    private discussionRepo: DiscussionRepository;
    private userRepo: UserRepository;
    private postRepo: PostRepository;

    constructor(disscussionRepo: DiscussionRepository, userRepo: UserRepository, postRepo: PostRepository) {
        this.discussionRepo = disscussionRepo;
        this.userRepo = userRepo;
        this.postRepo = postRepo;
    }

    async execute(input: CreateDiscussionCommand): Promise<CreateDiscussionCommandOutput> {
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
