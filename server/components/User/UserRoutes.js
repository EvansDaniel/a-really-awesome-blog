const routeUtils = require('../../utils/route-utils');
const constants = require('../../../src/shared/constants');
const HttpError = require('http-error');
const uuidv4 = require('uuid/v4');
const _ = require('lodash');

const UserRoutes = function (UserDataService) {

    const postLogin = function (req, res, next) {
        routeUtils.debuggingHelper(req, res, next, function (req, res, next) {
            if (req.cookies.hasOwnProperty(constants.CACHED_AUTH_COOKIE)) {
                console.log('Cached auth cookie saved');
            } else {
                console.log('Not saved, building');
                res.cookie(constants.CACHED_AUTH_COOKIE,
                    uuidv4(), {
                        maxAge: constants.SESSION_COOKIE_TIME
                    });
            }

            res.json(req.user);
        });
    };

    const getCheckAuthenticated = function (req, res, next) {
        return res.json({
            authenticated: req.isAuthenticated && req.isAuthenticated()
        });
    };

    const getMeHandle = function (req, res, next) {
        return res.json(req.user);
    };

    const postEditMeHandle = function (req, res, next) {
        routeUtils.debuggingHelper(req, res, next, function (req, res, next) {
            UserDataService.update(req.body.data, function (err, raw) {
                if(err) {
                    next(err);
                }
                return res.json({});
            });
        })
    };

    return {
        getMeHandle: getMeHandle,
        postEditMeHandle: postEditMeHandle,
        postLogin: postLogin,
        getCheckAuthenticated: getCheckAuthenticated
    };
};

module.exports = UserRoutes;

