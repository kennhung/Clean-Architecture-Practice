import { Query } from "./query";

export interface QueryHandler<Input extends Query, Output> {
    execute(input: Input): Promise<Output>;
}x