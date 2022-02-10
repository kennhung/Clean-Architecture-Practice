import { Entity } from './entity';
import { EntityId } from './entityId';
import { DomainEvent } from '../event/domainEvent';

export abstract class AggregateRoot<
    Id extends EntityId<unknown>,
    Props
    > extends Entity<Id, Props> {
    private _domainEvents: DomainEvent[] = [];

    get domainEvents(): DomainEvent[] {
        return this._domainEvents;
    }

    protected addDomainEvent(domainEvent: DomainEvent): void {
        this._domainEvents.push(domainEvent);
    }

    protected addDomainEvents(domainEvents: DomainEvent[]): void {
        this._domainEvents.push(...domainEvents);
    }

    clearEvents(): void {
        this._domainEvents = [];
    }
}