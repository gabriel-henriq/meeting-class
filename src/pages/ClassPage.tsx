import React from 'react';
import {Divider, Typography} from "antd";
import CreateMeeting from "../components/meetings/CreateMeeting.tsx";

const ClassPage: React.FC = () => {
    return (
        <>
            <Typography.Title level={2}>Aulas</Typography.Title>
            <Divider />
            <CreateMeeting />
        </>
    );
};

export default ClassPage;