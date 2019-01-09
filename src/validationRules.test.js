import validationRules from './validationRules'

test('required returns error when value is null', () => {
  expect(validationRules.required(null)).toBeDefined()
})

test('required returns error when value is undefined', () => {
  expect(validationRules.required(undefined)).toBeDefined()
})

test('required returns error when value is empty string', () => {
  expect(validationRules.required('')).toBeDefined()
})

test('required returns falsy when value is not empty string', () => {
  expect(validationRules.required('test')).toBeFalsy()
})

test('email returns error when value contains spaces', () => {
  expect(validationRules.email('test with spaces@gmail.com')).toBeDefined()
})

test('email returns error when value does not have @ sign', () => {
  expect(validationRules.email('testgmail.com')).toBeDefined()
})

test('email returns error when value does not have main domain', () => {
  expect(validationRules.email('user@gmail')).toBeDefined()
})

test('email returns falsy when value is a valid email addresss', () => {
  expect(validationRules.email('user@gmail.com')).toBeFalsy()
})

test('password returns error when value contains less than 8 characters', () => {
  expect(validationRules.password('myP1!')).toBeDefined()
})

test('password returns error when value contains more than 20 characters', () => {
  expect(validationRules.password('myP1!myP1!myP1!myP1!*')).toBeDefined()
})

test('password returns error when value does not contain numbers', () => {
  expect(validationRules.password('myPassword!')).toBeDefined()
})

test('password returns error when value does not contain upper letters', () => {
  expect(validationRules.password('mypassword1!')).toBeDefined()
})

test('password returns error when value does not contain special characters', () => {
  expect(validationRules.password('myPassword1')).toBeDefined()
})

test('password returns falsy when value contains at least one upper letter, one number and one special character', () => {
  expect(validationRules.password('mypassword1!')).toBeFalsy()
})
