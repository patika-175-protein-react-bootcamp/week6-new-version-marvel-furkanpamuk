import React from 'react'
import { Link } from 'react-router-dom'


function HeroItem({ item, selectHero, setSelectHero }) {
    return (

        <Link to={"/detail"}  >

            <div 
            key={item.id} 
            className="frame"
            onClick={e => setSelectHero(item)}
            >

                <img className="heroImg" src={item.thumbnail.path + "/portrait_incredible.jpg"} alt='' />

                <span className="heroName">{item.name}</span>

            </div>
        </Link>


    )
}

export default HeroItem;