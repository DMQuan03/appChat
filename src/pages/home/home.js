import React, { useEffect, useState, useContext, Fragment } from 'react'
import classNames from 'classnames/bind'
import styles from "./home.module.scss"
import { Films } from '../../components/listFilms/films'
import { useNavigate } from 'react-router-dom'
import Chat from '../../Chats'
const cx = classNames.bind(styles)


const HOME = () => {

    const navigate = useNavigate()

    const [films, setFilms] = useState([])

    const [loading, setLoading] = useState(true)



    useEffect(() => {

        fetch("http://localhost:6875/v1/films/")
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                const newData = data.data[0]
                const arr = []

                for (let i = 0; i < 12; i++) {
                    if (typeof newData[i] !== "undefined") {
                        arr.push(newData[i])
                    }
                }
                setFilms(arr)
            })
            .catch((err) => {
                console.log(err)
            })

        return () => {
            setLoading(false)
        }
    }, [loading])


    return (
        <div className={cx("wrapper")}>
            <div>
                <div className={cx("btn-header")}>
                    <div className={cx("btn-children")}>
                        <span>Get the content you need by creating a personal feed</span>
                        <button className={cx("btn-header2")}>+ Choose Tags</button>
                    </div>
                </div>
                <div className={cx("add-btn")}>
                    <span className={cx("add-btn2")}>Popular</span>
                    <button className={cx("btn-addshort")} onClick={() => {
                        if (true) {

                            navigate("/addFilms")
                        } else {

                            navigate("/")
                        }
                    }}>ADD shortcuts +</button>
                </div>
                <div className={cx('print-films')}>
                    {films?.map((film) => {
                        return <Films key={film._id} data={film} />
                    })}
                </div>
            </div>

        </div>
    )
}

export default HOME