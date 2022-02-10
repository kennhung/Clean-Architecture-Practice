import { CreateDiscussion, CreateDiscussionCommand } from "./application/discussion/createDiscussion";
import { RegisterUser, RegisterUserCommand } from "./application/user/registerUser";
import { InMemoryDiscussionRepository } from "./infrastructure/repository/discussion/inMemoryDiscussionRepository";
import { InMemoryPostRepository } from "./infrastructure/repository/post/inMemoryPostRepository";
import { InMemoryUserRepository } from "./infrastructure/repository/user/inMemoryUserRepository";

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
