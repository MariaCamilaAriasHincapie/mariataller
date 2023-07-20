import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react';
import Form from './Form';
import { steps } from '../App';

describe('Form test', () => {

  it('validate title and label of inputs', () => {

    for (const _step of steps) {
      const component = render(
        <Form 
          title={_step.title}
          HandleNextFunction={() => null}
          HandlePreviuosFunction={() => null}
          inputs={_step.inputs}
          hidePreviuos={_step.hidePreviuos}
          StepSelected={_step.step}
        />
      );

      component.getByText(_step.title);

      for (const _input of _step.inputs) {
        component.getByText(_input.label);
      }
    }


  });

});