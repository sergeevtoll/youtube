import { Button } from 'components/Button/Button'
import { GridIcon, ListICon, HeadrtIcon } from 'components/Icon'
import { Input } from 'components/Input/Input'
import { Modal } from 'components/Modal/Modal'
import { getVideoList } from 'query/getVideoList'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import { addFavourite } from 'store/favourites'
import { FAVOURIT_DATA } from 'store/types'
import styles from 'styles/Home.module.css'
import { uniqueId } from 'lodash'
import Link from 'next/link'
import { FAVOURITES_URL } from 'config/route'

enum TAB_VALUES {
  LSIT = 'list',
  GRID = 'grid',
}

const buttons = [
  { value: TAB_VALUES.LSIT, icon: <ListICon /> },
  { value: TAB_VALUES.GRID, icon: <GridIcon /> },
]

export const HomePage = () => {
  const [seacrh, setSeacrh] = useState('')
  const dispatch = useDispatch()
  const [searched, setSearched] = useState('')
  const [listType, setListType] = useState(TAB_VALUES.LSIT)
  const { isRefetching, data, refetch } = useQuery('list', () => getVideoList({ seacrh, max: 100 }))
  const [openModal, setOpenModal] = useState(false)
  const [saved, setSsaved] = useState(false)
  const [showNotice, setShowNotice] = useState(false)
  const { items = [], pageInfo = {} } = data || {}
  const handleAdd = (item: FAVOURIT_DATA) => {
    const [id] = uniqueId()
    dispatch(addFavourite({ ...item, id }))
    setSsaved(true)
  }

  useEffect(() => {
    if (saved) {
      setShowNotice(true)
      setTimeout(() => {
        setShowNotice(false)
      }, 3000)
    }
  }, [saved])

  return (
    <>
      <div>
        <div className={`${styles.wrapper} ${data || isRefetching ? styles.active : ''}`}>
          <h2 className={styles.title}>Поиск видео</h2>
          <div className={`${styles.search} ${data || isRefetching ? styles.active : ''}`}>
            <Input
              inputClass='search'
              placeholder='Что хотите посмотреть?'
              value={seacrh}
              onChange={e => setSeacrh(e.target.value)}
              button={
                data || isRefetching ? (
                  <div className={styles.saveButtonWrap}>
                    <button
                      disabled={saved}
                      className={`${styles.saveButton} ${saved ? styles.saved : ''}`}
                      onClick={() => setOpenModal(prev => !prev)}
                    >
                      <HeadrtIcon />
                    </button>
                    <div className={`${styles.savedNotice} ${showNotice ? styles.open : ''}`}>
                      Поиск сохранён в разделе «Избранное»
                      <a>
                        <Link href={FAVOURITES_URL} passHref>
                          Перейти в избранное
                        </Link>
                      </a>
                    </div>
                  </div>
                ) : null
              }
            />
            <Button
              onClick={async () => {
                setSearched(seacrh)
                await refetch()
                setSsaved(false)
              }}
              buttonClass='search'
            >
              Найти
            </Button>
          </div>
          {isRefetching && <div className={styles.info}>Loading...</div>}
          {!isRefetching && items.length ? (
            <div>
              <div className={styles.controll}>
                <div className={styles.resultInfo}>
                  <span>
                    Видео по запросу <b>«{searched}»</b>
                  </span>
                  <span className={styles.result}>{pageInfo?.totalResults}</span>
                </div>
                <div className={styles.controllers}>
                  {buttons.map(({ value, icon }) => (
                    <button
                      onClick={() => setListType(value)}
                      key={value}
                      className={`${styles.listButton} ${listType === value ? styles.active : ''}`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles[listType]}>
                {items.map((item: any) => (
                  <div key={item.etag}>
                    <div className={styles.itemImg}>
                      <img src={item.snippet.thumbnails.medium.url} alt='' />
                    </div>
                    <div>
                      <span className={styles.itemTitle}>{item.snippet.title}</span>
                      <span className={`${styles.itemTitle} ${styles.description}`}>
                        {item.snippet.channelTitle}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <Modal
        onClick={handleAdd}
        buttonText='Сохранить'
        query={searched}
        open={openModal}
        title='Сохранить запрос'
        onDismiss={() => setOpenModal(false)}
      />
    </>
  )
}
