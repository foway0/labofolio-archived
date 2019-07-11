const log4js = require('log4js');

log4js.addLayout('line', () => {
  return logEvent => {
    return colorize(`[${logEvent.level.levelStr}][PID:${logEvent.pid}]${logEvent.data}`, logEvent.level.colour);
  }
});
log4js.addLayout('json', config => {
  return logEvent => {
    const a = {};
    if(logEvent.level.levelStr === 'error')
      a.error = logEvent.data[0];
    else
      a.data = logEvent.data[0];

    return colorize(`[${logEvent.level.levelStr}][PID:${logEvent.pid}]${logEvent.startTime}:${JSON.stringify(a) + config.separator}`, logEvent.level.colour);
  }
});
log4js.configure({
  appenders: {
    out: {
      type: 'stdout',
      layout: {type: 'coloured'}
    },
    line: {
      type: 'stdout',
      layout: {
        type: 'line',
      }
    },
    json: {
      type: 'stdout',
      layout: {
        type: 'json',
        separator: ',',
      }
    }
  },
  categories: {
    default: {
      appenders: ['out'],
      level: 'all',
    },
    line: {
      appenders: ['line'],
      level: 'all',
    },
    json: {
      appenders: ['json'],
      level: 'all',
    },
  }
});
// TODO set custom color
const styles = {
  // styles
  bold: [1, 22],
  italic: [3, 23],
  underline: [4, 24],
  inverse: [7, 27],
  // grayscale
  white: [37, 39],
  grey: [90, 39],
  black: [90, 39],
  // colors
  blue: [34, 39],
  cyan: [36, 39],
  green: [32, 39],
  magenta: [35, 39],
  red: [91, 39],
  yellow: [33, 39]
};

const randomProperty = function (obj) {
  const keys = Object.keys(obj);
  return keys[keys.length * Math.random() << 0];
};

function colorizeStart(style) {
  return style ? `\x1B[${styles[style][0]}m` : '';
}

function colorizeEnd(style) {
  return style ? `\x1B[${styles[style][1]}m` : '';
}

function colorize(str, style) {
  return colorizeStart(style) + str + colorizeEnd(style);
}

class Log4js {
  static all(mode, ...msg) {
    const logger = log4js.getLogger(mode);
    logger.info(msg);
  }

  static trace(mode, ...msg) {
    const logger = log4js.getLogger(mode);
    logger.trace(msg);
  }

  static debug(mode, ...msg) {
    const logger = log4js.getLogger(mode);
    logger.debug(msg);
  }

  static info(mode, ...msg) {
    const logger = log4js.getLogger(mode);
    logger.info(msg);
  }

  static warn(mode, ...msg) {
    const logger = log4js.getLogger(mode);
    logger.warn(msg);
  }

  static error(mode, ...msg) {
    const logger = log4js.getLogger(mode);
    logger.error(msg);
  }

  static fatal(mode, msg) {
    const logger = log4js.getLogger(mode);
    logger.fatal(msg);
  }
}

module.exports = Log4js;