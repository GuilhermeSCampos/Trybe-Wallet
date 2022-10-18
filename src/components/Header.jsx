import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    let sum = 0;
    expenses.forEach((element) => {
      const { currency } = element;
      sum += Number(element.value) * element.exchangeRates[currency].ask;
    });
    return (
      <div>
        <span data-testid="email-field">{email}</span>
        <div>
          <span data-testid="total-field">{sum.toFixed(2)}</span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
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
