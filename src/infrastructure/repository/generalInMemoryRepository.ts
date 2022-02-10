import { Entity } from "../../types/domain/entity";
import { EntityId } from "../../types/domain/entityId";

export abstract class GeneralInMemoryRepository<Id extends EntityId<unknown>, E extends Entity<Id, unknown>> {
    protected dataArr: E[] = [];

    private fromIdGetIndex(id: Id): number {
        return this.dataArr.findIndex((data: E) => data.id.equals(id));
    }

    async fromId(id: Id): Promise<E | null> {
        const ctx = this.fromIdGetIndex(id);

        return ctx === -1 ? null : this.dataArr[ctx];
    }

    async save(data: E): Promise<void> {
        const index = this.fromIdGetIndex(data.id);

        if (index === -1) {
            this.dataArr.push(data);
        } else {
            this.dataArr[index] = data;
        }
    }

}
