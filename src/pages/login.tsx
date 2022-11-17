import { FC } from 'react'
import { GetStaticProps } from 'next'
import { LoginPage } from 'containers/login/Login'
import Head from 'next/head'

export const Login: FC = () => (
  <>
    <Head>
      <title>LOGIN</title>
    </Head>
    <LoginPage />
  </>
)

export default Login

export const getStaticProps: GetStaticProps = () => ({
  props: {},
})
