import { Button, Table, Tag, notification, Statistic } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react'

import { url } from 'stores/constant'
import RoomDescription from './RoomDescription';
import AddRoom from 'pages/admin/AddRoom'

export interface RoomInfo {
    id: number;
    type: string;
    roomNum: string;
    price: string;
    status: string;
    description: string;
    bookingId: string;
}

const fakeData: RoomInfo[] = [
    {
        id: 1,
        type: 'STANDARD (STD)',
        roomNum: "508",
        price: "3000000",
        status: 'Booked',
        description: 'aABC',
        bookingId: "1"
    },
    {
        id: 2,
        type: 'STANDARD (STD)',
        roomNum: "408",
        price: "30000",
        status: 'Check In',
        description: 'aABC',
        bookingId: "1"
    },
    {
        id: 3,
        type: 'STANDARD (STD)',
        roomNum: "308",
        price: "300000",
        status: 'Check Out',
        description: 'aABC',
        bookingId: "1"
    }
];

const handleDeleteRoom = async (roomNum: string) => {
    await fetch(url + "/rooms/delete", {
        mode: "cors",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('authorization')
        },
        method: "POST",
        body: JSON.stringify({
            roomId: roomNum
        })
    })
        .then((response) => response.json())
        .then((response) => {
            console.log('Data', response)
        })
        .catch((reason) => {
            console.log(reason)
            notification.info({
                message: `Cannot remove room ${roomNum}, please try again`,
                placement: 'top',
            });
        })
}

const columns: ColumnsType<RoomInfo> = [
    {
        title: 'ID.',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Room Type',
        dataIndex: 'roomtype',
        key: 'roomtype',
    },
    {
        title: 'Room Number',
        dataIndex: 'roomNum',
        key: 'roomNum',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (_, { price }) => {
            return (
                <Statistic valueStyle={{ fontSize: "1rem" }} suffix='$' value={price} />
            );
        }
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: (_, { status }) => {
            let color = status == 'available' ? 'green' : 'volcano';
            return (
                <Tag color={color} key={status}>
                    {status.toUpperCase()}
                </Tag>
            );
        }
    },
    {
        title: 'Detail',
        key: 'description',
        dataIndex: 'description',
        render: (_, { description }) => {

            return (
                <RoomDescription description={<p>{description}</p>} />
            );
        }
    },
    {
        title: 'Action',
        key: 'actions',
        render: (_, { roomNum }) => {
            return (
                <>
                    <Button type="primary" danger onClick={() => handleDeleteRoom(roomNum)} icon={<DeleteOutlined />} />
                </>
            )
        }
    }
];

const ViewRoom = () => {
    const [data, setData] = useState<RoomInfo[]>(fakeData)
    const fetchRoomData = async () => {
        await fetch(url + "/bookings/getRoom", {
            mode: "cors",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('authorization')
            },
            method: "GET",
        })
            .then((response) => response.json())
            .then((response) => {
                console.log('Data', response)
                if (response.error == undefined) {
                    setData(response)
                }
            })
            .catch((reason) => {
                console.log(reason)
                notification.info({
                    message: `Cannot get all rooms, please try again`,
                    placement: 'top',
                });
            })
    }
    useEffect(() => {
        fetchRoomData()
    }, [])
    return (
        <>
            <div className='grid grid-cols-2 gap-2 place-content-between w-full'>
                <h1>Admin Screen</h1>
                <div className="place-self-end self-center">
                    <AddRoom />
                </div>
            </div>
            <Table columns={columns} dataSource={data} />
        </>
    );
}

export default ViewRoom;