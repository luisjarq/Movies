const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const movieSchema = new Schema(
  {
    title: { type: String, required: true },    
    year: { type: Number, required: true },    
    info: {
      directors: { type: Array, required: false },
      actors: { type: Array, required: false },
      release_date: { type: Date, required: false },
      genres: { type: Array, required: false },
      image_url: { type: String, required: false },
      plot: { type: String, required: false },
      rank:{ type: Number, required: true },
      running_time_secs:{ type: Number, required: true },
    }
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
