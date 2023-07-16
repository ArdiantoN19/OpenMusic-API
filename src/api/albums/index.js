const AlbumsHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "Album",
  version: "1.0.0",
  register: async (server, { albumsService, songsService, validator }) => {
    const albumsHandler = new AlbumsHandler(
      albumsService,
      songsService,
      validator
    );
    await server.route(routes(albumsHandler));
  },
};
