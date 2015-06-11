var request = require('request');

var url = 'https://devext-ci.betterdoctor.com:443';

var buildTree = "\
number,\
result,\
timestamp,\
duration,\
estimatedDuration\
";

var actionTree = "causes[shortDescription,userId]";

var specificBuildTree = "\
actions[" + actionTree + "],\
number,\
result,\
timestamp,\
duration,\
estimatedDuration,\
building,\
changeSet[items,kind],\
culprits\
";

var jobTree = "\
displayName,\
buildable,\
builds[" + buildTree + "],\
lastBuild[" + specificBuildTree + "],\
lastSuccessfulBuild[" + specificBuildTree + "],\
lastUnsuccessfulBuild[" + specificBuildTree + "]\
";

var tree = "\
numExecutors,\
jobs[" + jobTree + "]\
"

module.exports = {
  get: function(path, callback) {
    console.log(path);
    request(url + path, function(error, response, body) {
      if (error)
        console.log(error);
      else
        callback(JSON.parse(body));
    }); 
  },
  
  getDashboard: function(callback) {
    return this.get('/api/json?tree=' + tree, callback);
  },
}