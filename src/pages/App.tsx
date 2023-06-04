import React, {createContext, useState} from 'react';
import {RouterProvider} from 'react-router-dom';
import routes from "../routes";

import {Professor, ProfessorImpl} from "../data/professor.ts";
import {Meeting} from "../data/meeting.ts";
import {Tablet} from "../data/tablet.ts";
import {Classroom} from "../data/classroom.ts";
import {Student} from "../data/student.ts";

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
    const [tablets, setTablets] = useState<Tablet[]>([]);
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
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