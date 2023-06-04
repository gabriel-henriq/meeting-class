import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import {
    ScheduleOutlined,
    UserOutlined,
    TabletOutlined,
    ApartmentOutlined,
} from '@ant-design/icons';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';

const { Content, Sider } = Layout;

type MenuItem = {
    label: string;
    key: string;
    icon: React.ReactNode;
};

const items: MenuItem[] = [
    {
        label: 'Aulas',
        key: 'class',
        icon: <ScheduleOutlined />,
    },
    {
        label: 'Professores',
        key: 'professor',
        icon: <UserOutlined />,
    },
    {
        label: 'Tablets',
        key: 'tablet',
        icon: <TabletOutlined />,
    },
    {
        label: 'Salas',
        key: 'room',
        icon: <ApartmentOutlined />,
    },
];

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();
    const location = useLocation();

    // Get the current pathname from the location
    const currentPath = location.pathname;

    // Find the key that matches the current pathname
    const defaultSelectedKey = items.find(item => currentPath.includes(item.key))?.key;

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                <Menu
                    theme="dark"
                    onClick={(items)=>{ navigate(items.key) }}
                    defaultSelectedKeys={[defaultSelectedKey || 'class']}
                    mode="inline"
                    items={items} />
            </Sider>
            <Layout>
                <Content style={{margin: '16px'}}>
                    <div style={
                        {
                            padding: 24,
                            minHeight: '100%',
                            background: colorBgContainer
                        }
                    }>
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;
