import { Button } from 'components/Button/Button'
import { Input } from 'components/Input/Input'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FAVOURIT, FAVOURIT_DATA } from 'store/types'
import styles from 'styles/Modal.module.css'

type ModalProps = {
  open: boolean
  onDismiss: () => void
  title: string
  query: string
  name?: string
  buttonText: string
  max?: string
  onClick: (item: FAVOURIT_DATA) => void
  id?: string
}

export const Modal: FC<ModalProps> = ({
  open,
  title,
  onDismiss,
  name: nameValue,
  query,
  buttonText,
  max,
  onClick,
  id,
}) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FAVOURIT_DATA>()
  const onSubmit = handleSubmit(() => {
    onClick({ id, ...getValues() })
    onDismiss()
  })
  const { onChange, onBlur, name, ref } = register(FAVOURIT.MAX)
  const [progress, setProgress] = useState(50)

  useEffect(() => {
    setValue(FAVOURIT.QUERY, query || '')
    setValue(FAVOURIT.NAME, nameValue || '')
    setValue(FAVOURIT.SORT, '')
    setValue(FAVOURIT.MAX, max || '50')
    setProgress(+max || 50)

    return () => {}
  }, [open])

  return (
    <div className={`${styles.wrapper} ${open ? styles.open : ''}`}>
      <div className={styles.modal}>
        <div className={styles.title}>{title}</div>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.input}>
            <Input disabled={!nameValue} label='Запрос' register={register(FAVOURIT.QUERY)} />
          </div>
          <div className={styles.input}>
            <Input
              require
              label='Название'
              placeholder='Укажите название'
              register={register(FAVOURIT.NAME, { required: true })}
            />
          </div>
          <div className={styles.input}>
            <Input label='Сортировать по' register={register(FAVOURIT.SORT)} />
          </div>
          <div className={styles.input}>
            <label className={styles.label}>Максимальное количество</label>
            <div className={styles.rangeWrap}>
              <input
                min={0}
                max={100}
                onChange={e => {
                  setProgress(+e.target.value)
                  void onChange(e)
                }}
                onBlur={onBlur}
                name={name}
                ref={ref}
                style={{
                  background: `linear-gradient(to right, #1390E5 0%, #1390E5 ${progress}%, rgba(23, 23, 25, 0.3) ${progress}%, rgba(23, 23, 25, 0.3) 100%)`,
                }}
                type='range'
                className={styles.range}
              />
              <div className={styles.rangeValue}>{progress}</div>
            </div>
          </div>
          <div className={styles.buttons}>
            <Button onClick={onDismiss} buttonClass='white'>
              Не сохранять
            </Button>
            <Button type='submit' disabled={!!errors.query || !!errors.max || !!errors.name}>
              {buttonText}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
