import React from 'react'
import PropTypes from 'prop-types'

export default class ValidationForm extends React.Component {
  constructor(props) {
    super(props)

    this.children = []
    this.submit = this.submit.bind(this)
    this.getContent = this.getContent.bind(this)
    this.validate = this.validate.bind(this)

    this.state = {
      formState: ({
        isValid: true,
        isDirty: false
      })
    }
  }

  getChildContext = () => ({
    form: {
      attachToForm: (component) => {
        if (component.props.validators && this.children.indexOf(component) === -1) {
          this.children.push(component)
        }
      },
      detachFromForm: (component) => {
        const index = this.children.indexOf(component)
        if (index !== -1) {
          this.children = this.children
            .slice(0, index)
            .concat(this.children.slice(index + 1))
        }
      },
      onChanged: () => {
        const formState = {
          isValid: this.validate(true).length === 0,
          isDirty: this.children.some(child => child.state.originalValue !== child.props.value)
        }

        this.setState({
          formState
        })
      }
    }
  })

  submit = (e) => {
    e.preventDefault()

    this.validate().length && this.props.onSubmit(e)
  }

  getContent = () => {
    const { render, children } = this.props

    return render ? render(this.state) : children
  }

  validate = (dryRun = false) => {
    function validateComponent (component, errors) {
      const componentErrors = component.validate(dryRun)
      componentErrors.forEach(componentError => errors.push(componentError))
    };

    const errors = []

    this.children.forEach(child => validateComponent(child, errors))

    return errors
  }

  render() {
    const { render, children, onSubmit, ...rest } = this.props

    return (
      <form onSubmit={this.submit} {...rest}>
        {this.getContent()}
      </form>
    )
  }
}

ValidationForm.childContextTypes = {
  form: PropTypes.object
}

ValidationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  render: PropTypes.func,
  children: PropTypes.node
}
