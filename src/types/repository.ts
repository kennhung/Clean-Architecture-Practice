import { AggregateRoot } from "./domain/aggregateRoot";
import { Entity } from "./entity";
import { EntityId } from "./entityId";

interface Repository<
    Id extends EntityId<unknown>,
    A extends AggregateRoot<Id, {}>
    > {
    exists(id: Id): Promise<boolean>;
    findById(id: Id): Promise<A | undefined>;

    add(entity: Entity<Id, A>): Promise<void>;
    update(entity: A): Promise<void>;
    remove(id: Id): Promise<void>;
}
