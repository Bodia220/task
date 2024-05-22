import EventElement from "../eventElement/EventElement"
import style from './eventsList.module.css'

function EventsList({ data }) {

    return (
        <ul className={style.events_wrapper}>
            {
                data.map((item) => {
                    return <EventElement key={item._id} item={item} />
                })
            }
        </ul>
    )
}

export default EventsList