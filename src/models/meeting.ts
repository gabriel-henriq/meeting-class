import {Professor} from "./professor.ts";
import {Tablet} from "./tablet.ts";
import {Classroom} from "./classroom.ts";
import {Student} from "./student.ts";
import {Dayjs} from "dayjs";

export type DayOfWeek = 'Seg' | 'Ter' | 'Qua' | 'Qui' | 'Sex' | 'Sab';

export interface Meeting {
    schedule: [Dayjs, Dayjs]
    professor: Professor;
    tablet?: Tablet;
    classroom: Classroom;
    students: Student[];
    observation?: string;
}