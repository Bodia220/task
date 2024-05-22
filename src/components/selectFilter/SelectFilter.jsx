

function SelectFilter({ setSelectedFiler }) {

    return (
        <select name="select" onChange={(e) => setSelectedFiler(e.target.value)}>
            <option value="Sort by title">Sort by title</option>
            <option value="Sort by date">Sort by date</option>
            <option value="Sort by organizer">Sort by organizer</option>
        </select>
    )
}

export default SelectFilter