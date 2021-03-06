// TODO: figure out a better way to do this
const URLS = require('../../../src/shared/urls');
const routeUtils = require('../../utils/route-utils');

const ArticleBootstrap = function (app) {
    const Article = require('./Article').Article;
    const ArticleDataService = require('./ArticleDataService')(Article);
    const ArticleRoutes = require('./ArticleRoutes')(ArticleDataService);

    app.get(URLS.API.article,
        ArticleRoutes.getArticlesByHandle
    );

    app.get(URLS.API.suggestedArticles,
        ArticleRoutes.getSuggestedArticlesHandle
    );

    app.get(URLS.API.articles,
        ArticleRoutes.getArticlesByCategoryHandle
    );

    app.get(URLS.API.dashboardArticles,
        routeUtils.isAuthenticated,
        ArticleRoutes.getDraftsAndCategoriesHandle
    );

    app.get(URLS.API.editArticle,
        routeUtils.isAuthenticated,
        ArticleRoutes.getEditArticleHandle
    );

    app.get(URLS.API.categories,
        ArticleRoutes.getCategoriesHandle
    );

    app.post(URLS.API.editArticle,
        routeUtils.isAuthenticated,
        ArticleRoutes.postEditArticleHandle
    );

    app.post(URLS.API.createArticle,
        routeUtils.isAuthenticated,
        ArticleRoutes.postCreateArticleHandle
    );

    app.get(URLS.API.articlePlacement,
        ArticleRoutes.getPlacementArticleHandle
    );
};

module.exports = ArticleBootstrap;

