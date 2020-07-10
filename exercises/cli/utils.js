const fs = require('fs');
const path = require('path');

// this path needs to be relative to work with fs
const contactsLocation = path.join(__dirname, 'contacts.json');

/**
 * should read the contacts at the
 * @contactsLocation path and convert
 * it to a js object
 */
const getContacts = () => {
  let contacts;
  try {
    contacts = fs.readFileSync(contactsLocation, { encoding: 'utf-8'});
    return JSON.parse(contacts);
  } catch (err) {
    console.log('Something went wrong', err);
  }
};

/**
 * takes a contacts object, converts it to JSON
 * and saves it at the @contactsLocation path
 * @param {Object} contacts contacts object
 */
const saveContacts = (contacts) => {

}

module.exports = {
  contactsLocation,
  getContacts,
  saveContacts
}

