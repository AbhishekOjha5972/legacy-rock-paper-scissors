import React from "react";
import styles from "./styles.module.css";
import banner_image from "../../assets/Images/banner_Image.jpg"
import {Link} from "react-router-dom"

const Home_Page = () => {
  return (
    <>
      <div className={styles.home_page_container} style={{background:`url(${banner_image})`}}>
                <Link to="/room">Let's Play</Link>
      </div>
    </>
  );
};

export default Home_Page;
