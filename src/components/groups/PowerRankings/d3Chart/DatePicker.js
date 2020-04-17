// meant to choose beginning and enddate for chart data
import React from 'react'
import { Calendar } from 'react-date-range'
import moment from 'moment'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const DatePicker = ({ setDateRange }) => {

    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }

    return (
        <Calendar 
            ranges={[selectionRange]}
            onChange={ d => setDateRange( moment(d).endOf('day').unix() * 1000 ) }
        />
    )
}

export default DatePicker
