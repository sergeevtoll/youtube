import { PageLayout } from 'components/Layout/PageLoyout'
import { FavouritesPage } from 'containers/favourites/Favourites'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'

export const Favourites: NextPage = () => (
  <>
    <Head>
      <title>FAVOURITES</title>
    </Head>
    <PageLayout>
      <FavouritesPage />
    </PageLayout>
  </>
)

export const getStaticProps: GetStaticProps = () => ({
  props: {},
})

export default Favourites
