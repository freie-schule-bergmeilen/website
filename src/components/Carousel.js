import React from 'react'
import Img from 'gatsby-image'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import _ from 'lodash'


const Image = ({ sizes }) =>
  <figure
    key={sizes.src}
    className="image"
  >
    <Img
      sizes={sizes}
      style={{
        minHeight: 200,
      }}
    />
  </figure>

export default ({ images }) => {
  if (_.isEmpty(images)) {
    return null
  }
  return (
    <div className="carousel-outer"> {
      images.length > 1 ?
        <Carousel
          showStatus={false}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={5000}
          transitionTime={750}
        >
          {_.sortBy(images, 'sizes.src')
            .map(({ sizes }, i) => <Image key={i} sizes={sizes}/>)
          }
        </Carousel>
      :
        <Image sizes={_.first(images).sizes} />
    }
    </div>
  )
}
