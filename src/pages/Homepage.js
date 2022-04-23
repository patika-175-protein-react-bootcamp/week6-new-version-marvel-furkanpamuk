import React from 'react'

import Header from "../components/Header";
import SearchBar from '../components/SearchBar';
import Pagination from "../components/Pagination";
import HeroTable from '../components/HeroTable';

function Homepage({loading, items, setQuery, currentPage, setCurrentPage, totalPage, queryRes, selectHero, setSelectHero }) {



    return (
        <>
            <Header />

            
            <SearchBar 
            queryRes = {queryRes} search={q => setQuery(q)}
            selectHero = {selectHero}
            setSelectHero = {setSelectHero}
            />
            {
                //The loading status is reported to the user.
                loading && <div className="loading">Be patient :) Heroes are coming</div>
            }
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