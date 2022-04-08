import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

import DefaultHeader from '../library/utils/header'
import DefaultNav from '../library/components/bars/nav'
import DefaultFooter from '../library/components/bars/footer'


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <DefaultHeader />

      <DefaultNav />
      <main className={styles.main}>
          {/* Create your components here */}
      </main>

      <DefaultFooter />

    </div>
  )
};

export default Home;
