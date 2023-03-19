const fs = require('fs').promises;
import { nanoid } from 'nanoid'
const path = require('path');
require('colors');

const contactsPath = path.resolve('./db/contacts.json');

const listContacts = async() => {
  try {
    const contacts = await fs.readFile(contactsPath, { encoding: 'utf-8' });
    return JSON.parse(contacts);
  } catch (error) {
    console.log(`Error ${error.message}`.red);
  }
}

const getContactById = async(contactId) => {
  try {
    const contacts = await listContacts();
    return contacts.filter(({ id }) => id === contactId);
  } catch (error) {
    console.log(`Error ${error.message}`.red);
  }
}

const removeContact = async(contactId) =>{
  try {
    const contacts = await listContacts();
    const filteredList = contacts.filter(({ id }) => id !== contactId);

    if (filteredList.length === contacts.length) {
      console.log(
        `Contact with ID "${contactId}" not found. Try again`
      );
      return;
    }
    await fs.writeFile(contactsPath, JSON.stringify(filteredList, null, 2), { encoding: 'utf-8' });
    return filteredList;
  } catch (error) {
    console.log(`Error ${error.message}`.red);
  }
}

const addContact = async(name, email, phone) => {
  try {    
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone
    };
    const updatedList = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedList, null, 2), {encoding: 'utf-8'})
    return newContact;
  } catch (error) {
    console.log(`Error ${error.message}`.red);
  }
}

listContacts();

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
}