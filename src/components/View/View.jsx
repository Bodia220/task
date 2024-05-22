import { NavLink, useParams } from "react-router-dom"
import { getEvent } from "../../service/eventsService"
import { useEffect, useState } from "react"
import InputFilter from "../inputFilter/InputFilter"
import LoadSpiner from '../loadSpiner/LoadSpiner'

import style from './view.module.css'

function View() {

    const id = useParams().id

    const [eventInfo, setEventInfo] = useState([])

    const [filteredEventInfo, setFilteredEventInfo] = useState([])

    const [loader, setLoader] = useState(true)

    useEffect(() => {

        let ignore = false

        async function fetchEvent(id) {
            try {
                const eventData = await getEvent(id)
                setEventInfo(eventData)
                setFilteredEventInfo(eventData.registeredPeople)
            } catch (error) {
                console.error('error', error)
            } finally {
                setLoader(false)
            }
        }
        
        fetchEvent(id)

        return () => ignore = true

    }, [id])


    function inpFil(e) {
        const searchTerm = e.toLowerCase()
        const filteredData = eventInfo.registeredPeople.filter(item =>
            item.fullName.toLowerCase().includes(searchTerm) ||
            item.email.toLowerCase().includes(searchTerm)
        )
        setFilteredEventInfo(filteredData)
    }

    return (
        <div className="hei_100">
            {loader ? <LoadSpiner /> :
                <div className={style.view_main_cont}>
                    <h2>"{eventInfo.title}" participants</h2>
                    <InputFilter inpFil={inpFil} />
                    <ul className={style.view_person_wrapper}>
                        {
                            filteredEventInfo.map((item) => {
                                return (
                                    <li key={item.fullName} className={style.view_person_container}>
                                        <div className={style.view_person_element}><span>Full Name</span><span>{item.fullName}</span></div>
                                        <div className={style.view_person_element}><span>Dete of birth</span><span>{item.dateOfBirth}</span></div>
                                        <div className={style.view_person_element}><span>Email</span><span>{item.email}</span></div>
                                    </li>
                                )
                            })
                        }
                        {eventInfo.registeredPeople.length < 1 && <li className={style.no_registered}>No one has registered yet </li>}
                    </ul>
                    <NavLink to={'/'}>Go to main page</NavLink>
                </div>
            }
        </div>
    )
}

export default View
