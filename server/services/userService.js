const jwtDecode = require('jwt-decode');
const Users = require('../models/Users');
const util = require('../lib/util');

const isValid = async (id, refreshToken) => {
  const user = await Users.query().findOne({ id, refreshToken });
  return !!user;
};

const findOneById = async id => Users.query().findById(id);

const findOneByUsername = async username => {
  const user = await Users.query().findOne({ username });
  return user;
};

const emptyRefreshToken = async id =>
  Users.query()
    .findById(id)
    .patch({
      refreshToken: null,
    });

const fetchRefreshToken = async id => {
  const refreshToken = await util.getRefreshToken(id);
  await Users.query()
    .findById(id)
    .patch({
      refreshToken,
    });
  return refreshToken;
};

const reNewRefreshToken = async id => {
  let refreshToken;
  const refreshExpiresIn = process.env.refreshExpiresIn || 120960000;
  const user = await findOneById(id);

  if (user && user.refreshToken) {
    refreshToken = user.refreshToken;
    const decodedToken = jwtDecode(user.refreshToken);
    const diffTimeStamp = Date.now() - decodedToken.createdAt;

    if (diffTimeStamp > refreshExpiresIn) {
      refreshToken = await fetchRefreshToken(id);
    }
  } else {
    refreshToken = await fetchRefreshToken(id);
  }
  return refreshToken;
};

module.exports = {
  emptyRefreshToken,
  findOneById,
  findOneByUsername,
  isValid,
  reNewRefreshToken,
};
