import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import UserFormBox from './userFormBox';
import ChangePwContainer from '../../auth/password/changePwContainer';
import Paper from '../../../shared/paper';
/* --- Actions --- */
import * as userActions from '../../../actions/userAccountAction';
import { addFlashMessage } from '../../../actions/messageAction';

const AdminAccountContainer = ({
  userActions: { getMe, editUserAccount, updateCompanyName },
  addFlashMessage,
  id,
}) => {
  const [userData, setUserData] = useState(null);
  const [pwdOpen, setPwdOpen] = useState(false);

  const fetchUserData = async () => {
    const res = await getMe(id);

    if (res.error) {
      // to render the form
      // setting default userData to {} would not render server data
      setUserData([]);
      return addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    }
    return setUserData(res[0]);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const openPasswordForm = () => setPwdOpen(true);
  const closePasswordForm = () => setPwdOpen(false);
  return (
    <React.Fragment>
      {userData && (
        <div className="container-a r--w-40">
          <h2>Personal Info</h2>
          <p className="pb3 pt2 f-mini">
            유청 서비스를 이용하시는 고객님의 기본정보와 식수량 설정
          </p>
          <Paper
            classname="center"
            component={
              <React.Fragment>
                <h3 className="flex justify-start">Profile</h3>
                {/* 'adminData' condition is needed as 'formik form values' render
            before receiving 'the retrieved admin data' */}
                {!pwdOpen && (
                  <UserFormBox
                    userData={userData}
                    editUserAccount={editUserAccount}
                    updateCompanyName={updateCompanyName}
                    addFlashMessage={addFlashMessage}
                    openPasswordForm={openPasswordForm}
                  />
                )}
                {pwdOpen && (
                  <ChangePwContainer
                    userData={userData}
                    closePasswordForm={closePasswordForm}
                  />
                )}
              </React.Fragment>
            }
          />
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToPorps = state => ({ id: state.auth.id });
const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
});

export default connect(
  mapStateToPorps,
  mapDispatchToProps,
)(AdminAccountContainer);
