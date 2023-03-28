import { Col } from "antd"
import axios from 'axios'
import classNames from 'classnames/bind'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from "./addfilm.module.scss"
import { v4 } from "uuid"

const cx = classNames.bind(styles)

const AddFilms = () => {

    const navigate = useNavigate()
    const myref = useRef()

    const [des, setDescription] = useState('')
    const [av, setAvatar] = useState('')
    const [ur, setUrl] = useState('')
    const [username, setUserName] = useState('')
    const user = sessionStorage.getItem("username")
    const avtUser = sessionStorage.getItem("avatar")
    const userId = sessionStorage.getItem("userId")

    const [checked, setCheced] = useState(false)
    const [MESSFAIL, setMESSFAIL] = useState(false)

    const uuidV4 = v4()

    // const handleInputDes = (e) => {
    //     setDescription(e.target.value)
    // }

    // const handleInputImg = (e) => {
    //     setAvatar(e.target.value)
    // }

    // const handleInputLink = (e) => {
    //     setUrl(e.target.value)
    //     console.log(url)
    // }
    const handleSubmitFormAddBtn = async (e) => {
        try {
            if (des.length > 0 && av.length > 0 && ur.length > 0) {

                e.preventDefault()
                const data = await {
                    username: username,
                    description: des,
                    avatar: av,
                    main: userId,
                    url: ur,
                    BlogId: uuidV4,
                    avtUser: avtUser,
                }
                // await axios.post("http://localhost:6875/v1/films/create", data);
                const token = sessionStorage.getItem("accessToken")

                await axios({
                    method: "POST",
                    url: "http://localhost:6875/v1/films/create",
                    data: data,
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })
                setDescription('')
                setAvatar("")
                setUrl("")
                navigate("/")
            } else {
                setMESSFAIL(true)
                setTimeout(() => {
                    setMESSFAIL(false)
                }, 3000);
            }
        } catch (error) {
            setCheced(true)
            setTimeout(() => {
                setCheced(false)
            }, 3000);
            console.log(error.response.data.message)
        }

    }


    useEffect(() => {
        setUserName(user)

        return () => {
            return 1
        }
    }, [])
    return (

        <div className={cx("wrapper")}>
            <header style={{ marginTop: 20, fontSize: "1.7rem", fontWeight: 700, color: "white" }} >ADD FILMS</header>
            <div>
                <Col span={24}>
                    <input className={cx("input-add")} value={des} placeholder='Enter description' onInput={(e) => {
                        setDescription(e.target.value)
                    }} />

                </Col>
                <Col span={24} >

                    <input className={cx("input-add")} value={av} placeholder='Enter img' onChange={(e) => {
                        setAvatar(e.target.value)
                    }} />
                </Col>
                <Col span={24}>

                    <input ref={myref} className={cx("input-add")} value={ur} placeholder='Enter Link' onChange={(e) => {
                        setUrl(e.target.value)
                    }} />
                </Col>
                <button type='submit' onClick={handleSubmitFormAddBtn}>Add films</button>
            </div>
            <h3>
                go to
                <Link>
                    Home
                </Link>
            </h3>
            {checked ? <div
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
                    fontWeight: 700
                }}
            > ban can dang nhap de tao moi phim</div> : <Fragment />}

            {MESSFAIL ? <div
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
                    fontWeight: 700
                }}
            > Chưa NHập Đủ Thông Tin</div> : <Fragment />}

        </div>
    )
}

export default AddFilms