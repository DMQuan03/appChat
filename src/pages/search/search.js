import { queries, queryAllByAltText } from '@testing-library/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Films } from '../../components/listFilms/films'
import classNames from 'classnames/bind'
import styles from "./search.module.scss"
import useDebounce from "../../redux/useDebounce"


const cx = classNames.bind(styles)

const SEARCH = () => {

    const [searchText, setSearchText] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const debouncedValue = useDebounce(searchText, 500);


    const onchange = (e) => {
        setSearchText(e.target.value)
    }

    const handleSearch = () => {
        axios({
            method: "GET",
            url: "http://localhost:6875/v1/films/search?q=" + searchText,
        })
            .then(res => {
                setSearchResult(res.data)
            })
    }

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:6875/v1/films/search?q=" + debouncedValue,
        })
            .then(res => {
                setSearchResult(res.data)
            })
    }, [debouncedValue]);
    return (
        <>
            <div className={cx("search-text")}>
                <input placeholder='Search Film.....' className={cx("input-text")} value={searchText} onChange={onchange}></input>
                <button className={cx("btn-text")} onClick={handleSearch}></button>
            </div>
            <div id={cx("wrapper")}>
                {searchResult.map((films) => {

                    return <Films data={films} />
                })}
            </div>
        </>
    )
}

export default SEARCH