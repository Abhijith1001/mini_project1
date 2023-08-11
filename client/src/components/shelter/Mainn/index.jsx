import React from 'react'
import styles from "./styles.module.css";

const Mainn = () => {
 
    const handleLogout = () => {
      localStorage.removeItem("stoken");
      window.location.reload();
    };
    
  
    return (
      <div className={styles.main_container}>
        <nav className={styles.navbar}>
          <h1>Petzy-shelter</h1>
          <button className={styles.white_btn} onClick={handleLogout}>
            Logout
            
          </button>
        </nav>
      </div>
    );
  
}

export default Mainn