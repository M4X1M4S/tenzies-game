import React from "react";
import Main from "../src/components/Main"
import '../src/App.css'
import Die from "../src/components/Die";
import { v4 as uuid } from 'uuid';
import Confetti from "react-confetti";


export default function App(){
  function generateNewDie(){
return(
  {value:Math.floor((Math.random()*6) +1),
    isHeld:false,
    id:uuid()}
)
  }
  const[dice,setDice]=React.useState(allnewdice())
  const [tenzies,setTenzies]=React.useState(false)

  React.useEffect(()=>
    { 
      const allHeldDies=dice.every(die=>die.isHeld)
      
      const firstValue=dice[1].value
      
      const allSameVal=dice.every(die=>(die.value===firstValue))
      
      
      if(allHeldDies && allSameVal){
        setTenzies(true)
        console.log("you won!")
      }
      
    },
  [dice])
  
  
  function allnewdice(){
    const newDice=[]
    
    for( var i=0;i<10;i++){
      newDice.push(generateNewDie())
    }
    
    return(
      newDice
    )

  }

  function rollDice(){
    if(!tenzies){
    setDice(oldDice=>oldDice.map(die=>{ 
    
      return die.isHeld? die:generateNewDie()
     }))}
     else{
      setTenzies(false)
      setDice(allnewdice())
     }
    }


  function holdDice(id){
    setDice(oldDice=>oldDice.map(die=>{
      return die.id===id? {...die,isHeld:!die.isHeld}:die
    }))
      
    
    
  }  
  
  const diceElements=dice.map(die =><Die 
    key={die.id}
    num={die.value} 
    isHeld={die.isHeld} 
    holdDice={()=>holdDice(die.id)}/>)
  
  return(
    <Main>
      {tenzies&&<Confetti/>}
      <div className="dice--container">
        
      {diceElements}
      
    </div>
    <button className='roll--dice'onClick={rollDice}>{tenzies?"RESET":"ROLL"}</button>
    </Main>
  
  )
  }