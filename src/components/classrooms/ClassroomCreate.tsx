import React, {useContext, useState} from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {Button, Col, ColorPicker, Drawer, Form, Input, Row, Space} from 'antd';
import type { Color } from 'antd/es/color-picker';

import { AppContext } from "../../pages/App";
import { Classroom, ClassroomImpl } from "../../models/classroom";

const ClassroomCreate: React.FC = () => {
    const { classrooms, setClassrooms } = useContext(AppContext);

    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [colorValue, setColorValue] = useState('#1677FF');

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        form.resetFields();
        setColorValue('#1677FF');
    };

    const onFinish = () => {
        form.validateFields().then((values: Classroom) => {
            setClassrooms([...classrooms, new ClassroomImpl(values.name, values.color)])
            form.resetFields();
            setColorValue('#1677FF');
            onClose();
        })
    };

    const handleColorChange = (color: Color) => {
        setColorValue(color.toHexString());
        form.setFieldsValue({ color: color.toHexString() });
    };


    return (
        <>
            <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>Adicionar</Button>
            <Drawer
                title="Criar sala"
                width={310}
                onClose={onClose}
                open={open}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <Space>
                        <Button onClick={onClose}>Cancelar</Button>
                        <Button onClick={() => form.submit()} type="primary">Criar</Button>
                    </Space>
                }
            >
                <Form
                    form={form}
                    layout="vertical"
                    requiredMark={true}
                    onFinish={onFinish}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Nome"
                                rules={[{ required: true, message: 'Campo obrigatório!' }]}
                            >
                                <Input placeholder="Insira o nome da sala" style={{ width: 200 }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="color"
                                label="Cor"
                                rules={[{ required: true, message: 'Campo obrigatório!' }]}
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
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
};

export default ClassroomCreate;
