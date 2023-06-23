const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const NotFoundError = require("../exceptions/NotFoundError");
const InvariantError = require("../exceptions/InvariantError");
const helpers = require("../helpers");

class AlbumService {
  constructor() {
    this._pool = new Pool();
  }

  async addAlbum({ name, year }) {
    const id = `album-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: "INSERT INTO albums (id, name, year, created_at, updated_at) values ($1, $2, $3, $4, $5) RETURNING id",
      values: [id, name, year, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError("Album gagal ditambahkan");
    }
    return result.rows[0].id;
  }

  async getAlbums() {
    const query = "SELECT * FROM albums";
    const result = await this._pool.query(query);
    return result.rows.map(helpers.responseAlbum);
  }

  async getDetailAlbumsById(id) {
    const query = {
      // text: "SELECT * FROM albums a inner join songs s on s.album_id = a.id where a.id = $1",
      text: "SELECT * FROM albums where id = $1",
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError("Album tidak ditemukan");
    }

    const queryGetSongByAlbumId = {
      text: "SELECT * from songs WHERE album_id = $1",
      values: [id],
    };

    const resultSong = await this._pool.query(queryGetSongByAlbumId);
    const songs = resultSong.rows.map(helpers.responseSongs);

    return {
      ...result.rows.map(helpers.responseAlbum)[0],
      songs,
    };
  }

  async updateAlbumById(id, { name, year }) {
    const updatedAt = new Date().toISOString();

    const query = {
      text: "UPDATE albums SET name = $1, year = $2, updated_at = $3 WHERE id = $4 RETURNING id",
      values: [name, year, updatedAt, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Gagal mengubah album, id tidak ditemukan");
    }
  }

  async deleteAlbumById(id) {
    const query = {
      text: "DELETE FROM albums WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError("Gagal menghapus album, id tidak ditemukan");
    }
  }
}

module.exports = AlbumService;
