import React, { useRef, useImperativeHandle } from 'react';
import classes from './Input.module.css';

//* The forwardRef method allows the custom functional component pass ref to it like a prop NB:- Rarely use this approach
const Input = React.forwardRef(
  ({ id, type, value, onChange, onBlur, isValid, label }, ref) => {
    const inputRef = useRef();

    const activate = () => {
      inputRef.current.focus();
    };

    //* Although i was able to pass ref between components, i still need to use the useImperativeHandle to declare the data i was to pass as ref and in this case it is function activate
    useImperativeHandle(ref, () => {
      return {
        focus: activate,
      };
    });

    return (
      <div
        className={`${classes.control} ${
          isValid === false ? classes.invalid : ''
        }`}
      >
        <label htmlFor={id}>{label}</label>
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          ref={inputRef}
        />
      </div>
    );
  }
);

export default Input;
