import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import Phonebook from './Phonebook';
import Contacts from './Contacts';
import { useDispatch, useSelector } from 'react-redux';
import {
  addContact,
  delContact,
  contactsFiltered,
  getContactsValue,
  getFilterValue,
} from '../redux/contactSlice';

function App() {
  const contacts = useSelector(getContactsValue);
  const filter = useSelector(getFilterValue);
  const dispatch = useDispatch();

  const formSubmitHandler = contactData => {
    const { name } = contactData;
    const ifNameTaken = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (ifNameTaken) {
      return alert(`${name} is already in contacts`);
    }
    dispatch(addContact(contactData));
  };

  const deleteContact = contactId => {
    dispatch(delContact(contactId));
  };

  const filterContacts = e => {
    const { value } = e.currentTarget;
    dispatch(contactsFiltered(value));
  };

  const visibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(
      contact =>
        contact.name && contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <Phonebook titleBegin="Phone" titleEnd="book">
      <ContactForm onSubmit={formSubmitHandler} />
      <Contacts title="Contacts">
        <Filter filterValue={filter} onFilterContacts={filterContacts} />
        <ContactList
          contacts={visibleContacts()}
          onDeleteContact={deleteContact}
        />
      </Contacts>
    </Phonebook>
  );
}

export default App;
