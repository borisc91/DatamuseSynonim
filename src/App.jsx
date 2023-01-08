import { useState, useRef } from 'react'

import './App.css'
import Synonym from './components/Synonym';

function App(props) {

  const wordInput = useRef();
const [words, setWords] = useState()
  

  const checkHandler = (e) => {
    e.preventDefault()
    console.log(wordInput.current.value)

    const synonimWord = wordInput.current.value;
   fetch(`https://api.datamuse.com/words?rel_syn=${synonimWord}`)
    .then(res => {
     
      if(!res.ok) {
        console.log('Not Success')
        
        
    } 
      
      return  res.json()
    
   
    
  })

    .then(data =>  {
      
      if(data.length > 0) {
        setWords(data.map((dataa) => {
          return {synonym: dataa.word, key: Math.random().toString()}}))
        
        
  } else {
    setWords(
   [{synonym: "There is no synonim for this word", key: Math.random().toString()}])
  }


     
     
    })
    
      
    
    
    
   
    }
  
  

  return (
    <div className="App">
      <form onSubmit={checkHandler}>
        <label htmlFor='word'>Your Word</label>
        <input type='text' id='word' ref={wordInput} />
        <button>Submit</button>
        
        
        
      </form>


      <ul>
         
         {words &&    words.map((syn) => (
         <Synonym words = {syn.synonym} key={syn.key}/>
       ))}
       </ul>

      
       
    </div>
  )
}

export default App
