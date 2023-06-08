import React, {useState} from 'react';
import {Button, Col, ColorPicker, Form, Input, Modal, Row} from 'antd';
import {Classroom} from "../../models/classroom.ts";
import {Color} from "antd/es/color-picker";

interface ClassroomEditModalProps {
    open: boolean
    onCancel: () => void;
    onSave: (editedClassroom: Classroom) => void;
    classroom: Classroom;
}

const ClassroomEditModal: React.FC<ClassroomEditModalProps> = ({
    open,
    onCancel,
    onSave,
    classroom,
}) => {
    const [form] = Form.useForm();
    const [colorValue, setColorValue] = useState(classroom.color);


    const handleColorChange = (color: Color) => {
        setColorValue(color.toHexString());
        form.setFieldsValue({ color: color.toHexString() });
    };

    const handleSave = () => {
        form.validateFields().then((values: Classroom) => {
                const editedClassroom: Classroom = {
                    ...classroom,
                    name: values.name,
                    color: values.color,
                };
                onSave(editedClassroom);
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
            title={'Editar Sala'}
            destroyOnClose
            footer={[
                <Button key="cancel" onClick={onCancel}>Cancel</Button>,
                <Button key="save" type="primary" onClick={handleSave}>Save</Button>,
            ]}
        >
            <Form
                form={form}
                initialValues={classroom}
                layout="vertical"
            >
                <Form.Item
                    name="name"
                    label="Novo nome:"
                    rules={[{ required: true, message: 'Digite o nome da sala!' }]}
                >
                    <Input placeholder="Nome da sala" />
                </Form.Item>
                <Form.Item
                    name="color"
                    label="Nova cor:"
                    rules={[{ required: true, message: 'Escolha uma nova cor para a sala!' }]}
                >

                    <Row gutter={16}>
                        <Col span={6}>
                            <ColorPicker value={colorValue} onChange={handleColorChange} />
                        </Col>
                        <Col span={6}>
                            <Input style={{ width: 100 }} value={colorValue} disabled />
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ClassroomEditModal;