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

const API_KEY_SerpApi = "<API_Key>"
const API_KEY_OpenAI = "<API_key>" //"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"
export { DbUrl, cryto_data, rateLimitterParams, API_KEY_SerpApi, API_KEY_OpenAI }

