import { LogoIcon } from 'components/Icon'
import { FAVOURITES_URL, ROOT_URL } from 'config/route'
import { UseAuth } from 'hooks/useAuth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, ReactNode } from 'react'
import styles from 'styles/Layout.module.css'

const urls = [
  { url: ROOT_URL, name: 'Поиск' },
  { url: FAVOURITES_URL, name: 'Избранное' },
]

export const PageLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const routre = useRouter()
  const { logout } = UseAuth()

  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <div className={styles.container}>
          <div className={styles.navInner}>
            <div className={styles.navBlock}>
              <div>
                <Link href={ROOT_URL}>
                  <LogoIcon />
                </Link>
              </div>
              <ul>
                {urls.map(({ url, name }) => (
                  <li className={routre.pathname === url ? styles.activeLink : ''} key={url}>
                    <Link href={url} passHref>
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={logout} className={styles.buttonExit}>
              Выйти
            </button>
          </div>
        </div>
      </nav>
      <main className={styles.container}>{children}</main>
    </div>
  )
}
