import React from 'react';
import { Button, Form, Input, Modal } from 'antd';
import {Professor} from "../../data/professor";

interface EditProfessorModalProps {
    open: boolean
    onCancel: () => void;
    onSave: (editedProfessor: Professor) => void;
    professor: Professor;
}

const EditProfessorModal: React.FC<EditProfessorModalProps> = ({
    open,
    onCancel,
    onSave,
    professor,
}) => {
    const [form] = Form.useForm();

    const handleSave = () => {
        form
            .validateFields()
            .then((values) => {
                const editedProfessor: Professor = {
                    ...professor,
                    name: values.name,
                };
                onSave(editedProfessor);
                form.resetFields();
            })
            .catch((error) => {
                console.log('Error: ', error);
            });
    };

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            title={'Editar Professor'}
            destroyOnClose
            footer={[
                <Button key="cancel" onClick={onCancel}>Cancel</Button>,
                <Button key="save" type="primary" onClick={handleSave}>Save</Button>,
            ]}
        >
            <Form
                form={form}
                layout="vertical">
                <Form.Item
                    name="name"
                    label="Nome"
                    rules={[{ required: true, message: 'Digite o nome do professor' }]}
                >
                    <Input placeholder="Nome do professor" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditProfessorModal;