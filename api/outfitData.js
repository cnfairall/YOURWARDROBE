import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getOutfits = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/outfits.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createOutfit = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/outfits.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateOutfit = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/outfits/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteOutfit = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/outfits/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleOutfit = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/outfits/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getOutfits,
  createOutfit,
  updateOutfit,
  deleteOutfit,
  getSingleOutfit,
};
