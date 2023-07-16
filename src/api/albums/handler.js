class AlbumsHandler {
  constructor(albumsService, songsService, validator) {
    this._serviceAlbum = albumsService;
    this._serviceSong = songsService;
    this._validator = validator;
  }

  async postAlbumHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);

    const albumId = await this._serviceAlbum.addAlbum(request.payload);
    return h.response({ status: "success", data: { albumId } }).code(201);
  }

  async getDetailAlbumByIdHandler(request, h) {
    const { id } = request.params;

    const album = await this._serviceAlbum.getDetailAlbumsById(id);
    const songs = await this._serviceSong.getSongsByAlbumId(id);
    return h
      .response({ status: "success", data: { album: { ...album, songs } } })
      .code(200);
  }

  async putAlbumByIdHandler(request, h) {
    const { id } = request.params;

    this._validator.validateAlbumPayload(request.payload);
    await this._serviceAlbum.updateAlbumById(id, request.payload);
    return h
      .response({ status: "success", message: "Berhasil mengubah album" })
      .code(200);
  }

  async deleteAlbumHandler(request, h) {
    const { id } = request.params;

    await this._serviceAlbum.deleteAlbumById(id);
    return h
      .response({
        status: "success",
        message: "Berhasil menghapus album",
      })
      .code(200);
  }
}

module.exports = AlbumsHandler;
