import React from "react";
import "../../assets/stylesheets/bubbles.scss";

class Bubbles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchBobaItems();
  }

  openModal() {
    this.setState({
      modal: true,
    });
  }

  closeModal() {
    this.setState({
      modal: false,
    });
  }

  render() {
    let bobaSample;
    // debugger;
    if (this.props.bobas.data) {
      debugger;
      bobaSample = this.props.bobas.data[
        Math.floor(Math.random() * this.props.bobas.data.length)
      ];

      debugger;
    }

    return (
      <>
        <ul className="bubbles">
          <li onClick={this.openModal}></li>
          <li onClick={this.openModal}></li>
          <li onClick={this.openModal}></li>
          <li onClick={this.openModal}></li>
          <li onClick={this.openModal}></li>
          <li onClick={this.openModal}></li>
        </ul>
        {this.state.modal ? (
          <div className="modal-background" onClick={this.closeModal}>
            <div className="modal-child" onClick={(e) => e.stopPropagation()}>
              {bobaSample.name}
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default Bubbles;