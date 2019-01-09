import isEmpty from 'lodash.isempty'

const EMAIL_REGEX = '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$'
const STRONG_PASSWORD_REGEX = '^.*(?=.{8,20})(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!#$%&?]).*$'

const validate = (isValid, message) => !isValid && message

const validations = {
  required: value => validate(!isEmpty(value), 'cannot be empty'),

  email: value => {
    const regex = new RegExp(EMAIL_REGEX)
    return validate(regex.test(value), 'is not a valid email address')
  },

  password: value => {
    const regex = new RegExp(STRONG_PASSWORD_REGEX)
    return validate(regex.test(value), 'is not strong enough')
  }
}

export default validations
