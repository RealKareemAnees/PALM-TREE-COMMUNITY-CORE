const readfile = require("./readfile");

module.exports = async (req, res, next) => {
  try {
    let dist;

    req.on("data", (chunk) => {
      if (!dist) {
        dist = chunk.toString(); // Adjust as needed based on your data format
      }
    });

    req.on("end", async () => {
      if (!dist) {
        dist = req.query.dist;
      }

      if (dist) {
        await readfile(res, dist);
      } else {
        res.status(400).send("Bad Request: Missing data");
      }
    });

    req.on("close", () => {
      // Handle the connection being closed prematurely
      console.log("Connection closed by the client");
    });

    req.on("error", (error) => {
      console.error("Request error:", error);
      next(error);
    });
  } catch (error) {
    next(error);
  }
};
