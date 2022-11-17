import { Modal } from 'components/Modal/Modal'
import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateFavourite } from 'store/favourites'
import { FAVOURIT_DATA, State } from 'store/types'
import styles from 'styles/Favourites.module.css'

export const FavouritesPage: FC = () => {
  const dispatch = useDispatch()
  const data = useSelector((state: State) => state.favourites.list)
  const [selectedItem, setSelectedItem] = useState({} as FAVOURIT_DATA)
  const [openModal, setOpenModal] = useState(false)
  const handleChange = (item: FAVOURIT_DATA) => {
    dispatch(updateFavourite(item))
  }

  const selectItem = (item: FAVOURIT_DATA) => {
    setSelectedItem(item)
    setOpenModal(true)
  }

  return (
    <>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Избранное</h2>
        <div className={styles.container}>
          {data.length ? (
            data.map((item, i) => (
              <button onClick={() => selectItem(item)} className={styles.item} key={i}>
                {item.name}
              </button>
            ))
          ) : (
            <div className={styles.empty}>List empti...</div>
          )}
        </div>
      </div>
      <Modal
        onClick={handleChange}
        buttonText='Изменить'
        open={openModal}
        title='Изменить запрос'
        onDismiss={() => setOpenModal(false)}
        {...selectedItem}
      />
    </>
  )
}
