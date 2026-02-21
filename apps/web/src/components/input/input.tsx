import './input.css'

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className, ...rest } = props

  return (
    <input {...rest} className={`${className} c-input`} />
  )
}
