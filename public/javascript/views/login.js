$("#loginForm").ready(function() {

	$("#email").focus();	
	
	$(this).submit(function(e) {
		e.preventDefault();
		$(this).find(".alert").hide();
		
		
		var email = $('#email').val().trim();
		var pass = $('#password').val().trim();
		var remember = $('#remember-me').val();
		
		console.log('Errrybody was Kung Fu fighting');
		console.log(remember);
		
		
		$(this).ajaxSubmit({
			type 	: 'POST',
			data 	: {"email": email, "password": pass, "remember-me": remember},
			url  	: '/login',

			beforeSubmit : function(formData, jqForm, options){				
							if (false == validateLogin($(this))) {
								return false;
							}
			},
		   	success : function(data, status, xhr){
						$('#email').removeClass("input-error").addClass('input-success');
						$('#password').removeClass("input-error").addClass('input-success');
						if(status == "success") window.location.href = '/user/' + data.res;
			},
			error	: function(e){
						format  = '<div class="alert alert-error fade in">';
						format += '<strong>Uhh Ohh, </strong> your email address or password is incorrect';
						format += '</div>';
				
						$('#email').removeClass("input-error").addClass('input-error');
						$('#password').removeClass("input-error").addClass('input-error');
						$("#login-container h1").after(format);
			}
		
	});
	return false;

});

});


validateLogin = function($form) {
	$(this).find(".alert").hide();

	isValid = true;
		
	var emailVal = $("#email").val();
	var passwordVal = $('#password').val();
	
	if ( emailVal == '' && passwordVal == '') {
		$(this).find(".alert").hide();
		format  = '<div class="alert alert-error fade in">';
		format += '<strong>No email or password?</strong> That&rsquo;s just silly.';
		format += '</div>';
		
		$('#email').removeClass("input-error").addClass('input-error');
		$('#password').removeClass("input-error").addClass('input-error');
		
		$("#login-container h1").after(format);
		isValid = false;
		
	} else if(emailVal == '') {
		$(this).find(".alert").hide();
		format  = '<div class="alert alert-error fade in">';
		format += '<strong>Yikes!</strong> You entered a password but no email address';
		format += '</div>';
		
		
		$('#email').removeClass("input-error").addClass('input-error');
		$('#password').removeClass("input-error");
		$("#login-container h1").after(format);
		isValid = false;
		
	} else if( passwordVal == '' ) {
		$(this).find(".alert").hide();
		
		format = '<div class="alert alert-error fade in">';
		format += 'Looks like you forgot your password, <strong>' + emailVal + '.</strong>';
		format += '</div>';
		
		$('#email').removeClass("input-error");
		$('#password').removeClass("input-error").addClass('input-error');
		$("#login-container h1").after(format);
		isValid = false;
	} 
	
	return isValid;
	
}



