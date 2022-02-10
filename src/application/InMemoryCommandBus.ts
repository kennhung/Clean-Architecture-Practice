import { Command } from '../types/application/command/command';
import { CommandBus } from '../types/application/command/commandBus';

export class InMemoryCommandBus implements CommandBus {
    execute<T extends Command, R = any>(command: T): Promise<R> {
        throw new Error('Method not implemented.');
    }
}
