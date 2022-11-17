import { PageLayout } from 'components/Layout/PageLoyout'
import { HomePage } from 'containers/home/Home'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

export const Home: NextPage = () => (
  <>
    <Head>
      <title>SEARCH</title>
    </Head>
    <PageLayout>
      <HomePage />
    </PageLayout>
  </>
)

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async () => ({
  props: {},
})

export default Home
