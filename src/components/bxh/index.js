import React, { useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from "./bxh.module.scss"

const cx = classNames.bind(styles)
const BXH = ({ data, list, id }) => {

    useEffect(() => {
        console.log(id)
    }, []);
    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <div className={cx("top")}>
                    <h1 id={cx(id)} className={cx("top1")}>{list + 1}</h1>
                </div>
                <div className={cx("name-avt")}>
                    <div className={cx("img-user")}><img style={{ width: 120, height: 100, marginLeft: -10, borderRadius: 100 }} src={`https://i.ytimg.com/vi/${data.url}/maxresdefault.jpg`} /></div>
                    <div className={cx("name-user")}><p>{data.username}</p></div>
                </div>
            </div>
            <div className={cx("info")}>
                <h1>Tong so like da nhan : {data.like}</h1>
            </div>
        </div>
    )
}

export default BXH