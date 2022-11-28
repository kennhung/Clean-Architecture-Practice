import { Query } from "./query";

export interface QueryBus<QueryBase extends Query = Query> {
    execute<T extends QueryBase, R = any>(query: T): Promise<R>;
}
