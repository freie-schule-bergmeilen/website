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
      flexBasis: 0,
      flexGrow: 1,
      marginBottom: '5rem',
      minWidth: '13rem',
      maxWidth: '20rem',
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
      fontSize: '1.5rem',
      lineHeight: '1.65rem',
      // fontWeight: 'bold',
      fontFamily: 'Fresca',
      marginBottom: '.6rem',
      color: '#346',
    }),
    position: css({
      fontSize: '0.9rem',
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


export default (
  {
    data: {
      teamMembers: {
        edges: members
      }
    }
  }
) =>
  <section className="section">
    <Helmet>
      <title>Team</title>
    </Helmet>
    <h2 className="title is-size-3 is-bold-light">Team</h2>
    <div className="column">
      <div {...styles.teamMembers}>
        {members.map(
          ({  node: {
              id,
              frontmatter
            }}, i) => <TeamMember key={i} {...frontmatter} />)}
      </div>
    </div>
  </section>



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
        <div>
          { resolutions && <figure className=" is-2by3">
            <Img
              className={styles.img}
              resolutions={resolutions}
            />
          </figure>
          }
        </div>
        <div>
          <div className="content">
            <div {...styles.teamMember.content}>
              <div {...styles.teamMember.nameAndPosition}>
                <div {...styles.teamMember.name}>{name}</div>
                <div {...styles.teamMember.position}>{ position }</div>
              </div>
              <div>
                <div {...styles.teamMember.experience}>
                { experience }
                </div>
              </div>
              {!_.isEmpty(children) &&
              <div>
                <div {...styles.teamMember.kids.title}>
                  Kinder: {children.map(({ name, year }) => `${name}, ${year}`).join(', ')}
                </div>
              </div>
              }
              { /* bio */ }
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}



export const pageQuery = graphql`
  query TeamQuery {

    teamMembers: allMarkdownRemark(
      filter: {frontmatter: {dataKind: {eq: "team-member"}}},
      sort: {order: ASC, fields: [frontmatter___order]} 
    ) {
      edges {
        node {
          id
          frontmatter {
            name: title
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


// image {
//   childImageSharp {
//     responsiveSizes(maxWidth: 400) {
//       src
//       srcSet
//       sizes
//     }
//   }
// }
