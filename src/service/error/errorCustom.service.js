export default class ErrorCustom{
    static createError({name="Error",cause,message,errorCode}){
        const error = new Error(message,{cause});
        error.name = name;
        error.code =errorCode;
        console.log("error", error.cause)
        throw error;
    };
};