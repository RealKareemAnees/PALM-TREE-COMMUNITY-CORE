module.exports = (req_body) => {
  const reqBody = JSON.parse(req_body);
  const dist = reqBody.dist;
  return dist;
};
