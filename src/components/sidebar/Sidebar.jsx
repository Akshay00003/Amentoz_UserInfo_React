import React, { useState } from "react";
import styles from "./Sidebar.module.scss";
import AddForm from "../add/AddForm";
import { useSelector,useDispatch } from "react-redux";
import { selectView } from "../../features/Store";

const Sidebar = () => {
    const view=useSelector((state)=>state.user.view)
    const dispatch=useDispatch()
    const [addForm,setAddForm]=useState(false)
  return (
    <div className={styles.container}>
      <div className={styles.btnS}>
        <button onClick={()=>setAddForm(!addForm)} className={styles.btn1}>Add User</button>
        {addForm && <AddForm />}
        <button onClick={()=>dispatch(selectView())} className={styles.btn1}>Views</button>
      </div>
    </div>
  );
};

export default Sidebar;
