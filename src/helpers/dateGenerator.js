export const date = async () =>{
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const infoDate = ` Hora: ${time} - Fecha: ${date}`;
    return infoDate;
};