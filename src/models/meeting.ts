import {Professor} from "./professor.ts";
import {Tablet} from "./tablet.ts";
import {Classroom} from "./classroom.ts";
import {Student} from "./student.ts";
import {Dayjs} from "dayjs";

export interface Meeting {
    id: string;
    startTime: Dayjs;
    endTime: Dayjs;
    professor: Professor;
    tablet?: Tablet;
    classroom: Classroom;
    students: Student[];
    observation: string;
}