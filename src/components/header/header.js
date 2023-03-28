import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from "./header.module.scss"
import axios from "axios"


const cx = classNames.bind(styles)


const Header = () => {

    const navigate = useNavigate()
    const [checkLogo, setCheckLogo] = useState("")
    const [checkLogin, setCheckLogin] = useState([])
    const [checkUser, setCheckUser] = useState([])
    const [isLogin, setIsLogin] = useState(false)

    const avt = sessionStorage.getItem("avatar")
    const username = sessionStorage.getItem("username")
    const userId = sessionStorage.getItem("userId")
    const token = sessionStorage.getItem("accessToken")

    useEffect(() => {
        const user = async () => {
            try {
                axios({
                    method: "GET",
                    url: "http://localhost:6875/v1/auth"
                })
                    .then(res => {

                        const arruser = []
                        for (let key in res.data) {
                            arruser.push(res.data[key]._id)
                        }

                        setCheckUser(arruser)

                        setTimeout(() => {
                            setIsLogin(false)
                        }, 1000);
                    })
            } catch (error) {
                console.log(error)
            }
        }

        user()

    }, [isLogin])


    useEffect(() => {
        setIsLogin(true)

        const handleLogout = () => {
            try {

            } catch (error) {

            }
        }
        return () => {
            setIsLogin(false)
        }
    }, [])
    return (
        <header styles={cx("wrapper")} className={cx("wrapper")}>
            <div className={cx('logo-containers')}>
                <svg viewBox="0 0 32 18" xmlns="http://www.w3.org/2000/svg" className={cx("h-logo")}><g ><path d="M26.633 8.69l-3.424-3.431 1.711-3.43 5.563 5.575c.709.71.709 1.861 0 2.572l-6.847 6.86c-.709.711-1.858.711-2.567 0a1.821 1.821 0 010-2.571l5.564-5.575z" fill-opacity="0.64"></path><path d="M21.07.536a1.813 1.813 0 012.568 0l1.283 1.286L9.945 16.83c-.709.71-1.858.71-2.567 0l-1.284-1.287L21.071.536zm-6.418 4.717l-2.567 2.572-3.424-3.43-4.28 4.288 3.424 3.43-1.71 3.43L.531 9.97a1.821 1.821 0 010-2.572L7.378.537A1.813 1.813 0 019.945.535l4.707 4.717z"></path></g></svg>
                <Link style={{ textDecoration: "none", color: "white" }} to={"/"}><h1 className={cx("Text-logo")}>{checkLogo ? checkLogo :
                    <>
                        <span className={cx("logo-text1")}>QUAN</span>
                        <span className={cx("logo-text2")}>Tech</span>
                    </>
                }</h1></Link>
            </div>
            {checkUser?.includes(userId) > 0 ?
                <div className={cx("info-user-btn")}>
                    <div className={cx("alert-user")}>
                        <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 pointer-events-none hover:text-theme-label-primary"><path d="M12 3a2.312 2.312 0 012.25 2.847 6.39 6.39 0 014.106 5.491l.015.264.004.21v2.226l.072.022c.803.28 1.405.988 1.53 1.852l.018.175.005.158c0 1.224-.95 2.226-2.154 2.307l-.159.006-2.046-.001-.013.033a3.94 3.94 0 01-3.216 2.384l-.21.016-.202.005a3.926 3.926 0 01-3.536-2.22l-.083-.183-.015-.035H6.313c-1.171 0-2.139-.87-2.292-1.998l-.016-.156L4 16.245c0-.903.52-1.693 1.325-2.076l.165-.071.135-.048v-2.238A6.377 6.377 0 019.75 5.846 2.312 2.312 0 0112 3zm0 3.938c-.437 0-.86.057-1.262.165l-.148.042a4.876 4.876 0 00-3.46 4.441l-.005.226v2.808c0 .414-.31.756-.71.806l-.197.012a.813.813 0 00-.007 1.613l.101.007h3.25l.005.143a2.438 2.438 0 002.272 2.289l.161.005.16-.005a2.438 2.438 0 002.272-2.265l.005-.168h3.25l.102-.006a.813.813 0 000-1.612l-.196-.012a.813.813 0 01-.712-.704l-.006-.103v-2.807l-.003-.183a4.878 4.878 0 00-3.461-4.485l-.143-.041A4.881 4.881 0 0012 6.937zM12 4.5a.812.812 0 10.788 1.013l.018-.099.007-.101A.812.812 0 0012 4.5z" fill="currentcolor" fill-rule="evenodd"></path></svg>
                    </div>
                    <button className={cx("smart")}>
                        <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none w-6 h-6 text-theme-status-cabbage"><path d="M7.833 13a3.167 3.167 0 013.162 2.987l.005.18v1.666a3.167 3.167 0 01-2.987 3.162l-.18.005H6.167a3.167 3.167 0 01-3.162-2.987L3 17.833v-1.666a3.167 3.167 0 012.987-3.162l.18-.005h1.666zm10 0a3.167 3.167 0 013.162 2.987l.005.18v1.666a3.167 3.167 0 01-2.987 3.162l-.18.005h-1.666a3.167 3.167 0 01-3.162-2.987l-.005-.18v-1.666a3.167 3.167 0 012.987-3.162l.18-.005h1.666zm-10 1.5H6.167c-.872 0-1.588.67-1.66 1.523l-.007.144v1.666c0 .872.67 1.588 1.523 1.66l.144.007h1.666l.144-.006a1.667 1.667 0 001.516-1.509l.007-.152v-1.666c0-.872-.67-1.588-1.523-1.66l-.144-.007zm10 0h-1.666c-.872 0-1.588.67-1.66 1.523l-.007.144v1.666c0 .872.67 1.588 1.523 1.66l.144.007h1.666l.144-.006a1.667 1.667 0 001.516-1.509l.007-.152v-1.666c0-.872-.67-1.588-1.523-1.66l-.144-.007zM7.833 3a3.167 3.167 0 013.162 2.987l.005.18v1.666a3.167 3.167 0 01-2.987 3.162l-.18.005H6.167a3.167 3.167 0 01-3.162-2.987L3 7.833V6.167a3.167 3.167 0 012.987-3.162L6.167 3h1.666zm12.528 3.259a.75.75 0 01-.009 1.484l-.102.007h-2.5v2.5a.75.75 0 01-1.491.111l-.009-.11V7.75h-2.5l-.111-.009a.75.75 0 01.009-1.484l.102-.007h2.5v-2.5a.75.75 0 011.491-.111l.009.11V6.25h2.5l.111.009zM7.833 4.5H6.167c-.872 0-1.588.67-1.66 1.523l-.007.144v1.666c0 .872.67 1.588 1.523 1.66l.144.007h1.666l.144-.006a1.667 1.667 0 001.516-1.509l.007-.152V6.167c0-.872-.67-1.588-1.523-1.66L7.833 4.5z" fill="currentcolor" fill-rule="evenodd"></path></svg>
                    </button>
                    <button className={cx("btn-user")} onClick={() => {
                        navigate("/")
                        setTimeout(() => {

                            navigate(`/profile/${username}`)
                        }, 1)
                    }}>
                        <span className={cx("span-btnuser")}>10</span>
                        <div>
                            <img src={avt} />
                        </div>
                    </button>
                    <button
                        className={cx("btn-logout")}
                        onClick={() => {
                            sessionStorage.removeItem("accessToken")
                            sessionStorage.removeItem("username")
                            sessionStorage.removeItem("admin")
                            sessionStorage.removeItem("avatar")
                            sessionStorage.removeItem("userId")
                            navigate("/login")
                        }}>Logout</button>
                </div>
                :
                <div>
                    <button className={cx("btn-header")} onClick={() => {
                        navigate("/login")
                    }}>Login</button>
                    <button className={cx("btn-header")} onClick={() => {
                        navigate("/register")
                    }}>Register</button>
                </div>
            }
        </header>
    )
}

export default Header