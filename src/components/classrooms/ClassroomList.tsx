import React, {useContext, useState} from 'react';
import {Avatar, Button, List, message, Popconfirm} from 'antd';
import {AppContext} from "../../pages/App.tsx";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Classroom} from "../../data/classroom.ts";
import ClassroomEditModal from './ClassroomEditModal.tsx';

const ClassroomList: React.FC = () => {
    const { classrooms, setClassrooms } = useContext(AppContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(null);

    const handleEditClassroom = (classroom: Classroom) => {
        setSelectedClassroom(classroom);
        setIsModalOpen(true);
    };

    const handleSave = (editedClassroom: Classroom) => {
        const updatedClassrooms: Classroom[] = classrooms.map((classroom) => {
            if (classroom.id === editedClassroom.id) {
                return {
                    ...classroom,
                    name: editedClassroom.name,
                    color: editedClassroom.color,
                };
            }
            return classroom;
        });

        setClassrooms(updatedClassrooms);
        message.success('Sala alterada com sucesso!');
        setIsModalOpen(false);
    };

    const handleDeleteClassroom = (classroomsId: string) => {
        // Handle delete logic here
        // Update the classrooms list by removing the classroom with the given ID
        setClassrooms((prevClassrooms) =>
            prevClassrooms.filter((classrooms) => classrooms.id !== classroomsId)
        );
        message.success('Sala apagada com sucesso!');
    };

    return (
        <>
            <List
                itemLayout="horizontal"
                bordered={true}
                dataSource={classrooms}
                renderItem={(classroom) => (
                    <List.Item
                        key={classroom.id}
                        actions={[
                            <Button
                                type="primary"
                                title="editar"
                                icon={<EditOutlined />}
                                onClick={() => handleEditClassroom(classroom)}
                            >
                                Editar
                            </Button>,
                            <Popconfirm
                                title="Apagar sala"
                                description="Tem certeza que deseja apagar?"
                                okText="Sim"
                                cancelText="Não"
                                onConfirm={() => handleDeleteClassroom(classroom.id)}
                            >
                                <Button danger title="apagar" icon={<DeleteOutlined />} >
                                    Apagar
                                </Button>
                            </Popconfirm>
                        ]}
                    >
                        <List.Item.Meta
                            key={classroom.id}
                            title={classroom.name}
                            avatar={<Avatar style={{background: classroom.color}} />}
                        />
                    </List.Item>
                )}
            />

            {selectedClassroom && (
                <ClassroomEditModal
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    onSave={handleSave}
                    classroom={selectedClassroom}
                />
            )}
        </>
    );
};

export default ClassroomList;