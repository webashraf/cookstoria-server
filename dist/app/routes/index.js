"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("../modules/Auth/auth.routes");
const recipe_routes_1 = require("../modules/Recipe/recipe.routes");
const recipeComments_routes_1 = require("../modules/RecipeComments/recipeComments.routes");
const socialConnection_routes_1 = require("../modules/socialConnection/socialConnection.routes");
const user_routes_1 = require("../modules/user/user.routes");
const router = (0, express_1.Router)();
const appRoutes = [
    {
        path: "/user",
        route: user_routes_1.userRoutes,
    },
    {
        path: "/auth",
        route: auth_routes_1.authRoutes,
    },
    {
        path: "/social",
        route: socialConnection_routes_1.socialConnectivityRoutes,
    },
    {
        path: "/recipe",
        route: recipe_routes_1.recipeRouters,
    },
    {
        path: "/user-opinion",
        route: recipeComments_routes_1.userOpinionRoutes,
    },
];
appRoutes.forEach((aRoute) => {
    router.use(aRoute.path, aRoute.route);
});
exports.default = router;
