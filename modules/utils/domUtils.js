import { logger} from "./utils.js"
import {envButtons, functionList, resourceList} from '../config/constants.js'

export function updateResourceTypesList(envName) {    
    
    if(!envButtons && !functionList && !resourceList) logger.error('errore dom!')
    
    logger.log('env -> ', envName)

}

