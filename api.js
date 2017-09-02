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
                        url: 'https://salondesdevs.io/article/' + post._id.substr(-3) + '/' + sanitize(post.title)
                    })
                )
            )
        );
    });
    app.use(hexo.config.root + 'api/post/content', (req, res) => {
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
                            url: 'https://salondesdevs.io/article/' + post._id.substr(-3) + '/' + sanitize(post.title),
                            content: post.content
                        })
                    )
            )
        );
    });
});
