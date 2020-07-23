import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'
// import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import './Overlay.css'
import { unsplash } from '../config'

class Overlay extends Component {
  constructor (props) {
    super(props)
    this.state = {
      show: false,
      imageData: '',
      downloadData: ''
    }
    this.handleAnimation = this.handleAnimation.bind(this)
    this.delayHandle = this.delayHandle.bind(this)
    this.handleDownload = this.handleDownload.bind(this)
  }

  // hide background scroll
  componentDidMount () {
    const targetElement = document.querySelector('body')
    targetElement.style.overflow = 'hidden'
    this.setState({ show: !this.state.show })
    const imageId = this.props.imageId
    console.log(imageId)
    unsplash.photos.getPhoto(imageId)
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log(data)
        this.setState({ imageData: data })
      })
  }

  // reset background scroll
  componentWillUnmount () {
    // clearAllBodyScrollLocks()
    const targetElement = document.querySelector('body')
    targetElement.style.overflow = 'auto'
    this.setState({ show: !this.state.show })
  }

  delayHandle () {
    setTimeout(() => {
      this.setState({ show: !this.state.show })
      this.props.hideOverlay()
    }, 1000)
  }

  handleAnimation () {
    this.setState({ show: !this.state.show })
    setTimeout(() => { this.props.hideOverlay() }, 500)
  }

  handleDownload () {
    unsplash.photos.getPhoto(this.state.imageId)
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log(data)
        this.setState({ downloadData: data })
      })
  }

  render () {
    const { imageData } = this.state
    return (
      <Fade when={this.state.show}>
        {imageData
          ? <div id='overlay'>
            <div className={'overlay-block ' + this.props.size}>
              <div className='overlay-body classdet-sel'>
                <img src='/close.png' className='close-icon' onClick={this.handleAnimation} />
                <div className='image-content'>
                  <div class='image-title'>
                    <div className='profile-info'>
                      <img src={imageData.user.profile_image.small} className='profile-image' />
                      <div className='profile-name'>
                        <div>{imageData.user.name}</div>
                        <div className='username'>@{imageData.user.username}</div>
                      </div>
                    </div>
                  </div>
                  <div className='img-container'><img src={imageData.urls.small} /></div>
                  <div className='download-button'>
                    <a
                      href={`${imageData.links.download}?force=true`} download
                      className='load-more-button'
                    >
                    Download
                    </a>
                  </div>
                </div>
              </div>
            </div>
            </div>
          : ''}
      </Fade>
    )
  }
}

export default Overlay
