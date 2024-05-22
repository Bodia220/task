import { NavLink } from 'react-router-dom'
import style from './eventElement.module.css'


function EventElement({ item }) {

    const date = new Date(item.eventDate).toDateString()

    return (
        <>
            <li className={style.event_element_container}>
                <div className={style.event_element_top}>
                    <div><img src="conference.png" alt="" /> {item.title}</div>
                    <div><img src="organizational.png" alt="" /> {item.organizer}</div>
                    <div><img src="calendar.png" alt="" /> {date}</div>
                </div>
                <div className={style.element_links}>
                    <NavLink to={`/register/${item._id}`}>Register</NavLink>
                    <NavLink to={`/view/${item._id}`}>View</NavLink>
                </div>
            </li>
        </>
    )
}

export default EventElement