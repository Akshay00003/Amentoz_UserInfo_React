import React, { useEffect, useState } from "react";
import style from "./Views.module.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserId } from "../../features/Store";

const Views = () => {
  const dispatch=useDispatch()
  const [data, setData] = useState([]);
  useEffect(() => {
    const getAllData = async () => {
      await axios.get("http://localhost:4000/users").then((result) => {
        console.log(result.data);
        setData(result.data);
      });
    };
    getAllData();
  }, []);
  const handleDelete = async (id) => {
    try {
      console.log(id);
      await axios.delete(`http://localhost:4000/delete/${id}` )
      .then(res=>console.log(res)
      )
      setData(data.filter((item)=>item._id!==id))
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={style.container}>
      <div className={style.item}>
        <table>
          <tbody>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Address</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.userName}</td>
                  <td>{item.email}</td>
                  <td>{item.address}</td>
                  <td>
                    <img
                      src={`http://localhost:4000/Images/` + item.image}
                      alt="img"
                    />
                  </td>
                  <td className={style.btnWrapper}>
                    <button onClick={()=>dispatch(setUserId(item._id))} className={style.btn1}>Edit</button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className={style.btn2}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <h1>No data available</h1>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Views;
