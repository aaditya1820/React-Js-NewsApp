import React from 'react'
import loading from './loading.gif'

export default function Spinner() {
  return (
    <div align="center">
      <img src={loading} alt="loading"></img>
    </div>
  )
}
