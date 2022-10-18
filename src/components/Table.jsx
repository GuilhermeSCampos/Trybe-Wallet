import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpenseAction, editExpense } from '../redux/actions/index';

class Table extends Component {
  removeButton = ({ target }) => {
    const { name } = target;
    const { removeExpense } = this.props;
    removeExpense(Number(name));
  }

  editButton = ({ target }) => {
    const { name } = target;
    const { editMode } = this.props;
    editMode(Number(name));
  }

  render() {
    const { expenses } = this.props;
    return (
      <div className='text-gray-100 my-10 mx-5'>
        <table className='table-auto border-collapse border border-slate-500 w-full'>
          <thead>
            <tr>
              <th className='border border-slate-600'>Descrição</th>
              <th className='border border-slate-600'>Tag</th>
              <th className='border border-slate-600'>Método de pagamento</th>
              <th className='border border-slate-600'>Valor</th>
              <th className='border border-slate-600'>Moeda</th>
              <th className='border border-slate-600'>Câmbio utilizado</th>
              <th className='border border-slate-600'>Valor convertido</th>
              <th className='border border-slate-600'>Moeda de conversão</th>
              <th className='border border-slate-600'>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? <p className='text-center text-3xl my-4'>Sem despesas</p> : expenses.map((element) => (
              <tr key={element.id}>
                <td className='border border-slate-700'>{element.description}</td>
                <td className='border border-slate-700'>{element.tag}</td>
                <td className='border border-slate-700'>{element.method}</td>
                <td className='border border-slate-700'>{Number(element.value).toFixed(2)}</td>
                <td className='border border-slate-700'>{element.exchangeRates[element.currency].name}</td>
                <td className='border border-slate-700'>{Number(element.exchangeRates[element.currency].ask).toFixed(2)}</td>
                <td className='border border-slate-700'>
                  {(Number(element.value)
                    * Number(element.exchangeRates[element.currency].ask)).toFixed(2)}

                </td>
                <td className='border border-slate-700'>Real</td>
                <div>
                  <td className='border border-slate-700'>
                    <button
                      name={element.id}
                      onClick={this.editButton}
                      data-testid="edit-btn"
                      type="button"
                    >
                      Editar
                    </button>
                    <button
                      onClick={this.removeButton}
                      name={element.id}
                      type="button"
                      data-testid="delete-btn"
                    >
                      Excluir
                    </button>

                  </td>
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  expenses: store.wallet.expenses,
  editor: store.wallet.editor,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  removeExpense: PropTypes.func.isRequired,
  editMode: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (id) => dispatch(removeExpenseAction(id)),
  editMode: (id) => dispatch(editExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
