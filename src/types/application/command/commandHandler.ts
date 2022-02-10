import { Command } from "./command";

export interface CommandHandler<Input extends Command, Output> {
    execute(input: Input): Promise<Output>;
}