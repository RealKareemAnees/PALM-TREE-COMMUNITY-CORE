const read_file = require("../controllers/read_file/read_file");
const authenticate_order = require("../auth/authenticate_order");

module.exports = async (data, socket) => {
  try {
    const input = JSON.parse(data);
    const secret_key = input.secret_key;
    const read_type = input.read_type;
    const dist = input.dist;
    if (await authenticate_order(secret_key)) {
      if (read_type === "file") {
        read_file(dist, socket);
      }
    } else {
      socket.close();
    }
  } catch (error) {
    console.log(error);
  }
};
