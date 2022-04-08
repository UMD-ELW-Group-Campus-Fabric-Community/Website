import { FC } from 'react';
import Head from 'next/head';

const DefaultHeader: FC = () => {

    return (
        <Head>
            <title>ELWG - Campus Fabric Community</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}

export default DefaultHeader;