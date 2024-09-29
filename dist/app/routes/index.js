"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = require("../modules/Auth/auth.routes");
const user_routes_1 = require("../modules/user/user.routes");
const router = (0, express_1.Router)();
const appRoutes = [
    {
        path: "/user",
        route: user_routes_1.userRoute,
    },
    {
        path: "/auth",
        route: auth_routes_1.authRoutes,
    },
];
appRoutes.forEach((aRoute) => {
    router.use(aRoute.path, aRoute.route);
});
exports.default = router;
