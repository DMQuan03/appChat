import React, { useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from "./chat.module.scss"

const cx = classNames.bind(styles)



const Chat = ({ data, id }) => {

    return (
        <div id={cx(id)} className={cx("wrapper")}>
            <div id={cx(id)} className={cx("img-mess")}>
                <img id={cx(id)} className={cx("imguser")} src={data.avatar} />
                <p id={cx(id)} className={cx("username-mess")}>{data.username}</p>
            </div>
            <div id={cx(id)} className={cx("mess")}>
                <div id={cx(id)} className={cx("message")}>
                    <div className={cx("text")}>
                        <p>{data.text}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat