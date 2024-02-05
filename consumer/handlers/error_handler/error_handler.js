module.exports = async (req, res, next, error) => {
  res.send(error);
  console.error(error);
};
