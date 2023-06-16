"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logAuthenticationFailure = exports.logAuthorizationSuccess = exports.logAuthenticationSuccess = void 0;
const events_1 = __importDefault(require("events"));
const logger = new events_1.default();
const pick_color = {
    info: "\x1b[36m",
    error: "\x1b[31m",
    warn: "\x1b[33m",
    Update_Request: "\x1b[40m",
};
logger.on('log', ({ level, message }) => {
    const timestamp = new Date();
    console.log(`${pick_color[level]}%s\x1b[0m`, `[${level}] ${message} - ${timestamp}`);
});
logger.info = function (message) {
    this.emit('log', { level: "info", message });
};
logger.update = function () {
    this.emit('log', { level: "Update_Request", message: "triggering special update message log" });
};
logger.warn = function (message) {
    this.emit('log', { level: "warn", message });
};
logger.error = function (message) {
    this.emit('log', { level: "error", message });
};
function logAuthenticationSuccess(email) {
    logger.emit('log', { level: "info", message: `User ${email} successfully logged in` });
}
exports.logAuthenticationSuccess = logAuthenticationSuccess;
function logAuthorizationSuccess(userID) {
    logger.emit('log', { level: "info", message: `User ${userID} is Authorize.` });
}
exports.logAuthorizationSuccess = logAuthorizationSuccess;
function logAuthenticationFailure(email, reason) {
    logger.emit('log', { level: "warn", message: `User ${email} failed to log in (${reason})` });
}
exports.logAuthenticationFailure = logAuthenticationFailure;
exports.default = logger;
