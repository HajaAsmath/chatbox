var cors = require('cors')
var bodyParser = require('body-parser')

module.exports = function(app, express) {
  app.use(bodyParser.json())
    let controller = require('../controller/chatboxController')
    app.use(cors())
    app.route('/getPublicKey')
    .get(controller.getPublicKey);

    app.post('/sendText', controller.saveText);

    app.route('/getLatestTexts')
    .get(controller.getLatestTexts);
};