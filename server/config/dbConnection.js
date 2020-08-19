/* imports */
const mongoose = require('mongoose');

/* database connection */
mongoose.connect(
    process.env.DB_URL,
    { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true }
)
