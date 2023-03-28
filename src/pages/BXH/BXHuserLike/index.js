import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from "./bxhuser.module.scss"
import BXH from '../../../components/bxh'
import { useNavigate } from 'react-router-dom'

const cx = classNames.bind(styles)
const BXHUSER = () => {
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

                for (let i = 0; i < 20; i++) {
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
            {films.map((film, index) => {
                if (index == 0) {
                    var id = "one"
                } else if (index == 1) {
                    var id = "two"
                } else if (index == 2) {
                    var id = "three"
                } else {
                    var id = ""
                }
                return <BXH key={index} id={id} list={index} data={film} />
            })}
        </div>
    )
}

export default BXHUSER