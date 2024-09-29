"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const port = 5000;
        try {
            yield mongoose_1.default.connect("mongodb+srv://cookstoria:SQP7ayE5y10pkHxa@cluster0.8frxat4.mongodb.net/cookstoria?retryWrites=true&w=majority&appName=Cluster0");
            app_1.default.listen(port, () => {
                console.log(`cookstoria-culinary server running on port ${port}`);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
main();
