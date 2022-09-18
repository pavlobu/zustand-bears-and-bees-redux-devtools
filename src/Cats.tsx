import React from 'react'
import { useCatStore } from './cats-store'

export default function Cats(){
  const cats = useCatStore(state => state.cats)
  let arr = []
  for(let i = 0; i < cats; i++){
    arr.push(<span key={i}>🐱</span>)
  }
  return(
    <div>
      {arr}
    </div>
  )
}
