import{fileURLToPath} from 'url';
import { dirname } from 'path';
import {v4 as uuidv4} from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default __dirname

export const code = async () =>{
    const code = uuidv4();
    return code;
};