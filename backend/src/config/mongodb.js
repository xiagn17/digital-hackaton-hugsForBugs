const { mongoUrl } = require('./default');

module.exports = {
    url: `mongodb://${mongoUrl}/hugsForBugs`,
};
