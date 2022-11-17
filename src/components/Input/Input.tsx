import { FC, InputHTMLAttributes, ReactNode } from "react";
import styles from 'styles/Input.module.css'
import { UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
  label?: string
  register?: UseFormRegisterReturn
  labelClass?: 'gray'
  inputClass?: 'search'
  button?: ReactNode
  require?: boolean
} & InputHTMLAttributes<HTMLInputElement>

export const Input: FC<InputProps> = ({
  label,
  register,
  labelClass,
  inputClass,
  onChange,
  button,
  require,
  value,
  ...rest
}) => {
  return <>
    {label &&
      <label className={`${styles.label} ${labelClass ? styles[labelClass] : ''}`}>
        {require && <span className={styles.require}>* </span>}{label}
      </label>}
    <div className={styles.inputWrapper} >
      <input
        value={value}
        onChange={onChange}
        className={`${inputClass ? styles[inputClass] : ''}`}
        autoComplete="off"
        {...register}
        {...rest}
      />
      {button}
    </div>
  </>
}