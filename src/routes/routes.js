module.exports = function(app) {
    let controller = require('../controller/chatboxController')
  app.route('/getPublicKey')
    .get(controller.getPublicKey);

    app.route('/saveText')
    .post(controller.saveText);

    app.route('/getLatestTexts')
    .get(controller.getLatestTexts);

    app.route('/encrypt')
    .get(controller.encrypt);
};