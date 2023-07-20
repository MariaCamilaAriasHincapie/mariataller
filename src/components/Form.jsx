import React, {useContext} from 'react'
import { useFormik } from 'formik';
import { Context } from '../config/Context';
import './Form.css'

const Form = ({ title, HandleNextFunction, inputs, HandlePreviuosFunction, hidePreviuos, StepSelected}) => {

  const {Steps, setSteps} = useContext(Context)

  const getStep = () => {
    return Steps?.find(item => item?.step === StepSelected)
  }

  const getInitialValues = () => {
    const newInputs = getStep()?.inputs || inputs
    const ConvertInputsInObject = newInputs.reduce((acc, item) => {
      acc[item.name] = item?.value
      return acc
    }, {})

    return ConvertInputsInObject
  }

  const updateContextWithInputValue = (e) => {
    const newSteps = Steps?.map((item) => {
      //@INFO En caso tal de que el paso no sea en el que estoy
      if(item.step !== StepSelected) return item


      const newInputs = item?.inputs?.map((input) => {

        if(input.name === e.target.name) {
          return {
            ...input,
            value : e.target.value
          }
        }

        return input
      })

      return {
        ...item,
        inputs : newInputs
      }
    })

    setSteps(newSteps)
  }

  const formik = useFormik({
    initialValues: getInitialValues(),
    onSubmit: (values) => {
      HandleNextFunction()
    },
    validate : values => {

      let custom_errors = {}
      const inputs_keys = inputs?.map(item => item.name)
      const values_keys = Object.keys(values)

      for (const _inputKey of inputs_keys) {
        if(!values_keys.includes(_inputKey)) custom_errors[_inputKey] = true
      }

      if(Object.keys(custom_errors).length) return custom_errors


      let errors = {} 

      const valueList = Object.keys(values)

      for (const _value of valueList) {
        if(!values[_value]) errors[_value] = true
      }

      const errors_keys = Object.keys(errors)

      for (const _keys of errors_keys) {
        if(!inputs_keys.includes(_keys)) delete errors[_keys]
      }

      return errors
    }
  });

  return (
    <div className='page'>
      <form onSubmit={formik.handleSubmit} className='form'>
        <h2 className='title'> {title} </h2>

        {inputs.map((input, index) =>
          <div key={index}>
            <label htmlFor={input.name}> {input.label} </label>
            <br />
            <input
              id={input.name}
              name={input.name}
              type={input.type}
              placeholder={input.placeholder}
              onChange={(e) => {
                formik.handleChange(e)
                updateContextWithInputValue(e)
              }}
              value={input?.value ||  formik?.values[input?.name] || ''}
              style={formik?.errors[input?.name] ? {border : 'none', borderBottom: '1px solid red'} : undefined}
              className='input-data'
            />

            <br />

          </div>
        )}

        <div className='div-buttons'>
          {hidePreviuos ? null :
            <button className='button-previuos' type="button" onClick={() => HandlePreviuosFunction()} >
              <p> Anterior </p>
            </button>
          }
          <button type="submit">  
            <p> Siguiente </p>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;