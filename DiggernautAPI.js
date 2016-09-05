//https://www.diggernaut.com/
//API for node.js
//Authorization token can be taken from https://www.diggernaut.com/members/settings/api
//
var Client = require('node-rest-client').Client;

//Usage:
// var dig = new Diggernaut('your token')
// dig.GetProjects(console.log)
var Diggernaut = function(token) {
    this.token = token;
    var client = new Client();
    this.GetProjects = function(callback) {
            if (!_callbackCheck(callback)) {
                console.log('ERROR: Callback is not a function!')
                return;
            }
            var parameters = _headers(this._getToken())
            client.get('https://www.diggernaut.com/api/v1/projects/', parameters, function(data) {
                callback(data);
            }).on('error', function(err) {
                console.log('something went wrong on the request', err.request.options);
            });
        }
    this.CreateProject = function(params, callback) {
            if (!_callbackCheck(callback)) {
                console.log('ERROR: Callback is not a function!')
                return;
            }
            var parameters = _headers(this._getToken())
            parameters.data = params;
            client.post('https://www.diggernaut.com/api/v1/projects/', parameters, function(data) {
                callback(data);
            }).on('error', function(err) {
                console.log('something went wrong on the request', err.request.options);
            });

        }
    this.PutProject = function(params, callback) {
            if (!_callbackCheck(callback)) {
                console.log('ERROR: Callback is not a function!')
                return;
            }
            var parameters = _headers(this._getToken())
            parameters.data = params;
            client.put('https://www.diggernaut.com/api/v1/projects/' + parameters.data.id, parameters, function(data) {
                callback(data);
            }).on('error', function(err) {
                console.log('something went wrong on the request', err.request.options);
            });

        }
    this.PatchProject = function(params, callback) {
            if (!_callbackCheck(callback)) {
                console.log('ERROR: Callback is not a function!')
                return;
            }
            var parameters = _headers(this._getToken())
            parameters.data = params;
            client.patch('https://www.diggernaut.com/api/v1/projects/' + parameters.data.id, parameters, function(data) {
                callback(data);
            }).on('error', function(err) {
                console.log('something went wrong on the request', err.request.options);
            });

        }
    this.DeleteProject = function(projectID) {
            var parameters = _headers(this._getToken());
            client.delete('https://www.diggernaut.com/api/v1/projects/' + projectID, parameters).on('error', function(err) {
                console.log('something went wrong on the request', err.request.options);
            });
        }
    this.GetDiggers = function(projectID, callback) {
        if (!_callbackCheck(callback)) {
            console.log('ERROR: Callback is not a function!')
            return;
        }
        var parameters = _headers(this._getToken())
        client.get('https://www.diggernaut.com/api/v1/projects/' + projectID + '/diggers', parameters, function(data) {
            callback(data);
        }).on('error', function(err) {
            console.log('something went wrong on the request', err.request.options);
        });
    }
    this.GetDigger = function(diggerID, callback) {
        if (!_callbackCheck(callback)) {
            console.log('ERROR: Callback is not a function!')
            return;
        }
        var parameters = _headers(this._getToken())
        client.get('https://www.diggernaut.com/api/v1/diggers/' + diggerID, parameters, function(data) {
            callback(data);
        }).on('error', function(err) {
            console.log('something went wrong on the request', err.request.options);
        });
    }
    this.CreateDigger = function(params, callback) {
        if (!_callbackCheck(callback)) {
            console.log('ERROR: Callback is not a function!')
            return;
        }
        var parameters = _headers(this._getToken())
        parameters.data = params;
        client.post('https://www.diggernaut.com/api/diggers/', parameters, function(data) {
            callback(data);
        }).on('error', function(err) {
            console.log('something went wrong on the request', err.request.options);
        });
    }
    this.PutDigger = function(params, callback) {
            if (!_callbackCheck(callback)) {
                console.log('ERROR: Callback is not a function!')
                return;
            }
            var parameters = _headers(this.token)
            parameters.data = params;
            client.patch('https://www.diggernaut.com/api/v1/diggers/' + parameters.data.id, parameters, function(data) {
                callback(data);
            }).on('error', function(err) {
                console.log('something went wrong on the request', err.request.options);
            });
            parameters.data = {}
        }
    this.PatchDigger = function(params, callback) {
            if (!_callbackCheck(callback)) {
                console.log('ERROR: Callback is not a function!')
                return;
            }
            var parameters = _headers(this.token)
            parameters.data = params;
            client.patch('https://www.diggernaut.com/api/v1/diggers/' + parameters.data.id, parameters, function(data) {
                callback(data);
            }).on('error', function(err) {
                console.log('something went wrong on the request', err.request.options);
            });
            parameters.data = {}
        }
    this.DeleteDigger = function(digger) {
            var parameters = _headers(this._getToken())
            client.delete('https://www.diggernaut.com/api/v1/diggers/' + digger, parameters).on('error', function(err) {
                console.log('something went wrong on the request', err.request.options);
            });
        }
    this.GetDiggerSessions = function(diggerID, callback) {
        if (!_callbackCheck(callback)) {
            console.log('ERROR: Callback is not a function!')
            return;
        }
        var parameters = _headers(this._getToken())
        client.get('https://www.diggernaut.com/api/v1/diggers/' + diggerID + '/sessions', parameters, function(data) {
            callback(data);
        }).on('error', function(err) {
            console.log('something went wrong on the request', err.request.options);
        });
    }
    this.GetSessions = function(sessionID, callback) {
        if (!_callbackCheck(callback)) {
            console.log('ERROR: Callback is not a function!')
            return;
        }
        var parameters = _headers(this._getToken())
        client.get('https://www.diggernaut.com/api/v1/sessions', parameters, function(data) {
            callback(data);
        }).on('error', function(err) {
            console.log('something went wrong on the request', err.request.options);
        });
    }

    this.GetSession = function(sessionID, callback) {
            if (!_callbackCheck(callback)) {
                console.log('ERROR: Callback is not a function!')
                return;
            }
            var parameters = _headers(this._getToken())
            client.get('https://www.diggernaut.com/api/v1/sessions/' + sessionID, parameters, function(data) {
                callback(data);
            }).on('error', function(err) {
                console.log('something went wrong on the request', err.request.options);
            });
        }
    this.GetSessionData = function(sessionID, callback) {
        if (!_callbackCheck(callback)) {
            console.log('ERROR: Callback is not a function!')
            return;
        }
        var parameters = _headers(this._getToken())
        client.get('https://www.diggernaut.com/api/v1/sessions/' + sessionID + '/data', parameters, function(data) {
            callback(data);
        }).on('error', function(err) {
            console.log('something went wrong on the request', err.request.options);
        });
    }


    this._getToken = function() {
            return this.token
        }
        //Helper function
    function _callbackCheck(callback) {
        if (callback !== undefined && callback !== null && typeof(callback) === 'function') {
            return true;
        }
        return false;
    }

    function _headers(token) {
        return {
            headers: {
                'Authorization': 'Token ' + token,
                "Content-Type": "application/json"
            }
        }
    }
}
module.exports = Diggernaut;