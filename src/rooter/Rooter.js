import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from "react";
import Detail from '../pages/Detail'
import Homepage from '../pages/Homepage'


function Rooter() {

    // api üyeliği ile verilen public key ve private key'den oluşturulan hash
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

        //session storage'dan o sayfa adında gelen veri kontrol edildi varsa bu veri data'ya yazıldı yoksa axios ile veri çekildi ve session storage'e yazıldı.
        if (ssData != null) {
            const json = JSON.parse(ssData);
            data = json;
        }
        else {
            const result = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=6fc2d005ff2338e7833c49790755ed4c&hash=${hash}&offset=${20 * currentPage - 20}`)
                .then(res => res.json())
                .then(data2 => data = data2.data)


            sessionStorage.setItem(`page-${currentPage}`, JSON.stringify(data));
        }

        setItems(data.results);
        setTotalPage(Math.floor(data.total / 20))
        setLoading(false);
    }
    const searchResults = async (q) => {

        let data;

        const result = await fetch(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&ts=1&apikey=6fc2d005ff2338e7833c49790755ed4c&hash=${hash}`)
            .then(res => res.json())
            .then(data2 => data = data2.data)

        setQueryRes(data.results);
        
    }
    //currentPage her değiştiğinde fetch fonksiyonu çalıştırıldı.
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
                loading = {loading}
                items = {items}
                setQuery = {setQuery}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPage={totalPage}
                queryRes = {queryRes}
                selectHero = {selectHero}
                setSelectHero = {setSelectHero}
                />
            } >
            </Route> 
            <Route path='detail' element={<Detail selectHero = {selectHero} />} ></Route>
        </Routes>
    )
}

export default Rooter