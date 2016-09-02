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
    //returns array of objects in callback.
    //Usage: dig.GetProjects(console.log)
    this.GetProjects = function(callback) {
            if (!_callbackCheck(callback)) {
                console.log('ERROR: Callback is not a function!')
                return;
            }
            var parameters = _headers(this._getToken())
            client.get('https://www.diggernaut.com/api/v1/projects/', parameters, function(data) {
                //each object in array has fields
                //id: integer
                //name: string
                //detail: string(if error)
                callback(data);
            }).on('error', function(err) {
                console.log('something went wrong on the request', err.request.options);
            });
        }
        //returns object in callback 
        //Usage: dig.CreateProject({name:'Robots', description: 'We are cool!'}, console.log)
    this.CreateProject = function(params, callback) {
            if (!_callbackCheck(callback)) {
                console.log('ERROR: Callback is not a function!')
                return;
            }
            var parameters = _headers(this._getToken())
            parameters.data = params;
            client.post('https://www.diggernaut.com/api/v1/projects/', parameters, function(data) {
                //object fields 
                //id: integer
                //name: string
                //description: string or null
                //detail: string(if error)
                callback(data);
            }).on('error', function(err) {
                console.log('something went wrong on the request', err.request.options);
            });

        }
        //returns object in callback 
        //Usage: dig.PutProject({id:1, name:'Robots', description: 'We are cool!'}, console.log)
    this.PutProject = function(params, callback) {
            if (!_callbackCheck(callback)) {
                console.log('ERROR: Callback is not a function!')
                return;
            }
            var parameters = _headers(this._getToken())
            parameters.data = params;
            client.put('https://www.diggernaut.com/api/v1/projects/' + parameters.data.id, parameters, function(data) {
                //object fields 
                //id: integer
                //name: string
                //description: string or null
                //detail: string(if error)
                callback(data);
            }).on('error', function(err) {
                console.log('something went wrong on the request', err.request.options);
            });

        }
        //returns object in callback 
        //Usage: dig.PatchProject({id:1, name:'Cool Robots'}, console.log)
    this.PatchProject = function(params, callback) {
            if (!_callbackCheck(callback)) {
                console.log('ERROR: Callback is not a function!')
                return;
            }
            var parameters = _headers(this._getToken())
            parameters.data = params;
            client.patch('https://www.diggernaut.com/api/v1/projects/' + parameters.data.id, parameters, function(data) {
                //object fields 
                //id: integer
                //name: string
                //description: string or null
                //detail: string(if error)
                callback(data);
            }).on('error', function(err) {
                console.log('something went wrong on the request', err.request.options);
            });

        }
        //deletes project
        //returns nothing
    this.DeleteProject = function(projectID) {
            var parameters = _headers(this._getToken());
            client.delete('https://www.diggernaut.com/api/v1/projects/' + projectID, parameters).on('error', function(err) {
                console.log('something went wrong on the request', err.request.options);
            });
        }
        //project arg must be positive integer.
        //returns array of objects in callback.
        //Usage: dig.GetDiggers(1, console.log)
    this.GetDiggers = function(projectID, callback) {
        if (!_callbackCheck(callback)) {
            console.log('ERROR: Callback is not a function!')
            return;
        }
        var parameters = _headers(this._getToken())
        client.get('https://www.diggernaut.com/api/v1/projects/' + projectID + '/diggers', parameters, function(data) {
            //each object in array has fields 
            //id: integer
            //name: string
            //url: string
            //status: string(debug,active)
            //last_session: object with fields:
            //        started_at: date/time(iso)  
            //        finished_at: date/time(iso)
            //        state: string(succes,active,failed)
            //        runtime: integer
            //bandwidth: float 
            //calls: integer
            //requests: integer
            //detail: string(if error)
            callback(data);
        }).on('error', function(err) {
            console.log('something went wrong on the request', err.request.options);
        });
    }

    //arg digger must be positive integer.
    //returns object in callback.
    //Usage: dig.GetDigger(76, console.log)
    this.GetDigger = function(diggerID, callback) {
        if (!_callbackCheck(callback)) {
            console.log('ERROR: Callback is not a function!')
            return;
        }
        var parameters = _headers(this._getToken())
        client.get('https://www.diggernaut.com/api/v1/diggers/' + diggerID, parameters, function(data) {
            //object has fields 
            //id: integer
            //name: string
            //project: integer
            //url: string
            //config: string or null
            //status: string(debug,active)
            //schedule_from: date/time(iso) or null
            //schedule_to: date/time(iso) or null
            //bandwidth: float 
            //calls: integer
            //requests: integer
            //detail: string(if error)
            callback(data);
        }).on('error', function(err) {
            console.log('something went wrong on the request', err.request.options);
        });
    }

    //returns object in callback 
    //Usage: dig.CreateDigger({project: 1, config: '', url: 'www.somesite.com', name:'digger'}, console.log)
    this.CreateDigger = function(params, callback) {
        if (!_callbackCheck(callback)) {
            console.log('ERROR: Callback is not a function!')
            return;
        }
        //params must be object with fields
        //project: positive integer(can`t be empty)   
        //config: string(can be empty)
        //url: string(can`t be empty)  
        //name: string(can`t be empty)
        var parameters = _headers(this._getToken())
        parameters.data = params;
        client.post('https://www.diggernaut.com/api/diggers/', parameters, function(data) {
            //object has fields
            //id: integer
            //name: string
            //project: integer
            //url: string
            //config: string or null
            //status: string(debug,active)
            //schedule_from: date/time(iso) or null
            //schedule_to: date/time(iso) or null
            //bandwidth: float 
            //calls: integer
            //requests: integer
            //detail: string(if error)
            callback(data);
        }).on('error', function(err) {
            console.log('something went wrong on the request', err.request.options);
        });
    }

    //return object in callback.
    //Usage: dig.PutDigger({id: 76, name:'digger_76', url: "www.someurl.com"}, console.log)
    this.PutDigger = function(params, callback) {
            if (!_callbackCheck(callback)) {
                console.log('ERROR: Callback is not a function!')
                return;
            }
            //params must object withfield/fields
            //name: string
            //url: string
            //id: integer
            var parameters = _headers(this.token)
            parameters.data = params;
            client.patch('https://www.diggernaut.com/api/v1/diggers/' + parameters.data.id, parameters, function(data) {
                //object has fields
                //id: integer
                //name: string
                //project: integer
                //url: string
                //config: string or null
                //status: string(debug,active)
                //schedule_from: date/time(iso) or null
                //schedule_to: date/time(iso) or null
                //bandwidth: float 
                //calls: integer
                //requests: integer
                //detail: string(if error)
                callback(data);
            }).on('error', function(err) {
                console.log('something went wrong on the request', err.request.options);
            });
            parameters.data = {}
        }
        //return object in callback.
        //Usage: dig.PatchDigger({id: 76, name:'digger_76'}, console.log)
    this.PatchDigger = function(params, callback) {
            if (!_callbackCheck(callback)) {
                console.log('ERROR: Callback is not a function!')
                return;
            }
            //params must object with any of field/fields
            //name: string
            //url: string
            //config: string
            //schedule_from: date/time(iso)
            //schedule_to: date/time(iso)
            var parameters = _headers(this.token)
            parameters.data = params;
            client.patch('https://www.diggernaut.com/api/v1/diggers/' + parameters.data.id, parameters, function(data) {
                //object has fields
                //id: integer
                //name: string
                //project: integer
                //url: string
                //config: string or null
                //status: string(debug,active)
                //schedule_from: date/time(iso) or null
                //schedule_to: date/time(iso) or null
                //bandwidth: float 
                //calls: integer
                //requests: integer
                //detail: string(if error)
                callback(data);
            }).on('error', function(err) {
                console.log('something went wrong on the request', err.request.options);
            });
            parameters.data = {}
        }
        //deletes digger
        //returns nothing
    this.DeleteDigger = function(digger) {
            var parameters = _headers(this._getToken())
            client.delete('https://www.diggernaut.com/api/v1/diggers/' + digger, parameters).on('error', function(err) {
                console.log('something went wrong on the request', err.request.options);
            });
        }
        //arg digger must be positive integer.
        //returns array in callback.
        //Usage: dig.GetSessions(76, console.log)
    this.GetSessions = function(diggerID, callback) {
            if (!_callbackCheck(callback)) {
                console.log('ERROR: Callback is not a function!')
                return;
            }
            var parameters = _headers(this._getToken())
            client.get('https://www.diggernaut.com/api/v1/diggers/' + diggerID + '/sessions', parameters, function(data) {
                //array of objects with fields 
                //id: integer
                //started_at: date\time(iso)
                //finished_at: date\time(iso)
                //state: string (success, stopped, failed)
                callback(data);
            }).on('error', function(err) {
                console.log('something went wrong on the request', err.request.options);
            });
        }
        //args diggerID and sessionID must be positive integer.
        //returns array in callback.
        //Usage: dig.GetSession(76, 1, console.log)
    this.GetSession = function(diggerID, sessionID, callback) {
            if (!_callbackCheck(callback)) {
                console.log('ERROR: Callback is not a function!')
                return;
            }
            var parameters = _headers(this._getToken())
            client.get('https://www.diggernaut.com/api/v1/diggers/' + diggerID + '/sessions/' + sessionID, parameters, function(data) {
                //object has fields 
                //id: integer
                //started_at: date\time(iso)
                //finished_at: date\time(iso)
                //state: string (success, stopped, failed)
                //runtime: integer
                //bandwidth: string
                //requests: integer
                //errors: integer
                callback(data);
            }).on('error', function(err) {
                console.log('something went wrong on the request', err.request.options);
            });
        }
        //args diggerID and sessionID must be positive integer.
        //returns array in callback.
        //Usage: dig.GetSessionData(76, 1, console.log)
    this.GetSessionData = function(diggerID, sessionID, callback) {
        if (!_callbackCheck(callback)) {
            console.log('ERROR: Callback is not a function!')
            return;
        }
        var parameters = _headers(this._getToken())
        client.get('https://www.diggernaut.com/api/v1/diggers/' + diggerID + '/sessions/' + sessionID + '/data', parameters, function(data) {
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
var diggernaut = require('Diggernaut');

var digAPI = new diggernaut('f98c1dc37033a8b1755f839685062cf422221111')
digAPI.GetProjects(console.log);