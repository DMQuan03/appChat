import React, { Fragment, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from "./listPost.module.scss"
import { AiOutlineHeart, AiFillDelete, AiOutlineComment } from "react-icons/ai";
import axios from 'axios';

const cx = classNames.bind(styles)

const POSTBLOG = ({ data }) => {

    const userId = sessionStorage.getItem("userId")
    const admin = sessionStorage.getItem("admin")
    const token = sessionStorage.getItem("accessToken")


    return (
        <div className={cx("wrapper")}>
            <div className={cx("user-info")}>
                <img style={{ margin: 9 }} src={data.avatarUser} alt='' />
                <div style={{ width: 160, height: 40, fontSize: "1rem", display: "flex", alignItems: "center", fontWeight: 700 }}>
                    <p style={{ margin: 5 }}>{data.username}</p>
                    <span style={{ fontWeight: 500, fontSize: "0.8rem" }}>{data.createdAt.slice(0, 10)}</span>
                </div>
            </div>
            <div
                className={cx("title-content")}
                style={{ height: 60 }}
            >
                <div className={cx("text-post")}>{data.title}</div>
            </div>
            <div className={cx("content")}>
                <div style={{
                    width: 350,
                    height: 200,
                    borderRadius: 20
                }}><img style={{ width: "100%", height: "100%", marginLeft: -16, marginTop: -1 }} src={data.img} alt={data.username} /></div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }} >
                <span onClick={() => {
                    axios.request({
                        method: "PATCH",
                        url: `http://localhost:6875/v1/blog/${data._id}/like`,
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    })

                }}><AiOutlineHeart /><span style={{ marginLeft: 10 }}>{data.like}</span></span>
                <span ><AiOutlineComment /></span>
                {userId === data?.IdBlog || admin === "true" ? <span><AiFillDelete onClick={() => {
                    axios({
                        method: "DELETE",
                        url: `http://localhost:6875/v1/blog/${data._id}/delete`,
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    })
                        .then(res => {
                            console.log(res)
                        })
                }} /></span> : <Fragment />}
            </div>
        </div>
    )
}

export default POSTBLOG