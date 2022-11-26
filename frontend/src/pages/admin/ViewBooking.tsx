import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
    no: number;
    email: string;
    name: string;
    roomtype: string;
    roomNo: number;
    start: string;
    end: string;
    price: number;
    status: string[];
}

const columns: ColumnsType<DataType> = [
    {
        title: 'No.',
        dataIndex: 'no',
        key: 'no',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Room Type',
        dataIndex: 'roomtype',
        key: 'roomtype',
    },
    {
        title: 'Room Number',
        dataIndex: 'roomNo',
        key: 'roomNo',
    },
    {
        title: 'Start Date',
        dataIndex: 'start',
        key: 'start',
    },
    {
        title: 'End Date',
        dataIndex: 'end',
        key: 'end',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: (_, { status }) => (
            <>
                {status.map((status) => {
                    let color = 'grey';
                    if (status === 'Cancel') {
                        color = 'volcano';
                    }
                    else if (status === 'Check In') {
                        color = 'green';
                    }
                    else if (status === 'Check Out') {
                        color = 'blue';
                    }
                    else if (status === 'Booked') {
                        color = 'gold';
                    }
                    return (
                        <Tag color={color} key={status}>
                            {status.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
];

const data: DataType[] = [
    {
        no: 1,
        email: 'test@test.com.vn',
        name: 'test test',
        roomtype: 'STANDARD (STD)',
        roomNo: 508,
        start: '2022-11-24 19:00',
        end: '2022-11-24 20:00',
        price: 3000000,
        status: ['Booked'],
    },
    {
        no: 2,
        email: 'test@test.com.vn',
        name: 'test test',
        roomtype: 'STANDARD (STD)',
        roomNo: 408,
        start: '2021-11-24 19:00',
        end: '2021-11-24 20:00',
        price: 30000,
        status: ['Check In'],
    },
    {
        no: 3,
        email: 'test@test.com.vn',
        name: 'test test',
        roomtype: 'STANDARD (STD)',
        roomNo: 308,
        start: '2021-11-23 19:00',
        end: '2021-11-23 20:00',
        price: 300000,
        status: ['Check Out'],
    },
    {
        no: 4,
        email: 'test@test.com.vn',
        name: 'test test',
        roomtype: 'STANDARD (STD)',
        roomNo: 308,
        start: '2020-11-24 19:00',
        end: '2020-11-24 20:00',
        price: 30000,
        status: ['Cancel'],
    },
];

const ViewBooking: React.FC = () => <Table columns={columns} dataSource={data} />;

export default ViewBooking;