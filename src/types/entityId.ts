import { ValueObject } from './valueObject';

interface EntityIdProps<Value> {
    value: Value;
}

export abstract class EntityId<Value> extends ValueObject<
    EntityIdProps<Value>
> {
    constructor(value: Value) {
        super({ value });
    }

    get value(): Value {
        return this.props.value;
    }

    toString(): string {
        const constructorName = this.constructor.name;
        return `${constructorName}(${String(
            this.props.value
        )})`;
    }

    toValue(): Value {
        return this.props.value;
    }

    equals(entityId: EntityId<Value>): boolean {
        if (entityId === null || entityId === undefined) {
            return false;
        }
        if (!(entityId instanceof this.constructor)) {
            return false;
        }
        return entityId.value === this.value;
    }
}