import React from 'react'
import Img from 'gatsby-image'
import { Carousel } from 'react-responsive-carousel'
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css'

import _ from 'lodash'


export default ({ images }) =>
  <div style={{
    margin: '0 22px',
  }}>
    <Carousel
      showStatus={false}
      showThumbs={false}
      infiniteLoop={true}
      autoPlay={true}
      interval={10000}
      transitionTime={1000}
    >
      {_.sortBy(images, 'node.sizes.src')
        .map(({ node: { sizes }}) =>
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

      )}
    </Carousel>
  </div>
