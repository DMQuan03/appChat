import React, { Fragment, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./prf.module.scss"
import { Films } from '../../components/listFilms/films'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import POSTBLOG from '../../components/listPost'
import { v4 } from "uuid"

const cx = classNames.bind(styles)

const YourStore = () => {

    const prams = useParams()
    const navigate = useNavigate()

    const uuidV4 = v4()

    const [listBlogOfUser, setListBlogOfUser] = useState([])
    const [infoUserOnly, setInfoUserOnly] = useState([])
    const [likeOfUser, setLikeOfUser] = useState(0)
    const [isLoading, setIsLoading] = useState(false)



    const [title, setTitle] = useState("")
    const [img, setImg] = useState("")
    const token = sessionStorage.getItem("accessToken")
    const userId = sessionStorage.getItem("userId")

    const handleAddBlog = async () => {

        try {
            const avtUser = await sessionStorage.getItem("avatar")
            const username = await sessionStorage.getItem("username")

            const data = await {
                username: username,
                title: title,
                img: img,
                IdBlog: userId,
                avatarUser: avtUser,
                IdCmt: uuidV4
            }
            await axios({
                method: "POST",
                data: data,
                url: "http://localhost:6875/v1/blog/createBlog",
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setImg("")
            setTitle("")
            setIsLoading(true)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        const filmsOnlyUser = async () => {

            try {
                await axios.get(`http://localhost:6875/v1/films/profile/${prams.username}`)
                    .then(res => {
                        const lengthData = res.data

                        const totalLike = (acc, curr) => {
                            const total = acc + curr.like

                            return total
                        }

                        const result = lengthData.reduce(totalLike, 0)

                        setLikeOfUser(result)
                    })
                    .catch(err => {
                        console.log(err)
                    })
                await axios.get(`http://localhost:6875/v1/auth/onlyUser/${prams.username}`)
                    .then(res => {
                        setInfoUserOnly(res.data)

                    })
            } catch (error) {
                console.log(error)
            }
        }

        filmsOnlyUser()
    }, [isLoading])

    useEffect(() => {
        const Blogs = async () => {
            try {
                await axios({
                    method: "GET",
                    url: `http://localhost:6875/v1/blog/getBlog/${prams.username}`,
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })
                    .then(res => {
                        setListBlogOfUser(res.data)
                    })
            } catch (error) {
                console.log(error)
            }
        }

        Blogs()

    }, [])
    return (
        <div id={cx("wrapper")}>
            <header className={cx("intro")}>
                <img className={cx("avt-user")} src={infoUserOnly[0]?.avatar || ""} />
                <p className={cx("username")} style={{ position: "fixed", marginTop: -110, fontSize: "2rem", marginLeft: 840 }}>{infoUserOnly[0]?.username}</p>
            </header>
            <main className={cx("content")}>
                <div className={cx("intro-user")}>
                    <div className={cx("des-intro")}>
                        <div className={cx("text-des")}>XIn Chao tat ca cac ban</div>
                    </div>
                    <div className={cx("time-register")}>
                        da tham gia tu {infoUserOnly[0]?.createdAt.slice(0, 10)}
                    </div>
                    <div className={cx("likeOfUser")}>
                        <p>luot thich :
                            <span> {likeOfUser}</span>
                        </p>
                    </div>
                </div>
                <div className={cx("content-user")}>
                    <div className={cx("nones")}></div>
                    {userId === infoUserOnly[0]?._id ? <div className={cx("add-films")}>
                        <div className={cx("add-text")}>

                            <input value={title} placeholder='Enter title for Blog' style={{ marginTop: 22, borderRadius: 10 }} className={cx("input-text-add")} onChange={(e) => {
                                setTitle(e.target.value)

                            }} />
                            <input value={img} placeholder='IMG' style={{ marginTop: 22, borderRadius: 10 }} className={cx("input-text-add")} onChange={(e) => {
                                setImg(e.target.value)

                            }} />
                        </div>
                        <div className={cx("add-btn")}>
                            <button className={cx("btn-add-text")} style={{ borderRadius: 10, border: "none" }} onClick={handleAddBlog}>ADD</button>
                        </div>
                    </div> : <Fragment />}
                    <div style={{ marginTop: 100, borderTop: "1px solid #e8ebef", height: "auto", paddingBottom: 30 }}>
                        <div>
                            {listBlogOfUser?.map((blog, index) => {
                                return <POSTBLOG key={index} data={blog} />
                            })}
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}

export default YourStore