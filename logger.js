var logger = exports;
logger.debugLevel = 'warn';
logger.log = function(level, message) {
    var levels = ['errors', 'warn', 'info'];
    if(levels.indexOf(level) >= levels.indexOf(logger.debugLevel)){
        if(typeof message !== 'string'){
            message = JSON.stringify(message);
        }
        console.log(level + ': ' + message);
    }
};
