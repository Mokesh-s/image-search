import React, { Component } from 'react'
import Unsplash from 'unsplash-js'
import queryString from 'query-string'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      imageUrl: ''
    }
  }

  componentDidMount () {
    const params = queryString.parse(window.location.search)
    const imageId = params.id
    const unsplash = new Unsplash({ accessKey: 'bhQhszv7DMgme63uJiCcww2UXTXi9qF2Mm3QESdqAGo' })
    unsplash.photos.getPhoto(imageId)
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log(data)
        this.setState({ imageUrl: data.urls.small })
      })
  }

  render () {
    return (
      <div id='image-details'>
        <h1>Image details</h1>
      </div>
    )
  }
}

export default Home
