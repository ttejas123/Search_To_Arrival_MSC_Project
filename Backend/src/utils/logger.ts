import EventEmitter from 'events'
const logger:any = new EventEmitter();

const pick_color:any = {
    info: "\x1b[36m",
    error: "\x1b[31m",
    warn:  "\x1b[33m",
    Update_Request: "\x1b[40m",
}

logger.on('log', ({ level, message }:any) => {
    const timestamp = new Date()
    console.log(`${pick_color[level]}%s\x1b[0m`, `[${level}] ${message} - ${timestamp}`);
});

logger.info = function (message:any) {
    this.emit('log', { level: "info", message });
};

logger.update = function() {
    this.emit('log', { level: "Update_Request", message: "triggering special update message log"})
}

logger.warn = function (message:any) {
    this.emit('log', { level: "warn", message });
};

logger.error = function(message:any) {
    this.emit('log', { level: "error", message})
}

export function logAuthenticationSuccess(email:any) {
    logger.emit('log', { level: "info", message: `User ${email} successfully logged in` });
}

export function logAuthorizationSuccess(userID:any) {
    logger.emit('log', { level: "info", message: `User ${userID} is Authorize.`});
}

export function logAuthenticationFailure(email:any, reason:any) {
    logger.emit('log', { level: "warn", message: `User ${email} failed to log in (${reason})`});
}

export default logger;