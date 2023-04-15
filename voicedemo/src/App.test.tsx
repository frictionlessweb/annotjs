import React from 'react';
import { render } from '@testing-library/react';
import { App } from './App';

describe("Our app", () => {
  test("Should render without crashing", () => {
    render(<App />);
  })
})
