module.exports = {
    Query: {
        async ping() {
            return 'pong';
        },
        async serverVersion() {
            return '0.0.2';
        }
    }
}