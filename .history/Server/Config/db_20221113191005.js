"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Secret = exports.HostName = exports.RemoteURI = exports.LocalURI = void 0;
exports.LocalURI = "mongodb://localhost/contacts";
exports.RemoteURI = "mongodb+srv://yingying:YkfP2UZbqyODYik9@cluster0.nwk3jkz.mongodb.net/?retryWrites=true&w=majority";
exports.HostName = (process.env.RemoteURI) ? "remotehost" : "localhost";
exports.Secret = "someSecret";
//# sourceMappingURL=db.js.map
//"mongodb+srv://tixgroup20:tixisno1@survey.ud2ab.mongodb.net/survey?retryWrites=true&w=majority";