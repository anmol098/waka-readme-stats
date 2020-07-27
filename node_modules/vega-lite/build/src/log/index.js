/**
 * Vega-Lite's singleton logger utility.
 */
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _level;
import { Debug, Error as ErrorLevel, Info, logger, Warn } from 'vega-util';
import * as message_1 from './message';
export { message_1 as message };
/**
 * Main (default) Vega Logger instance for Vega-Lite.
 */
const main = logger(Warn);
let current = main;
/**
 * Logger tool for checking if the code throws correct warning.
 */
export class LocalLogger {
    constructor() {
        this.warns = [];
        this.infos = [];
        this.debugs = [];
        _level.set(this, Warn);
    }
    level(_) {
        if (_) {
            __classPrivateFieldSet(this, _level, _);
            return this;
        }
        return __classPrivateFieldGet(this, _level);
    }
    warn(...args) {
        if (__classPrivateFieldGet(this, _level) >= Warn)
            this.warns.push(...args);
        return this;
    }
    info(...args) {
        if (__classPrivateFieldGet(this, _level) >= Info)
            this.infos.push(...args);
        return this;
    }
    debug(...args) {
        if (__classPrivateFieldGet(this, _level) >= Debug)
            this.debugs.push(...args);
        return this;
    }
    error(...args) {
        if (__classPrivateFieldGet(this, _level) >= ErrorLevel)
            throw Error(...args);
        return this;
    }
}
_level = new WeakMap();
export function wrap(f) {
    return () => {
        current = new LocalLogger();
        f(current);
        reset();
    };
}
/**
 * Set the singleton logger to be a custom logger.
 */
export function set(newLogger) {
    current = newLogger;
    return current;
}
/**
 * Reset the main logger to use the default Vega Logger.
 */
export function reset() {
    current = main;
    return current;
}
export function error(...args) {
    current.error(...args);
}
export function warn(...args) {
    current.warn(...args);
}
export function info(...args) {
    current.info(...args);
}
export function debug(...args) {
    current.debug(...args);
}
//# sourceMappingURL=index.js.map