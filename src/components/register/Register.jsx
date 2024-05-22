import { NavLink, useNavigate, useParams } from 'react-router-dom'
import style from './register.module.css'
import { registerOnEvent } from '../../service/eventsService'
import { useFormik } from 'formik'



function Register() {


    const id = useParams().id

    const navigate = useNavigate()

    const validate = values => {
        const errors = {}
        if (!values.fullName) {
            errors.fullName = 'Required'
        } else if (values.fullName.length > 15) {
            errors.fullName = 'Must be 15 characters or less'
        }
        else if (values.fullName.length < 5) {
            errors.fullName = 'Must be 5 characters or more'
        }

        if (!values.dateOfBirth) {
            errors.dateOfBirth = 'Required'
        }

        if (!values.email) {
            errors.email = 'Required'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address'
        }

        if (!values.hearEvent) {
            errors.hearEvent = 'Please check field'
        }

        return errors
    };

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            dateOfBirth: '',
            hearEvent: ''
        },
        validate,
        onSubmit: async (values, actions) => {
            await registerOnEvent(values, id)
            actions.resetForm({
                fullName: '',
                email: '',
                dateOfBirth: '',
                hearEvent: ''
            })
            navigate('/view/' + id)
        },
    });

    return (
        <div className='hei_100'>
            <form className={style.form_container} onSubmit={formik.handleSubmit} noValidate>
                <fieldset>
                    <legend>Event Registration</legend>
                    <div>
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" id="fullName" onChange={formik.handleChange} value={formik.values.fullName} />
                        {formik.errors.fullName ? <p>{formik.errors.fullName}</p> : null}
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={formik.handleChange} value={formik.values.email} />
                        {formik.errors.email ? <p>{formik.errors.email}</p> : null}
                    </div>
                    <div>
                        <label htmlFor="dateOfBirth">Date of birth</label>
                        <input type="date" id="dateOfBirth" onChange={formik.handleChange} value={formik.values.dateOfBirth} />
                        {formik.errors.dateOfBirth ? <p>{formik.errors.dateOfBirth}</p> : null}
                    </div>
                    <h4>Where did you hear about this event?</h4>
                    <div className={style.radio_group_row}>
                        <label htmlFor="socialMedia">Social Media</label>
                        <input
                            type="radio"
                            id="socialMedia"
                            name="hearEvent"
                            value="Social Media"
                            onChange={formik.handleChange}
                            checked={formik.values.hearEvent === "Social Media"}
                        />
                    </div>
                    <div className={style.radio_group_row}>
                        <label htmlFor="friends">Friends</label>
                        <input
                            type="radio"
                            id="friends"
                            name="hearEvent"
                            value="Friends"
                            onChange={formik.handleChange}
                            checked={formik.values.hearEvent === "Friends"}
                        />
                    </div>
                    <div className={style.radio_group_row}>
                        <label htmlFor="myself">Found Myself</label>
                        <input
                            type="radio"
                            id="myself"
                            name="hearEvent"
                            value="Found Myself"
                            onChange={formik.handleChange}
                            checked={formik.values.hearEvent === "Found Myself"}
                        />
                    </div>
                    {formik.errors.hearEvent ? <p>{formik.errors.hearEvent}</p> : null}
                    <button type='submit'>Register</button>
                    <div className={style.form_back_link}><NavLink to={'/'}>Go to main page</NavLink></div>
                </fieldset>
            </form>
        </div>
    )
}

export default Register