const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');
const knex = require('../database');
const util = require('../lib/util');
const sendEmail = require('../lib/send-email');
const userService = require('../services/userService');

/* --- Login --- */
exports.loginUser = async (req, res, next) => {
  try {
    let error;
    const { expiresIn } = process.env;
    const { username, password } = req.body;

    const user = await userService.findOneByUsername(username);

    if (!user) {
      error = new Error('Unauthorized');
      error.status = 401;
      throw error;
    }

    // const isActive = await userService.isActive(user.id);

    // if (!isActive) {
    //   error = new Error('Inactivated user');
    //   error.status = 401;
    //   throw error;
    // }

    const isMatch = await util.comparePassword(password, user.password);

    if (!isMatch) {
      error = new Error('Unauthorized');
      error.status = 401;
      throw error;
    }

    const token = await util.getRandomToken(user);
    const refreshToken = await userService.reNewRefreshToken(user.id);

    res.header('Authorization', `Bearer ${token}`);
    res.header('expiresin', expiresIn);
    return res.status(200).json({
      id: user.id,
      companyName: user.companyName,
      startDate: user.startDate,
      endDate: user.endDate,
      isAdmin: user.isAdmin,
      businessType: user.businessType,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

/* --- logout --- */
exports.logoutUser = async (req, res, next) => {
  try {
    const { id } = req.body;
    await userService.emptyRefreshToken(id);
    return res.status(200).json('success');
  } catch (err) {
    next(err);
  }
};

/* --- Password --- */
exports.verifyAdminUser = (req, res) => {
  const { password } = req.body;
  return knex('users')
    .where({ isAdmin: true })
    .first()
    .then(user => util.comparePassword(password, user.password))
    .then(isMatch => {
      if (isMatch) {
        return res.status(200).json();
      }
      return res.status(401).json('Unauthorized');
    })
    .catch(err => res.status(500).json(err));
};

const setPassword = (id, newPassword) =>
  new Promise((resolve, reject) => {
    util.bcryptPassword(newPassword).then(hashedPassword =>
      knex('users')
        .where({ id })
        .first()
        .update({
          password: hashedPassword,
        })
        .then(() => resolve())
        .catch(() => reject(new Error('Setting new password failed'))),
    );
  });

exports.changePassword = (req, res) => {
  const { id, password, newPassword } = req.body;
  knex('users')
    .where({ id })
    .first()
    .then(user => {
      if (!user) {
        return res.status(401).json('Unauthorized');
      }
      util.comparePassword(password, user.password).then(isMatch => {
        if (isMatch) {
          return setPassword(id, newPassword)
            .then(() => res.status(200).json())
            .catch(err => res.status(409).json(err));
        }
        return res.status(401).json('Unauthorized');
      });
    })
    .catch(err => res.status(500).json(err));
};

// reset user's password by admin (password check is not required)
exports.resetPassword = (req, res) => {
  const { id, newPassword } = req.body;
  setPassword(id, newPassword)
    .then(() => res.status(200).json())
    .catch(err => res.status(500).json(err));
};

// when user forgot password
exports.resetPasswordWithToken = (req, res) => {
  const { newPassword } = req.body;
  const { token } = req.params;

  return knex('users')
    .where({ resetPasswordToken: token })
    .first()
    .then(user => {
      if (user) {
        const id = user.id;

        try {
          util.isValidToken(token);
          return setPassword(id, newPassword)
            .then(() =>
              knex('users')
                .where({
                  id,
                })
                .first()
                .update({
                  resetPasswordToken: null,
                }),
            )
            .then(() => res.status(200).json())
            .catch(err => res.status(409).json(err));
        } catch (err) {
          return res.status(409).json('Invalid token');
        }
      }
      return res.status(409).json('Invalid token');
    })
    .catch(err => res.status(409).json(err));
};

/* --- Forgot username/password --- */
exports.findUsernameWithEmail = (req, res) =>
  knex('users')
    .where({ email: req.body.email })
    .first()
    .then(user => {
      if (user) {
        const companyName = user.companyName;
        const username = user.username;
        return res.status(200).json({ companyName, username });
      }
      return res.status(409).json('User not found');
    })
    .catch(() => res.status(500).json());

exports.findUsernameWithContact = (req, res) =>
  knex('users')
    .where({ contactNo: req.body.contactNo })
    .first()
    .then(user => {
      if (user) {
        const companyName = user.companyName;
        const username = user.username;
        return res.status(200).json({ companyName, username });
      }
      return res.status(409).json('User not found');
    })
    .catch(() => res.status(500).json());

exports.forgotPassword = (req, res) => {
  const { username, email } = req.body;

  return knex('users')
    .where({ username, email })
    .first()
    .then(async user => {
      if (user) {
        const token = await util.getRandomToken(user);
        const mailOptions = {
          from: process.env.GMAIL,
          to: user.email,
          subject: '유청 비밀번호 변경 요청',
          html: `${username} 회원님의 유청 계정에 대한 비밀번호 변경 요청을 접수하였습니다. <br/><br/> 비밀번호를 재설정하기위해, 아래 링크를 클릭하거나 복사하여서 브라우저로 가세요. <br/> 링크는 1시간동안 활성 상태로 유지됩니다. <br/><br/> http://${
            req.headers.host
          }/reset?token=${token} <br/><br/> 만약 회원님이 비밀번호를 요청하지 않으셨다면 이 이메일을 무시하세요. <br/> 회원님의 비밀번호는 변경되지 않습니다.`,
        };
        return knex('users')
          .where({ username })
          .first()
          .update({
            resetPasswordToken: token,
          })
          .then(() => {
            sendEmail(mailOptions)
              .then(() => {
                res.status(201).send();
              })
              .catch(err => next(err));
          })
          .catch(() => res.status(409).json('User not found'));
      }
      return next(err);
    })
    .catch(err => next(err));
};

// Refresh Access Token
exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    // const refreshTokenVerify = jwt.verify(refreshToken, process.env.secret);

    const decodedRefreshToken = jwtDecode(refreshToken);

    const isValid = await userService.isValid(
      decodedRefreshToken.id,
      refreshToken,
    );

    if (!isValid) {
      const error = new Error('Unauthorized refresh');
      error.status = 401;
      throw error;
    }

    const user = await userService.findOneById(decodedRefreshToken.id);
    const token = await util.getRandomToken(user);
    const newRefreshToken = await userService.reNewRefreshToken(user.id);

    res.header('Authorization', `Bearer ${token}`);
    res.header('expiresin', process.env.expiresIn);
    return res.status(200).json({
      id: user.id,
      companyName: user.companyName,
      isAdmin: user.isAdmin,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    let error;
    if (err instanceof jwt.JsonWebTokenError) {
      error = new Error('Invalid token');
      error.status = 401;
    } else {
      error = err;
    }
    next(error);
  }
};
