import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const fiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    pincode: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();
  const pincodeInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPincode = pincodeInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPinIsValid = fiveChars(enteredPincode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      pincode: enteredPinIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPinIsValid;

    if (!formIsValid) {
      return;
    }

    props.onSubmit({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      pincode: enteredPincode,
    });
  };

  const nameInputClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const streeInputClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const cityInputClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;
  const pinInputClasses = `${classes.control} ${
    formInputsValidity.pincode ? "" : classes.invalid
  }`;
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please Enter a valid Name</p>}
      </div>
      <div className={streeInputClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please Enter a valid street</p>}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please Enter a valid city</p>}
      </div>
      <div className={pinInputClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={pincodeInputRef} />
        {!formInputsValidity.pincode && (
          <p>Please Enter a valid picode(5 char long)</p>
        )}
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
