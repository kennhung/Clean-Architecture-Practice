import { Command } from "./command";

export interface CommandBus<CommandBase extends Command = Command> {
    execute<T extends CommandBase, R = any>(command: T): Promise<R>;
}
