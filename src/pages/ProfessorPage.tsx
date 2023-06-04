import React from 'react';
import ProfessorList from "../components/professors/ProfessorList.tsx";
import {Divider, Typography} from "antd";
import ProfessorCreate from "../components/professors/ProfessorCreate.tsx";

const ProfessorPage: React.FC = () => {
    return (
        <>
            <Typography.Title level={2}>Lista de Professores</Typography.Title>
            <Divider />
            <ProfessorCreate/>
            <Divider />
            <ProfessorList/>
        </>
    );
};

export default ProfessorPage;