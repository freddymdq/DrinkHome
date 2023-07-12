// ERROR SERVIDOR
const SERVER_ERROR = {
    SERVER_ERROR: {
      MESSAGE: "Ha sucedido algo comuniquese con mantenimiento",
      STATUS: STATUS_CODE.SERVER_ERROR.INTERNAL_ERROR,
      ERROR_CODE: "SERVER_ERROR"
      // SERVER_ERROR.SERVER_ERROR.ERROR_CODE
    },
  }

// PRODUCTOS 
const CREATE_PRODUCT_ERRORS = {
    REQUIRED_FIELDS: {
      MESSAGE: "[ERROR]: El objeto debe contener title, code, img, description, stock, code",
      STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
      ERROR_CODE: "CAMPOS_REQUERIDOS"
        // CREATE_PRODUCT_ERRORS.CAMPOS_REQUERIDOS.ERROR_CODE
    },
    INCORRECT_FIELD_TYPE_STRING: {
      MESSAGE: "[ERROR]: Los campos 'title, code, img and description' debe ser un string",
      STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
      ERROR_CODE: "TIPOS_DE_CAMPO_REQUIRO"
      // CREATE_PRODUCT_ERRORS.TIPOS_DE_CAMPO_REQUIRO.ERROR_CODE
    },
    INCORRECT_FIELD_TYPE_NUMBER: {
      MESSAGE: "[ERROR]: Los campos 'price, stock and quantity'deben ser Number",
      STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
      ERROR_CODE: "CAMPO_INCORRECTO_TIPO_NUMBER"
      // CREATE_PRODUCT_ERRORS.CAMPO_INCORRECTO_TIPO_NUMBER.ERROR_CODE
    },
    FIELD_STATUS: {
      MESSAGE: "[ERROR]: El campo 'stock' debe ser boolean",
      STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
      ERROR_CODE: "CAMPO_STATUS"
      // CREATE_PRODUCT_ERRORS.CAMPO_STATUS.ERROR_CODE
    },
    PRODUCT_EXIST: {
      MESSAGE: "[ERROR]: El producto ya existe en la base de datos",
      STATUS: STATUS_CODE.CLIENT_ERROR.BAD_REQUEST,
      ERROR_CODE: "EXISTE_PRODUCTO"
      // CREATE_PRODUCT_ERRORS.EXISTE_PRODUCTO.ERROR_CODE
    }
  }

// ERROR PRODUCTOS MANAGER
const PRODUCT_MANAGER_ERRORS = {
    PRODUCT_NOT_FOUND: {
      MESSAGE: "[ERROR]: PRODUCTO NO ENCONTRADO",
      STATUS: STATUS_CODE.CLIENT_ERROR.NOT_FOUND,
      ERROR_CODE: "SEARCH_PRODUCTO"
      // PRODUCT_MANAGER_ERRORS.SEARCH_PRODUCTO.ERROR_CODE
    },
    CREATE_PRODUCT: {
      MESSAGE: "ALGO SALIO MAL AL AGREGAR PRODUCTO",
      STATUS: STATUS_CODE.SERVER_ERROR.INTERNAL_ERROR,
      ERROR_CODE: "ADD_PRODUCTO"
      // TRNAFER PRODUCT_MANAGER_ERRORS.ADD_PRODUCTO.ERROR_CODE
    }
  }

// ERROR CARRITO
const CART_MANAGER_ERRORS = {
    GET_CARTS: {
      MESSAGE: "[ERROR]: Algo salio mal con el metodo getCarts",
      STATUS: STATUS_CODE.SERVER_ERROR.INTERNAL_ERROR,
      ERROR_CODE: "GET_CARTS"
     
    },
    CREATE_CARTS: {
      MESSAGE: "[ERROR]: Algo salio mal con el metodo createCart",
      STATUS: STATUS_CODE.SERVER_ERROR.INTERNAL_ERROR,
      ERROR_CODE: "CREATE_CARTS"
    
    },
    ADD_PRODUCT_TO_CART: {
      MESSAGE: "[ERROR]: Algo salio mal al agregar producto al carrito",
      STATUS: STATUS_CODE.SERVER_ERROR.INTERNAL_ERROR,
      ERROR_CODE: "ADD_PRODUCT_TO_CART"
    
    },
    CART_NOT_FOUND: {
      MESSAGE: "[ERROR]: No se puede encontrar el carrito",
      STATUS: STATUS_CODE.CLIENT_ERROR.NOT_FOUND,
      ERROR_CODE: "CART_NOT_FOUND"
   
    // DELETECART, EMPTY_CART ADD_PRODUCTS_IN_CARTS, DETAIL_CART 
    }
  }

// ERROR AUTENTIFICACION
const AUTH_ERROR = {
    NO_SESSION: {
      MESSAGE: "[ERROR]: Necesita loguearse",
      STATUS: STATUS_CODE.CLIENT_ERROR.UNAUTHORIZED,
      ERROR_CODE: "NO_SESSION"
      // TRANFER AUTH_ERROR.NO_SESSION.ERROR_CODE
    },
    HAS_ACCOUNT: {
      MESSAGE: "[ERROR]: Error de autentificacion, si no tiene una cuenta, registrese",
      STATUS: STATUS_CODE.CLIENT_ERROR.UNAUTHORIZED,
      ERROR_CODE: "FAILED_ACC"
      // TRANFER AUTH_ERROR.FAILED_ACC.ERROR_CODE
    },
    WRONG_CREDENTIALS: {
      MESSAGE: "[ERROR]: Usuario incorrecto",
      STATUS: STATUS_CODE.CLIENT_ERROR.UNAUTHORIZED,
      ERROR_CODE: "ERROR_CREDENTIAL"
      // TRANFER AUTH_ERROR.ERROR_CREDENTIAL.ERROR_CODE
    }
  }


  export { AUTH_ERROR, CART_MANAGER_ERRORS, CREATE_PRODUCT_ERRORS, PRODUCT_MANAGER_ERRORS, SERVER_ERROR }
