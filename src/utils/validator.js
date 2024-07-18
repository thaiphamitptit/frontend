/* eslint-disable no-unused-vars */
const validatorRules = {
  required({ value, errorMessage = 'Vui lòng nhập trường này', ...args }) {
    return value ? '' : errorMessage
  },
  isEmail({ value, errorMessage = 'Email không hợp lệ', ...args }) {
    const re = /^\S+@\S+\.\S+$/
    return re.test(value) ? '' : errorMessage
  },
  isUnique({ value, errorMessage = 'Giá trị của trường này là duy nhất', ...args }) {
    const { arrayValues } = args
    return !arrayValues.includes(value) ? '' : errorMessage
  },
  isDateValid({ value, errorMessage = 'Vui lòng chọn ngày hợp lệ trước ngày hiện tại', ...args }) {
    const inputDate = new Date(value)
    const currentDate = new Date()
    return inputDate < currentDate ? '' : errorMessage
  }
}

export const fieldValidator = (value, rules) => {
  for (const rule of rules) {
    const { ruleName, errorMessage, ...args } = rule
    const error = validatorRules[ruleName]({ value, errorMessage, ...args })
    if (error) {
      return error
    }
  }
  return ''
}

export const formValidator = (formData, formRules) => {
  const errors = {}
  for (const field in formRules) {
    const error = fieldValidator(formData[field], formRules[field])
    if (error) {
      errors[field] = error
    }
  }
  return errors
}
