function attachDateToImage(req, res, next) {
  // Reuse currentDate from earlier middleware if available.
  const currentDate = req.currentDate || new Date();
  req.currentDate = currentDate;
  req.imageDate = currentDate.toISOString();
  next();
}

module.exports = attachDateToImage;
