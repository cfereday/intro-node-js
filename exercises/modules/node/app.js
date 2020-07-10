const initialData = require('./data');
const { getPostsForUser, getUserById } = require('./api');

const showPostsForCurrentUser = (userId, cb) => {
    const allInitalPosts = initialData.posts;

    allInitalPosts.map(post => getPostsForUser(userId, posts => {
        const postTemplates = posts.map(post => {
            return `
      <div class="post">
        ${post.title}
        ${post.body}
        ${post.createdBy}
      </div>`
        });
        cb(postTemplates)
    })
    )
};

const showUserProfile = (userId, cb) => {
    const allInitalUsers = initialData.posts;

    allInitalUsers.map(user => getUserById(userId, user => {
        const profile = `
      <div>
        ${user.name}
      </div>
    `;
        cb(user)
    })
    )
};

module.exports = {
    showPostsForCurrentUser,
    showUserProfile
};
