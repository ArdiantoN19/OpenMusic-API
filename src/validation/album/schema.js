/* eslint-disable newline-per-chained-call */
const Joi = require("joi");

const AlbumPayloadSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name harus bertipe string",
    "string.empty": "Name tidak boleh kosong",
    "any.required": "kolom Name harus diisi",
  }),
  year: Joi.number().min(1900).max(2023).required().messages({
    "number.base": "Year harus bertipe number",
    "number.min": "Year harus lebih besar atau sama dengan 1900",
    "number.max": "Year harus lebih kecil atau sama dengan 2023",
    "number.empty": "Year tidak boleh kosong",
    "any.required": "kolom Year harus diisi",
  }),
});

module.exports = { AlbumPayloadSchema };
