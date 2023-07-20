import React, {useContext} from 'react'
import { Context } from '../config/Context'
import { steps } from '../App'
import './Summary.css'
import './Form.css'

const Summary = ({handleReset}) => {

  const {Steps} = useContext(Context)

  const getAllInputs = () => {
    let inputs = []

    const newSteps = Steps || steps

    newSteps.forEach(step => {
      inputs = inputs.concat(step.inputs)
    })

    return inputs
  }

  return (
    <div className='container-summary' >
      {getAllInputs()?.map((input, idx) => {
        if(input.name === 'password') return null
        return (
          <main className="summary-input" key={idx}>
            <div className='div-1'>
              <p>{input.label}:</p>
            </div>
            
            {input.name === 'color' ? 
              <div style={{width : '100px', height : '20px', backgroundColor : input.value}} />
            :
              <div className='div-2'>
                <p>{input.value}</p>
              </div>
            }
          </main>
        )
      })}


      <div className='container-button' >
        <button className='button-previuos' onClick={handleReset} >
          <p> Salir </p>
        </button>
      </div>
    </div>

  );
}
 
export default Summary;