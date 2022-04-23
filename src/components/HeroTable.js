import React from 'react'
import HeroItem from "./HeroItem";

function HeroTable({ items, selectHero, setSelectHero }) {

    return (
        <main className='container'>
            <div className='heroesBox'>
                {
                    items.map(item =>
                        <HeroItem
                            key={item.id}
                            item={item}
                            selectHero={selectHero}
                            setSelectHero={setSelectHero}
                        >
                        </HeroItem>
                    )
                }
            </div>
        </main>
    )
}

export default HeroTable;