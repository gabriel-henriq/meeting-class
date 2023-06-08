import React, {createContext, useState} from 'react';
import {RouterProvider} from 'react-router-dom';
import routes from "../routes";

import {Professor, ProfessorImpl} from "../models/professor.ts";
import {Meeting} from "../models/meeting.ts";
import {Tablet, TabletImpl} from "../models/tablet.ts";
import {Classroom, ClassroomImpl} from "../models/classroom.ts";
import {Student} from "../models/student.ts";

export interface AppContextProps {
    professors: Professor[];
    setProfessors: React.Dispatch<React.SetStateAction<Professor[]>>;
    tablets: Tablet[];
    setTablets: React.Dispatch<React.SetStateAction<Tablet[]>>;
    classrooms: Classroom[];
    setClassrooms: React.Dispatch<React.SetStateAction<Classroom[]>>;
    meetings: Meeting[];
    setMeetings: React.Dispatch<React.SetStateAction<Meeting[]>>;
    students: Student[];
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

const App: React.FC = () => {
    const [professors, setProfessors] = useState<Professor[]>([new ProfessorImpl("Jhon Doe"), new ProfessorImpl("Gabriel Doe"), new ProfessorImpl("Lucas Silva"), new ProfessorImpl("Daniel Pirez")]);
    const [tablets, setTablets] = useState<Tablet[]>([new TabletImpl("TAB1"), new TabletImpl("TAB2"), new TabletImpl("TAB3")]);
    const [classrooms, setClassrooms] = useState<Classroom[]>([new ClassroomImpl('Sala do Fundo', '#1677FF'), new ClassroomImpl('Sala do Armario', '#8B16FF'), new ClassroomImpl('Sala do Mario', '#FF1694')]);
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [students, setStudents] = useState<Student[]>([]);


    return (
        <AppContext.Provider
            value={{
                professors,
                setProfessors,
                tablets,
                setTablets,
                classrooms,
                setClassrooms,
                meetings,
                setMeetings,
                students,
                setStudents,
            }}
        >
            <RouterProvider router={routes} />
        </AppContext.Provider>
    );
};

export default App;