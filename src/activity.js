import localforage from 'localforage';
import { matchSorter } from 'match-sorter';
import sortBy from 'sort-by';

export async function createActivity(obj) {
  const id = Math.random().toString(36).substring(2, 9);
  const activitiy = { id, createdAt: Date.now(), ...obj };
  const activities = await getActivities();
  activities.unshift(activitiy);
  await save(activities);
  return activitiy;
}

export async function getActivities(query) {
  let activities = await localforage.getItem('activities');
  if (!activities) activities = [];
  if (query) {
    activities = matchSorter(activities, query, { keys: ['fileName'] });
  }
  return activities.sort(sortBy('fileName'));
}

export async function getActivity(id) {
  const activities = await localforage.getItem('activities');
  const activity = activities.find((activity) => activity.id === id);
  return activity ?? null;
}

export async function updateContact(id, updates) {
  await fakeNetwork();
  const contacts = await localforage.getItem('contacts');
  const contact = contacts.find((contact) => contact.id === id);
  if (!contact) throw new Error('No contact found for', id);
  Object.assign(contact, updates);
  await set(contacts);
  return contact;
}

export async function deleteContact(id) {
  const contacts = await localforage.getItem('contacts');
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index > -1) {
    contacts.splice(index, 1);
    await set(contacts);
    return true;
  }
  return false;
}

function set(contacts) {
  return localforage.setItem('contacts', contacts);
}

function save(activities) {
  return localforage.setItem('activities', activities);
}

