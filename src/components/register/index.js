import React, { Fragment, useState } from 'react'
import { Col } from "antd"

import classNames from 'classnames/bind'
import styles from "./register.module.scss"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const cx = classNames.bind(styles)

const Register = () => {

  const navigate = useNavigate()

  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [avt, setAvt] = useState("")
  const [checkSuccess, setCheckSuccess] = useState(true)
  const [checkFail, setCheckFail] = useState(true)

  const handleSubmitFormRegister = async (e) => {
    try {
      if (username.length > 0 && password.length > 0) {

        const data = await {
          username: username,
          password: password,
          avatar: avt
        }
        await axios.post("http://localhost:6875/v1/auth/register", data);
        navigate("/login")
      } else {
        setCheckSuccess(false)

        setTimeout(() => {
          setCheckSuccess(true)
        }, 4000);
      }
    } catch (error) {
      setCheckFail(false)
      setTimeout(() => {
        setCheckFail(true)
      }, 4000);
    }
  }
  return (
    <div>
      <div className={cx("from-Register")}>
        <header style={{ color: "black", height: 50 }}><h1 style={{}}>Register Use</h1></header>
        <div className={cx("text-input")}>
          <span className={cx("title-input")}>Username</span>
          <Col span={24}>
            <input value={username} className={cx("input-Register")} onChange={(e) => {
              setUserName(e.target.value)
            }} />
          </Col>
          <span className={cx("title-input")}>Password</span>
          <Col pan={24}>
            <input type={"password"} className={cx("input-Register")} onChange={(e) => {
              setPassword(e.target.value)
            }} />
          </Col>
          <span className={cx("title-input")}>IMAGE</span>
          <Col pan={24}>
            <input className={cx("input-Register")} onChange={(e) => {
              setAvt(e.target.value)
            }} />
          </Col>
          <div className={cx('btn-Register')}>
            <button className={cx("btn-Register1")} onClick={handleSubmitFormRegister}>Register</button>
            <button className={cx("btn-register1")} onClick={() => {
              navigate("/login")
            }}>Login</button>
          </div>
        </div>
      </div>
      {checkSuccess ? <Fragment /> :
        <div
          style={{
            width: 400,
            height: 40,
            backgroundColor: "white",
            position: "fixed",
            marginTop: -600,
            borderRadius: 20,
            display: 'flex',
            justifyContent: "center",
            alignItems: "center",
            color: "black",
            fontWeight: 700,
            top: 0,
            marginTop: 100,
            marginLeft: -55
          }}
        >Cần Nhập Đủ Thông Tin</div>
      }

      {checkFail ? <Fragment /> :
        <div
          style={{
            width: 400,
            height: 40,
            backgroundColor: "white",
            position: "fixed",
            marginTop: -600,
            borderRadius: 20,
            display: 'flex',
            justifyContent: "center",
            alignItems: "center",
            color: "black",
            fontWeight: 700,
            top: 0,
            marginTop: 100,
            marginLeft: -55
          }}
        >Tài Khoản Đã Tồn Tại Hoặc Lỗi Khi REGISTER</div>
      }
    </div>
  )
}

export default Register