import React from 'react';
import { cleanup, fireEvent, render, wait } from '@testing-library/react';
import Example from './Example';
import i18n from '../../i18n';
import { I18nextProvider } from 'react-i18next';
import { initialExampleState } from './duck/reducers';
import IState from './interfaces';

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(() => {
  cleanup();
});

interface IProps {
  example: IState;
}

const mockCreateExampleData = jest.fn();

const mockUpdateExampleData = jest.fn();

const mockSetSuccess = jest.fn();

const ExampleWithI18nProvider = (props: IProps) => {
  return (
    <I18nextProvider i18n={i18n}>
      <Example example={props.example} createExampleData={mockCreateExampleData} updateExampleData={mockUpdateExampleData} setSuccess={mockSetSuccess} />
    </I18nextProvider>
  );
};

it('Form exist in the component', () => {
  const { getByTestId } = render(<ExampleWithI18nProvider example={initialExampleState} />);
  expect(getByTestId('form-test-id')).toBeTruthy();
});

it('Success alert is not shown at first in the component', () => {
  const { queryByTestId } = render(<ExampleWithI18nProvider example={initialExampleState} />);
  expect(queryByTestId('success-alert-test-id')).toBeFalsy();
});

test('When an input is filled is value change', () => {
  const { container } = render(<ExampleWithI18nProvider example={initialExampleState} />);
  const inputCountry = container.querySelector('[name="country"]');
  expect(inputCountry).toBeTruthy();
  const newValue = 'Spain';
  if (inputCountry) {
    fireEvent.change(inputCountry, { target: { value: newValue } });
    expect((inputCountry as HTMLInputElement).value).toBe(newValue);
  }
});

test('If the form is not filled, the success alert is not shown', () => {
  const { container, queryByTestId } = render(<ExampleWithI18nProvider example={initialExampleState} />);
  const submitButton = container.querySelector('[type="submit"]');
  expect(submitButton).toBeTruthy();
  if (submitButton) {
    fireEvent.click(submitButton);
  }
  expect(queryByTestId('success-alert-test-id')).toBeFalsy();
});

test('When the form is filled properly, the function to create data is send', async () => {
  const { container } = render(<ExampleWithI18nProvider example={initialExampleState} />);
  const newItem = {
    country: 'Spain',
    year: 2020,
    inputAgeLess14: 20,
    inputAge1564: 30,
    ageOver65: 50
  };
  const inputCountry = container.querySelector('[name="country"]');
  inputCountry && fireEvent.change(inputCountry, { target: { value: newItem.country } });
  const inputYear = container.querySelector('[name="year"]');
  inputYear && fireEvent.change(inputYear, { target: { value: newItem.year } });
  const inputAgeLess14 = container.querySelector('[name="ageLess14"]');
  inputAgeLess14 && fireEvent.change(inputAgeLess14, { target: { value: newItem.inputAgeLess14 } });
  const inputAge1564 = container.querySelector('[name="age1564"]');
  inputAge1564 && fireEvent.change(inputAge1564, { target: { value: newItem.inputAge1564 } });
  const inputAgeOver65 = container.querySelector('[name="ageOver65"]');
  inputAgeOver65 && fireEvent.change(inputAgeOver65, { target: { value: newItem.ageOver65 } });
  const submitButton = container.querySelector('[type="submit"]');
  submitButton && fireEvent.click(submitButton);
  await wait(() => {
    expect(mockCreateExampleData).toHaveBeenCalled();
  });
});
