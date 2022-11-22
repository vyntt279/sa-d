import React, { useContext, useEffect, useRef, useState } from 'react';
import type { InputRef } from 'antd';
import { Button, Form, Input, Popconfirm, Table, Tag, notification  } from 'antd';
import type { FormInstance } from 'antd/es/form';
import Item from 'antd/es/list/Item';
import { SmileOutlined } from '@ant-design/icons';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
    key: string | number;
    classification: string[];
    RNo: number;
    size: string;
    price: number;
    status: string[];
}

interface EditableRowProps {
    index: number;
}

const openNotification = () => {
    notification.open({
      message: 'Add blank room',
      description:
        'In this fuction, the system will create a blank row at the end of the table. To edit the row, just double click the value you want to change :v',
        icon: <SmileOutlined style={{ color: '#54c577' }} />,
        onClick: () => {
        console.log('Add room!');
      },
    });
  };

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof Item;
    record: Item;
    handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
        if (editing) {
            inputRef.current!.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();

            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
    key: React.Key;
    classification: string[];
    RNo: number;
    size: string;
    price: number;
    status: string[];
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const Room: React.FC = () => {
    const [dataSource, setDataSource] = useState<DataType[]>([
        {
            key: '0',
            classification: ['Standard (STD)'],
            RNo: 508,
            size: 72 + "m²",
            price: 3000000,
            status: ['Booked'],
        },
        {
            key: '1',
            classification: ['Standard (STD)'],
            RNo: 408,
            size: 36 + "m²",
            price: 2000000,
            status: ['Available'],
        },
        {
            key: '2',
            classification: ['Standard (STD)'],
            RNo: 308,
            size: 24 + "m²",
            price: 1000000,
            status: ['Unavailable'],
        },
        {
            key: '3',
            classification: ['Standard (STD)'],
            RNo: 208,
            size: 15 + "m²",
            price: 500000,
            status: ['Booked'],
        },
    ]);

    const [count, setCount] = useState(2);

    const handleDelete = (key: React.Key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };

    const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
        {
            title: 'Room type',
            dataIndex: 'classification',
            editable: true,
            // render: (classification: string[]) => (
            //     <span>
            //       {classification.map((classification) => {
            //         let color = 'geekblue';
            //         // if (classification === 'loser') {
            //         //   color = 'volcano';
            //         // }
            //         return (
            //           <Tag color={color} key={classification}>
            //             {classification.toUpperCase()}
            //           </Tag>
            //         );
            //       })}
            //     </span>
            //   ),
        },
        {
            title: 'Room No.',
            dataIndex: 'RNo',
            editable: true,
        },
        {
            title: 'Size',
            dataIndex: 'size',
            editable: true,
        },
        {
            title: 'Price (VND)',
            dataIndex: 'price',
            editable: true,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status: string[]) => (
                <span>
                    {status.map((status) => {
                        let color = 'green';
                        if (status === 'Unavailable') {
                            color = 'volcano';
                        }
                        else if (status === 'Booked') {
                            color = 'yellow';
                        }
                        return (
                            <Tag color={color} key={status}>
                                {status.toUpperCase()}
                            </Tag>
                        );
                    })}
                </span>
            ),
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render:() => <a>Delete</a>
            // render: (_,record:{key: React.Key},any) =>
            //     dataSource.length >= 1 ? (
            //         <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            //             <a>Delete</a>
            //         </Popconfirm>
            //     ) : null,
        },
    ];

    const handleAdd = () => {
        const newData: DataType = {
            key: count,
            classification: ['N/A'],
            RNo: 0,
            size: 0 + "m²",
            price: 0,
            status: ['Available'],
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };

    const handleSave = (row: DataType) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: DataType) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });

    return (
        <div>
            <Button onClick={function(event){ handleAdd(); openNotification()}} type="primary" style={{ margin: 16 }} >
                Add a room
            </Button>
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns as ColumnTypes}
            />
        </div>
    );
};

export default Room;