import { Command } from "../../types/application/command/command";
import { CommandBus } from "../../types/application/command/commandBus";
import { CommandHandler } from "../../types/application/command/commandHandler";

export class DefaultCommandBus implements CommandBus {
    private handlers = new Map<string, CommandHandler<Command, any>>();

    execute<T extends Command, R = any>(command: T): Promise<R> {
        const commandType = Object.getPrototypeOf(command).constructor;

        const handler = this.handlers.get(commandType.name);

        if (!handler) {
            throw new Error("no handler for command");
        }

        return handler.execute(command);
    }

    register<T extends Command>(id: string, handler: CommandHandler<Command, any>): void;
    register<T extends Command>(constructor: (new (...props: any[]) => T), handler: CommandHandler<Command, any>): void;
    register<T extends Command>(idOrConstructor: string | (new (...props: any[]) => T), handler: CommandHandler<Command, any>): void {
        if (typeof idOrConstructor === "string")
            this.handlers.set(idOrConstructor, handler);
        else {
            this.handlers.set(idOrConstructor.name, handler);
        }
    }

    deRegister(id: string) {
        this.handlers.delete(id);
    }
}
