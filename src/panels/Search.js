import { Search } from '@vkontakte/vkui';
import React, { useEffect, useState } from 'react';
import User from './User';
import Icon24Filter from '@vkontakte/icons/dist/24/filter';
import debounce from '../utils/debounce'
import Filter from './Filter'

const SimpleSearch = ({ allFriends, reset, searching }) => {

    const [didMount, setDidMount] = useState(false)
    const [search, setSearch] = useState('')
    const [data, setData] = useState('')
    const [filter, showFilter] = useState(false)
    const [gender, setGender] = useState(null)
    const [pickedFilter, setPickedFilter] = useState("first_name")

    // Задержка запросов для поиска
    const callApi = value => setSearch(value)
    const [debouncedCallApi] = useState(() => debounce(value => callApi(value), 500))
    const searchDelay = event => {
        debouncedCallApi(event.target.value)
    }

    useEffect(() => setDidMount(true), [])

    useEffect(() => {
        if (didMount) {
            if (search.length > 1) {
                if (pickedFilter === "first_name" || pickedFilter === "last_name") {
                    const result = allFriends.filter(element =>
                        (gender !== null ? element.sex === +gender : true)
                        && element[pickedFilter].toLowerCase().indexOf(search.toLowerCase()) > -1
                    )
                    setData(result)
                }
                if (pickedFilter === "bdate") {
                    const result = allFriends.filter(element =>
                        (gender !== null ? element.sex === +gender : true)
                        && element[pickedFilter] !== undefined
                        && element[pickedFilter].length > 5
                        && new Date().getFullYear() - new Date(element[pickedFilter].split('.').pop()).getFullYear() === +search
                    )
                    setData(result)
                }
                !searching && reset(true)
                filter && showFilter(false)
            }
            if (search.length === 0) {
                setData([])
                reset(false)
            }
        } // eslint-disable-next-line
    }, [search])

    const changeFilter = (value) => {
        setPickedFilter(value)
    }

    const genderFilter = (value) => {
        value.length >= 1 ? setGender(value) : setGender(null)
    }

    const filterHandler = () => {
        showFilter(!filter)
    }

    return (
        <React.Fragment>
            <Search onChange={searchDelay} icon={<Icon24Filter />} onIconClick={filterHandler} />
            {search.length > 0 && data.length > 0 && data.map(data => <User id={data.id} friends={data} />)}
            {filter && <Filter
                changeFilter={changeFilter}
                genderFilter={genderFilter}
                pickedFilter={pickedFilter}
                gender={gender}
                 />}
        </React.Fragment>
    );
}

export default SimpleSearch