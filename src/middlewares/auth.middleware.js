import jwt from "jsonwebtoken";

const authJWTMiddleware = async (req, res, next) => {
  //extract jwt token from req.header
  const reqHeader = req.headers.authorization;
  if (!reqHeader) return res.status(401).json({ error: " Token not found" });

  //console.log(reqHeader);

  const token = reqHeader.split(" ")[1];

  console.log(token);

  if (!token) {
    return res.status(401).json({
      error: "Unauthorized Access",
    });
  }

  try {
    const decodedResults = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.decodedPaylaod = decodedResults;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      error: "Invalid Token",
    });
  }
};

export default authJWTMiddleware;
