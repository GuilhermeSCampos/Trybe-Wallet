// Coloque aqui suas actions
const LOGIN_ACTION = 'LOGIN_ACTION';
const CURRENCIES_ACTION = 'CURRENCIES_ACTION';
const FORM_SUBMIT = 'FORM_SUBMIT';
const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export function loginAction(email) {
  return { type: LOGIN_ACTION, email };
}

function submitForm(payload) {
  return {
    type: FORM_SUBMIT,
    payload,
  };
}

function getCurrenciesAction(currencies) {
  return { type: CURRENCIES_ACTION, currencies };
}

export function removeExpenseAction(id) {
  return {
    type: REMOVE_EXPENSE,
    id,
  };
}

export function editExpense(id) {
  return {
    type: 'EDIT_EXPENSE',
    id,
  };
}

export function formEditExpense(expenses) {
  return {
    type: 'EDIT_SUBMIT',
    expenses,
  };
}

export function fetchCurrencies() {
  return async (dispatch) => {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await request.json();
    const currencies = Object.keys(data).filter(
      (element) => element !== 'USDT',
    );
    dispatch(getCurrenciesAction(currencies));
  };
}

export function buttonCurrenciesSubmit(payload) {
  return async (dispatch) => {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await request.json();
    payload.exchangeRates = data;
    dispatch(submitForm(payload));
  };
}
