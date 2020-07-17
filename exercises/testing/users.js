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
        return;
    }

    if (!users.includes(id)) {
        return;
    }

    if (users.length === 20) {
        return users.find(user => {
            if (user.id === id) {
                return user;
            }
        });
    }
};

const fetchIdFromPath = (id) => {
    return parseInt(id);
};

// simulate async db call with promise
const findUser = (id) => new Promise((resolve, reject) => {
    const user = matchUserId(id);
    if (user) {
        return resolve(user)
    }
    reject(new Error(`No user with id "${id}"`))
});

// simulate async db call with promise
const deleteUser = (id) => new Promise((resolve, reject) => {
    const id = matchUserId(id).id;
    const indexOfId = users.findIndex(user => user.id === id);

    if (id) {
        users.splice(indexOfId, 1);
        resolve({id: id});
    }
    reject(new Error(`No user with id "${id}"`))
});

module.exports = {
    findUser,
    deleteUser,
    matchUserId,
    fetchIdFromPath
};
