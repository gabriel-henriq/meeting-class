import React, {useContext, useState} from 'react';
import {Button, List, message, Popconfirm} from 'antd';
import {AppContext} from "../../pages/App.tsx";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Professor} from "../../models/professor";
import EditProfessorModal from './ProfessorEditModal';

const ProfessorList: React.FC = () => {
    const { professors, setProfessors } = useContext(AppContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProfessor, setSelectedProfessor] = useState<Professor | null>(null);


    const handleEditProfessor = (professor: Professor) => {
        setSelectedProfessor(professor);
        setIsModalOpen(true);
    };

    const handleSave = (editedProfessor: Professor) => {
        const updatedProfessors: Professor[] = professors.map((professor) => {
            if (professor.id === editedProfessor.id) {
                return {
                    ...professor,
                    name: editedProfessor.name,
                };
            }
            return professor;
        });

        setProfessors(updatedProfessors);
        message.success('Professor alterado com sucesso!');
        setIsModalOpen(false);
    };

    const handleDeleteProfessor = (professorId: string) => {
        // Handle delete logic here
        // Update the professors list by removing the professor with the given ID
        setProfessors((prevProfessors) =>
            prevProfessors.filter((professor) => professor.id !== professorId)
        );
        message.success('Professor apagado com sucesso!');
    };


    return (
        <>
            <List
                itemLayout="horizontal"
                rowKey={(professors) => professors.id}
                bordered={true}
                dataSource={professors}
                renderItem={(professor) => (
                    <List.Item
                        key={professor.id}
                        actions={[
                            <Button
                                type="primary"
                                title="editar"
                                icon={<EditOutlined />}
                                onClick={() => handleEditProfessor(professor)}
                            >
                                Editar
                            </Button>,
                            <Popconfirm
                                title="Apagar professor"
                                description="Tem certeza que deseja apagar?"
                                okText="Sim"
                                cancelText="Não"
                                onConfirm={() => handleDeleteProfessor(professor.id)}
                            >
                                <Button danger title="apagar" icon={<DeleteOutlined />} >
                                    Apagar
                                </Button>
                            </Popconfirm>
                        ]}
                    >
                        <List.Item.Meta
                            key={professor.id}
                            title={professor.name}
                        />
                    </List.Item>
                )}
            />

            {selectedProfessor && (
                <EditProfessorModal
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    onSave={handleSave}
                    professor={selectedProfessor}
                />
            )}
        </>
    );
};

export default ProfessorList;