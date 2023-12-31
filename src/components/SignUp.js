import React, { useEffect, useState } from "react";
import { validate } from "./validate";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { notify } from "./toast";

// styles
import styles from './SignUp.module.css'

const SignUp = () => {
  // state for recieve input value
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAccepted: false,
  });
  // focus
  const [touched, setTouch] = useState({});
  const focusHandler = (event) => {
    setTouch({ ...touched, [event.target.name]: true });
  };
  // read data from validate
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setErrors(validate(data));
  }, [data, touched]);
  // function for recieve data from inputs
  const changeHandler = (event) => {
    if (event.target.name === "isAccepted") {
      setData({ ...data, [event.target.name]: event.target.checked });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };
  // submit form
  const submitHandler = (event) => {
    event.preventDefault();
    //pass

    if (!Object.keys(errors).length) {
      notify("You signed in succesfully","success");
    }
    // not pass
    else {
      notify("invalid data", "error");
      setTouch({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
        isAccepted: true,
      });
    }
  };

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={submitHandler} className={styles.formContainer}>
          <h2 className={styles.header}>SignUp</h2>
          <div className={styles.formField}>
            <label>Name</label>
            <input
            className={(errors.name&&touched.name)?styles.uncompleted :styles.formInput}
              type="text"
              name="name"
              value={data.name}
              onChange={changeHandler}
              onFocus={focusHandler}
            />
            {errors.name && touched.name && <span>{errors.name}</span>}
          </div>
          <div className={styles.formField}>
            <label>Email</label>
            <input
            className={(errors.email&&touched.email)?styles.uncompleted :styles.formInput}
              type="text"
              name="email"
              value={data.email}
              onChange={changeHandler}
              onFocus={focusHandler}
            />
            {errors.email && touched.email && <span>{errors.email}</span>}
          </div>
          <div className={styles.formField}>
            <label>Password</label>
            <input
            className={(errors.password&&touched.password)?styles.uncompleted :styles.formInput}
              type="password"
              name="password"
              value={data.password}
              onChange={changeHandler}
              onFocus={focusHandler}
            />
            {errors.password && touched.password && (
              <span>{errors.password}</span>
            )}
          </div>
          <div className={styles.formField}>
            <label>Confirm Password</label>
            <input
            className={(errors.password&&touched.password)?styles.uncompleted :styles.formInput}
              type="password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={changeHandler}
              onFocus={focusHandler}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <span>{errors.confirmPassword}</span>
            )}
          </div>
          <div className={styles.formField}>
            <div className={styles.checkBoxContainer}>
            <label>I accepted privacy policy</label>
            <input
           
              type="checkbox"
              name="isAccepted"
              value={data.isAccepted}
              onChange={changeHandler}
              onFocus={focusHandler}
            />
            {errors.isAccepted && touched.isAccepted && (
              <span>{errors.isAccepted}</span>
            )}
            </div>
          </div>
          <div className={styles.formButtons}>
            <a href="">Login</a>
            <button type="submit">SignUp</button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default SignUp;
