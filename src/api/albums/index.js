const AlbumsHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "Album",
  version: "1.0.0",
  register: async (server, { service, validator }) => {
    const albumsHandler = new AlbumsHandler(service, validator);
    await server.route(routes(albumsHandler));
  },
};
