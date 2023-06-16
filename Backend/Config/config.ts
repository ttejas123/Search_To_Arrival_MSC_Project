const DbUrl = "mongo"
const cryto_data = {
    salt : "37ac94fa1f23c26c5473",
    iterations : 1000,
    keylen : 32,
    digest : 'sha512'
}
const rateLimitterParams = {
     windowMs: 1 * 60 * 1000, // 1 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 1 minute)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}

const API_KEY_SerpApi = "284858ab1e31d2664fff9cf1f7e26e035b2206d4f13f329e38ae4cce29e40933"
const API_KEY_OpenAI = "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" //"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"
export { DbUrl, cryto_data, rateLimitterParams, API_KEY_SerpApi, API_KEY_OpenAI }

