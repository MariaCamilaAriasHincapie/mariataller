import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react';
import Summary from './Summary';

describe('Summary test', () => {

  it('validate text of summary', () => {
    const component = render(<Summary />);
    component.getByText('Nombres:');
  });

});