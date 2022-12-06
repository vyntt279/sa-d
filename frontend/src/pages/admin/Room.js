import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import data from "./mock-data.json";
import "./Room.css";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import { Button, Modal, Input } from 'antd';

const Room = () => {
    const [contacts, setContacts] = useState(data);
    fetch("https://backend-6ch5yx6zaq-et.a.run.app/bookings/getRoom").then((data) => {
        return data.json();
    }).then((objectData) => {
        // contacts(objectData);
        setContacts(objectData);
        console.log(objectData[0].title);
        let tableData = "";
        let images = document.getElementById('images');
        objectData.map((values) => {
            tableData += `
            <tr>
                            <th>${values.roomNum}</th>
                            <th>${values.type}</th>
                            <th>${values.price}</th>
                            <th>${values.description}</th>
                            <th><img src="${values.images}"/></th>
                            <th>${values.status}</th>
                        </tr>`;
        });
        // document.getElementById("table_body").innerHTML=tableData;
    });
    
    const [addFormData, setAddFormData] = useState({
        type: "",
        roomNum: "",
        size: "",
        price: "",
        description: "",
        images: "",
        status: "",
    });

    const [editFormData, setEditFormData] = useState({
        type: "",
        roomNum: "",
        size: "",
        price: "",
        description: "",
        images: "",
        status: "",
    });

    const [editContactId, setEditContactId] = useState(null);

    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    };

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    };

    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        const newContact = {
            id: nanoid(),
            type: addFormData.type,
            roomNum: addFormData.roomNum,
            size: addFormData.size,
            price: addFormData.price,            
            description: addFormData.description,            
            description: addFormData.images,
            status: addFormData.status,
        };

        const newContacts = [...contacts, newContact];
        setContacts(newContacts);
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedContact = {
            id: editContactId,
            type: editFormData.type,
            roomNum: editFormData.roomNum,
            size: editFormData.size,
            price: editFormData.price,
            description: editFormData.description,            
            description: editFormData.images,
            status: editFormData.status,
        };

        const newContacts = [...contacts];

        const index = contacts.findIndex((contact) => contact.id === editContactId);

        newContacts[index] = editedContact;

        setContacts(newContacts);
        setEditContactId(null);
    };

    const handleEditClick = (event, contact) => {
        event.preventDefault();
        setEditContactId(contact.id);

        const formValues = {
            type: contact.type,
            roomNum: contact.roomNum,
            size: contact.size,
            price: contact.price,
            description: contact.description,
            images: contact.images,
            status: contact.status,
        };

        setEditFormData(formValues);
    };

    const handleCancelClick = () => {
        setEditContactId(null);
    };

    const handleDeleteClick = (contactId) => {
        const newContacts = [...contacts];

        const index = contacts.findIndex((contact) => contact.id === contactId);

        newContacts.splice(index, 1);

        setContacts(newContacts);
    };

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 3000);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const { TextArea } = Input;

    return (
        <div className="app-container">
            <div>
            <Button type="primary" onClick={showModal}>
                Add a room
            </Button>
            <Modal
                open={open}
                title="Add a room"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,

                ]}
            >
                <form onSubmit={handleAddFormSubmit}>
                    <strong>Room type:</strong>
                    <Input
                        type="text"
                        name="type"
                        required="required"
                        placeholder="Enter a room type..."
                        onChange={handleAddFormChange}
                    />
                    <strong>Room number:</strong>
                    <Input
                        type="text"
                        name="roomNum"
                        required="required"
                        placeholder="Enter an room number..."
                        onChange={handleAddFormChange}
                    />
                    <strong>Room size:</strong>
                    <Input
                        type="text"
                        name="size"
                        required="required"
                        placeholder="Enter a size..."
                        onChange={handleAddFormChange}
                    />
                    <strong>Room price:</strong>
                    <Input
                        type="text"
                        name="price"
                        required="required"
                        placeholder="Enter an price..."
                        onChange={handleAddFormChange}
                    />
                    <strong>Room availability:</strong>
                    <Input
                        type="text"
                        name="status"
                        required="required"
                        placeholder="Enter an status..."
                        onChange={handleAddFormChange}
                    />
                    <strong>More about room info:</strong>
                    <TextArea showCount maxLength={100}
                        type="text"
                        name="description"
                        required="required"
                        placeholder="Enter an description..."
                        onChange={handleAddFormChange}
                    />
                    <br></br>
                    <button type="submit">Add</button>
                </form>
            </Modal>
            </div>
            <h2>Room details</h2>
            <form onSubmit={handleEditFormSubmit}>
                <table>
                    <thead>
                        <tr>
                            <th>Room Number</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Actions</th>
                            <th>Images</th>
                        </tr>
                    </thead>
                    <tbody id="table_body">
                        {contacts.map((contact) => (
                            <Fragment>
                                {editContactId === contact.id ? (
                                    <EditableRow
                                        editFormData={editFormData}
                                        handleEditFormChange={handleEditFormChange}
                                        handleCancelClick={handleCancelClick}
                                    />
                                ) : (
                                    <ReadOnlyRow
                                        contact={contact}
                                        handleEditClick={handleEditClick}
                                        handleDeleteClick={handleDeleteClick}
                                    />
                                )}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default Room;