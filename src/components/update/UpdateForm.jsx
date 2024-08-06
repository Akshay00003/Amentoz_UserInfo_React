import React, { useEffect, useState } from 'react';
import style from './UpdateForm.module.scss';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { FaWindowClose } from "react-icons/fa";
import { setUserId } from '../../features/Store';

const UpdateForm = () => {
  const id = useSelector((state) => state.user.userId);
  const dispatch=useDispatch()

  const [user, setUser] = useState({});
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await axios.get(`http://localhost:4000/user/${id}`);
        setUser(result.data);
        setUserName(result.data.userName);
        setEmail(result.data.email);
        setAddress(result.data.address);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getUser();
  }, [id]);

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

  const handleCreate = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      try {
        const formData = new FormData();
        formData.append('userName', userName);
        formData.append('email', email);
        formData.append('address', address);
        formData.append('password', password);
        formData.append('image', image);
        console.log(formData);


        const result = await axios.put(`http://localhost:4000/update/${id}`, formData);
        console.log('After submit:', result.data);
        dispatch(setUserId(""))

        // Assuming selectView() is a function you need to call after successful update
        // dispatch(selectView());
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className={style.container}>
      <form>
      <FaWindowClose onClick={()=>dispatch(setUserId(""))} size={30} className={style.close} />
        <div className={style.name}>
          <label>UserName</label>
          <input
            onChange={(e) => setUserName(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          {errors.email && <span className={style.error}>{errors.email}</span>}
        </div>
        <div>
          <label>Address</label>
          <input
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
          />
          {errors.image && <span className={style.error}>{errors.image}</span>}
        </div>
        <button onClick={handleCreate}>Submit</button>
      </form>
    </div>
  );
};

export default UpdateForm;