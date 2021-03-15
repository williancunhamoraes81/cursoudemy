import { UNAUTHORIZED } from 'http-status';
import * as jwt from 'jsonwebtoken';
import Configs from './configs';
import config from './configs';

class Auth{
    validate(req,res,next){
        var token = req.headers['x-access-token'];
        if(token){
            jwt.verify(token, Configs.secret, function(err, decoded){
                if(err){
                    return res.status(403).send({
                        sucess: false,
                        message: '403 - INVALID TOKEN'
                    })
                }else{
                    next();
                }
            })
        }else{

            return res.status(401).send({
                sucess: false,
                message: '401 - UNAUTHORIZED'
            })

        }
    }
}

export default new Auth();