import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginAction, fetchCurrencies } from '../redux/actions';
import loginGif from '../investment-data-animate.svg'

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      button: true,
    };
  }

  inputHandle = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.verifyButton();
    });
  }

  verifyButton = () => {
    const { email, password } = this.state;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const PASSWORD_LENGTH = 5;
    if (regex.test(email) && password.length > PASSWORD_LENGTH) {
      this.setState({ button: false });
    } else {
      this.setState({ button: true });
    }
  }

  loginSubmit = () => {
    const { email } = this.state;
    const { history, submitLogin, getCurrencies } = this.props;
    submitLogin(email);
    getCurrencies();
    history.push('/carteira');
  }

  render() {
    const { email, password, button } = this.state;
    return (
      <div className='bg-gray-800 flex flex-row-reverse justify-between items-center' >
        <div className="flex flex-col	m-3.5 mr-20 justify-items-center items-center justify-center max-w-xl w-3/4 bg-gray-700 h-96 rounded-xl">
          <h2 className='text-6xl text-zinc-300 mb-3' >Trybe Wallet</h2>
          <input
            name="email"
            value={email}
            data-testid="email-input"
            placeholder="Email"
            onChange={this.inputHandle}
            type="email"
            className='rounded max-w-screen-sm m-3.5 py-2 px-3 w-1/2 alin'
          />
          <input
            name="password"
            value={password}
            data-testid="password-input"
            placeholder="Senha"
            onChange={this.inputHandle}
            type="password"
            minLength="6"
            className='rounded max-w-screen-sm m-3.5 py-2 px-3 w-1/2 items-center'
          />
          <button
            disabled={button}
            o
            onClick={this.loginSubmit}
            type="button"
            className='rounded max-w-xs text-zinc-300 bg-emerald-700 w-1/4 py-2 px-2.5 hover:bg-cyan-800 ease-in-out duration-1000'
          >
            Entrar

          </button>
        </div>
        <img src={loginGif} alt="chupeta" className='w-screen h-screen' />
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
  submitLogin: PropTypes.func.isRequired,
  getCurrencies: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  submitLogin: (email) => dispatch(loginAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
