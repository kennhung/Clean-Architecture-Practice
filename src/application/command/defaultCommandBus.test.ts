import { Command, CommandProps } from "../../types/application/command/command";
import { CommandHandler } from "../../types/application/command/commandHandler";
import { DefaultCommandBus } from "./defaultCommandBus";

describe('Default Command Bus', () => {
    const commandBus = new DefaultCommandBus();

    class TestCommand1 extends Command {
        readonly a: number;
        readonly b: number;

        constructor(props: CommandProps<TestCommand1>) {
            super(props);
            this.a = props.a;
            this.b = props.b;
        }
    }

    class TestCommand1Handler implements CommandHandler<TestCommand1, number> {
        async execute(input: TestCommand1): Promise<number> {
            return input.a + input.b;
        }
    }

    class TestCommand2 extends Command {
        readonly a: number;
        readonly b: number;

        constructor(props: CommandProps<TestCommand1>) {
            super(props);
            this.a = props.a;
            this.b = props.b;
        }
    }

    class TestCommand2Handler implements CommandHandler<TestCommand2, number> {
        async execute(input: TestCommand1): Promise<number> {
            return input.a - input.b;
        }
    }

    commandBus.register("TestCommand1", new TestCommand1Handler());
    commandBus.register(TestCommand2, new TestCommand2Handler());

    it('should execute the correct handler', async () => {
        const command1 = new TestCommand1({ a: 1, b: 2 });
        const result1 = await commandBus.execute(command1);

        expect(result1).toBe(3);

        const command2 = new TestCommand2({ a: 1, b: 2 });
        const result2 = await commandBus.execute(command2);

        expect(result2).toBe(-1);
    });
});
