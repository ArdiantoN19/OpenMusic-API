# OpenMusic API V2 - Hapi JS

## Endpoint

### Pengelolaan Data Album

### Menambahkan data album

- /albums (POST)

#### Request Body

```json
{
  "name": "Viva la Vida", --> (required)
  "year": 2008 --> (required)
}
```

#### Response (201) : created

```json
{
  "status": "success",
  "data": {
    "albumId": "album-Mk8AnmCp210PwT6B"
  }
}
```

### Mendapatkan album berdasarkan id

- /albums/{id} (GET)

#### Response (200) : ok

```json
{
  "status": "success",
  "data": {
    "album": {
      "id": "album-Mk8AnmCp210PwT6B",
      "name": "Viva la Vida",
      "year": 2008,
      "songs": [
        {
          "id": "song-Qbax5Oy7L8WKf74l",
          "title": "Life in Technicolor",
          "performer": "Coldplay"
        },
        {
          "id": "song-poax5Oy7L8WKllqw",
          "title": "Centimeteries of London",
          "performer": "Coldplay"
        },
        {
          "id": "song-Qalokam7L8WKf74l",
          "title": "Lost!",
          "performer": "Coldplay"
        }
      ]
    }
  }
}
```

### Mengubah album berdasarkan id album

- /albums/{id} (PUT)

#### Request Body

```json
{
  "name": "Viva la Vida", --> (required)
  "year": 2008 --> (required)
}
```

#### Response (200) : ok

```json
{
  "status": "success",
  "message": "Berhasil mengubah album"
}
```

### Menghapus album berdasarkan id

- /albums/{id} (DELETE)

#### Response (200) : ok

```json
{
  "status": "success",
  "message": "Berhasil menghapus album"
}
```

### Pengelolaan Data Song

### Menambahkan lagu

- /songs (POST)

#### Request Body

```json
{
  "title": "Life in Technicolor", --> (required)
  "year": 2008, --> (required)
  "genre": "Pop", --> (required)
  "performer": "Coldplay", --> (required)
  "duration": 180,
  "albumId": "album-Mk8AnmCp210PwT6B"
}
```

#### Response (201) : created

```json
{
  "status": "success",
  "data": {
    "songId": "song-Qbax5Oy7L8WKf74l"
  }
}
```

### Mendapatkan seluruh lagu

- /songs (GET)
- /songs?title={songTitle} (GET)
- /songs?performer={songPerformer} (GET)
- /songs?title={songTitle}&performer={songPerformer} (GET)

#### Response (200) : ok

```json
{
  "status": "success",
  "data": {
    "songs": [
      {
        "id": "song-Qbax5Oy7L8WKf74l",
        "title": "Life in Technicolor",
        "performer": "Coldplay"
      },
      {
        "id": "song-poax5Oy7L8WKllqw",
        "title": "Centimeteries of London",
        "performer": "Coldplay"
      },
      {
        "id": "song-Qalokam7L8WKf74l",
        "title": "Lost!",
        "performer": "Coldplay"
      }
    ]
  }
}
```

### Mendapatkan lagu berdasarkan id

- /songs/{id} (GET)

#### Response (200) : ok

```json
{
  "status": "success",
  "data": {
    "song": {
      "id": "song-Qbax5Oy7L8WKf74l",
      "title": "Life in Technicolor",
      "year": 2008,
      "performer": "Coldplay",
      "genre": "Indie",
      "duration": 120,
      "albumId": "album-Mk8AnmCp210PwT6B"
    }
  }
}
```

### Mengubah lagu berdasarkan id lagu

- /songs/{id} (PUT)

#### Request Body

```json
{
  "title": "Life in Technicolor Update", --> (required)
  "year": 2008, --> (required)
  "genre": "Pop", --> (required)
  "performer": "Coldplay", --> (required)
  "duration": 180,
  "albumId": "album-Mk8AnmCp210PwT6B"
}
```

#### Response (200) : ok

```json
{
  "status": "success",
  "message": "Berhasil mengubah song"
}
```

### Menghapus lagu berdasarkan id

- /songs/{id} (DELETE)

#### Response (200) : ok

```json
{
  "status": "success",
  "message": "Berhasil menghapus song"
}
```
