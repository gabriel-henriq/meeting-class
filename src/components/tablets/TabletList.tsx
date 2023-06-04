import React, {useContext, useState} from 'react';
import {Button, List, message, Popconfirm} from 'antd';
import {AppContext} from "../../pages/App.tsx";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Tablet} from "../../data/tablet";
import EditTabletModal from './TabletEditModal.tsx';

const TabletList: React.FC = () => {
    const { tablets, setTablets } = useContext(AppContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTablet, setSelectedTablet] = useState<Tablet | null>(null);


    const handleEditTablet = (tablet: Tablet) => {
        setSelectedTablet(tablet);
        setIsModalOpen(true);
    };

    const handleSave = (editedTablet: Tablet) => {
        const updatedTablets: Tablet[] = tablets.map((tablet) => {
            if (tablet.id === editedTablet.id) {
                return {
                    ...tablet,
                    name: editedTablet.name,
                };
            }
            return tablet;
        });

        setTablets(updatedTablets);
        message.success('tablet alterado com sucesso!');
        setIsModalOpen(false);
    };

    const handleDeletetablet = (tabletId: string) => {
        // Handle delete logic here
        // Update the tablets list by removing the tablet with the given ID
        setTablets((prevtablets) =>
            prevtablets.filter((tablet) => tablet.id !== tabletId)
        );
        message.success('tablet apagado com sucesso!');
    };


    return (
        <>
            <List
                itemLayout="horizontal"
                rowKey={(tablets) => tablets.id}
                bordered={true}
                dataSource={tablets}
                renderItem={(tablet) => (
                    <List.Item
                        key={tablet.id}
                        actions={[
                            <Button
                                type="primary"
                                title="editar"
                                icon={<EditOutlined />}
                                onClick={() => handleEditTablet(tablet)}
                            >
                                Editar
                            </Button>,
                            <Popconfirm
                                title="Apagar tablet"
                                description="Tem certeza que deseja apagar?"
                                okText="Sim"
                                cancelText="Não"
                                onConfirm={() => handleDeletetablet(tablet.id)}
                            >
                                <Button danger title="apagar" icon={<DeleteOutlined />} >
                                    Apagar
                                </Button>
                            </Popconfirm>
                        ]}
                    >
                        <List.Item.Meta
                            key={tablet.id}
                            title={tablet.name}
                        />
                    </List.Item>
                )}
            />

            {selectedTablet && (
                <EditTabletModal
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    onSave={handleSave}
                    tablet={selectedTablet}
                />
            )}
        </>
    );
};

export default TabletList;