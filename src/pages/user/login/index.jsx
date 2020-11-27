import { Checkbox } from 'antd';
import React, { useState } from 'react';
import styles from './style.less';
import LoginFrom from './components/Login';
const { UserName, Password, Submit } = LoginFrom;


const Login = (props) => {
  const { userAndlogin = {}, submitting } = props;
  const { status, type: loginType } = userAndlogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState('account');

  const handleSubmit = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'userAndlogin/login',
      payload: { ...values, type },
    });
  };

  return (
    <div className={styles.main}>
      <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
      <UserName
            name="username"
            placeholder="admin or user"
            rules={[
              {
                required: true,
                message: 'Please Provide Username!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="password"
            rules={[
              {
                required: true,
                message: 'Please Provide Password',
              },
            ]}
          />
       <div>
          <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
            Remember Me
          </Checkbox>
          <a
            style={{
              float: 'right',
            }}
          >
            Forgot Password
          </a>
        </div>
        <Submit loading={submitting}>Login</Submit>
      </LoginFrom>
    </div>
  );
};

export default Login
