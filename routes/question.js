var QM = require('./modules/question-manager');

// POST /user/:User_ID/poll/:Poll_ID/question/create //
// create each question //
exports.postNewQuestion = function(request, response) {
	console.log(request.param.Poll_ID);
	console.log()
	QM.newQuestion({Poll_ID : request.param.Poll_ID,
					AType   : request.param('questionType'), function(o) {
		console.log("Question ID", o);
		if(request.param('questionType') == 'MC') {

		} else if (request.param('questionType') == 'TF') {

		} else if (request.param('questionType') == 'FR') {

		} else {
			//numeric
		}
	});
}