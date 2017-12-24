import React from 'react'
import { css } from 'glamor'
import colors from '../styles/styles.scss'

const styles = {
  outer: css({
    // border: '1px solid #ccc',
    // borderRadius: 3,
    margin: '0 5px 0 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '4.5rem',
    height: '5rem',
  }),
  date: css({
    fontSize: '1.5rem',
    lineHeight: '2rem',
  }),
  month: css({
    fontSize: '1.2rem',
    color: colors.secondary13,
    textTransform: 'uppercase',
    textAlign: 'center',
  }),
}

const MONTH = [
  'Jan', 'Feb',	'März',	'Apr', 'Mai',	'Juni', 'Juli', 'Aug', 'Sept', 'Okt', 'Nov', 'Dez'
]
const CalendarDate = ({ date }) => {
  const d = new Date(date)
  return (
    <div {...styles.outer}>
      <div {...styles.date}>
        {`${d.getDate()}.`}
      </div>
      <div {...styles.month}>
        {MONTH[d.getMonth()]}
      </div>
    </div>
  )
}




export default CalendarDate
