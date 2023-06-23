/* eslint-disable camelcase */
const helpers = {
  responseAlbum: ({ id, name, year }) => {
    return { id, name, year };
  },
  responseSongs: ({ id, title, performer }) => {
    return { id, title, performer };
  },
  responseSongDetail: ({
    id,
    title,
    year,
    performer,
    genre,
    duration,
    album_id,
  }) => {
    return {
      id,
      title,
      year,
      performer,
      genre,
      duration,
      albumId: album_id,
    };
  },
  responseSongByQueryParams: (...args) => {
    const argument = args[0];
    const title = argument?.title?.toLowerCase();
    const performer = argument?.performer?.toLowerCase();
    const likeQuery = (arg) => {
      return `%${arg}%`;
    };

    if (title && performer) {
      return {
        text: "SELECT * FROM songs WHERE LOWER(title) like $1 AND LOWER(performer) like $2",
        values: [likeQuery(title), likeQuery(performer)],
      };
    }
    if (title) {
      return {
        text: "SELECT * FROM songs WHERE LOWER(title) like $1",
        values: [likeQuery(title)],
      };
    }
    if (performer) {
      return {
        text: "SELECT * FROM songs WHERE LOWER(performer) like $1",
        values: [likeQuery(performer)],
      };
    }
    return {
      text: "SELECT * FROM songs",
    };
  },
};

module.exports = helpers;
