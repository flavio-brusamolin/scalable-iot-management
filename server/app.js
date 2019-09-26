const app = require('./config/server');

require('dotenv-safe').config();

app.listen(8080, () => {
    console.log('Node server on 8080')
});
