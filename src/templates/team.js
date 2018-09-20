import React from 'react'
import _ from 'lodash'
import Img from 'gatsby-image'
import { css } from 'glamor'
import Helmet from 'react-helmet';


const styles = {
  teamMembers: css({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    '& > *+*': {
      marginLeft: '1rem',
    }
  }),
  teamMember: {
    outer: css({
      display: 'flex',
      textAlign: 'center',
      justifyContent: 'center',
      flexBasis: 0,
      flexGrow: 1,
      marginBottom: '5rem',
      minWidth: '13rem',
      maxWidth: '20rem',
      padding: 10,
      border: '1px solid #fff',
      '@media screen and (min-width: 736px)': {
        '& .extras': {
          maxHeight: 0,
          overflow: 'hidden',
          transition: 'max-height 0.5s ease-out',
        },
        '&:hover': {
          border: '1px solid #ccc',
          boxShadow: '0 2px 3px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.1)',
          borderRadius: 5,
          '& .extras': {
            maxHeight: 1000,
          },
        }
      },
    }),
    content: css({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }),
    nameAndPosition: css({
      marginTop: '1rem',
      marginBottom: '1rem',
      // minHeight: '4.5rem',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
    }),
    name: css({
      fontSize: '1.2rem',
      lineHeight: '1.65rem',
      // fontWeight: 'bold',
      fontFamily: 'Fresca',
      marginBottom: '.6rem',
      color: '#346',
    }),
    position: css({
      fontSize: '0.8rem',
      marginBottom: '.5rem',
      fontWeight: 'bold',
    }),
    experience: css({
      fontSize: '0.8rem',
      marginBottom: '.5rem',
    }),
    kids: {
      title: css({
        fontSize: '0.8rem',
      }),
    }
  },
  img: css({
    borderRadius: '50%',
  })
}


const TeamMember = ({
  name,
  image,
  position,
  experience,
  children
}) => {
  const resolutions = _.get(image, 'childImageSharp.resolutions')
  return (
    <div {...styles.teamMember.outer}>
      <article>
        <div style={{
          minHeight: 165,
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
        }}>
          { resolutions ? <figure className=" is-2by3">
            <Img
              className={styles.img}
              resolutions={resolutions}
            />
          </figure> :
            <div style={{
              backgroundColor: '#eee',
              width: 160,
              height: 160,
              borderRadius: '50%',
            }}></div>
          }
        </div>
        <div>
          <div className="content">
            <div {...styles.teamMember.content}>
              <div {...styles.teamMember.nameAndPosition}>
                <div {...styles.teamMember.name}>{name}</div>
                <div {...styles.teamMember.position}>{ position }</div>
              </div>
              <div className="extras">
                <div>
                  <div {...styles.teamMember.experience}>
                  { experience }
                  </div>
                </div>
                {!_.isEmpty(children) &&
                <div>
                  <div {...styles.teamMember.kids.title}>
                    Kinder: {children.map(
                      ({ name, year }) => [name, year ? `(${year})` : ''].filter(c => !!c).join(' ')).join(', ')}
                  </div>
                </div>
                }
                { /* bio */ }
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}


const TeamGroup = ({ type, intro, members }) =>
  !_.isEmpty(members) &&
  <div>
    <h2 className="title is-size-3 is-bold-light">{type}</h2>
    {intro && <div>{intro}</div>}
    <div className="column">
      <div {...styles.teamMembers}>
        {members.map(
          (member, i) => <TeamMember key={i} {...member} />)}
      </div>
    </div>
  </div>

export default function Template({ data }) {
  const {
    markdownRemark: {
      frontmatter: {
        teamGroups
      }
    }
  } = data

  return (
    <section className="section">
      <Helmet>
        <title>Team</title>
      </Helmet>
      {
        teamGroups.map(({ positionType, intro, teamMembers }, i) =>
          <TeamGroup
            key={i}
            type={positionType}
            intro={intro}
            members={teamMembers}
          />
        )
      }
    </section>
  )
}



export const pageQuery = graphql`
  query TeamByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        teamGroups {
          positionType
          intro
          teamMembers {
            name: title
            positionType
            image {
              childImageSharp {
               resolutions(width: 160, height: 160, quality: 90, cropFocus: CENTER) {
                 ...GatsbyImageSharpResolutions
               }
              }
            }
            position
            experience
            children {
              name
              year
            }
          }
        }
      }
    }
  }
`;


