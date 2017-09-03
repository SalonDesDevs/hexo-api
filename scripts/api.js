/*global hexo: true */

const bodyParser = require('body-parser');

const sanitize = title => title.match(/[a-z ]/gi).join('').replace(/ /g, '-').toLowerCase();

hexo.extend.filter.register('server_middleware', (app) => {
    app.use(hexo.config.root + 'api/', bodyParser.json({
        limit: '50mb'
    }));
    app.use(hexo.config.root + 'api/posts/list', (req, res) => {
        res.end(
            JSON.stringify(
                hexo.model('Post').toArray().map(
                    post => ({
                        title: post.title,
                        author: post.author,
                        date: post.date,
                        id: post._id,
                        picture: 'https://via.placeholder.com/800x460/3a3a3a/ffffff', //TODO: Use real article picture
                        uri: '/article/' + post._id.substr(-3) + '/' + sanitize(post.title)
                    })
                )
            )
        );
    });
    app.use(hexo.config.root + 'api/post/content/by-id', (req, res) => {
        res.end(
            JSON.stringify(
                hexo.model('Post').toArray()
                    .filter(post => post._id === req.body.id)
                    .map(
                        post => ({
                            title: post.title,
                            author: post.author,
                            date: post.date,
                            id: post._id,
                            uri: '/article/' + post._id.substr(-3) + '/' + sanitize(post.title),
                            content: post.content
                        })
                    )[0]
            )
        );
    });
    app.use(hexo.config.root + 'api/post/content/by-uri/', (req, res) => {
        res.end(
            JSON.stringify(
                hexo.model('Post').toArray()
                    .filter(post => post._id.endsWith(req.body.id_suffix) && sanitize(post.title) === req.body.sanitized_title)
                    .map(
                        post => ({
                            title: post.title,
                            author: post.author,
                            date: post.date,
                            id: post._id,
                            uri: '/article/' + post._id.substr(-3) + '/' + sanitize(post.title),
                            content: post.content
                        })
                    )[0]
            )
        );
    });
});
