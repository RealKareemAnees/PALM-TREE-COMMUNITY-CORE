const readfile = require("./readfile");

const log = console.log;
const path = require("path");

const env = require("dotenv");
env.config({ path: path.join(__dirname, "..", "configs", "network.env") });

const get_file_dist = (chunk) => {
  const reqBody = JSON.parse(chunk);
  const dist = reqBody.dist;
  return dist;
};

module.exports = async (req, res, next) => {
  try {
    let dist;

    req.on("data", (chunk) => {
      if (!dist) {
        dist = get_file_dist(chunk);
      }
    });

    req.on("end", async () => {
      if (dist) {
        await readfile(res, dist);
      } else {
        res.status(400).send("Bad Request: Missing data");
      }
    });

    req.on("error", (error) => {
      log("Request error:", error);
      next(error);
    });
  } catch (error) {
    next(error);
  }
};
