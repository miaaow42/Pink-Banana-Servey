"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Secret = exports.HostName = exports.RemoteURI = exports.LocalURI = void 0;
exports.LocalURI = "mongodb://localhost/contacts";
exports.RemoteURI = "mongodb+srv://yingying:YkfP2UZbqy0DYik9@cluster0.nwk3jkz.mongodb.net/test";
exports.HostName = (process.env.RemoteURI) ? "remoteHost" : "localHost";
exports.Secret = "someSecret";
//# sourceMappingURL=db.js.map