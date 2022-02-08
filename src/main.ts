import { CreateDiscussion } from "./application/discussion/createDiscussion";
import { RegisterUser } from "./application/user/registerUser";
import { InMemoryDiscussionRepository } from "./infrastructure/repository/discussion/inMemoryDiscussionRepository";
import { InMemoryPostRepository } from "./infrastructure/repository/post/inMemoryPostRepository";
import { InMemoryUserRepository } from "./infrastructure/repository/user/inMemoryUserRepository";

(async function () {
    const userRepo = new InMemoryUserRepository();
    const discussionRepo = new InMemoryDiscussionRepository();
    const postRepo = new InMemoryPostRepository();

    const regUser = new RegisterUser(userRepo);
    const regUserResult = await regUser.execute({ email: "test@test.com", name: "Kenn", password: "test" });

    console.log(regUserResult);

    const createDiscussion = new CreateDiscussion(discussionRepo, userRepo, postRepo);
    const createDiscussionResult = await createDiscussion.execute({
        title: "test",
        authorId: regUserResult.user.id,
        content: "test",
    });

    console.log(createDiscussionResult);
})();
