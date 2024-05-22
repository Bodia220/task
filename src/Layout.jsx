import { useEffect, useState } from "react"
import { getEvents } from '../src/service/eventsService'
import EventsList from "./components/eventsList/EventsList"
import Pagination from "./components/pagination/Pagination"
import SelectFilter from "./components/selectFilter/SelectFilter"
import LoadSpiner from "./components/loadSpiner/LoadSpiner"

function Layout() {

    const [data, setData] = useState([])

    const [currentPage, setCurrentPage] = useState(1)

    const [eventsPerPage, setEventsPerPage] = useState(8)

    const [selectedFilter, setSelectedFiler] = useState('Sort by title')

    const [filteredData, setFilteredData] = useState([])

    const [loader, setLoader] = useState(true)

    useEffect(() => {

        let ignore = false

        async function getData() {
            try {
                const eventData = await getEvents()

                if (!ignore) {
                    setData(eventData)
                }
            } catch (error) {
                console.error("Error", error)
            } finally {
                setLoader(false)
            }
        }
        getData()
        return () => ignore = true

    }, [])

    useEffect(() => {

        const copyData = [...data]
        const result = copyData.sort((a, b) => {
            if (selectedFilter === 'Sort by date') {
                return new Date(a.eventDate) - new Date(b.eventDate)
            } else if (selectedFilter === 'Sort by title') {
                return a.title.localeCompare(b.title)
            } else if (selectedFilter === 'Sort by organizer') {
                return a.organizer.localeCompare(b.organizer)
            }
        })
        setFilteredData(result)
    }, [selectedFilter, data])


    const lastEventIndex = currentPage * eventsPerPage
    const firstEventIndex = lastEventIndex - eventsPerPage

    const currentEvents = filteredData.slice(firstEventIndex, lastEventIndex)

    return (
        <div className="hei_100">
            {loader ? <LoadSpiner /> :
                <div className="page_cont">
                    <SelectFilter setSelectedFiler={setSelectedFiler} />
                    <EventsList data={currentEvents} />
                    <Pagination totalEvents={data.length} eventsPerPage={eventsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                </div>
            }
        </div>
    )

}

export default Layout