import React from 'react'
import Header from '../components/Header'
import HomeSvg from '../static/img/HomeSvg'
import { Link } from 'react-router-dom'
import i18n from '../i18next'
import { useTranslation } from 'react-i18next';



function Detail({ selectHero }) {

  const { t } = useTranslation()
  

  return (
    <div>
      <Header />
      <div className='detail'>
        <Link to={"/"}>
          <div className='backHome'>
            <HomeSvg />
          </div>
        </Link>

        <img className='detailImg' src={selectHero.thumbnail.path + "/portrait_uncanny.jpg"} alt='' />

        <div className='detailInf' >
          <h1>{selectHero.name} </h1>
          <p>{selectHero.description || 'Karakter açıklaması yok'}</p>
          <p>{t('detail.stories')} </p>
          <ul>
            {
              selectHero.series.items.map((item) =>
                <li>{item.name}</li>
              )
            }
          </ul>
          <button><a href={selectHero.urls[0].url}>{t('detail.info')} </a></button>
        </div>

      </div>

    </div>
  )
}

export default Detail