import {Professor} from "./professor.ts";
import {Tablet} from "./tablet.ts";
import {Classroom} from "./classroom.ts";
import {Student} from "./student.ts";

export interface Meeting {
    id: string;
    startTime: Date;
    endTime: Date;
    professor: Professor;
    tablet?: Tablet;
    classroom: Classroom;
    students: Student[];
    observation: string;
}