const config = {
    dbUrl: process.env.MONGO_URL || 'mongodb://mongoadmin:secret@localhost:27888/?authSource=admin',
    port: process.env.PORT || 8080
};

module.exports = config;