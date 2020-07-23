import React, { Component } from 'react'
import './Home.css'
import Overlay from '../Overlay/Overlay'
import { unsplash } from '../config'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      photosList: '',
      search: '',
      totalPage: 1,
      pageNumber: 1,
      hasNextPage: true
    }
    this.handleImageClick = this.handleImageClick.bind(this)
    this.hideOverlay = this.hideOverlay.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.getPhotosList = this.getPhotosList.bind(this)
    this.handleLoadMore = this.handleLoadMore.bind(this)
    this.getRandomPhoto = this.getRandomPhoto.bind(this)
  }

  componentDidMount () {
    this.getPhotosList()
    this.getRandomPhoto()
  }

  getRandomPhoto () {
    // unsplash.photos.getRandomPhoto()
    //   .then(data => {
    //     return data.json()
    //   })
    //   .then(data => {
    //     console.log(data)
    //     this.setState({ randomPhoto: data.urls.full })
    //   })
    this.setState({ randomPhoto: 'https://images.unsplash.com/photo-1593642703055-4b72c180d9b5?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE1MDMxM30' })
  }

  handleLoadMore () {
    let { pageNumber, photosList } = this.state
    pageNumber++
    this.setState({ pageNumber: pageNumber })
    unsplash.photos.getRandomPhoto({ orientation: 'landscape', count: 9 })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log(data)
        this.setState({ photosList: [...photosList, ...data] })
      })
  }

  getPhotosList () {
    // unsplash.photos.listPhotos(this.state.pageNumber, 9, 'latest')
    //   .then(data => {
    //     return data.json()
    //   })
    //   .then(data => {
    //     console.log(data)
    //     this.setState({ photosList: data, hasNextPage: true })
    //   })
    unsplash.photos.getRandomPhoto({ orientation: 'landscape', count: 9 })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log(data)
        this.setState({ photosList: data, hasNextPage: true })
      })
  }

  handleImageClick (id) {
    this.setState({ showOverlay: true, id })
  }

  hideOverlay () {
    this.setState({ showOverlay: false })
  }

  handleSearch (e) {
    if (e.key !== 'Enter') return
    const searchString = this.refs.search.value.trim()
    if (searchString) {
      unsplash.search.photos(searchString, 1, 9, { orientation: 'landscape' })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log(data)
          this.setState({ photosList: data.results, totalPage: data.total_pages })
          if (data.total_pages > this.state.pageNumber) {
            this.setState({ hasNextPage: true })
          } else this.setState({ hasNextPage: false })
        })
    } else this.getPhotosList()
  }

  render () {
    const { randomPhoto, photosList, showOverlay, id, hasNextPage } = this.state
    return (
      <div id='home' ref='home'>
        <img src={randomPhoto} className='hero-image' />
        {showOverlay && <Overlay typeOfComponent='FreeTrial' hideOverlay={this.hideOverlay} imageId={id} />}
        <div className='home-content'>
          <div>
            <img src='/logo.svg' />
            <div className='search-container'>
              <h1>Free stock photos for everything</h1>
              <h2>We offer best free stock photos all in one place</h2>
              <input className='search-bar' type='text' name='search' ref='search' placeholder='Search for images here...' onKeyDown={this.handleSearch} />
            </div>
          </div>
          <div className='grid-container'>
            {
              Object.keys(photosList).length > 0
                ? photosList.map((element, index) => {
                  return (
                    <div key={index} className='grid-item' onClick={() => this.handleImageClick(element.id)}>
                      <img key={index} src={element.urls.thumb} alt={element.alt_description} />
                      <div className='profile-info'>
                        <img src={element.user.profile_image.small} className='profile-image' />
                        <div className='profile-name'>
                          {element.user.name}
                        </div>
                      </div>
                    </div>
                  )
                })
                : <h1> No Images Found </h1>
            }
          </div>
          {
            photosList && Object.keys(photosList).length > 0 && hasNextPage
              ? <div className='load-more'>
                <div className='load-more-button' onClick={this.handleLoadMore}>Load more</div>
              </div>
              : ''
          }
        </div>
      </div>
    )
  }
}

export default Home
