import React from 'react'
import PropTypes from 'prop-types'

import validations from './../validationRules'

export default class ValidationComponent extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      value: nextProps.value
    }
  }

  constructor(props, state = {}) {
    super(props)

    this.state = Object.assign(state, {
      errors: [],
      originalValue: this.props.value
    })

    this.validate = this.validate.bind(this)
  }

  validate = (dryRun = false) => {
    const errors = []
    const { 
      name, 
      human, 
      value, 
      validators 
    } = this.props

    validators.forEach(validator => {
      const errorMessage = typeof validator === 'function'
        ? validator(value)
        : validations[validator](value)

      errorMessage && errors.push(`${human || name} ${errorMessage}`)
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
  name: PropTypes.string.isRequired,
  validators: PropTypes.array.isRequired,
  value: PropTypes.any,
  human: PropTypes.string // alternative name to use when name is not human friendly
}

ValidationComponent.defaultProps = {
  validators: []
}
