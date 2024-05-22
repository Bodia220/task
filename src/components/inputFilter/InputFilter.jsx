import style from './inputFilter.module.css'

function InputFilter({ inpFil }) {

    return (
        <input className={style.input_filter} type='search' placeholder='Search by name or email' onChange={(e) => inpFil(e.target.value)} />
    )
}

export default InputFilter