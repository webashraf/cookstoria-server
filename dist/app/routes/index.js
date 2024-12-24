"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("../modules/Auth/auth.routes");
const recipe_routes_1 = require("../modules/Recipe/recipe.routes");
const recipeComments_routes_1 = require("../modules/RecipeComments/recipeComments.routes");
const socialConnection_routes_1 = require("../modules/SocialConnection/socialConnection.routes");
const society_routes_1 = require("../modules/Societies/Society/society.routes");
const societyMember_routes_1 = require("../modules/Societies/SocietyMember/societyMember.routes");
const societyPost_routes_1 = require("../modules/Societies/SocietyPost/societyPost.routes");
const storyReels_routes_1 = require("../modules/StoryReels/storyReels.routes");
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
        path: "/story",
        route: storyReels_routes_1.storyReelsRoute,
    },
    {
        path: "/user-opinion",
        route: recipeComments_routes_1.userOpinionRoutes,
    },
    {
        path: "/society",
        route: society_routes_1.societyRoutes,
    },
    {
        path: "/society-member",
        route: societyMember_routes_1.societyMemberRoutes,
    },
    {
        path: "/society-post",
        route: societyPost_routes_1.societyPostRoutes,
    },
];
appRoutes.forEach((aRoute) => {
    router.use(aRoute.path, aRoute.route);
});
exports.default = router;
