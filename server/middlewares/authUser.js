
// import Jwt from 'jsonwebtoken';

// const authUser = async (req,res,next)=>{
//     const { token } = req.cookies;

//     if(!token){
//         return res.json({success: false, message:"Not Authorized"});

//     }

//     try{
//         const tokenDecode = Jwt.verify(token,process.env.JWT_SECRET)
//         if(tokenDecode.id){
//            req.userId = tokenDecode.id
//            console.log("Decoded userId:", tokenDecode.id);

           
//         }else{
//             return res.json({success: false, message:"Not Authorized"})
//         }
//         next();
//     }catch (error) {
//         return res.json({success: false, message:error.message});
//     }
// }

// export default authUser;

import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ success: false, message: "Not Authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // ✅ THIS IS CRITICAL
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default authUser;
