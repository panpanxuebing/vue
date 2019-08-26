const webpack = requrie('webpack');
const devServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.dev');

const compiler = webpack(webpackConfig);
const port = webpackConfig.devServer.port || 3001;
const devServerOptions = Object.assign({}, webpackConfig.devServer, {
    open: true,
    stats: {
        colors: true
    }
});
const server = new devServer(compiler, devServerOptions);

server.listen(port, '127.0.0.1', () => {
    console.log('Starting server on http://localhost:' + port);
})