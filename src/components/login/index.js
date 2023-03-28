import React, { Fragment, useState } from 'react'
import { Col } from "antd"

import classNames from 'classnames/bind'
import styles from "./login.module.scss"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const cx = classNames.bind(styles)


const Login = () => {

    const navigate = useNavigate()
    const [userName, setUsername] = useState("")
    const [pass, setPassword] = useState("")

    const [checkSuccess, setCheckSuccess] = useState(true)
    const [checkFail, setCheckFail] = useState(true)

    const handleSubmitFormLogin = async (e) => {

        try {

            if (userName.length > 0 && pass.length > 0) {

                e.preventDefault()
                const data = {
                    username: userName,
                    password: pass,
                }
                const user = await axios.post("http://localhost:6875/v1/auth/login", data);

                const admin = user.data.admin
                const username = user.data.username
                const userId = user.data._id
                const avatar = user.data.avatar
                const accessToken = user.data.accessToken



                sessionStorage.setItem("username", username)

                sessionStorage.setItem("admin", admin)
                sessionStorage.setItem("userId", userId)
                sessionStorage.setItem("avatar", avatar)
                sessionStorage.setItem("accessToken", accessToken)
                // document.cookie = `token=${accessToken}`
                navigate("/")
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
            <div className={cx("from-login")}>
                <header style={{ color: "black", height: 50 }}><h1 style={{}}>Login Use</h1></header>
                <div className={cx("text-input")}>
                    <span className={cx("title-input")}>Username</span>
                    <Col span={24}>
                        <input className={cx("input-login")} onChange={(e) => {
                            setUsername(e.target.value)
                        }} />
                    </Col>
                    <span className={cx("title-input")}>Password</span>
                    <Col pan={24}>
                        <input className={cx("input-login")} type={"password"} onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                    </Col>
                    <div className={cx('btn-login')}>
                        <button className={cx("btn-login1")} onClick={handleSubmitFormLogin}>Login</button>
                        <button className={cx("btn-register1")} onClick={() => {
                            navigate("/register")
                        }}>register</button>
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
                >Sai Tài Khoản Hoặc Mật Khẩu</div>
            }
        </div>
    )
}

export default Login