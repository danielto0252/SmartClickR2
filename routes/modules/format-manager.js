/*
* SmartClickR Format-Manager Module
* Used for formatting results from queries for easy use
* Version: 0.0.1
*/


// Required Modules //
var MC = require('./my-info-config'); 
var mysql = require('mysql');
var QM = require('./question-manager');
var CM = require('./choice-manager');

// DB Credentials //
var HOST = 'localhost';
var PORT = 3306;
var MYSQL_USER = MC.user;
var MYSQL_PASS = MC.pass;
var DATABASE = 'SmartClickR';
var TABLE = 'Polls';

// Connect to the DB //
var connection = mysql.createConnection({
	host: HOST,
	port: PORT,
	user: MYSQL_USER,
	password: MYSQL_PASS,
	database: DATABASE,
});

var FM = {};

module.exports = FM;

// Get and format all questions and choices from a poll //
// used for the edit page //
FM.getQuestions = function(pollID, callback) {
	QM.getQuestions(pollID, function(questions) {
		var size = []
		for(var i = 0; i < questions.length; i++) {
			size.push(i);
			CM.getChoices(questions[i].Question_ID, function(choices) {
				questions[size.shift()]["Choices"] = choices;
			});		
		}

		setTimeout(function() {
			callback(questions);
		}, 25);

	});
}