import style from './pagination.module.css'

function Pagination({ totalEvents, eventsPerPage, setCurrentPage, currentPage }) {


    const pages = []

    for (let i = 1; i <= Math.ceil(totalEvents / eventsPerPage); i++) {
        pages.push(i)
    }


    function previousPage(e) {
        e.preventDefault()
        setCurrentPage(page => page === 1 ? page : page - 1)
    }

    function nextPage(e) {
        e.preventDefault()
        setCurrentPage(page => pages.length === page ? page : page + 1)
    }

    return (
        <div className={style.pagination_cont}>
            <a href="#" onClick={(e) => previousPage(e)}><img src='left-arrow.png'/></a>
            {
                pages.map((page, index) => {
                    return <a href="#" key={index} className={currentPage === page ? style.page_btn_active : style.page_btn} onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(page)
                    }
                    }>{page}</a>
                })
            }
            <a href="#" onClick={(e) => nextPage(e)}><img src='right-arrow.png'/></a>
        </div>
    )
}

export default Pagination