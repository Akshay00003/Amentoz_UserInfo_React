import React, { useEffect, useState } from "react";
import style from "./Views.module.scss";
import axios from "axios";

const Views = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getAllData = async () => {
      await axios
        .get("http://localhost:4000/users")
        .then((result) => {
          console.log(result.data);
          setData(result.data);
        });
    };
    getAllData();
  }, []);
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
            </tr>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.userName}</td>
                  <td>{item.email}</td>
                  <td>{item.address}</td>
                  <td>
                    <img src={`http://localhost:4000/Images/`+item.image} alt="img" />
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
