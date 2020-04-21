import React from 'react';
import '../../assets/stylesheets/login_form.scss';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  update(field) {
    return e => this.setState({ 
      [field]: e.currentTarget.value 
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.login(user)
      // .then(() => this.props.history.push('/dashboard'))
  }

  renderErrors() {
    return(
      <ul>
        {Object.keys(this.state.errors).map((err, i) => (
          <li key={`err-${i}`}>{this.state.errors[err]}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className='login-form'>
        <form onSubmit={this.handleSubmit}>
          {this.renderErrors()}
          <label>Username
            <input 
              type="text"
              value={this.state.username}
              onChange={this.update('username')}
              placeholder="Username"
            />
          </label>

          <label>Password
            <input 
              type="password"
              value={this.state.password}
              onChange={this.update('password')}
              placeholder="Password"
            />
          </label>
          <button type="submit">Sign in</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;