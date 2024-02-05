const read_file = require("./controllers/read_file");

const log = console.log;
const path = require("path");

const env = require("dotenv");
env.config({ path: path.join(__dirname, "..", "configs", "network.env") });

const get_file_dist = require("./functions/get_file_dist");

module.exports = async (req, res, next) => {
  try {
    let dist = "";
    req.on("data", (body) => {
      if (!dist) {
        dist = get_file_dist(body);
      }
    });

    req.on("end", async () => {
      if (dist) {
        await read_file(res, dist);
      } else {
        res.status(400).send("Bad Request: Missing data");
        console.log("dist is missing");
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
