import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import Phonebook from './Phonebook';
import Contacts from './Contacts';

function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = contactData => {
    const { name } = contactData;
    const ifNameTaken = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (ifNameTaken) {
      return alert(`${name} is already in contacts`);
    }
    setContacts(prevContacts => [
      ...prevContacts,
      { ...contactData, id: nanoid() },
    ]);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(prevContact => prevContact.id !== contactId)
    );
  };

  const filterContacts = e => {
    const { value } = e.currentTarget;
    setFilter(value);
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
