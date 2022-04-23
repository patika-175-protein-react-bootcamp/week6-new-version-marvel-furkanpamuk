import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import i18n from '../i18next';


function SearchBar({ search, queryRes, setSelectHero }) {

  const [inpText, setInpText] = useState('')
  const { t } = useTranslation()


  const handleSearch = q => {
    setInpText(q)
    search(q)
  }

  const changeLang = (lang) => {
    i18n.changeLanguage(lang)
  }

  return (
    <div className="container">
      <div className='searchAndLang'>
 
 <span className='searchHeader'>{t('search.find a character')}</span>
 <div className='context' >
   <input className='search'
     type="text"
     placeholder={t('search.input type')}
     autoFocus
     value={inpText}
     onChange={e => handleSearch(e.target.value)}
   />
   <div className="langBox ">
     <div onClick={() => changeLang('tr')} className="box container">TR</div>
     <div onClick={() => changeLang('en')} className="box container">EN</div>
     <div onClick={() => changeLang('fr')} className="box container">FR</div>
   </div>

   {
     !(inpText === '') && <div className='results'>
       {
         queryRes.map((item) =>
           <div className='selectItem'>
             <Link  to={"/detail"}>
             <p
               key={item.id}
               onClick={e => setSelectHero(item)}
             >
               {item.name}</p>
           </Link>
           </div>
         )
       }
     </div>
   }
 </div>
</div>
    </div>
  )
}

export default SearchBar