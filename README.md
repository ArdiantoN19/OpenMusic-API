# OpenMusic API V2 - Hapi JS

## Endpoint

### Pengelolaan Data Album

#### Menambahkan data album

- /albums (POST)

#### Request Body

```json
        "name": "Viva la Vida",
        "year": 2008,
```

#### Response (201) : Created

```json
        "status": "success",
        "data": {
            "albumId": "album-Mk8AnmCp210PwT6B"
        },
```

#### Mendapatkan album berdasarkan id

- /albums/{id} (GET)

#### Response (200) : Ok

```json
        "status": "success",
        "data": {
            "album": {
                "id": "album-Mk8AnmCp210PwT6B",
                "name": "Viva la Vida",
                "year": 2008
            }
        },
```

#### Mengubah album berdasarkan id album

- /albums/{id} (PUT)

#### Request Body

```json
        "name": "Viva la Vida",
        "year": 2008,
```

#### Response (200) : Ok

```json
        "status": "success",
        "message": "Berhasil mengubah album"
```

#### Menghapus album berdasarkan id

- /albums/{id} (DELETE)

#### Response (200) : Ok

```json
        "status": "success",
        "message": "Berhasil menghapus album"
```
