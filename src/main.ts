import { nanoid } from "nanoid";
import { CreateDiscussion, CreateDiscussionCommand } from "./application/commands/discussion/createDiscussion";
import { RegisterUser, RegisterUserCommand } from "./application/commands/user/registerUser";
import { InMemoryDiscussionRepository } from "./modules/discussion/repository/inMemoryDiscussionRepository";
import { InMemoryPostRepository } from "./modules/post/repository/inMemoryPostRepository";
import { InMemoryUserRepository } from "./modules/user/repository/inMemoryUserRepository";

(async function () {
    const userRepo = new InMemoryUserRepository();
    const discussionRepo = new InMemoryDiscussionRepository();
    const postRepo = new InMemoryPostRepository();

    const regUser = new RegisterUser(userRepo);
    const regUserResult = await regUser.execute(new RegisterUserCommand({
        email: "test@test.com",
        name: "Kenn",
        password: "test"
    }));

    console.log(regUserResult);

    const createDiscussion = new CreateDiscussion(discussionRepo, userRepo, postRepo);
    const createDiscussionResult = await createDiscussion.execute(new CreateDiscussionCommand({
        title: "test",
        authorId: regUserResult.user.id,
        content: "test",
    }));

    console.log(createDiscussionResult);
})();
