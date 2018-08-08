import React, { Component } from 'react';

class Form extends Component {
  state = {
    isValidated: false
  };

  validate = () => {

    const formElement = this.formEl;
    const formElementLength = formElement.length;

    if (formElement.checkValidity() === false) {
      for (let formElementIndex = 0; formElementIndex < formElementLength; formElementIndex++) {

        const element = formElement[formElementIndex];

        const errorLabel = element.parentNode.querySelector(".invalid-feedback");

        if (errorLabel && element.nodeName.toLowerCase() !== "button") {

          if (!element.validity.valid) {
            errorLabel.textContent = element.validationMessage;
          } else {
            errorLabel.textContent = "";
          }
        }
      }

      return false;

    } else {

      for (let formElementIndex = 0; formElementIndex < formElementLength; formElementIndex++) {
        const element = formElement[formElementIndex];
        const errorLabel = element.parentNode.querySelector(".invalid-feedback");
        if (errorLabel && element.nodeName.toLowerCase() !== "button") {
          errorLabel.textContent = "";
        }
      }

      return true;
      
    }
  };

  submitHandler = event => {
    event.preventDefault();

    if (this.validate()) {
      this.props.submit();
    }

    this.setState({ isValidated: true });
  };

  render() {
    const props = [...this.props];

    let classNames = [];
    if (props.className) {
      classNames = [...props.className];
      delete props.className;
    }

    if (this.state.isValidated) {
      classNames.push("was-validated");
    }

    return (
      <form
        {...props}
        className={classNames}
        noValidate
        ref={form => (this.formEl = form)}
        onSubmit={this.submitHandler}
      >
        {this.props.children}
      </form>
    );
  }
}

export default Form;
