import React, {createContext, useState} from 'react';
import {RouterProvider} from 'react-router-dom';
import routes from "../routes";

import {Professor, ProfessorImpl} from "../models/professor.ts";
import {DayOfWeek, Meeting} from "../models/meeting.ts";
import {Tablet, TabletImpl} from "../models/tablet.ts";
import {Classroom, ClassroomImpl} from "../models/classroom.ts";
import {Student} from "../models/student.ts";
import dayjs from "dayjs";

export interface AppContextProps {
    professors: Professor[];
    setProfessors: React.Dispatch<React.SetStateAction<Professor[]>>;

    tablets: Tablet[];
    setTablets: React.Dispatch<React.SetStateAction<Tablet[]>>;

    classrooms: Classroom[];
    setClassrooms: React.Dispatch<React.SetStateAction<Classroom[]>>;

    students: Student[];
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>;

    schedules: Record<DayOfWeek, Meeting[]>;
    setSchedules: React.Dispatch<React.SetStateAction<Record<DayOfWeek, Meeting[]>>>;
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

const App: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);

    const [professors, setProfessors] = useState<Professor[]>([
        new ProfessorImpl("Jhon Doe"),
        new ProfessorImpl("Gabriel Doe"),
        new ProfessorImpl("Lucas Silva"),
        new ProfessorImpl("Daniel Pirez"),
    ]);

    const [tablets, setTablets] = useState<Tablet[]>([
        new TabletImpl("TAB1"),
        new TabletImpl("TAB2"),
        new TabletImpl("TAB3"),
    ]);

    const [classrooms, setClassrooms] = useState<Classroom[]>([
        new ClassroomImpl('Sala do Fundo', '#1677FF'),
        new ClassroomImpl('Sala do Armario', '#8B16FF'),
        new ClassroomImpl('Sala do Mario', '#FF1694'),
    ]);

    const [schedules, setSchedules] = useState<Record<DayOfWeek, Meeting[]>>({
        Seg: [
            {
                professor: professors[0],
                tablet: tablets[0],
                classroom: classrooms[0],
                students: [],
                observation: '',
                schedule: [dayjs().set('hour', 9).set('minute', 0), dayjs().set('hour', 10).set('minute', 30)],
            },
            {
                professor: professors[1],
                tablet: tablets[1],
                classroom: classrooms[1],
                students: [],
                observation: '',
                schedule: [dayjs().set('hour', 11).set('minute', 0), dayjs().set('hour', 12).set('minute', 30)],

            },
        ],
        Ter: [],
        Qua: [],
        Qui: [],
        Sex: [],
        Sab: [],
    });


    return (
        <AppContext.Provider
            value={{
                professors,
                setProfessors,
                tablets,
                setTablets,
                classrooms,
                setClassrooms,
                students,
                setStudents,
                schedules,
                setSchedules
            }}
        >
            <RouterProvider router={routes} />
        </AppContext.Provider>
    );
};

export default App;