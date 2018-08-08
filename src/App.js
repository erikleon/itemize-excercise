import React, { Component } from 'react';
import logo from './itemize-color-logo.png';
import Form from './Form.js';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFormSuccess: false,
      isLoaded: false,
      error: false,
      disabled: false,
      query: '',
      languages: [],
      loading: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  getData = (url = ``, query = ``) => {
      const endpoint = `${url}&query=${query}`
      return fetch(endpoint)
      .then(result => result.json())
      .then(
        (result) => {
          this.setState({showFormSuccess: true});
          setTimeout(() => {this.setState({
            showFormSuccess: false,
            isLoaded: result.success,
            languages: result.results,
            disabled: '',
            loading: ''
          });}, 2500);
        },

        (error) => {
          this.setState({
            isLoaded: false,
            error: true
          });
          console.log(error);
        }
      )
  }

  submit = () => {
    this.setState({
      disabled: 'disabled',
      languages: [],
      isLoaded: false,
      loading: ' loading'
    })
    this.getData('http://apilayer.net/api/detect?access_key=33505b7acd732000eadb050d5e692700', encodeURI(this.state.query))
  }

  handleChange = (event) => {
    this.setState({query: event.target.value});
  }

  handleReset = () => {
    this.setState({
      isLoaded: false,
      languages: [],
      query: '',
      loading: ''
    });
  }

  renderLanguages() {
    const listItems = this.state.languages.map((language) =>
      <li>{language.language_name}</li>
    );
    return (
      <div className={"languages"}>
        <h4><u>Detected languages:</u></h4>
        <ul className={"list-unstyled"}>
          <h4 className={"text-left"}>{listItems}</h4>
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className={"container pt-4"}>
        <div className={"row justify-content-center"}>
          <div className={"card col-xs-12 col-sm-6 col-sm-offset-3"+this.state.loading}>
            <div className={"text-center"}>
              <img src={logo} className="App-logo" alt="logo" />
            </div>
            <h2 className={"card-header"}>
              Language Test Form
            </h2>
            <div className={"card-body"}>
              <Form 
                submit={this.submit}
                >
                <div className={"form-group"}>
                  <label
                    htmlFor={"query"}
                    >
                    Input
                  </label>
                  <input
                    id={"query"}
                    className={"form-control"}
                    required={true}
                    name={"query"}
                    type={"text"}
                    onChange={this.handleChange}
                    value={this.state.query}
                    />
                  <div className="invalid-feedback text-warning" />
                </div>
                <div className={"row justify-content-md-center"}>
                  <div className={"col-xs-6"}>
                    <button
                      type={"submit"}
                      className={"btn btn-primary mb-2"}
                      disabled={this.state.disabled}
                      >
                      Submit!
                    </button>
                  </div>
                  <div className={"col-xs-6 text-right"}>
                    <button
                      type={"button"}
                      className={"btn btn-default mb-2"}
                      onClick={this.handleReset}
                      disabled={this.state.disabled}
                      >
                      Reset
                    </button>
                  </div>
                </div>
              </Form>
            </div>
            {this.state.isLoaded ? this.renderLanguages() : null}
          </div>
          
        </div>
      </div>
    );
  }
}

export default App;
