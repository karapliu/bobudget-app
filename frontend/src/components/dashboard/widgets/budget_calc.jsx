import React from "react";
import { Link } from 'react-router-dom';
import Calculator from './calculator';

class BudgetCalc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchPurchases(this.props.currentUser.id)
      .then(() => this.setState({ price: "" }));
  }

  handleSubmit(e) {
    e.preventDefault();
    let purchase = {
      price: this.state.price
    }

    this.props.createPurchase(purchase)
      .then(() => this.setState({
        price: ""
      }));
    // .then(() => this.props.history.push("/dashboard"))
  }

  update() {
    return (e) => this.setState({ price: e.currentTarget.value });
  }

  render() {
    const { currentUser, purchases } = this.props;

    if (!currentUser.data) return null;
    if (!purchases) return null;

    let moneySpent = 0;

    for (let i = 0; i < purchases.length; i++) {
      moneySpent += purchases[i].price;
    }

    let moneyLeft = currentUser.data.user.budget - moneySpent;

    let red = moneyLeft.toString().slice(0, 1) === '-' ? 'red' : '';
    debugger
    return (
      <div className="d-middle">
        <div className="budget flex-column">
          <form onSubmit={this.handleSubmit}>
            <div className="pos-relative">
              <input
                className="budget-input"
                type="number"
                step="0.01"
                onChange={this.update("price")}
                value={this.state.price}
              />
              <button
                className="budget-button flex-row jus-center align-center"
                // onSubmit={this.handleSubmit}
              >
                <i className="fas fa-plus-circle" />
              </button>

            </div>
          </form>
          <div className="flex-row align-center">
            <h1>Monthly budget: </h1>
            <div className="price">$ {currentUser.data.user.budget}</div>
          </div>
          <div className="flex-row align-center">
            <h1>Money spent: </h1>
            <div className="price">$ {moneySpent}</div>
          </div>
          <div className='flex-row align-center'>
            <h1>Amount left: </h1>
            <div className={`price ${red}`}>$ {moneyLeft}</div>
          </div>
          <Link className="center" to="/purchases">Purchase History</Link>
        </div>

        <Calculator moneySpent={moneySpent} moneyLeft={moneyLeft} />
      </div>
    );
  }
}

export default BudgetCalc;
