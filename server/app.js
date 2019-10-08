/* imports */
const app = require('./config/server');

/* start application */
app.listen(8080, () => {
    console.log('Node server on 8080')
});
