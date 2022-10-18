import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  buttonCurrenciesSubmit,
  formEditExpense,
} from '../redux/actions/index';

const alimentação = 'Alimentação';
class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentação,
    };
  }

  inputHandle = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  submitFormButton = (e) => {
    e.preventDefault();
    const { value, description, currency, method, tag, id } = this.state;
    const { submitForm } = this.props;
    submitForm({ id, value, currency, method, tag, description }, currency);
    this.setState((prev) => ({
      id: prev.id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: alimentação,
    }));
  };

  editFormButton = (e) => {
    e.preventDefault();
    const { value, description, currency, method, tag } = this.state;
    const { editForm, expenses, idToEdit } = this.props;
    expenses.find((element) => element.id === idToEdit).value = value;
    expenses.find((element) => element.id === idToEdit).description = description;
    expenses.find((element) => element.id === idToEdit).currency = currency;
    expenses.find((element) => element.id === idToEdit).method = method;
    expenses.find((element) => element.id === idToEdit).tag = tag;
    editForm(expenses);
  }

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div className='my-10 mx-5'>
        <form>
          <label className='text-gray-100'> Valor
            <input
              value={value}
              name="value"
              data-testid="value-input"
              onChange={this.inputHandle}
              type="number"
              className='text-gray-800 mx-4 rounded'
            />
          </label>
          <label className='text-gray-100'> Descrição
            <input
              value={description}
              name="description"
              data-testid="description-input"
              onChange={this.inputHandle}
              className='text-gray-800 mx-4 rounded'
            />
          </label>
          <label className='text-gray-100'> Moeda
            <select
              value={currency}
              name="currency"
              data-testid="currency-input"
              onChange={this.inputHandle}
              className='text-gray-800 mx-4 rounded'
            >
              {currencies.map((element) => (
                <option value={element} key={element}>
                  {element}
                </option>
              ))}
            </select>
          </label>
          <label className='text-gray-100'> Método
            <select
              value={method}
              name="method"
              data-testid="method-input"
              onChange={this.inputHandle}
              className='text-gray-800 mx-4 rounded'
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label className='text-gray-100'> Tag
            <select
              value={tag}
              name="tag"
              data-testid="tag-input"
              onChange={this.inputHandle}
              className='text-gray-800 mx-4'
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          {editor ? (
            <button
              name="edita-despesa"
              type="submit"
              onClick={this.editFormButton}
              className='text-gray-100  bg-emerald-700 py-1 px-3 rounded hover:bg-cyan-800 ease-in-out duration-1000'
            >
              Editar despesa
            </button>
          ) : (
            <button
              name="adiciona-despesa"
              type="submit"
              onClick={this.submitFormButton}
              className='text-gray-100  bg-emerald-700 py-1 px-3 rounded hover:bg-cyan-800 ease-in-out duration-1000'
            >
              Adicionar despesa
            </button>
          )}
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitForm: (payload, currency) => dispatch(buttonCurrenciesSubmit(payload, currency)),
  editForm: (expenses) => dispatch(formEditExpense(expenses)),
});

const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
  expenses: store.wallet.expenses,
  idToEdit: store.wallet.idToEdit,
  editor: store.wallet.editor,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  submitForm: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  editForm: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
