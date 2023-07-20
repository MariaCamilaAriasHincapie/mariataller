import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react';
import App from './App';

describe('Load App', () => {

  it('render App', () => {
    const component = render(<App />);

    component.getByText('FashionApp');
  });

});