import './ContactList.css';
import {
  delContact,
  getContactsValue,
  getFilterValue,
} from 'redux/contactSlice';
import { useDispatch, useSelector } from 'react-redux';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContactsValue);
  const filter = useSelector(getFilterValue);

  const normalizedFilter = filter.toLowerCase();
  const visibleContacts = contacts.filter(
    contact =>
      contact.name && contact.name.toLowerCase().includes(normalizedFilter)
  );
  const onDeleteContact = id => {
    dispatch(delContact(id));
  };
  return (
    <ul className="contactList">
      {visibleContacts.map(({ id, name, number }) => {
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
