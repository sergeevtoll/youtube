import { FC, useState } from 'react'
import styles from 'styles/Login.module.css'
import { useForm } from 'react-hook-form'
import { Input } from 'components/Input/Input'
import { Button } from 'components/Button/Button'
import { useQuery } from 'react-query'
import { FORM, FORM_DATA, getLogin } from 'query/getLogin'
import { UseAuth } from 'hooks/useAuth'
import { EyeIcon, LogoIcon } from 'components/Icon'

export const LoginPage: FC = () => {
  const [showValue, setShowValue] = useState(false)
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FORM_DATA>()
  const { login } = UseAuth()
  const { refetch } = useQuery('login', async () =>
    getLogin(getValues()).then(res => {
      if (res) login(res)
    }),
  )

  const onSubmit = handleSubmit(() => refetch())

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <LogoIcon />
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.input}>
            <Input
              label='Логин'
              placeholder='Логин'
              labelClass='gray'
              register={register(FORM.LOGIN, { required: true })}
            />
          </div>
          <div className={styles.input}>
            <Input
              label='Пароль'
              placeholder='label'
              labelClass='gray'
              type={showValue ? 'password' : 'text'}
              button={
                <button
                  onClick={() => setShowValue(prev => !prev)}
                  className={`${styles.hideButton} ${showValue ? styles.open : ''}`}
                >
                  <EyeIcon />
                </button>
              }
              register={register(FORM.PASSWORD, { required: true })}
            />
          </div>
          <div className={styles.button}>
            <Button type='submit' disabled={!!errors.password || !!errors.login}>
              Войти
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
