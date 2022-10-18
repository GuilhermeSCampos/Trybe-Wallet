// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const CURRENCIES_ACTION = 'CURRENCIES_ACTION';
const FORM_SUBMIT = 'FORM_SUBMIT';
const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES_ACTION:
    return {
      ...state,
      currencies: action.currencies,
    };
  case FORM_SUBMIT:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((element) => element.id !== action.id),
    };
  case 'EDIT_EXPENSE':
    return {
      ...state,
      editor: true,
      idToEdit: action.id,
    };
  case 'EDIT_SUBMIT':
    return {
      ...state,
      expenses: action.expenses,
      editor: false,
    };
  default:
    return state;
  }
};

export default wallet;
