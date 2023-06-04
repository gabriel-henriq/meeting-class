import React from 'react';
import {Divider, Typography} from "antd";
import ClassroomCreate from "../components/classrooms/ClassroomCreate";
import ClassroomList from "../components/classrooms/ClassroomList";


const TabletPage: React.FC = () => {
    return (
        <>
            <Typography.Title level={2}>Lista de Salas</Typography.Title>
            <Divider />
            <ClassroomCreate/>
            <Divider />
            <ClassroomList/>
        </>
    );
};

export default TabletPage;