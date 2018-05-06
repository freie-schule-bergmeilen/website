import React from 'react'
import { css } from 'glamor'
import colors from '../styles/colors'


const styles = {
  outer: css({
    '& > *+*': {
      marginTop: '1rem',
    }
  }),
  icon: css({
    color: colors.complement1,
    '& > i': {
      fontSize: '1rem',
    },
    // backgroundColor: colors.secondary23,
    // borderRadius: '50%',
    // '& > i': {
    //   display: 'table-cell',
    //   textAlign: 'center',
    //   color: 'white',
    //   fontSize: '.9rem',
    //   width: '1.4rem',
    //   height: '1.4rem',
    // },
    marginRight: '.6rem',
  }),
  title: {
    outer: css({
      display: 'flex',
    }),
    text: css({
      lineHeight: '1.2em',
    }),
  }
}


const GoalsList = ({ goals, expand = false }) =>
  <div {...styles.outer}>
    {
      goals.map(({ title, description }) =>
        <div key={title}>
          <h4>
            <div {...styles.title.outer}>
              <span {...styles.icon}>
                <i className="fa fa-star"></i>
              </span>
              <div {...styles.title.text}>
              { title }
              </div>
            </div>
          </h4>
          { expand &&
          <div>
            { description }<br/><br/>
          </div>
          }
        </div>
      )
    }
  </div>


export default GoalsList
