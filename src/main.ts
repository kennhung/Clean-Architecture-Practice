import { RegisterUser } from "./application/user/registerUser";
import { InMemoryUserRepository } from "./infrastructure/repository/user/inMemoryUserRepository";

(async function () {
    const userRepo = new InMemoryUserRepository();

    const regUser = new RegisterUser(userRepo);

    const result = await regUser.execute({ name: "Kenn", password: "test" });

    console.log(result);

    
})();
