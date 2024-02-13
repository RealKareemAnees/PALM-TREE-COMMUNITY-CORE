const readfile = require("./controllers/read_file");

module.exports = async (req, res, next) => {
  try {
    let dist;

    req.on("end", async () => {
      if (!dist) {
        dist = req.query.dist;
      }

      if (dist) {
        await readfile(res, dist);
      } else {
        res.status(400).send("Bad Request: Missing data");
        console.log("dist is missing");
      }
    });

    req.on("close", () => {
      console.log("Connection closed by the client");
    });

    req.on("error", (error) => {
      console.log("Request error:", error);
      next(error);
    });
  } catch (error) {
    next(error);
  }
};
