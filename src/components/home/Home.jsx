import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Views from "../view/Views";
import styles from './Home.module.scss'
import { useSelector } from "react-redux";

const Home = () => {
    const view=useSelector((state)=>state.user.view)
  return (
    <div className={styles.container}>
      <Sidebar />
      {view&& <Views />}

    </div>
  );
};

export default Home;
