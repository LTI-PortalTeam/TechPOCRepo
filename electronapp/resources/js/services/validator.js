/**
 * This file is For adding Validation in client side using Jquery
 */
//var jq = jQuery.noConflict();
jq.validator.addMethod("passwordValid", function(value, element) {
	return this.optional(element) || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/i.test(value);
}, 'Incorrect Password. Please Retry'/*'only numbers,characters and special digit!@#$%^&*()_ are allowed'*/);

/**
 * Return true, if the value is a valid ITDREIN
 *
 * @example jq.validator.methods.ITDREINValid("ABCDE1111D.AD111")
 * @result true
 *
 * @example jq.validator.methods.ITDREINValid("ABCDE1111D.BD111")
 * @result false
 * 
 */
jq.validator.addMethod("ITDREINValid", function(value, element) {
	return this.optional(element) || /^[A-Z]{5}[0-9]{4}[A-Z]{1}[.][A]{1}[BCDGIMNPRSZ]{1}[0-9]{3}|[A-Z]{4}[0-9]{5}[A-Z]{1}[.][A]{1}[BCDGIMNPRSZ]{1}[0-9]{3}$/i.test(value);
}, 'PANnumber.A[b-z][0-9][0-9][0-9] should be the format');

jq.validator.addMethod("lettersonly", function(value, element) {
	return this.optional(element) || /^[a-z,""]+$/i.test(value);
}, "only characters are allowed");

/**
 * Return true, if the value is a valid PanNumber
 *
 * @example jq.validator.methods.PanNumber("ABCDE1111D")
 * @result true
 *
 * @example jq.validator.methods.PanNumber("ABCDE11DFE")
 * @result false
 *
 * @example jq.validator.methods.PanNumber("ABCDE11")
 * @result false
 */
jq.validator.addMethod("PanNumber", function(value, element) {
	return this.optional(element) || /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(value);
}, "Pan Format should be like ABCDE1113D");

jq.validator.addMethod("phoneno", function(value, element) {
	return this.optional(element) || /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/i.test(value);
}, "only numbers are allowed");

/**
 * Return true, if the value is a valid date, also making this formal check dd/mm/yyyy.
 *
 * @example jq.validator.methods.dateFormat("01/01/1900")
 * @result true
 *
 * @example jq.validator.methods.dateFormat("01/13/1990")
 * @result false
 *
 * @example jq.validator.methods.dateFormat("01.01.1900")
 * @result false
 */
jq.validator.addMethod("dateFormat", function(value, element) {
	return this.optional(element) || /^(((0[1-9]|1[0-9]|2[0-8])[\/|\-|\.](0[1-9]|1[012]))|((29|30|31)[\/|\-|\.](0[13578]|1[02]))|((29|30)[\/|\-|\.](0[4,6,9]|11)))[\/|\-|\.](19|[1-2][0-1])\d\d$/i.test(value);
}, "Enter Valid Date");


jq.validator.addMethod( "nowhitespace", function( value, element ) {
	return this.optional( element ) || /^\S+$/i.test( value );
}, "No white space please" );

(function(jq, W, D) {
	var JQUERY4U = {};

	JQUERY4U.UTIL = {
		setupFormValidation : function() {
			//form validation rules
			jq("#loginForm")
					.validate(
							{
								rules : {
									reportingEntityITDREIN : {
										required : true,
										ITDREINValid : true,
										minlength:16,
										maxlength:16
									},
									panNumber:{
										required : true,
										PanNumber : true,
										minlength:10,
										maxlength:10,
										nowhitespace:true
									},
									password : {
										required : true,
										minlength : 6,
										passwordValid:true
									},
								},
								messages : {
									reportingEntityITDREIN : "Please enter Correct ITDREIN(XXXXXXXXXX.XXXXX) and ITDREIN should be of 16 digits",
									panNumber:"Please provide 10 digit PAN number",
									password : {
										required : "Please provide a password",
										minlength : "Your password must be between 6 to 20 character"
									},
								},

								highlight : function(element) {
									jq(element).closest('.input-field')
											.addClass('has-error');
								},
								unhighlight : function(element) {
									jq(element).closest('.input-field')
											.removeClass('has-error');
								},
								errorElement : 'span',
								errorClass : 'help-block',
								errorPlacement : function(error, element) {
									if (element.parent('.form-control').length) {
										error.insertAfter(element.parent());
									} else {
										error.insertAfter(element);
									}
								}
								
							});
			
			jq("#changePassword")
			.validate(
					{
						rules : {
							
							txtCurrentPassword : {
								required : true,
								minlength : 8,
								maxlength : 14,
								passwordValid:true
							},
							txtNewPassword : {
								required : true,
								minlength : 8,
								maxlength : 14,
								passwordValid:true
							},
							txtConfirmPassword : {
								required : true,
								minlength : 8,
								maxlength : 14,
								passwordValid:true
							},
						},
						messages : {
							txtCurrentPassword : {
								required : "Please provide current password",
								minlength : "Your password must be between 8 to 14 character"
							},
							txtNewPassword : {
								required : "Please provide new password",
								minlength : "Your password must be between 8 to 14 character"
							},
							txtConfirmPassword : {
								required : "Please confirm new password",
								minlength : "Your password must be between 8 to 14 character"
							},
						},

						highlight : function(element) {
							jq(element).closest('.input-field')
									.addClass('has-error');
						},
						unhighlight : function(element) {
							jq(element).closest('.input-field')
									.removeClass('has-error');
						},
						errorElement : 'span',
						errorClass : 'help-block',
						errorPlacement : function(error, element) {
							if (element.parent('.form-control').length) {
								error.insertAfter(element.parent());
							} else {
								error.insertAfter(element);
							}
						}
						
					});
			
			/*jq("#selectFormTypeDiv")
			.validate(
					{
						rules : {
							FormType : "required",
							reportingEntityCategory : "required"
						},
						messages : {
							FormType : {
								required : "Please select Form Type",
							},
							reportingEntityCategory : {
								required : "Please select Reporting Entity Category",
							}
						},

						highlight : function(element) {
							jq(element).closest('.input-field')
									.addClass('has-error');
						},
						unhighlight : function(element) {
							jq(element).closest('.input-field')
									.removeClass('has-error');
						},
						errorElement : 'span',
						errorClass : 'help-block',
						errorPlacement : function(error, element) {
							if (element.parent('.form-control').length) {
								error.insertAfter(element.parent());
							} else {
								error.insertAfter(element);
							}
						}
						
					});
			*/
			jq("#additionalInformation61B")
			.validate(
					{
						rules : {
							reportingEntityType:"required",
							regulatorName:"required",
							registrationNumber : {
								required : false,
								minlength:10,
								maxlength:10,
								nowhitespace:true
							},
							pan : {
								required : true,
								PanNumber : true,
								minlength:10,
								maxlength:10
							},
							area:{
								required : false,
								lettersonly : true
							},
							city:{
								required : false,
								lettersonly : true
							},
							pinCode:{
								required : false,
								number : true,
								minlength:6,
								maxlength:6,
								nowhitespace:true
							}
						},
						messages : {
							reportingEntityType:{
								required : "Please Enter required Reporting Entity Type"
							},
							regulatorName:{
								required : "Please Enter required Regulator name"
							},
							registrationNumber:{
								required :""
							},
							pan : {
								required : "Please provide 10 digit PAN"
							},
							area:{
								required : "",
								lettersonly : "only characters are allowed"
							},
							city:{
								required : "",
								lettersonly : "only characters are allowed"
							},
							pinCode:{
								required : ""
							}
						},

						highlight : function(element) {
							jq(element).closest('.input-field')
									.addClass('has-error');
						},
						unhighlight : function(element) {
							jq(element).closest('.input-field')
									.removeClass('has-error');
						},
						errorElement : 'span',
						errorClass : 'help-block',
						errorPlacement : function(error, element) {
							if (element.parent('.form-control').length) {
								error.insertAfter(element.parent());
							} else {
								error.insertAfter(element);
							}
						}
						
					});
			jq("#additionalInformation61A")
			.validate(
					{
						rules : {
							reportingEntityType:"required",
							regulatorName:"required",
							registrationNumber : {
								required : false,
								minlength:10,
								maxlength:10,
								nowhitespace:true
							},
							area:{
								required : false,
								lettersonly : true
							},
							city:{
								required : false,
								lettersonly : true
							},
							pinCode:{
								required : false,
								number : true,
								minlength:6,
								maxlength:6,
								nowhitespace:true
							}
						},
						messages : {
						
							reportingEntityType:{
								required : "Please Enter Reporting Entity Type"
							},
							regulatorName:{
								required : "Please Enter Regulator name"
							},
							registrationNumber:{
								required :""
							},
							area:{
								required : "",
								lettersonly : "only characters are allowed"
							},
							city:{
								required : "",
								lettersonly : "only characters are allowed"
							},
							pinCode:{
								required : ""
							}
						},

						highlight : function(element) {
							jq(element).closest('.input-field')
									.addClass('has-error');
						},
						unhighlight : function(element) {
							jq(element).closest('.input-field')
									.removeClass('has-error');
						},
						errorElement : 'span',
						errorClass : 'help-block',
						errorPlacement : function(error, element) {
							if (element.parent('.form-control').length) {
								error.insertAfter(element.parent());
							} else {
								error.insertAfter(element);
							}
						}
						
					});
			jq("#designatedDirectorDetail")
			.validate(
					{
						rules : {
							
							pan : {
								required : true,
								PanNumber : true,
								minlength:10,
								maxlength:10
							},
							adharNumber:{
								required : true,
							},
							accessType: "required",
							mobileNo:{
								required : true,
								phoneno : true
							},
							email:{
								required : true,
								email : true
							},
							alternateEmail:{
								required : true,
								email : true
							},
							area:{
								required : false,
								lettersonly : true
							},
							city:{
								required : false,
								lettersonly : true
							},
							pinCode:{
								required : false,
								number : true,
								minlength:6,
								maxlength:6,
								nowhitespace:true
							}
						},
						messages : {
						
							pan : {
								required : "Please provide 10 digit PAN"
							},
							adharNumber:{
								required : "Please provide a valid name",
							},
							accessType:{
								required : "Please select Access Type"
							},
							mobileNo:{
								required : "Please Enter Phone Number",
								phoneno : "Phone number should be in the format of xxx-xxx-xxxx"
							},
							email:{
								required : "Please provide valid Email",
								email: "email should be xxx@domain.com"	
							},
							alternateEmail:{
								required : "Please provide valid and alternate Email",
								email: "email should be xxx@domain.com"	
							},
							area:{
								required : "",
								lettersonly : "only characters are allowed"
							},
							city:{
								required : "",
								lettersonly : "only characters are allowed"
							},
							pinCode:{
								required : ""
							}
						},

						highlight : function(element) {
							jq(element).closest('.input-field')
									.addClass('has-error');
						},
						unhighlight : function(element) {
							jq(element).closest('.input-field')
									.removeClass('has-error');
						},
						errorElement : 'span',
						errorClass : 'help-block',
						errorPlacement : function(error, element) {
							if (element.parent('.form-control').length) {
								error.insertAfter(element.parent());
							} else {
								error.insertAfter(element);
							}
						}
						
					});
			jq("#principalOfficerDetail")
			.validate(
					{
						rules : {
							
							pan : {
								required : true,
								PanNumber : true,
								minlength:10,
								maxlength:10
							},
							adharNumber:{
								required : true,
							},
							accessType: "required",
							mobileNo:{
								required : true,
								phoneno : true
							},
							email:{
								required : true,
								email : true
							},
							alternateEmail:{
								required : true,
								email : true
							},
							area:{
								required : false,
								lettersonly : true
							},
							city:{
								required : false,
								lettersonly : true
							},
							pinCode:{
								required : false,
								number : true,
								minlength:6,
								maxlength:6,
								nowhitespace:true
							}
						},
						messages : {
						
							pan : {
								required : "Please provide 10 digit PAN"
							},
							adharNumber:{
								required : "Please provide a valid name",
							},
							accessType:{
								required : "Please select Access Type"
							},
							mobileNo:{
								required : "Please Enter Phone Number",
								phoneno : "Phone number should be in the format of xxx-xxx-xxxx"
							},
							email:{
								required : "Please provide valid Email",
								email: "email should be xxx@domain.com"	
							},
							alternateEmail:{
								required : "Please provide valid and alternate Email",
								email: "email should be xxx@domain.com"	
							},
							area:{
								required : "",
								lettersonly : "only characters are allowed"
							},
							city:{
								required : "",
								lettersonly : "only characters are allowed"
							},
							pinCode:{
								required : ""
							}
						},

						highlight : function(element) {
							jq(element).closest('.input-field')
									.addClass('has-error');
						},
						unhighlight : function(element) {
							jq(element).closest('.input-field')
									.removeClass('has-error');
						},
						errorElement : 'span',
						errorClass : 'help-block',
						errorPlacement : function(error, element) {
							if (element.parent('.form-control').length) {
								error.insertAfter(element.parent());
							} else {
								error.insertAfter(element);
							}
						}
						
					});
			jq("#nodalOfficerDetail")
			.validate(
					{
						rules : {

							pan : {
								required : true,
								PanNumber : true,
								minlength:10,
								maxlength:10
							},
							adharNumber:{
								required : true,
							},
							accessType: "required",
							mobileNo:{
								required : true,
								phoneno : true
							},
							email:{
								required : true,
								email : true
							},
							alternateEmail:{
								required : true,
								email : true
							},
							area:{
								required : false,
								lettersonly : true
							},
							city:{
								required : false,
								lettersonly : true
							},
							pinCode:{
								required : false,
								number : true,
								minlength:6,
								maxlength:6,
								nowhitespace:true
							}
						},
						messages : {
						
							pan : {
								required : "Please provide 10 digit PAN"
							},
							adharNumber:{
								required : "Please provide a valid name",
							},
							accessType:{
								required : "Please select Access Type"
							},
							mobileNo:{
								required : "Please Enter Phone Number",
								phoneno : "Phone number should be in the format of xxx-xxx-xxxx"
							},
							email:{
								required : "Please provide valid Email",
								email: "email should be xxx@domain.com"	
							},
							alternateEmail:{
								required : "Please provide valid and alternate Email",
								email: "email should be xxx@domain.com"	
							},
							area:{
								required : "",
								lettersonly : "only characters are allowed"
							},
							city:{
								required : "",
								lettersonly : "only characters are allowed"
							},
							pinCode:{
								required : ""
							}
						},
						highlight : function(element) {
							jq(element).closest('.input-field')
									.addClass('has-error');
						},
						unhighlight : function(element) {
							jq(element).closest('.input-field')
									.removeClass('has-error');
						},
						errorElement : 'span',
						errorClass : 'help-block',
						errorPlacement : function(error, element) {
							if (element.parent('.form-control').length) {
								error.insertAfter(element.parent());
							} else {
								error.insertAfter(element);
							}
						}
						
					});
			jq("#alternateNodalOfficerDetail")
			.validate(
					{
						rules : {

							pan : {
								required : true,
								PanNumber : true,
								minlength:10,
								maxlength:10
							},
							adharNumber:{
								required : true,
							},
							accessType: "required",
							mobileNo:{
								required : true,
								phoneno : true
							},
							email:{
								required : true,
								email : true
							},
							alternateEmail:{
								required : true,
								email : true
							},
							area:{
								required : false,
								lettersonly : true
							},
							city:{
								required : false,
								lettersonly : true
							},
							pinCode:{
								required : false,
								number : true,
								minlength:6,
								maxlength:6,
								nowhitespace:true
							}
						},
						messages : {
						
							pan : {
								required : "Please provide 10 digit PAN"
							},
							adharNumber:{
								required : "Please provide a valid name",
							},
							accessType:{
								required : "Please select Access Type"
							},
							mobileNo:{
								required : "Please Enter Phone Number",
								phoneno : "Phone number should be in the format of xxx-xxx-xxxx"
							},
							email:{
								required : "Please provide valid Email",
								email: "email should be xxx@domain.com"	
							},
							alternateEmail:{
								required : "Please provide valid and alternate Email",
								email: "email should be xxx@domain.com"	
							},
							area:{
								required : "",
								lettersonly : "only characters are allowed"
							},
							city:{
								required : "",
								lettersonly : "only characters are allowed"
							},
							pinCode:{
								required : ""
							}
						},

						highlight : function(element) {
							jq(element).closest('.input-field')
									.addClass('has-error');
						},
						unhighlight : function(element) {
							jq(element).closest('.input-field')
									.removeClass('has-error');
						},
						errorElement : 'span',
						errorClass : 'help-block',
						errorPlacement : function(error, element) {
							if (element.parent('.form-control').length) {
								error.insertAfter(element.parent());
							} else {
								error.insertAfter(element);
							}
						}
						
					});
			jq("#subUserDetail1")
			.validate(
					{
						rules : {

							pan : {
								required : true,
								PanNumber : true,
								minlength:10,
								maxlength:10
							},
							adharNumber:{
								required : true,
							},
							accessType: "required",
							mobileNo:{
								required : true,
								phoneno : true
							},
							email:{
								required : true,
								email : true
							},
							alternateEmail:{
								required : true,
								email : true
							},
							area:{
								required : false,
								lettersonly : true
							},
							city:{
								required : false,
								lettersonly : true
							},
							pinCode:{
								required : false,
								number : true,
								minlength:6,
								maxlength:6,
								nowhitespace:true
							}
						},
						messages : {
						
							pan : {
								required : "Please provide 10 digit PAN"
							},
							adharNumber:{
								required : "Please provide a valid name",
							},
							accessType:{
								required : "Please select Access Type"
							},
							mobileNo:{
								required : "Please Enter Phone Number",
								phoneno : "Phone number should be in the format of xxx-xxx-xxxx"
							},
							email:{
								required : "Please provide valid Email",
								email: "email should be xxx@domain.com"	
							},
							alternateEmail:{
								required : "Please provide valid and alternate Email",
								email: "email should be xxx@domain.com"	
							},
							area:{
								required : "",
								lettersonly : "only characters are allowed"
							},
							city:{
								required : "",
								lettersonly : "only characters are allowed"
							},
							pinCode:{
								required : ""
							}
							
						},
						highlight : function(element) {
							jq(element).closest('.input-field')
									.addClass('has-error');
						},
						unhighlight : function(element) {
							jq(element).closest('.input-field')
									.removeClass('has-error');
						},
						errorElement : 'span',
						errorClass : 'help-block',
						errorPlacement : function(error, element) {
							if (element.parent('.form-control').length) {
								error.insertAfter(element.parent());
							} else {
								error.insertAfter(element);
							}
						}
						
					});
			jq("#subUserDetail2")
			.validate(
					{
						rules : {

							pan : {
								required : true,
								PanNumber : true,
								minlength:10,
								maxlength:10
							},
							adharNumber:{
								required : true,
							},
							accessType: "required",
							mobileNo:{
								required : true,
								phoneno : true
							},
							email:{
								required : true,
								email : true
							},
							alternateEmail:{
								required : true,
								email : true
							},
							area:{
								required : false,
								lettersonly : true
							},
							city:{
								required : false,
								lettersonly : true
							},
							pinCode:{
								required : false,
								number : true,
								minlength:6,
								maxlength:6,
								nowhitespace:true
							}
						},
						messages : {
						
							pan : {
								required : "Please provide 10 digit PAN"
							},
							adharNumber:{
								required : "Please provide a valid name",
							},
							accessType:{
								required : "Please select Access Type"
							},
							mobileNo:{
								required : "Please Enter Phone Number",
								phoneno : "Phone number should be in the format of xxx-xxx-xxxx"
							},
							email:{
								required : "Please provide valid Email",
								email: "email should be xxx@domain.com"	
							},
							alternateEmail:{
								required : "Please provide valid and alternate Email",
								email: "email should be xxx@domain.com"	
							},
							area:{
								required : "",
								lettersonly : "only characters are allowed"
							},
							city:{
								required : "",
								lettersonly : "only characters are allowed"
							},
							pinCode:{
								required : ""
							}
						},
						highlight : function(element) {
							jq(element).closest('.input-field')
									.addClass('has-error');
						},
						unhighlight : function(element) {
							jq(element).closest('.input-field')
									.removeClass('has-error');
						},
						errorElement : 'span',
						errorClass : 'help-block',
						errorPlacement : function(error, element) {
							if (element.parent('.form-control').length) {
								error.insertAfter(element.parent());
							} else {
								error.insertAfter(element);
							}
						}
						
					});
			jq("#subUserDetail3")
			.validate(
					{
						rules : {

							pan : {
								required : true,
								PanNumber : true,
								minlength:10,
								maxlength:10
							},
							adharNumber:{
								required : true,
							},
							accessType: "required",
							mobileNo:{
								required : true,
								phoneno : true
							},
							email:{
								required : true,
								email : true
							},
							alternateEmail:{
								required : true,
								email : true
							},
							area:{
								required : false,
								lettersonly : true
							},
							city:{
								required : false,
								lettersonly : true
							},
							pinCode:{
								required : false,
								number : true,
								minlength:6,
								maxlength:6,
								nowhitespace:true
							}
						},
						messages : {
						
							pan : {
								required : "Please provide 10 digit PAN"
							},
							adharNumber:{
								required : "Please provide a valid name",
							},
							accessType:{
								required : "Please select Access Type"
							},
							mobileNo:{
								required : "Please Enter Phone Number",
								phoneno : "Phone number should be in the format of xxx-xxx-xxxx"
							},
							email:{
								required : "Please provide valid Email",
								email: "email should be xxx@domain.com"	
							},
							alternateEmail:{
								required : "Please provide valid and alternate Email",
								email: "email should be xxx@domain.com"	
							},
							area:{
								required : "",
								lettersonly : "only characters are allowed"
							},
							city:{
								required : "",
								lettersonly : "only characters are allowed"
							},
							pinCode:{
								required : ""
							}
						},
						highlight : function(element) {
							jq(element).closest('.input-field')
									.addClass('has-error');
						},
						unhighlight : function(element) {
							jq(element).closest('.input-field')
									.removeClass('has-error');
						},
						errorElement : 'span',
						errorClass : 'help-block',
						errorPlacement : function(error, element) {
							if (element.parent('.form-control').length) {
								error.insertAfter(element.parent());
							} else {
								error.insertAfter(element);
							}
						}
						
					});
			jq("#subUserDetail4")
			.validate(
					{
						rules : {

							pan : {
								required : true,
								PanNumber : true,
								minlength:10,
								maxlength:10
							},
							adharNumber:{
								required : true,
							},
							accessType: "required",
							mobileNo:{
								required : true,
								phoneno : true
							},
							email:{
								required : true,
								email : true
							},
							alternateEmail:{
								required : true,
								email : true
							},
							area:{
								required : false,
								lettersonly : true
							},
							city:{
								required : false,
								lettersonly : true
							},
							pinCode:{
								required : false,
								number : true,
								minlength:6,
								maxlength:6,
								nowhitespace:true
							}
						},
						messages : {
						
							pan : {
								required : "Please provide 10 digit PAN"
							},
							adharNumber:{
								required : "Please provide a valid name",
							},
							accessType:{
								required : "Please select Access Type"
							},
							mobileNo:{
								required : "Please Enter Phone Number",
								phoneno : "Phone number should be in the format of xxx-xxx-xxxx"
							},
							email:{
								required : "Please provide valid Email",
								email: "email should be xxx@domain.com"	
							},
							alternateEmail:{
								required : "Please provide valid and alternate Email",
								email: "email should be xxx@domain.com"	
							},
							area:{
								required : "",
								lettersonly : "only characters are allowed"
							},
							city:{
								required : "",
								lettersonly : "only characters are allowed"
							},
							pinCode:{
								required : ""
							}
						},
						highlight : function(element) {
							jq(element).closest('.input-field')
									.addClass('has-error');
						},
						unhighlight : function(element) {
							jq(element).closest('.input-field')
									.removeClass('has-error');
						},
						errorElement : 'span',
						errorClass : 'help-block',
						errorPlacement : function(error, element) {
							if (element.parent('.form-control').length) {
								error.insertAfter(element.parent());
							} else {
								error.insertAfter(element);
							}
						}
						
					});
			jq("#subUserDetail5")
			.validate(
					{
						rules : {

							pan : {
								required : true,
								PanNumber : true,
								minlength:10,
								maxlength:10
							},
							adharNumber:{
								required : true,
							},
							accessType: "required",
							mobileNo:{
								required : true,
								phoneno : true
							},
							email:{
								required : true,
								email : true
							},
							alternateEmail:{
								required : true,
								email : true
							},
							area:{
								required : false,
								lettersonly : true
							},
							city:{
								required : false,
								lettersonly : true
							},
							pinCode:{
								required : false,
								number : true,
								minlength:6,
								maxlength:6,
								nowhitespace:true
							}
						},
						messages : {
						
							pan : {
								required : "Please provide 10 digit PAN"
							},
							adharNumber:{
								required : "Please provide a valid name",
							},
							accessType:{
								required : "Please select Access Type"
							},
							mobileNo:{
								required : "Please Enter Phone Number",
								phoneno : "Phone number should be in the format of xxx-xxx-xxxx"
							},
							email:{
								required : "Please provide valid Email",
								email: "email should be xxx@domain.com"	
							},
							alternateEmail:{
								required : "Please provide valid and alternate Email",
								email: "email should be xxx@domain.com"	
							},
							area:{
								required : "",
								lettersonly : "only characters are allowed"
							},
							city:{
								required : "",
								lettersonly : "only characters are allowed"
							},
							pinCode:{
								required : ""
							}
						},
						highlight : function(element) {
							jq(element).closest('.input-field')
									.addClass('has-error');
						},
						unhighlight : function(element) {
							jq(element).closest('.input-field')
									.removeClass('has-error');
						},
						errorElement : 'span',
						errorClass : 'help-block',
						errorPlacement : function(error, element) {
							if (element.parent('.form-control').length) {
								error.insertAfter(element.parent());
							} else {
								error.insertAfter(element);
							}
						}
					});
			
			
			jq("#sfDetailedInfoCollapse")
			.validate({
				rules:
					{
					personPan: {
						required : true,
						PanNumber : true,
						minlength:10,
						maxlength:10
					}
					}
				
			});
			
			jq("#subUserDetail6")
			.validate(
					{
						rules : {

							pan : {
								required : true,
								PanNumber : true,
								minlength:10,
								maxlength:10
							},
							adharNumber:{
								required : true,
							},
							accessType: "required",
							mobileNo:{
								required : true,
								phoneno : true
							},
							email:{
								required : true,
								email : true
							},
							alternateEmail:{
								required : true,
								email : true
							},
							area:{
								required : false,
								lettersonly : true
							},
							city:{
								required : false,
								lettersonly : true
							},
							pinCode:{
								required : false,
								number : true,
								minlength:6,
								maxlength:6,
								nowhitespace:true
							}
						},
						messages : {
						
							pan : {
								required : "Please provide 10 digit PAN"
							},
							adharNumber:{
								required : "Please provide a valid name",
							},
							accessType:{
								required : "Please select Access Type"
							},
							mobileNo:{
								required : "Please Enter Phone Number",
								phoneno : "Phone number should be in the format of xxx-xxx-xxxx"
							},
							email:{
								required : "Please provide valid Email",
								email: "email should be xxx@domain.com"	
							},
							alternateEmail:{
								required : "Please provide valid and alternate Email",
								email: "email should be xxx@domain.com"	
							},
							area:{
								required : "",
								lettersonly : "only characters are allowed"
							},
							city:{
								required : "",
								lettersonly : "only characters are allowed"
							},
							pinCode:{
								required : ""
							}
						},
						highlight : function(element) {
							jq(element).closest('.input-field')
									.addClass('has-error');
						},
						unhighlight : function(element) {
							jq(element).closest('.input-field')
									.removeClass('has-error');
						},
						errorElement : 'span',
						errorClass : 'help-block',
						errorPlacement : function(error, element) {
							if (element.parent('.form-control').length) {
								error.insertAfter(element.parent());
							} else {
								error.insertAfter(element);
							}
						}
						
					});

		}
	}

	//when the dom has loaded setup form validation rules
	jq(D).ready(function(jq) {
		JQUERY4U.UTIL.setupFormValidation();
	});

})(jQuery, window, document);
