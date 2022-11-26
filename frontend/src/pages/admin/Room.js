import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import data from "./mock-data.json";
import "./Room.css";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import { Button, Modal, Input } from 'antd';

const Room = () => {
    const [contacts, setContacts] = useState(data);
    const [addFormData, setAddFormData] = useState({
        roomtype: "",
        roomNo: "",
        size: "",
        price: "",
        status: "",
        description: "",
    });

    const [editFormData, setEditFormData] = useState({
        roomtype: "",
        roomNo: "",
        size: "",
        price: "",
        status: "",
        description: "",
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
            roomtype: addFormData.roomtype,
            roomNo: addFormData.roomNo,
            size: addFormData.size,
            price: addFormData.price,
            status: addFormData.status,
            description: addFormData.description,
        };

        const newContacts = [...contacts, newContact];
        setContacts(newContacts);
    };

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedContact = {
            id: editContactId,
            roomtype: editFormData.roomtype,
            roomNo: editFormData.roomNo,
            size: editFormData.size,
            price: editFormData.price,
            status: editFormData.status,
            description: editFormData.description,
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
            roomtype: contact.roomtype,
            roomNo: contact.roomNo,
            size: contact.size,
            price: contact.price,
            status: contact.status,
            description: contact.description,
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
            <h2>Room details</h2>
            <form onSubmit={handleEditFormSubmit}>
                <table>
                    <thead>
                        <tr>
                            <th>Room Type</th>
                            <th>Room Number</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
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

            <h2>Add a Room</h2>
            {/* <form onSubmit={handleAddFormSubmit}>
                <input
                    type="text"
                    name="roomtype"
                    required="required"
                    placeholder="Enter a name..."
                    onChange={handleAddFormChange}
                />
                <input
                    type="text"
                    name="roomNo"
                    required="required"
                    placeholder="Enter an addres..."
                    onChange={handleAddFormChange}
                />
                <input
                    type="text"
                    name="size"
                    required="required"
                    placeholder="Enter a phone number..."
                    onChange={handleAddFormChange}
                />
                <input
                    type="text"
                    name="price"
                    required="required"
                    placeholder="Enter an price..."
                    onChange={handleAddFormChange}
                />
                <input
                    type="text"
                    name="status"
                    required="required"
                    placeholder="Enter an status..."
                    onChange={handleAddFormChange}
                />
                <input
                    type="text"
                    name="description"
                    required="required"
                    placeholder="Enter an description..."
                    onChange={handleAddFormChange}
                />
                <button type="submit">Add</button>
            </form> */}
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
                        name="roomtype"
                        required="required"
                        placeholder="Enter a room type..."
                        onChange={handleAddFormChange}
                    />
                    <strong>Room number:</strong>
                    <Input
                        type="text"
                        name="roomNo"
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
    );
};

export default Room;