// import React, { useEffect, useState } from 'react';
// import success from '../images/ti.webp';
// import styles from './styles.module.css';
// import axios from 'axios';
// import { Link, useParams } from 'react-router-dom';

// const EmailVerify = () => {
//   const [validUrl, setValidUrl] = useState(false);
//   const { id, token } = useParams();

//   useEffect(() => {
//     const verifyEmailUrl = async () => {
//       try {
//         const url = `http://localhost:8080/api/shelter/${id}/verify/${token}`;
//         await axios.get(url);
//         setValidUrl(true);
//       } catch (error) {
//         console.log(error);
//         setValidUrl(false);
//       }
//     };
//     verifyEmailUrl();
//   }, [id, token]);

//   return (
//     <div className={styles.container}>
//       {validUrl ? (
//         <>
//           <img src={success} alt="Success" className={styles.success_img} />
//           <h1>Email verified successfully</h1>
//           <Link to="/shelterlogin">
//             <button className={styles.green_btn}>Login</button>
//           </Link>
//         </>
//       ) : (
//         <>
//           <h1>404 Not Found</h1>
//           <p>The email verification link is invalid.</p>
//         </>
//       )}
//     </div>
//   );
// };

// export default EmailVerify;
