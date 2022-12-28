import React, { useState, useEffect, useReducer, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './LoginUseReducer.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

const initialEmailState = {
  value: '',
  isValid: false,
};

const emailReducer = (currentEmailState, action) => {
  switch (action.type) {
    case 'USER_INPUT_EMAIL':
      return {
        value: action.val,
        isValid: action.val.includes('@'),
      };
    case 'USER_INPUT_BLUR':
      return {
        value: currentEmailState.value,
        isValid: currentEmailState.value.includes('@'),
      };
    default:
      return initialEmailState;
  }
};

const initialPasswordState = {
  value: '',
  isValid: null,
};

const passwordReducer = (currentPasswordState, action) => {
  switch (action.type) {
    case 'USER_INPUT_PASSWORD':
      return {
        value: action.val,
        isValid: action.val.trim().length > 6,
      };
    case 'USER_INPUT_BLUR':
      return {
        value: currentPasswordState.value,
        isValid: currentPasswordState.value.trim().length > 6,
      };
    default:
      return initialEmailState;
  }
};

const Login = (props) => {
  const [emailState, dispatchEmail] = useReducer(
    emailReducer,
    initialEmailState
  );

  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer,
    initialPasswordState
  );

  const [formIsValid, setFormIsValid] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    //* I want this set function (i.e setFormIsValid) to run after 500ms because i don't want it run be re-rendered over and over after every keystroke as the state variables (i.e enteredEmail and enteredPassword) in it changes at every keystrokes
    const timer = setTimeout(() => {
      // console.log('setTimeOut');
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    //* Using the cleanup function to clear the setTimeout that the setFormIsValid function depends on hence consequently it runs only once/twice instead of after every strokes
    return () => {
      // console.log('CleanUp');
      clearTimeout(timer);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT_EMAIL', val: event.target.value });
    //* Not optimal (useEffect hook used)
    // setFormIsValid(event.target.value.includes('@') && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT_PASSWORD', val: event.target.value });
    //* Not optimal (useEffect hook used)
    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'USER_INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'USER_INPUT_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      props.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="Email"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        {/* <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div> */}
        {/* <div
          className={`${classes.control} ${
            passwordState.IsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div> */}
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
          {/* <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button> */}
        </div>
      </form>
    </Card>
  );
};

export default Login;
