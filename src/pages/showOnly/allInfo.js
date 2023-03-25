import axios from 'axios'
import React, { Fragment, memo, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Chat from '../../Chats'
import classNames from 'classnames/bind'
import styles from "./allinfo.module.scss"

const cx = classNames.bind(styles)




const AllInfo = () => {

    const navigate = useNavigate()
    const params = useParams()

    const [info, setInfo] = useState({})
    const [isFetching, setIsfetching] = useState(true)
    const [checkTrue, setCheckTrue] = useState(false)
    const [checkLogin, setCheckLogin] = useState(false)

    const [textMess, setTextMess] = useState([])
    const [listMess, setListMess] = useState([])
    const [textMs, setTextMs] = useState("")
    const user = sessionStorage.getItem("username")
    const avt = sessionStorage.getItem("avatar")
    const handlerSendMess = () => {

        try {
            const data = {
                MessID: info.data.BlogId,
                username: user,
                avatar: avt,
                text: textMs
            }
            axios.post("http://localhost:6875/v1/mess/createMess", data)
                .then((res) => {
                    console.log("success")
                })
                .catch((err) => {
                    console.log(err.response.data.message)
                    setCheckLogin(true)
                    setTimeout(() => {
                        setCheckLogin(false)
                    }, 3000);
                })
            setTextMs("")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const data = axios("http://localhost:6875/v1/films/" + params.id)
        data
            .then((res) => {
                setInfo(res)
            })
            .catch(() => {
                setCheckTrue(false)
            })


        return () => {
            setIsfetching(false)
        }
    }, [isFetching])

    useEffect(() => {
        const userNameData = {
            username: user
        }
        const mess = axios.get("http://localhost:6875/v1/mess/getMess", userNameData)
        mess
            .then((res) => {
                return res
            })
            .then((data) => {
                setTextMess(data.data)
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })

    }, [listMess])



    useEffect(() => {
        const result = textMess.filter((text) => {
            return text.MessID == info.data.BlogId
        })
        setListMess(result)
    }, [textMs])




    return (
        <div className={cx("tong")}>
            {info.data ?
                <div className={cx("wrapper")} >
                    <div className={cx("info")}>
                        <div>
                            <div className={cx("title-info")} style={{ width: "100%", height: 60, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <img style={{ marginLeft: -590 }} src={info.data.avtUser} alt='quan' />
                                <p style={{ marginLeft: 30 }}>{info.data.username}</p>
                            </div>
                        </div>
                        <div style={{ marginTop: 70, height: 330 }}>
                            <iframe width="560" height="315" src={`https://www.youtube.com/embed/${info.data.url}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        </div>
                        <div style={{ backgroundColor: "gray", height: 40, marginTop: 100, display: 'flex' }}>
                            <div style={{ marginLeft: 10, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <span>Like : </span>
                                <p style={{ marginLeft: 10 }}>{info.data.like.length}</p>
                            </div>
                            <div style={{ marginLeft: 10, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <span>Share : </span>
                                <p style={{ marginLeft: 10 }}>{info.data.share.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx("wrapper2")}>
                        <div className={cx("chat-header")}>
                            <header style={{ marginLeft: 0, fontWeight: 700 }}>{info.data.description}</header>
                        </div>
                        <div className={cx("chat-message")}>
                            {listMess.map((mess, index) => {
                                if (mess.username === user) {
                                    var id = "YOU"
                                } else {
                                    var id = "OTHER"
                                }
                                return <Chat key={index} id={id} data={mess} />
                            })}
                        </div>
                        <div className={cx("chat-text")}>
                            <input className={cx("inpt")} style={{ marginLeft: 0 }} value={textMs} onChange={(e) => {
                                setTextMs(e.target.value)
                            }} />
                            <button style={{ marginLeft: 0, border: "none" }} onClick={handlerSendMess}>Send</button>
                        </div>
                    </div>
                    {checkLogin ? <div
                        style={{
                            position: 'fixed', backgroundColor: "white", marginTop: -45, marginLeft: 400, width: 300, height: 40, display: "flex", alignItems: "center"
                            , justifyContent: "center", fontWeight: 700, borderRadius: 20
                        }}
                    >ban can login de send message</div> : <Fragment />}
                </div>
                :
                <div style={{ color: "white" }}>NOT FOUND</div>}

        </div>
    )
}

export default AllInfo