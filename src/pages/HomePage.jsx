import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setTrainer } from '../store/slices/trainer.slice'
import { useNavigate } from 'react-router-dom'
import './styles/homePage.css'

const HomePage = () => {

const dispatch = useDispatch()

const navigate = useNavigate()

const textInput = useRef()

const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(setTrainer(textInput.current.value))
    textInput.current.value = '';
    navigate('/pokedex')
  }


  return (
    <div className='homePage'>
    <div className="wrapper">
      <h2 className='title'>POKEDEX</h2>
   </div>
   <div className='line'></div>
    <div className='greeting'>
    <p className='greeting__text'>Enter your name</p>
    <form onSubmit={handleSubmit}>
      <input className='input' ref={textInput} type="text" />
      <button className='start__button'>Start</button>
    </form>
    <img src="assets/pokeball.png" alt="pokeball" className='pokeball'/>
    </div>
    </div>
  )
}



export default HomePage 