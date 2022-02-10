import { Discussion } from "../../../domain/model/discussion";
import { DiscussionRepository } from "../../../modules/discussion/repository/discussionRepository";
import { PostRepository } from "../../../modules/post/repository/postRepository";
import { UserId } from "../../../domain/model/user";
import { UserRepository } from "../../../modules/user/repository/userRepository";
import { Command, CommandProps } from "../../../types/application/command/command";
import { CommandHandler } from "../../../types/application/command/commandHandler";

export class CreateDiscussionCommand extends Command {
    readonly authorId: string;
    readonly title: string;
    readonly content: string;

    constructor(props: CommandProps<CreateDiscussionCommand>) {
        super(props);

        this.authorId = props.authorId;
        this.title = props.title;
        this.content = props.content;
    }
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
