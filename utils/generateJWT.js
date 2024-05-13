const jwt = require('jsonwebtoken');
module.exports = async (payload) => {
  const token = await jwt.sign(
    payload,
    process.env.JWT_SEC_KEY,
    { expiresIn: "1m" }
  );
  return token;
}