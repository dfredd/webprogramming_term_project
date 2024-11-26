import mongoose from 'mongoose'

const movieDetailSchema = new mongoose.Schema({
    adult: { type: Boolean, required: true },
    backdrop_path: { type: String },
    belongs_to_collection: {
        id: { type: Number },
        name: { type: String },
        poster_path: { type: String },
        backdrop_path: { type: String }
    },
    budget: { type: Number, required: true },
    genres: [
        {
            id: { type: Number },
            name: { type: String }
        }
    ],
    homepage: { type: String },
    id: { type: Number, required: true, unique: true },
    imdb_id: { type: String, unique: true },
    origin_country: [{ type: String }],
    original_language: { type: String },
    original_title: { type: String },
    overview: { type: String },
    popularity: { type: Number },
    poster_path: { type: String },
    production_companies: [
        {
            id: { type: Number },
            logo_path: { type: String },
            name: { type: String },
            origin_country: { type: String }
        }
    ],
    production_countries: [
        {
            iso_3166_1: { type: String },
            name: { type: String }
        }
    ],
    release_date: { type: Date },
    revenue: { type: Number },
    runtime: { type: Number },
    spoken_languages: [
        {
            english_name: { type: String },
            iso_639_1: { type: String },
            name: { type: String }
        }
    ],
    status: { type: String },
    tagline: { type: String },
    title: { type: String, required: true },
    video: { type: Boolean },
    vote_average: { type: Number },
    vote_count: { type: Number }
});

const MovieDetail = mongoose.model('Movie', movieDetailSchema);

export default MovieDetail;
