import { ValueObject } from "./valueObject";

interface IdProps<Value> {
    value: Value;
}

export abstract class Id<Value> extends ValueObject<IdProps<Value>> {
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

    equals(id: Id<Value>): boolean {
        if (id === null || id === undefined) {
            return false;
        }
        if (!(id instanceof this.constructor)) {
            return false;
        }
        return id.value === this.value;
    }
}