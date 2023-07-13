import { AUTH_ERROR, CART_MANAGER_ERRORS, CREATE_PRODUCT_ERRORS, PRODUCT_MANAGER_ERRORS, SERVER_ERROR } from '../service/error.message.js'
  
  function searchError (errorCode) {
    const ERRORS = {
      ...PRODUCT_MANAGER_ERRORS,
      ...CREATE_PRODUCT_ERRORS,
      ...CART_MANAGER_ERRORS,
      ...AUTH_ERROR,
      ...SERVER_ERROR
    }
  
    return { status: ERRORS[errorCode].STATUS, message: ERRORS[errorCode].MESSAGE }
  }
  
  export function errorHandler (err, req, res, next) {
    try {
      console.log('ERROR HANDLERROS')
      console.log(err)
  
      const { message, status } = searchError(err)
  
      return res.status(status).json({ message })
    } catch (err) {
      const { STATUS, MESSAGE } = SERVER_ERROR.SERVER_ERROR
      return res.status(STATUS).json({ message: MESSAGE })
    }
  }