import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import wallet from '../wallet.png'

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    let sum = 0;
    expenses.forEach((element) => {
      const { currency } = element;
      sum += Number(element.value) * element.exchangeRates[currency].ask;
    });
    return (
      <div className='flex text-stone-50 flex-row-reverse justify-between max-h-11 text-2xl bg-gray-800'>
        <span data-testid="mx-1">{email}</span>
        <div className=''>
          <span data-testid="total-field">Seus Gastos: </span>
          <span data-testid="total-field">{sum.toFixed(2)}</span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
        {/* <img src={wallet} className='w-12' /> */}
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = (store) => ({
  email: store.user.email,
  expenses: store.wallet.expenses,
  editor: store.wallet.editor,
});

export default connect(mapStateToProps)(Header);
