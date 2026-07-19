function printRequestDate(req, res, next) {
  console.log('GET request imageDate:', req.imageDate);
  next();
}

module.exports = printRequestDate;
