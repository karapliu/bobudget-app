import React from 'react';

class PurchaseHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: "",
    };

    this.handleDelete = this.handleDelete.bind(this);
    // this.deleteButton = this.deleteButton.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser().then(() =>
      this.setState({
        budget: this.props.currentUser.data.user.budget,
      })
    );
    this.props.fetchPurchases();
  }

  handleSubmit(e) {
    e.preventDefault();
    // this.update('budget')
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.removePurchase(e.currentTarget.value);
  }

  update(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value });
  }

  render() {
    const { purchases } = this.props;
    // debugger
    const newDate = new Date();
    const monthNum = newDate.getMonth();
    const year = newDate.getFullYear();
    let month = "";
    switch (monthNum) {
      case 0:
        month = "January";
        break;
      case 1:
        month = "February";
        break;
      case 2:
        month = "March";
        break;
      case 3:
        month = "April";
        break;
      case 4:
        month = "May";
        break;
      case 5:
        month = "June";
        break;
      case 6:
        month = "July";
        break;
      case 7:
        month = "August";
        break;
      case 8:
        month = "September";
        break;
      case 9:
        month = "October";
        break;
      case 10:
        month = "November";
        break;
      case 11:
        month = "December";
        break;
      default:
        return;
    }

    if (!purchases) return null;

    let monthlyPurchases = purchases.filter((purchase) => {
      const purchaseDate = new Date(purchase.date);
      const purchaseMonth = purchaseDate.getMonth();
      return purchaseMonth === monthNum;
    });

    let totalSpend = 0;

    let purchaseItems = monthlyPurchases.map((purchase) => {
      const newDate = new Date(purchase.date);
      const newDateString = newDate.toDateString();
      totalSpend += purchase.price;
      return (
        <li key={`p-${purchase.date}-${purchase.price}`}>
          <span>{newDateString}</span>: $<span>{purchase.price}</span>
          <button value={purchase.id} onClick={this.handleDelete}>
          DELETE
        </button>
        </li>
      );
    });

    return (
      <div>
        <h1>
          Purchase History for {month} {year}
        </h1>
        <section>
          <form>
            <label>
              Update your budget: $
              <input
                type="number"
                min="5.00"
                step="0.01"
                value={this.state.budget}
                onChange={this.update("budget")}
              />
            </label>
          </form>
        </section>
        <section>
          <h3>Monthly Budget: ${this.state.budget}</h3>
        </section>
        <section>
          <h3>Total Spend This Month: ${totalSpend}</h3>
          <h3>Current Purchases:</h3>
          {purchaseItems}
        </section>
      </div>
    );
  }
}

export default PurchaseHistory;