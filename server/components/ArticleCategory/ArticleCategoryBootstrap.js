// TODO: figure out a better way to do this
const URLS = require('../../../src/shared/urls');
const routeUtils = require('../../utils/route-utils');

const ArticleCategoryBootstrap = function (app) {
    const ArticleCategory = require('./ArticleCategory');
    const ArticleCategoryDataService = require('./ArticleCategoryDataService')(ArticleCategory);
    const ArticleCategoryRoutes = require('./ArticleCategoryRoutes')(ArticleCategoryDataService);

    // define app.get/post routes here
    app.get(URLS.API.categories,
        ArticleCategoryRoutes.getCategoriesHandle
    );

    app.post(URLS.API.editCategory,
        ArticleCategoryRoutes.postEditCategoryHandle
    )
};

module.exports = ArticleCategoryBootstrap;

