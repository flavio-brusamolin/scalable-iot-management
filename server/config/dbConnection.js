const mongoose = require('mongoose');

mongoose.connect('mongodb://iotmanager1:iotmanager1@ds263107.mlab.com:63107/iot_manager',
    { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })