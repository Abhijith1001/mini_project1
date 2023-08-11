import { Fragment, React, useEffect, useState } from 'react'
import success from ".././images/ti.webp"
import styles from './styles.module.css'
import axios from "axios";
import {Link, useParams} from 'react-router-dom'
const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false)
  const param = useParams()

  useEffect(() => {
    const verifyEmailUrl = async()=>{
        try {
          const url = `http://localhost:8080/api/users/${param.id}/verify/${param.token}`
          const {data} = await axios.get(url)
          console.log(data);
          setValidUrl(true)
        } catch (error) {
          console.log(error);
          setValidUrl(false)
          
        }
        
    }
    verifyEmailUrl()
  }, [param])
  

  return (
    <div>
      <Fragment>
        {validUrl ? (
          <div className={styles.container}>
            <img src={success} alt="" className={styles.success_img}/>
            <h1>Email verified successfully</h1>
            <Link to="/login">
              <button className={styles.green_btn}>Login</button>
            </Link>
          </div>
        ): (
            <h1>404 not found</h1>
            )}
    </Fragment>
    </div >
  )
}

export default EmailVerify