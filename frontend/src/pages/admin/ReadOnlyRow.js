import React from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.roomNum}</td>
      <td>{contact.type}</td>
      <td>{contact.price}</td>
      <td>{contact.description}</td>
      <td>{contact.status}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(contact.id)}>
          Delete
        </button>
      </td>
      <td><img src={contact.images}/></td>
    </tr>
  );
};

export default ReadOnlyRow;