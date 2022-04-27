import type { NextPage } from 'next'

import DefaultHeader from '../library/utils/metadata/header'
import { ExtendedNav } from '../library/components/anchors/nav'
import DefaultFooter from '../library/components/anchors/footer'

import defaultStyle from '../styles/pages/Default.module.css'


const Home: NextPage = () => {
  return (
    <div className={defaultStyle.container}>
      {/* This is the head of the DOM, not of the body */}
      <DefaultHeader/>
      <ExtendedNav 
          image_src='/'
          image_alt=''  
          width={100}
          height={100}
        />
      
      <main className={defaultStyle.main}>
          {/* Create your components here */}
      </main>

      <DefaultFooter />

    </div>
  )
};

export default Home;
