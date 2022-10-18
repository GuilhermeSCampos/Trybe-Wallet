import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    // const { expenses } = this.props;
    return (
      <div>
        <Header />
        <WalletForm />
        <Table />
        {/* <table>
          {expenses.map((element) => (
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
            </tr>
          ))}
        </table> */}
      </div>);
  }
}

const mapStateToProps = (store) => ({
  expenses: store.wallet.expenses,
});

// Wallet.propTypes = {
//   expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
// };

export default connect(mapStateToProps, null)(Wallet);
