import React from 'react'
import axios from "axios";

import Header from "../components/Header";
import SearchBar from '../components/SearchBar';
import Pagination from "../components/Pagination";
import HeroTable from '../components/HeroTable';

function Homepage({loading, items, setQuery, currentPage, setCurrentPage, totalPage, queryRes, selectHero, setSelectHero }) {



    return (
        <>
            <Header />

            {
                //loading durumu kullanıcıya bildirildi.
                loading && <div className="loading">Be patient :) Heroes are coming</div>
            }
            <SearchBar 
            queryRes = {queryRes} search={q => setQuery(q)}
            selectHero = {selectHero}
            setSelectHero = {setSelectHero}
            />
            <HeroTable 
            items={items} 
            selectHero = {selectHero}
            setSelectHero = {setSelectHero}
            />

            {
                !loading && <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPage} />
            }
        </>
    )
}

export default Homepage