import type { NextPage } from 'next'

import DefaultHeader from '../library/utils/metadata/header'
import DefaultNav from '../library/components/bars/nav'
import DefaultFooter from '../library/components/bars/footer'

import defaultStyle from '../styles/pages/Default.module.css'


const Home: NextPage = () => {
  return (
    <div className={defaultStyle.container}>
      {/* This is the head of the DOM, not of the body */}
      <DefaultHeader/>
      <DefaultNav/>
      
      <main className={defaultStyle.main}>
          {/* Create your components here */}
      </main>

      <DefaultFooter />

    </div>
  )
};

export default Home;
