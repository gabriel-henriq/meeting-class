import {generateUniqueId} from "../utils/uuid.ts";

export interface Classroom {
    id: string;
    name: string;
    color: string;
}

export class ClassroomImpl implements Classroom {
    id: string;
    name: string;
    color: string;

    constructor(name: string, color: string) {
        this.id = generateUniqueId();
        this.name = name;
        this.color = color;
    }

    updateName(newName: string): void {
        this.name = newName;
    }

    updateColor(newColor: string): void {
        this.color = newColor
    }
}