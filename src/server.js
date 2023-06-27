require("dotenv").config();

const Hapi = require("@hapi/hapi");
const albums = require("./api/albums");
const AlbumService = require("./services/AlbumsService");
const AlbumsValidator = require("./validation/album");
const ClientError = require("./exceptions/ClientError");
const NotFoundError = require("./exceptions/NotFoundError");
const songs = require("./api/songs");
const SongsService = require("./services/SongsService");
const SongsValidator = require("./validation/song");

const init = async () => {
  const albumsService = new AlbumService();
  const songsService = new SongsService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.register([
    {
      plugin: albums,
      options: {
        service: {
          albumsService,
          songsService,
        },
        validator: AlbumsValidator,
      },
    },
    {
      plugin: songs,
      options: {
        service: songsService,
        validator: SongsValidator,
      },
    },
  ]);

  server.ext("onPreResponse", (request, h) => {
    // mendapatkan konteks response dari request
    const { response } = request;

    if (response instanceof Error) {
      // Penanganan error dari client
      if (response instanceof ClientError) {
        return h
          .response({
            status: "fail",
            message: response.message,
          })
          .code(response.statusCode);
      }

      if (response instanceof NotFoundError) {
        // Penanganan error jika tidak ditemukan resource
        return h
          .response({
            status: "fail",
            message: response.message,
          })
          .code(response.statusCode);
      }

      // mempertahankan penanganan client error oleh hapi secara native, seperti 404, etc.
      if (!response.isServer) {
        return h.continue;
      }

      // penanganan server error sesuai kebutuhan
      console.log(response);
      return h
        .response({
          status: "error",
          message: "Maaf, terjadi kegagalan pada server kami",
        })
        .code(500);
    }

    // jika bukan error, lanjutkan dengan response sebelumnya (tanpa terintervensi)
    return h.continue;
  });

  await server.start();
  console.log(`Server sedang berjalan di ${server.info.uri}`);
};

init();
