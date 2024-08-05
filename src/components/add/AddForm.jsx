import React, { useState } from "react";
import style from "./AddForm.module.scss";
import axios from "axios";

const AddForm = () => {
  const [inputValues, setInputValues] = useState({
    userName: "",
    address: "",
    email: "",
    password: "",

  });
  const [image,setImage]=useState("")
  const [errors, setErrors] = useState({});
  const { userName, address, email, password } = inputValues;
  const handleInputValues = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!userName.trim()) newErrors.userName = "User name is required.";
    if (!address.trim()) newErrors.address = "Address is required.";
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) newErrors.email = "Invalid email format.";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    // File validation (optional)
    if (!image) newErrors.image = "Image is required.";

    return newErrors;
  };
  const handleCreate = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      try{
        const formData=new FormData()
        formData.append('userName',inputValues.userName)
        formData.append('email', inputValues.email)
        formData.append('address', inputValues.address)
        formData.append('password', inputValues.password)
        formData.append('image', image)
        axios.post("http://localhost:4000/create",  formData )
        .then(result=>console.log('after submit',result.data)
        )
      }catch(err){
        console.log(err);

      }

      // Proceed with form submission logic (e.g., API call)
      console.log("Form submitted successfully:", inputValues);
    }
  };
  return (
    <div className={style.container}>
      <form>
        <div className={style.name}>
          <label>UserName</label>
          <input
            onChange={handleInputValues}
            value={userName}
            name="userName"
            type="text"
          />
          {errors.userName && (
            <span className={style.error}>{errors.userName}</span>
          )}
        </div>
        <div>
          <label>Password</label>
          <input
            name="password"
            value={password}
            onChange={handleInputValues}
            type="password"
          />
          {errors.password && (
            <span className={style.error}>{errors.password}</span>
          )}
        </div>
        <div>
          <label>Email</label>
          <input
            name="email"
            value={email}
            onChange={handleInputValues}
            type="email"
          />
          {errors.email && <span className={style.error}>{errors.email}</span>}
        </div>
        <div>
          <label>Address</label>
          <input
            name="address"
            value={address}
            onChange={handleInputValues}
            type="text"
          />
          {errors.address && (
            <span className={style.error}>{errors.address}</span>
          )}
        </div>
        <div>
          <label>Image</label>
          <input
            name="image"

            onChange={(e)=>setImage(e.target.files[0])}
            type="file"
          />
          {errors.image && <span className={style.error}>{errors.image}</span>}
        </div>
        <button onClick={handleCreate}>Submit</button>
      </form>
    </div>
  );
};

export default AddForm;
