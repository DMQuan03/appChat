import React from 'react'
import classNames from 'classnames/bind'
import styles from "./defaultLayout.module.scss"
import Header from '../../components/header/header'
import SideBar from '../../components/sideBar/sideBar'
import { useState, useEffect } from 'react'

const cx = classNames.bind(styles)

const DefaultLayout = ({ children }) => {

    const [logo, setLogo] = useState("")
    const username = sessionStorage.getItem("username")
    const userID = localStorage.getItem("userID")

    return (
        <div>
            <header className={cx("wrapper")}><Header logo={logo} /></header>
            <main className={cx("sb-ct")}>
                <SideBar />
                <div className={cx("contents")}>{children}</div>
            </main>
        </div>
    )
}

export default DefaultLayout