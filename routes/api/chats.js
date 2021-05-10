const users = [];

function userJoin( id, name , mt , mf , mtn){
  const user = { id , name , mt , mf , mtn};
  users.push(user);
  return user;
}

function getCurrentUser(id){
  return users.find(user => user.id === id);
}

module.exports = {
  userJoin,
  getCurrentUser
};
