"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_KEY_OpenAI = exports.API_KEY_SerpApi = exports.rateLimitterParams = exports.cryto_data = exports.DbUrl = void 0;
const DbUrl = "mongo";
exports.DbUrl = DbUrl;
const cryto_data = {
    salt: "37ac94fa1f23c26c5473",
    iterations: 1000,
    keylen: 32,
    digest: 'sha512'
};
exports.cryto_data = cryto_data;
const rateLimitterParams = {
    windowMs: 1 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
};
exports.rateLimitterParams = rateLimitterParams;
const API_KEY_SerpApi = "284858ab1e31d2664fff9cf1f7e26e035b2206d4f13f329e38ae4cce29e40933";
exports.API_KEY_SerpApi = API_KEY_SerpApi;
const API_KEY_OpenAI = "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"; //"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"
exports.API_KEY_OpenAI = API_KEY_OpenAI;
