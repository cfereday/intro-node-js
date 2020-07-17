const users = new Array(20).fill(0)
.map((_, i) => {
  return {
    id: i,
    createdAt: Date.now() + i,
    email: `readycoder${i}@gmail.com`
  }
});

const matchUserId = (id) => {
  if (id === undefined || id === null) {
    return 'No match';
  }

  if (!users.includes(id)) {
    return 'No match';
  }

  if (users.length === 20) {
    return users.find(user =>  {
      if (user.id === id) {
        return user;
      }
    });
  }
};

const fetchIdFromPath = (url) => {
  return parseInt(url.split('/').pop());
};

// simulate async db call with promise
const findUser = (id) => new Promise((resolve, reject) => {
  const user = matchUserId(id);
  if (user !== 'No match') {
    return resolve(user)
  }
  reject(new Error(`No user with id "${id}"`))
});

// simulate async db call with promise
const deleteUser = (id) => new Promise((resolve, reject) => {
  const id = matchUserId(id).id;
  console.log('here is id', id);
  if (id !== 'No match') {
    resolve(id);
  }
  reject(new Error(`No user with id "${id}"`))
});

module.exports = {
  findUser,
  deleteUser,
  matchUserId,
  fetchIdFromPath
};
