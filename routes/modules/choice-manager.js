/*
* SmartClickR Choice-Manager Module
* Used for handling question choices
* Version: 0.0.1
*/


// Required Modules //
var MC = require('./my-info-config'); 
var mysql = require('mysql');

// DB Credentials //
var HOST = 'localhost';
var PORT = 3306;
var MYSQL_USER = MC.user;
var MYSQL_PASS = MC.pass;
var DATABASE = 'SmartClickR';
var TABLE = 'Choices';

// Connect to the DB //
var connection = mysql.createConnection({
	host: HOST,
	port: PORT,
	user: MYSQL_USER,
	password: MYSQL_PASS,
	database: DATABASE,
});


var CM = {};
module.exports = CM;

// Choices for True/False //
// choiceData = questionID and answer 
CM.createTFChoices = function(choiceData, callback) {

	CM.createChoice(choiceData.Question_ID, function(one) {
		CM.updateContent({ Choice_ID : one, Content : 'True' }, function(o) {
			if(choiceData.Answer == 'True') {
				CM.updateChoiceStatus({ Choice_ID : one, IsCorrectChoice : 'Y' }, function(out) { });
			} else {
				CM.updateChoiceStatus({ Choice_ID : one, IsCorrectChoice : 'N' }, function(out) { });
			}
			console.log('added true choice');

			CM.createChoice(choiceData.Question_ID, function(two) {
				CM.updateContent({ Choice_ID : two, Content : 'False' }, function(o) {
					if(choiceData.Answer == 'False') {
						CM.updateChoiceStatus({ Choice_ID : two, IsCorrectChoice : 'Y' }, function(out) { });
					} else {
						CM.updateChoiceStatus({ Choice_ID : two, IsCorrectChoice : 'N' }, function(out) { });
					}
					console.log('added false choice');
					callback(null);
				});
			});
		});
	});
	
}

// Choices for Multiple Choice //

// Choices for Numeric //

	/** If there was a correct answer(s) for Numeric **/

// Choices for Free Response //

	/** If there was a correct answer(s) for Free Response **/


// Delete All Choices for a Question //
CM.deleteChoices = function(questionID, callback) {
	connection.query('DELETE FROM ' + TABLE + ' WHERE Question_ID = ?', [questionID], function(err, results) {
		if(err) {
			console.log('Error: ', err);
			connection.destroy();
			console.log('Connection is closed');
		} else {
			callback(null);
			console.log('all choices deleted from question ', questionID);
		}
	});
}

/****** Update Choice *******/

// Update Content //
CM.updateContent = function(choiceData, callback) {
	connection.query('UPDATE ' + TABLE + ' SET Content = ? WHERE Choice_ID = ?', [choiceData.Content, choiceData.Choice_ID], function(err, result) {
		if(err) {
			console.log('Error: ', err);
			connection.destroy();
			console.log('Connection is closed');
		} else {
			callback(null);
		}
	});
}

// Update Correct //
// isCorrect must be either 'Y' or 'N'
CM.updateChoiceStatus = function(choiceData, callback) {
	connection.query('UPDATE ' + TABLE + ' SET IsCorrectChoice = ? WHERE Choice_ID = ?', [choiceData.IsCorrectChoice, choiceData.Choice_ID], function(err, results) {
		if(err) {
			console.log('Error: ', err);
			connection.destroy();
			console.log('Connection is closed');
		} else {
			callback(null);
		}
	});
}


/****** Helper Methods ******/

// Create a choice // 
CM.createChoice = function(questionID, callback) {
	CM.choiceCount(questionID, function(count) {
		connection.query('INSERT INTO ' + TABLE + ' (Question_ID, ChoiceOrder) VALUES (?, ?)', [questionID, count + 1], function(err, results) {
			if(err) {
				console.log('Error: ', err);
				connection.destroy();
				console.log('Connection is closed');
			} else {
				callback(results.insertId);
				console.log('new choice added for question ' + questionID);
			}
		});
	});
}

// Get the choice count for a question //
CM.choiceCount = function(questionID, callback) {
	connection.query('SELECT * FROM ' + TABLE + ' WHERE Question_ID = ?', [questionID], function(err, results) {
		if(results.length > 0)
			callback(results.length);
		else
			callback(0);
	});
}

// Delete Choice //
CM.delete = function(questionID, callback) {
	connection.query('DELETE FROM ' + TABLE + ' WHERE Choice_ID = ?', [questionID], function(err, result) {
		if(err) {
			console.log('Error: ', err);
			connection.destroy();
			console.log('Connection is closed');
		} else {
			callback(null);
			//console.log('delete question ', questionID);
		}
	});
}
