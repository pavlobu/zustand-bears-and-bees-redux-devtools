import React from 'react'
import { useBearStore } from './bear-store'

export default function Bears(){
  const bears = useBearStore(state => state.bears)
  let arr = []
  for(let i = 0; i < bears; i++){
    arr.push(<span key={i}>🐻</span>)
  }
  return(
    <div>
      {arr}
    </div>
  )
}
