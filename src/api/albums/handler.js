class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postAlbumHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);

    const albumId = await this._service.addAlbum(request.payload);
    return h.response({ status: "success", data: { albumId } }).code(201);
  }

  async getDetailAlbumByIdHandler(request, h) {
    const { id } = request.params;

    const album = await this._service.getDetailAlbumsById(id);
    return h.response({ status: "success", data: { album } }).code(200);
  }

  async putAlbumByIdHandler(request, h) {
    const { id } = request.params;

    this._validator.validateAlbumPayload(request.payload);
    await this._service.updateAlbumById(id, request.payload);
    return h
      .response({ status: "success", message: "Berhasil mengubah album" })
      .code(200);
  }

  async deleteAlbumHandler(request, h) {
    const { id } = request.params;

    await this._service.deleteAlbumById(id);
    return h
      .response({
        status: "success",
        message: "Berhasil menghapus album",
      })
      .code(200);
  }
}

module.exports = AlbumsHandler;
