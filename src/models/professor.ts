import { generateUniqueId } from "../utils/uuid.ts";

export interface Professor {
    id: string;
    name: string;
    updateName(newName: string): void;
}

export class ProfessorImpl implements Professor {
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