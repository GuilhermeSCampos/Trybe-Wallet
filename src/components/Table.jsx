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
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? <p>Sem despesas</p> : expenses.map((element) => (
              <tr key={ element.id }>
                <td>{element.description}</td>
                <td>{element.tag}</td>
                <td>{element.method}</td>
                <td>{Number(element.value).toFixed(2)}</td>
                <td>{element.exchangeRates[element.currency].name}</td>
                <td>{Number(element.exchangeRates[element.currency].ask).toFixed(2)}</td>
                <td>
                  {(Number(element.value)
              * Number(element.exchangeRates[element.currency].ask)).toFixed(2)}

                </td>
                <td>Real</td>
                <div>
                  <td>
                    <button
                      name={ element.id }
                      onClick={ this.editButton }
                      data-testid="edit-btn"
                      type="button"
                    >
                      Editar
                    </button>
                    <button
                      onClick={ this.removeButton }
                      name={ element.id }
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
