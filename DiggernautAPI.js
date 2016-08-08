//https://www.diggernaut.com/
//API for node.js
//Authorization token can be taken from https://www.diggernaut.com/members/settings/api
//
var Client = require('node-rest-client').Client;

//Usage:
// var dig = new Diggernaut('your token')
// dig.GetProjects(console.log)
var Diggernaut = function(token) {
    var token = token;
    //autorization header
    var parameters = {
        headers: {
            'Authorization': 'Token ' + token,
            "Content-Type": "application/json"
        },
    }
    var client = new Client();
    //returns array of objects in callback.
    //Usage: dig.GetProjects(console.log)
    this.GetProjects = function(callback) {
        if (!_callbackCheck(callback)) {
            console.log('ERROR: Callback if not a function!')
            return;
        }
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

    //project arg must be positive integer.
    //returns array of objects in callback.
    //Usage: dig.GetDiggers(1, console.log)
    this.GetDiggers = function(project, callback) {
        if (!_callbackCheck(callback)) {
            console.log('ERROR: Callback if not a function!')
            return;
        }
        client.get('https://www.diggernaut.com/api/v1/projects/' + project + '/diggers', parameters, function(data) {
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
    this.GetDigger = function(digger, callback) {
        if (!_callbackCheck(callback)) {
            console.log('ERROR: Callback if not a function!')
            return;
        }
        client.get('https://www.diggernaut.com/api/v1/diggers/' + digger, parameters, function(data) {
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
            console.log('ERROR: Callback if not a function!')
            return;
        }
        //params must be object with fields
        //project: positive integer(can`t be empty)   
        //config: string(can be empty)
        //url: string(can`t be empty)  
        //name: string(can`t be empty)
        parameters.data = params;
        client.post('https://www.diggernaut.com/api/v1/diggers/', parameters, function(data) {
            //object fields 
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
    //Usage: dig.UpdateDigger(76, {name:'digger_76'}, console.log)
    this.UpdateDigger = function(id, params, callback) {
            if (!_callbackCheck(callback)) {
                console.log('ERROR: Callback if not a function!')
                return;
            }
            //params must object with any of field/fields
            //name: string
            //url: string
            //config: string
            //schedule_from: date/time(iso)
            //schedule_to: date/time(iso)
            parameters.data = params;
            client.patch('https://www.diggernaut.com/api/v1/diggers/' + id, parameters, function(data) {
                //objec fields 
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
            client.delete('https://www.diggernaut.com/api/v1/diggers/' + digger, parameters).on('error', function(err) {
                console.log('something went wrong on the request', err.request.options);
            });
        }
        //Helper function
    function _callbackCheck(callback) {
        if (callback !== undefined && callback !== null && typeof(callback) === 'function') {
            return true;
        }
        return false;
    }
}
module.exports = Diggernaut;