import React from 'react'
import PropTypes from 'prop-types'

import validations from './../validationRules'

export default class ValidationComponent extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      value: nextProps.value
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      errors: [],
      originalValue: this.props.value
    }

    this.validate = this.validate.bind(this)
  }

  validate = (dryRun = false) => {
    const errors = []
    const { name, value, validators } = this.props

    validators.forEach(validator => {
      const errorMessage = typeof validator === 'function'
        ? validator(value)
        : validations[validator](value)

      errorMessage && errors.push(`${name} ${errorMessage}`)
    })

    if (!dryRun) {
      this.setState({
        errors
      })
    }

    return errors
  }

  componentDidMount() {
    this.context.form.attachToForm(this)
  }

  componentWillUnmount() {
    this.context.form.detachFromForm(this)
  }

  shouldComponentUpdate (nextProps, nextState) {
    return this.state !== nextState || this.props !== nextProps
  }

  componentDidUpdate (prevProps, prevState) {
    this.props.value !== prevState.value &&
    this.validate() &&
    this.context.form.onChanged(this)
  }
}

ValidationComponent.contextTypes = {
  form: PropTypes.object
}

ValidationComponent.propTypes = {
  validators: PropTypes.array,
  name: PropTypes.string.isRequired,
  value: PropTypes.any
}

ValidationComponent.defaultProps = {
  validators: []
}
