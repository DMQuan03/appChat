import React, { Fragment, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./film.module.scss"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { keyboard } from '@testing-library/user-event/dist/keyboard'
import Chat from '../../Chats'
import axios from 'axios'
import { AiOutlineHeart, AiFillDelete, AiOutlineComment } from "react-icons/ai";

const cx = classNames.bind(styles)




export const Films = ({ data }) => {

    const navigate = useNavigate()
    const users = sessionStorage.getItem("userId")
    const admin = sessionStorage.getItem("admin")
    const params = useParams()

    const handleDelete = async () => {
        try {
            const token = sessionStorage.getItem("accessToken")
            await axios({
                method: "DELETE",
                url: `http://localhost:6875/v1/films/${data._id}/delete`,
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            navigate("/addfilms")
            setTimeout(() => {
                navigate("/search")
            }, 1);

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        const usersd = data.like



        const arr = usersd?.length
    })
    return (
        <div className={cx("wrapper")}>
            <div className={cx("des-film")}>
                <div
                    style={{
                        position: "relative",
                        height: 50,
                        marginTop: 5,
                        fontSize: "1.2rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <img style={{ position: "absolute", left: 0, marginLeft: 4, marginTop: 5 }} src={data.avtUser} onClick={() => {
                        navigate(`/profile/${data.username}`)
                    }} />
                    <p style={{ marginLeft: -109 }}>{data.username}</p>
                    <span
                        style={{ position: "absolute", bottom: 0, right: 0, marginRight: 10, fontSize: "1rem" }}
                    >{data.createdAt.slice(0, 10)}</span>
                    {data.main === users || admin === "true" ? <AiFillDelete style={{ position: "absolute", marginLeft: 240, marginTop: -20 }}
                        onClick={handleDelete}
                    /> : <Fragment />}
                </div>
                <div
                    className={cx("bkr-title")}
                    style={{

                        marginTop: -3,
                        height: 100,
                        maxHeight: 95,
                        fontSize: "1.2rem",
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        color: "wheat",
                        maxWidth: 250,
                        marginLeft: 25,
                        marginTop: 10,
                        maxHeight: 80,
                        borderRadius: 10,
                        overflow: "hidden",
                        flexWrap: "wrap"
                    }}
                >
                    <p
                        style={{
                            fontSize: "1rem",
                            margin: 10,
                            fontWeight: 700,

                        }}
                    >{data.description}</p>
                </div>

            </div>
            <a href={`/films/${data._id}`}><img className={cx("img-film")} src={`https://i.ytimg.com/vi/${data.url}/maxresdefault.jpg`} /></a>
            <div className={cx("icon-film")}>
                <span className={cx("like")} onClick={() => {
                    if (users) {
                        const token = sessionStorage.getItem("accessToken")

                        axios({
                            method: "PATCH",
                            url: `http://localhost:6875/v1/films/${data._id}/like`,
                            data: {
                                username: users
                            },
                            headers: {
                                authorization: `Bearer ${token}`
                            }
                        })

                        navigate("/")

                        setTimeout(() => {
                            navigate("/search")
                        }, 1)
                    } else {
                        console.log("ban can dang nhap")
                    }
                }}>
                    <AiOutlineHeart />
                    <span style={{ color: "white", marginLeft: 7 }}>{data.like || 0}</span>{data.peopleLike.includes(users) ? <> DisLike</> : <> Like</>}
                </span>
                <span style={{ marginLeft: -30 }} onClick={() => {
                    navigate(`/films/${data._id}`)
                }}>
                    <svg style={{ color: "white" }} width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 pointer-events-none"><path d="M8.084 3.217a35.447 35.447 0 017.05-.078l.782.078.279.031c1.089.121 1.885.372 2.606.828a4.516 4.516 0 011.664 1.86c.336.69.5 1.423.53 2.361l.005.321v3.975a4.493 4.493 0 01-3.545 4.392l-.207.04-2.089.346-2.86 2.992-.147.135c-.986.789-2.399.623-3.205-.324-.532-.625-.616-1.34-.51-2.29l.029-.224.038-.254.033-.187-1.332-.189a5.011 5.011 0 01-1.677-.55l-.253-.146-.243-.16a4.777 4.777 0 01-1.491-1.721 4.935 4.935 0 01-.532-1.972l-.009-.3V8.618c0-1.096.162-1.915.535-2.683.375-.77.94-1.4 1.664-1.859.649-.41 1.359-.655 2.288-.788l.318-.04.28-.031zm7.666 1.491a33.948 33.948 0 00-6.752-.075l-.748.075-.28.031c-.915.102-1.481.297-1.97.606a3.016 3.016 0 00-1.116 1.247c-.228.468-.357.989-.38 1.76l-.004.266v3.563c0 .577.134 1.116.375 1.587.242.471.592.874 1.024 1.18.37.263.801.453 1.276.554l.242.043 1.98.283c.339.048.457.096.575.175.119.078.262.187.27.386l-.002.024-.013.08-.164.741-.064.333c-.111.63-.167 1.332.09 1.634.263.309.7.39 1.037.187l.089-.062 2.998-3.135.13-.101.092-.063.077-.04.08-.03.035-.01.087-.02L17 15.545a2.993 2.993 0 002.495-2.77l.005-.182V8.618c0-.921-.13-1.506-.384-2.026A3.016 3.016 0 0018 5.345c-.44-.278-.943-.464-1.706-.572l-.265-.034-.279-.03zm-.55 6.294l.093.005c.398.044.707.36.707.746 0 .38-.301.693-.691.743l-.109.007H8.8l-.093-.005c-.398-.044-.707-.36-.707-.745 0-.38.301-.694.691-.744l.109-.007h6.4zm0-3.5l.093.004c.398.044.707.36.707.746 0 .38-.301.693-.691.743l-.109.007H8.8l-.093-.005C8.309 8.953 8 8.637 8 8.252c0-.38.301-.694.691-.744l.109-.007h6.4z" fill="currentcolor" fill-rule="evenodd"></path></svg>
                </span>
                <spa style={{ color: "white" }} className={cx("share")} onClick={() => {
                    navigate(`/films/${data._id}`)
                }}>
                    <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 pointer-events-none"><path d="M10.981 4.973a2.84 2.84 0 00.133 3.872l.274.276-.211.012a8.815 8.815 0 00-.308.027c-3.268.344-5.723 3.001-7.528 8.121l-.156.452-.097.295c-.62 1.898 2.22 2.833 2.848.937l.095-.29.055-.148.093-.233c.884-2.077 2.828-3.313 5.068-3.582l.097-.01-.23.231a2.84 2.84 0 000 4.014 2.835 2.835 0 004.01 0l5.045-5.049c.54-.54.832-1.263.831-2.012a2.832 2.832 0 00-.83-2.006L15.124 4.83a2.835 2.835 0 00-4.011 0l-.133.142zM4.676 18.017l-.068.187.164-.473c1.627-4.592 3.711-6.812 6.254-7.08.255-.026.51-.04.767-.04h3.2L13.75 9.366l-1.576-1.582a1.339 1.339 0 011.89-1.893l5.045 5.048c.262.262.393.606.392.95 0 .342-.13.686-.392.948l-5.044 5.048a1.337 1.337 0 11-1.891-1.892l2.822-2.828h-2.992c-3.272 0-6.18 1.822-7.328 4.85z" fill="currentcolor" fill-rule="evenodd"></path></svg>
                </spa>
            </div>
        </div >
    )
}
