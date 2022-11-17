import { ButtonHTMLAttributes, FC } from 'react'
import styles from 'styles/Button.module.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonClass?: 'search' | 'white'
}

export const Button: FC<ButtonProps> = ({ buttonClass, ...props }) => (
  <button className={`${styles.button} ${buttonClass ? styles[buttonClass] : ''}`} {...props} />
)
