import React from 'react'
import ReactPlayer from 'react-player'
import './video.css'
export default function Video({video}) {
  return (
    <div className='player-wrapper'>
        <ReactPlayer className='react-player' url={video} width="100%"
        height='90%'></ReactPlayer>
    </div>
  )
}
