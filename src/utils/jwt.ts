import { verify } from "crypto";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const createToken = (payload: JwtPayload, secret: string, expiresIn: SignOptions) => {
    const token = jwt.sign(payload, secret,  {expiresIn} as SignOptions);
  
    return token;
}

const verifyToken = (token: string, secret: string) =>{
try{
  const verifiedToken = jwt.verify(token, secret);
  return {
    success: true,
    data: verifiedToken
  };
}
catch(error : any){
 console.log("error in verifying token", error);
   return {
    success: false,
    error: error.message || "Invalid token"
   }
}
}
export const jwtUtils ={
    createToken,
    verifyToken
}