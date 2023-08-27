import PropTypes from 'prop-types';
import './ContactList.css';

const ContactList = ({ onDeleteContact, contacts }) => {
  return (
    <ul className="contactList">
      {contacts.map(({ id, name, number }) => {
        return (
          <li key={id} className="contactItem">
            {name}:<span className="telNumber">{number}</span>
            <button
              className="deleteContact"
              type="button"
              onClick={() => onDeleteContact(id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ContactList;

ContactList.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
};
