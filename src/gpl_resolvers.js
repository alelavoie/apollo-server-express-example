import { loadFixtures, sortByDate } from "./utils";
export default {
  Query: {
    forums: () => {
      return Object.values(global.fakeDatabase.forums);
    },
    forum: (parent, { id }) => {
      return global.fakeDatabase.forums[id];
    },
    users: () => {
      return Object.values(global.fakeDatabase.users);
    },
    user: (parent, { id }) => {
      return global.fakeDatabase.users[id];
    },
    currentUser: (parent, args, { currentUser }) => {
      return currentUser;
    }
  },

  Mutation: {
    seed: () => {
      fakeDatabase = loadFixtures();
      return "Seed successful";
    },
    createForum: (parent, { name }, { currentUser }) => {
      const new_id = Object.values(global.fakeDatabase.forums).length + 1;
      const forum = {
        id: new_id,
        name,
        userIds: [currentUser.id]
      };
      fakeDatabase.users[currentUser.id].forumIds.push(new_id);
      fakeDatabase.forums[new_id] = forum;
      return forum;
    },
    joinForum: (parent, { id }, { currentUser }) => {
      fakeDatabase.users[currentUser.id].forumIds.push(id);
      fakeDatabase.forums[id].userIds.push(currentUser.id);
      return "Successfully joind forum " + global.fakeDatabase.forums[id].name;
    },
    postMessage: (parent, { forum_id, text }, { currentUser }) => {
      const new_id = Object.values(global.fakeDatabase.messages).length + 1;
      const message = {
        id: new_id,
        text: text,
        sendingTime: JSON.stringify({ now: new Date() }),
        authorId: currentUser.id,
        forumId: forum_id
      };
      fakeDatabase.messages[new_id] = message;

      return "Successfully posted message in " + fakeDatabase.forums[forum_id].name;
    }
  },

  User: {
    forums: user => {
      return Object.values(fakeDatabase.forums).filter(forum =>
        user.forumIds.includes(forum.id)
      );
    }
  },

  Forum: {
    users: forum => {
      return Object.values(fakeDatabase.users).filter(user =>
        forum.userIds.includes(user.id)
      );
    },
    messages: forum => {
      let messages = Object.values(fakeDatabase.messages).filter(
        message => message.forumId == forum.id
      );
      return messages.sort(sortByDate);
    }
  },

  Message: {
    author: message => {
      return fakeDatabase.users[message.authorId];
    }
  }
};
