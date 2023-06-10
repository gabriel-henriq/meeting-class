import React from 'react';
import {Divider, Typography} from "antd";

import ListMeeting from "../components/meetings/ListMeeting.tsx";

const ClassPage: React.FC = () => {
    return (
        <>
            <Typography.Title level={2}>Aulas</Typography.Title>
            <Divider />
            <ListMeeting />
        </>
    );
};

export default ClassPage;