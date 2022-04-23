import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from "react";
import axios from "axios";

import Detail from '../pages/Detail'
import Homepage from '../pages/Homepage'


function Rooter() {

    // Hash generated from public key and private key given with api membership
    const hash = '88d10a5a24ea797dd05d5103ca22a94c';

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useState('')
    const [queryRes, setQueryRes] = useState([])
    const [selectHero, setSelectHero] = useState([])

    const getCharacters = async () => {
        const ssData = sessionStorage.getItem(`page-${currentPage}`);
        let data;

        //The data coming from session storage in that page name is checked, if there is, this data is written to data, otherwise, data is taken with axios and written to session storage.
        if (ssData != null) {
            const json = JSON.parse(ssData);
            data = json;
        }
        else {
            const result = await axios(`http://gateway.marvel.com/v1/public/characters?ts=1&apikey=6fc2d005ff2338e7833c49790755ed4c&hash=${hash}&offset=${20 * currentPage - 20}`);

            sessionStorage.setItem(`page-${currentPage}`, JSON.stringify(result.data.data));

            data = result.data.data;
        }

        setItems(data.results);
        setTotalPage(Math.floor(data.total / 20))
        setLoading(false);
    }
    const searchResults = async (q) => {

        let data;

        const result = await axios(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&ts=1&apikey=6fc2d005ff2338e7833c49790755ed4c&hash=${hash}`)
            
        data = result.data.data
        setQueryRes(data.results);

    }
    //The fetch function was run every time the currentPage changed.
    useEffect(() => {
        if (!query) {
            getCharacters();
        }
        else {
            searchResults(query);
        }
        console.log(items);
    }, [currentPage, query]);
    return (
        <Routes>
            <Route path='/' element={
                <Homepage
                    loading={loading}
                    items={items}
                    setQuery={setQuery}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPage={totalPage}
                    queryRes={queryRes}
                    selectHero={selectHero}
                    setSelectHero={setSelectHero}
                />
            } >
            </Route>
            <Route path='detail' element={<Detail selectHero={selectHero} />} ></Route>
        </Routes>
    )
}

export default Rooter