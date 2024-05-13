module.exports = (asyncFun) => {
  return (req, res, next) => {
    asyncFun(req, res, next).catch((err) => {
      next(err);
    });
  }
}

// asyncwrapper is for found route but data is not correct
