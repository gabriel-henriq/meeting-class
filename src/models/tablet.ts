import {generateUniqueId} from "../utils/uuid.ts";

export interface Tablet {
    id: string;
    name: string;
}

export class TabletImpl implements Tablet {
    id: string;
    name: string;

    constructor(name: string) {
        this.id = generateUniqueId();
        this.name = name;
    }

    updateName(newName: string): void {
        this.name = newName;
    }
}