import React from 'react';
import {Divider, Typography} from "antd";

import TabletCreate from "../components/tablets/TabletCreate";
import TabletList from "../components/tablets/TabletList";

const TabletPage: React.FC = () => {
    return (
        <>
            <Typography.Title level={2}>Lista de Tablets</Typography.Title>
            <Divider />
            <TabletCreate/>
            <Divider />
            <TabletList/>
        </>
    );
};

export default TabletPage;