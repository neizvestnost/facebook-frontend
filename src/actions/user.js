export const SAVE_USER = 'SAVE_USER'

export const saveUser = userAttributes => {
  return {
    type: SAVE_USER,
    payload: userAttributes
  }
}