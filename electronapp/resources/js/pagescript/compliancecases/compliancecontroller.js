var ComplianceCaseIds=[];
jq(document).ajaxStart(function(){
		 jq("#wait").css("display","block");
	});

jq(document).ajaxComplete(function(event,xhr,options) {
		setTimeout(function(){jq("#wait").css("display","none")},150);
})
jq(document)
		.ready(
				function() {
					ComplianceController = {};
					var validationerrorList;
					
					var AjaxHandler = new AjaxHandle();
					var globalContainer = compliancecommon.GLOBAL_CONTAINER;
					contextRoot = compliancecommon.CONTEXT_ROOT;
					ComplianceController.getTaxPayerCases = function() {
						var GET_TAX_PAYER_CASE_LIST_URL = complianceurls.GET_TAX_PAYER_CASE_LIST_URL;
						var dataTosend = {};
						var taxPayerCaseList = ComplianceController.getURL(
								contextRoot, GET_TAX_PAYER_CASE_LIST_URL);
						var caseList = ComplianceController.getCasesModel(
								taxPayerCaseList, dataTosend, token, header);
						sessionStorage.clear;
						sessionStorage['panNo'] = useridName;
						var caseSearchResponse = caseList.complianceviewCaseListDisplay;
						if (caseSearchResponse.length > 0) {
							jq(".caselistcontainer").show();
							jq(".nocompliancerecord").remove();
							jq("#loggedInPAN").hide();
							var useridName = caseSearchResponse[0].caseMainEntity;
							jq("#userNameId").find("span.userNameId").text(
									useridName);
							ComplianceController.bindModelToGridView(
									caseSearchResponse,
									compliancetable.CASE_SEARCH_TABLE);
						} else {
							jq("#loggedInPAN").show();
							if (jq(
									"."
											+ compliancepagecontainers.CASE_SEARCH_PAGE_CONTAINER)
									.find(".nocompliancerecord").length <= 0) {
								jq(
										"."
												+ compliancepagecontainers.CASE_SEARCH_PAGE_CONTAINER)
										.append(
												"<div class='nocompliancerecord'>"
														+ miscmessages.NO_COMPLIANCE_RECORD
														+ "</div>");
							}
							jq(".caselistcontainer").hide();
						}
						var targetpages = [];
						targetpages
								.push(compliancepagecontainers.CASE_SEARCH_PAGE_CONTAINER)
						ComplianceController.pageNavigate(globalContainer,
								targetpages);
					}

					ComplianceController.getDownloadDocuments = function(
							responseId) {
						var GET_DOWNLOAD_DOCUMENTS_URL = complianceurls.GET_DOWNLOAD_DOCUMENTS_URL;
						var GET_RELATED_INFO_ADDITIONAL_INFO_DOCUMENTS_URL = complianceurls.GET_RELATED_INFO_ADDITIONAL_INFO_DOCUMENTS_URL
						var downloadDocumentUrl = ComplianceController.getURL(
								contextRoot, GET_DOWNLOAD_DOCUMENTS_URL);
						var relatedInfoAdditionalInfodownloadDocumentUrl = ComplianceController
								.getURL(contextRoot,
										GET_RELATED_INFO_ADDITIONAL_INFO_DOCUMENTS_URL);
						var dataTosend = {};
						dataTosend.responseId = parseInt(responseId);
						if (jq(
								"#"
										+ complianceformids.ADDITIONAL_INFO_UPLOAD_PAGE)
								.attr("title") == "issueadditionalinfo") {
							var downloaddocumentList = ComplianceController
									.getCasesModel(downloadDocumentUrl,
											dataTosend, token, header);
							var downloaddocumentArray = downloaddocumentList.complianceviewAddlInfoDocResponse;
							jq(
									"#"
											+ compliancepagecontainers.DOWNLOAD_MODAL_POPUP_ID)
									.attr("title", "additionInfoPopUp")
							jq("#listOfDownloadDocs").children().remove();
							for (i = 0; i < downloaddocumentArray.length; i++) {
								jq("#listOfDownloadDocs")
										.append(
												"<a class='downloadFile' href='javascript:void(0)' onclick=ComplianceController.DownloadFile("
														+ downloaddocumentArray[i].docId
														+ ")>"
														+ downloaddocumentArray[i].docName
														+ "</a>");
							}
						}
						if (jq(
								"#"
										+ complianceformids.ADDITIONAL_INFO_UPLOAD_PAGE)
								.attr("title") == "issuerelatedInfoadditionalinfo") {
							var relatedInfoAdditionInfodownloaddocumentList = ComplianceController
									.getCasesModel(
											relatedInfoAdditionalInfodownloadDocumentUrl,
											dataTosend, token, header);
							var relatedInfoAdditionalInfodownloaddocumentArray = relatedInfoAdditionInfodownloaddocumentList.complianceviewRelInfoAddlInfoDocResponse;
							jq(
									"#"
											+ compliancepagecontainers.DOWNLOAD_MODAL_POPUP_ID)
									.attr("title",
											"relatedInfoAdditionInfoPopUp")
							jq("#listOfDownloadDocs").children().remove();
							for (i = 0; i < relatedInfoAdditionalInfodownloaddocumentArray.length; i++) {
								jq("#listOfDownloadDocs")
										.append(
												"<a class='downloadFile' href='javascript:void(0)' onclick=ComplianceController.DownloadFile("
														+ relatedInfoAdditionalInfodownloaddocumentArray[i].docId
														+ ")>"
														+ relatedInfoAdditionalInfodownloaddocumentArray[i].docName
														+ "</a>");
							}
						}

					}

					ComplianceController.DownloadFile = function(docId) {
						var GET_DOWNLOAD_FILE_URL = complianceurls.GET_DOWNLOAD_FILE_URL;
						var RELATED_INFO_ADDITION_INFO_DOCUMENT_URL = complianceurls.RELATED_INFO_ADDITION_INFO_DOCUMENT_URL;
						var dataTosend = {};
						dataTosend.docId = parseInt(docId);
						if (jq(
								"#"
										+ compliancepagecontainers.DOWNLOAD_MODAL_POPUP_ID)
								.attr("title") == "additionInfoPopUp") {
							var getDocument = ComplianceController
									.getCasesFile(GET_DOWNLOAD_FILE_URL,
											dataTosend, token, header);
						}

						if (jq(
								"#"
										+ compliancepagecontainers.DOWNLOAD_MODAL_POPUP_ID)
								.attr("title") == "relatedInfoAdditionInfoPopUp") {
							var getDocument = ComplianceController
									.getCasesFile(
											RELATED_INFO_ADDITION_INFO_DOCUMENT_URL,
											dataTosend, token, header);
						}
					}
					
					ComplianceController.getCaseDetails = function(caseid,caseSeqId,isrelatedcase,casestatus) {						
						if(isrelatedcase)
						{
							var GET_TAX_PAYER_VERIFICATION_ISSUES_URL=complianceurls.GET_RELATED_CASE_INFO_URL;
							
						}
						else
						{
							var GET_TAX_PAYER_VERIFICATION_ISSUES_URL = complianceurls.GET_TAX_PAYER_VERIFICATION_ISSUES_URL;
							
						}
						
						
						var CASE_DETAILS_FILTER_FORM_ID = complianceformids.CASE_DETAILS_FILTER_FORM_ID;
						var FORM_ELEMENT_CLASS = complianceformelementclasses.FORM_ELEMENT_CLASS;
						var CASE_RESPONSE_FORM_ID = complianceformids.CASE_RESPONSE_FORM_ID;
						var CASE_RESPONSE_ELEMENT_CLASS = complianceformelementclasses.CASE_RESPONSE_ELEMENT_CLASS;
						var dataTosend = {};
						dataTosend.caseId = caseid;
						dataTosend.caseSeqId=caseSeqId;
						dataTosend.activityAtLevel='CS';
						var taxPayerCaseDetails = ComplianceController.getURL(
								contextRoot,
								GET_TAX_PAYER_VERIFICATION_ISSUES_URL);
						var caseDetails = ComplianceController.getCasesModel(
								taxPayerCaseDetails, dataTosend, token, header);
						
						if(caseDetails==null) {
							alert(alerts.NO_INFORAMTION_AVAILABLE);
							return;
						}
						
						var caseDetailsVerificationList = caseDetails.complianceviewVerificationList;
						var caseDetailsFilters = caseDetails.complianceviewCaseDetailDisplay;
						var queryList=caseDetails.complianceviewAdditionalQueryList;
						var caseDetailsAdditionalInfoSummaryView=caseDetails.complianceviewAdditionalInfoSummaryView;
						
						var caseResponseList = caseDetails.complianceviewCasePrelimResp;
						var prelimresponsesubmitbutton;
					
						ComplianceCaseIds.push({"caseid":caseid,"caseSeqId":caseSeqId});
						jq('#'+complianceid.COMPLIANCE_VERIF_BACK_BTN).attr('onClick','ComplianceController.getComplianceVerifDetailBackButton('+isrelatedcase+')');	
						
					
					if (ComplianceControllerInfo.getValueForParam(caseDetails.complianceviewRelatedCaseListDisplay,'str')!='') {
							jq(
									"."
											+ compliancepagecontainers.RELATED_CASE_LIST_CONTAINER)
									.show();
							ComplianceController
									.bindModelToGridView(
											caseDetails.complianceviewRelatedCaseListDisplay,
											compliancetable.RELATED_CASE_LIST_TABLE);
						} else {
							jq(
									"."
											+ compliancepagecontainers.RELATED_CASE_LIST_CONTAINER)
									.hide();
						}
					
						if (ComplianceControllerInfo.getValueForParam(caseDetailsFilters[0].enablePvFlag,'bool')) {
							jq(
									"."
											+ compliancepagecontainers.PRELIMINARY_RESPONSE_DETAIL)
									.show();
						} else {
							jq("."+ compliancepagecontainers.PRELIMINARY_RESPONSE_DETAIL).hide();
						}
						
						for (i = 0; i < caseResponseList.length; i++) {
							prelimresponsesubmitbutton = caseResponseList[i].resTypeIdEmpty;
						}

						ComplianceController
								.bindModelToForm(caseDetailsFilters,
										CASE_DETAILS_FILTER_FORM_ID,
										FORM_ELEMENT_CLASS);
						
						
						
						
						var panNo = jq("#pan").text();
						/*if (panNo.charAt(3) == "C" || panNo.charAt(3) == "F"
								|| panNo.charAt(3) == "c"
								|| panNo.charAt(3) == "f") {
							jq("#respReasonId").empty();
							jq("#respReasonId")
									.append(
											"<option value=''>"
													+ miscmessages.SELECT_REASON
													+ "</option><option value='RP'>"
													+ miscmessages.RETURN_UNDER_PREPARATION
													+ "</option>");
						} else {*/
							jq("#respReasonId").empty();
							jq("#respReasonId")
									.append(
											"<option value=''>"
													+ miscmessages.SELECT_REASON
													+ "</option><option value='RP'>"
													+ miscmessages.RETURN_UNDER_PREPARATION
													+ "</option><option value='NL'>"
													+ miscmessages.NOT_LIABLE_TO_FILE_RETURN
													+ "</option>");
						//}
						ComplianceController.bindModelToForm(caseResponseList,
								CASE_RESPONSE_FORM_ID,
								CASE_RESPONSE_ELEMENT_CLASS);
						if (prelimresponsesubmitbutton == false) {
							var responseLength = caseResponseList.length;
							if (jq("#respTypeId").val() == "FL") {
								jq(
										"#"
												+ complianceformids.CASE_RESPONSE_FORM_ID)
										.find("#respReasonId").attr("disabled",
												true);
								jq(
										"#"
												+ complianceformids.CASE_RESPONSE_FORM_ID)
										.find(
												"#filingDate,#respModeId,#itrAckNo")
										.attr("disabled", false);
								if (jq("#respModeId").val() == "PF") {
									jq("#circleWardCity").attr("disabled",
											false)
								} else {
									jq("#circleWardCity")
											.attr("disabled", true)
								}
							} else if (jq("#respTypeId").val() == "NF") {
								jq(
										"#"
												+ complianceformids.CASE_RESPONSE_FORM_ID)
										.find(
												"#filingDate,#respModeId,#itrAckNo")
										.attr("disabled", true);
								jq(
										"#"
												+ complianceformids.CASE_RESPONSE_FORM_ID)
										.find("#respReasonId,#respremarks")
										.attr("disabled", false);
							}
							jq("."+ compliancepagecontainers.CASE_RESPONSE_SUBMIT_BTN_CONTAINER).show();
						}

						
						 
						jq("."+ compliancepagecontainers.VERIFICATION_ISSUES_CONTAINER).show();
						document.getElementById('addlnReqItd').style.display = 'none';
						document.getElementById('addlnPenTaxpayer').style.display = 'none';
						//ComplianceController.CreatequeryRequestVerfiDetailHyperLink(caseDetailsFilters[0].caseSeqId);
						if(ComplianceControllerInfo.getValueForParam(caseDetailsAdditionalInfoSummaryView,'array')!=0){
								document.getElementById('addlnReqItdValue').innerHTML=caseDetailsAdditionalInfoSummaryView.activityCount;
								document.getElementById('addlnPenTaxpayerValue').innerHTML=caseDetailsAdditionalInfoSummaryView.pendingActivityCount;
						}
						 
						ComplianceController.bindModelToGridView(caseDetailsVerificationList,compliancetable.VERIFICATION_ISSUES_TABLE);
						ComplianceController.bindModelToGridView(queryList,compliancetable.ADDITIONAL_QUERIES_TABLE); 
						
						
						
						/*if(caseTypeId == "12")
						{
							document.getElementById('addlnReqItd').style.display = '';
							//document.getElementById('addlnPenTaxpayer').style.display = '';
							if(caseDetailsAdditionalInfoSummaryView!==null){
								document.getElementById('addlnReqItdValue').innerHTML=caseDetailsAdditionalInfoSummaryView.activityCount;
								document.getElementById('addlnPenTaxpayerValue').innerHTML=caseDetailsAdditionalInfoSummaryView.pendingActivityCount;
							}
						
							jq("#verificationIssuesTable").hideCol('addnInfoReqCount');
							jq("#verificationIssuesTable").hideCol('addnInfoPendCount');
							
							ComplianceController.CreatequeryRequestVerfiDetailHyperLink(caseDetailsFilters[0].caseSeqId);
							
							ComplianceController.bindModelToGridView(
									caseDetailsVerificationList,compliancetable.VERIFICATION_ISSUES_TABLE_INCOMPLETE);
						}
						else {
							//document.getElementById('addlnReqItd').style.display = 'none';
							//document.getElementById('addlnPenTaxpayer').style.display = 'none';
	
							jq("#verificationIssuesTable").showCol('addnInfoReqCount');
							jq("#verificationIssuesTable").showCol('addnInfoPendCount');
							ComplianceController.bindModelToGridView(
									caseDetailsVerificationList,
									compliancetable.VERIFICATION_ISSUES_TABLE);
						}
						*/
						
						
						var targetpages = [];
						targetpages
								.push(compliancepagecontainers.CASE_DETAILS_PAGE_CONTAINER);
						targetpages.push(compliancepagecontainers.ADDITIONAL_QUERIES_CONTAINER);
						ComplianceController.pageNavigate(globalContainer,
								targetpages);
						jq("#caseclosedassyear").text(jq("#assmntYear").text());
						if(casestatus == "I")
						{
							for(i=0;i<compliancesubmitbtns.length;i++)
							{
								jq("#"+compliancesubmitbtns[i]).addClass("inactivecase");
							}
							jq(".disabledsubmitbtninfodiv").show();
						}
						else
						{
							for(i=0;i<compliancesubmitbtns.length;i++)
							{
								jq("#"+compliancesubmitbtns[i]).removeClass("inactivecase");
							}
							jq(".disabledsubmitbtninfodiv").hide();
						}
					}
					
					ComplianceController.CreatequeryRequestVerfiDetailHyperLink = function(caseSeqId) {
						var anchorElement = document.createElement('a');
						
						anchorElement.innerHTML = "Click here for Details";
						anchorElement.setAttribute("onclick","javascript:ComplianceControllerInfo.getRequestedVerfiDetails('"+ caseSeqId + "')");
						anchorElement.setAttribute("data-toggle","modal");
						anchorElement.setAttribute("class","submitViewClass");
						anchorElement.setAttribute("data-target","#"+complianceformids.QUERY_REQUEST_VERFI_DETAIL_MODAL_POPUP);
						anchorElement.setAttribute("style","color: #333;text-decoration: underline;pointer:cursor;");
						jq('#addlnReqItdValue').nextAll().remove();
						jq(anchorElement.outerHTML.toString()).insertAfter('#addlnReqItdValue');
						//jq(anchorElement).attr("class","issueadditionalinfo submitViewClass");
					
					}

					ComplianceController.getComplianceVerifDetailBackButton=function(isrelatedcase){
						if(ComplianceCaseIds.length<2){
							ComplianceCaseIds.pop();
							goBack();
						}
						else {
							ComplianceCaseIds.pop();
							var id=ComplianceCaseIds.pop();
							ComplianceController.getCaseDetails(id.caseid,id.caseSeqId,isrelatedcase);	
							
						}
						
					}
					
					ComplianceController.getVerificationIssueDetails = function(
							verifid,caseTypeId,issueId,verifSeqId) {						
						var GET_VERIF_ISSUES_DETAILS_URL = complianceurls.GET_VERIF_ISSUES_DETAILS_URL;
						var GET_OTHER_RELATED_INFO_CODE_URL = complianceurls.GET_OTHER_RELATED_INFO_CODE_URL;
						var GET_OTHER_RELATED_INFO_CODE_FORM_ID = complianceformids.GET_OTHER_RELATED_INFO_CODE_FORM_ID;
						var GET_OTHER_RELATED_INFO_CODE_FORM_ELEMENT_CLASS = complianceformelementclasses.GET_OTHER_RELATED_INFO_CODE_FORM_ELEMENT_CLASS; 
						var VERIF_ISSUE_DETAILS_FILTER_FORM_ID = complianceformids.VERIF_ISSUE_DETAILS_FILTER_FORM_ID;
						var VERIF_ISSUE_DETAILS_FORM_ELEMENT_CLASS = complianceformelementclasses.VERIF_ISSUE_DETAILS_FORM_ELEMENT_CLASS;
						var dataTosend = {};
						var otherrelatedInfodatatoSend={};
						otherrelatedInfodatatoSend.issueId=issueId;
						otherrelatedInfodatatoSend.caseTypeId=caseTypeId;
						dataTosend.verifId = verifid;
						dataTosend.verifSeqId=verifSeqId;
						dataTosend.activityAtLevel='IS';
						var verfiIssueDetailsURL = ComplianceController.getURL(
								contextRoot, GET_VERIF_ISSUES_DETAILS_URL);
						var verifIssueDetails = ComplianceController
								.getCasesModel(verfiIssueDetailsURL,
										dataTosend, token, header);
						var otherrelatedinfocodedetils=ComplianceController.getCasesModel(GET_OTHER_RELATED_INFO_CODE_URL,otherrelatedInfodatatoSend, token, header);
						if(otherrelatedinfocodedetils != null )
						{
							var otherrelatedinfocodedetilsArray=[];
							otherrelatedinfocodedetilsArray.push(otherrelatedinfocodedetils);
							ComplianceController.bindModelToForm(otherrelatedinfocodedetilsArray,GET_OTHER_RELATED_INFO_CODE_FORM_ID,GET_OTHER_RELATED_INFO_CODE_FORM_ELEMENT_CLASS);
							jq('.OtherInfoandEarlierContainer').show();
							jq(".otherRelatedInfoContainer").show();
						}
						else
						{
							jq('.OtherInfoandEarlierContainer').hide();
							jq(".otherRelatedInfoContainer").hide();
						}	
						var relatedInfoList = verifIssueDetails.complianceviewVerifRelInfoList;
						var additionalInfoList = verifIssueDetails.complianceviewVerifAddlInfoList;
						var verifIssueDetailsFilters = verifIssueDetails.complianceviewVerifDetailDisplay;
						var complianceviewVerifVolInfoList=verifIssueDetails.complianceviewVerifVolInfoList;
						var complianceviewAdditionalQueryList=verifIssueDetails.complianceviewAdditionalQueryList;
						//ComplianceControllerInfo.CreateRelatedEarlierInfoViewGridHyperLink(verifid,ComplianceControllerInfo.getValueForParam(relatedInfoList,'array')!=0?relatedInfoList[0].caseSeqId:0);
						jq("#rowcaseTypeId").text(verifIssueDetailsFilters[0].caseTypeId);
						
						jq("."+compliancepagecontainers.EARLIER_INFO_LIST_CONTAINER).show();
						ComplianceControllerInfo.viewRelatedEarlierInfoTable(verifid,verifIssueDetailsFilters[0].verifCaseId);
						
						
						ComplianceController.bindModelToForm(verifIssueDetailsFilters,VERIF_ISSUE_DETAILS_FILTER_FORM_ID,VERIF_ISSUE_DETAILS_FORM_ELEMENT_CLASS);
						//document.getElementById("additionalQueriesTable").setAttribute("id","tableid");Â 
						ComplianceController.bindModelToGridView(complianceviewAdditionalQueryList,compliancetable.ISSUE_ADDITIONAL_QUERIES_TABLE); 
						
						jq('#goBackToVerificationIssueDetails').removeAttr('onclick').attr('onclick','javascript:ComplianceController.getVerificationIssueDetails("'+verifid+'","'+caseTypeId+'","'+issueId+'","'+verifSeqId+'")')
						
						if(ComplianceControllerInfo.getValueForParam(relatedInfoList,'array')==0 )
						{
							jq(".relatedInfoTableContainer").hide();
							if(jq("#relatedInfoCollapse").find(".nodataavailable").length <= 0)
							{
								jq("#relatedInfoCollapse").append("<div class='nodataavailable'>"+ miscmessages.NO_DATA_AVAILABLE+ "</div>");
							}	
						}
						else
						{
							jq("#relatedInfoCollapse").find(".nodataavailable").remove();
							jq(".relatedInfoTableContainer").show();
							ComplianceController.bindModelToGridView(relatedInfoList,compliancetable.RELATED_INFO_TABLE);
						}
						
						if(additionalInfoList.length <= 0)
						{
							jq(".additionalInfoTableContainer").hide();
							if(jq("#additionalInfoCollapse").find(".nodataavailable").length <= 0)
							{
								jq("#additionalInfoCollapse").append("<div class='nodataavailable'>"+ miscmessages.NO_DATA_AVAILABLE+ "</div>");
							}	
						}
						else
						{
							jq("#additionalInfoCollapse").find(".nodataavailable").remove();
							jq(".additionalInfoTableContainer").show();
							ComplianceController.bindModelToGridView(additionalInfoList,compliancetable.ADDITIONAL_INFO_TABLE);
						}
						if(complianceviewVerifVolInfoList.length <= 0 )
						{	
							jq("."+compliancepagecontainers.VOLUN_DISCLOSED_INFO_LIST_CONTAINER).hide();
							 
							 
							if(jq("#voluntarilyDisclosedInfoCollapse").find(".nodataavailable").length <= 0)
							{
								jq("#voluntarilyDisclosedInfoCollapse").append("<div class='nodataavailable'>"+ miscmessages.NO_DATA_AVAILABLE+ "</div>");
							}
						}
						else
						{
							jq("."+compliancepagecontainers.VOLUN_DISCLOSED_INFO_LIST_CONTAINER).show();
							jq("#voluntarilyDisclosedInfoCollapse").find(".nodataavailable").remove();
							 
							ComplianceController.bindModelToGridView(complianceviewVerifVolInfoList,compliancetable.VOLUNTARILY_DISCLOSED_INFO_TABLE);
						}
						var targetpages = [];
						targetpages
								.push(compliancepagecontainers.ISSUE_ADDITIONAL_QUERIES_CONTAINER,
										compliancepagecontainers.VERIF_ISSUE_DETAILS_PAGE_CONTAINER,
										compliancepagecontainers.VERIFICATION_ISSUE_FILTER,compliancepagecontainers.ISSUE_ADDITIONAL_QUERIES_CONTAINER);
						jq(".errorMsgContainer,.successMsgContainer").empty().hide();
						ComplianceController.pageNavigate(globalContainer,
								targetpages);
					}

					ComplianceController.getAdditionalInfoDetails = function(
							infoReqid) {
						var GET_ADD_INFO_DETAILS_URL = complianceurls.GET_ADD_INFO_DETAILS_URL;
						var dataTosend = {};
						dataTosend.infoReqId = infoReqid;
						var ADD_INFO_UPLOAD_FORM_FORM_ID = complianceformids.ADD_INFO_UPLOAD_FORM_FORM_ID;
						var ADD_INFO_UPLOAD_FORM_ELEMENT_CLASS = complianceformelementclasses.ADD_INFO_UPLOAD_FORM_ELEMENT_CLASS;
						var addInfoDetailsURL = ComplianceController.getURL(
								contextRoot, GET_ADD_INFO_DETAILS_URL);
						var addInfoDetails = ComplianceController
								.getCasesModel(addInfoDetailsURL, dataTosend,
										token, header);
						var additionalInfoDocUpload = addInfoDetails.complianceviewAddlInfoDocUploadView;
						ComplianceController.bindModelToForm(
								additionalInfoDocUpload,
								ADD_INFO_UPLOAD_FORM_FORM_ID,
								ADD_INFO_UPLOAD_FORM_ELEMENT_CLASS);
						jq("#" + complianceformids.ADDITIONAL_INFO_UPLOAD_PAGE)
								.attr("title", "issueadditionalinfo");
						var targetpages = [];
						targetpages
								.push(compliancepagecontainers.ADD_INFO_DETAILS_PAGE_CONTAINER);
						ComplianceController.pageNavigate(globalContainer,
								targetpages);

					}

					ComplianceController.getDetailedRelatedInfoResponse = function(
							tsnId,relInfoId) {
						var dataTosend = {};
						dataTosend.tsnId = tsnId;
						dataTosend.relInfoId= relInfoId;
						dataTosend.verifType = jq("#verifType").text();
						dataTosend.mainRelInfoId = jq("#hiddenRelInfoId").text();
						if (awareChecked) {
							dataTosend.infoAwareFlag = "Y";
							ComplianceController
									.relatedInfoDetailsPageRefresher();
							ComplianceController.detailedResponseProcessor();
						}
						if (notawareChecked) {
							dataTosend.infoAwareFlag = "N";
							ComplianceController.hidepagesectionsprocessor(detailedresponsetypecontainers);
						}
						var awarenotaware_URL = complianceurls.AWARE_NOT_AWARE_URL;						
						var submitawarenotaware = ComplianceController
								.getCasesModel(awarenotaware_URL, dataTosend,
										token, header);						
						if (submitawarenotaware != "" && submitawarenotaware != null) {							
							if(notawareChecked)
							{
							jq("#status").text("Submitted");
							//ComplianceController.relatedInfoStatusUpdator();
							jq('html, body').animate({scrollTop : 0});
							jq(
									"."
											+ compliancepagecontainers.SUCCESS_MESSAGE_CONTAINER)
									.show()
									.append(
											"<div>"
													+ sucessMessages.RESPOSNE_SUCCESS_WITHOUT_TRANSACTION_ID
													+ "</div>");
							setTimeout(
									function() {
										jq(
												"."
														+ compliancepagecontainers.SUCCESS_MESSAGE_CONTAINER)
												.hide().children().remove();
									}, 3000);
							}
							ComplianceController.saveconsolidatedpdfbyteprocessor();
						}
						else
						{	
							jq('html, body').animate({scrollTop : 0});
							ComplianceController.validator(errorMessages.SERVER_RUNTIME_EXCEPTION);
						}
					}

					ComplianceController.relatedInfoDetailsPageRefresher = function() {
						ComplianceController.removeElementsUntilSpecificElement(SFconstantrows);
						ComplianceController.defaultrowspansetter(SFrowspanrowcontainerObject);
						ComplianceController.removeElementsUntilSpecificElement(SFTIconstantrows);
						ComplianceController.defaultrowspansetter(SFTIrowspanrowcontainerObject);
						ComplianceController.removeElementsUntilSpecificElement(TTconstantrows);
						ComplianceController.defaultrowspansetter(TTrowspanrowcontainerObject);
						ComplianceController.removeElementsUntilSpecificElement(TTSPconstantrows);
						ComplianceController.defaultrowspansetter(TTSProwspanrowcontainerObject);
						ComplianceController.removeElementsUntilSpecificElement(TCRconstantrows);
						ComplianceController.defaultrowspansetter(TCRrowspanrowcontainerObject);
						ComplianceController.removeElementsUntilSpecificElement(ERCconstantrows);
						ComplianceController.defaultrowspansetter(ERCrowspanrowcontainerObject);
						ComplianceController.removeElementsUntilSpecificElement(CWBAconstantrows);
						ComplianceController.defaultrowspansetter(CWBArowspanrowcontainerObject);						
						ComplianceController.removeElementsUntilSpecificElement(EISCconstantrows);
						ComplianceController.defaultrowspansetter(EISCrowspanrowcontainerObject);
						for(i=0;i<detailedresponsetypecontainers.length;i++)
						{
							jq("."+detailedresponsetypecontainers[i]).find("input,select").val("");
						}
					}

					ComplianceController.CreateCaseSearchGridHyperLink = function(
							cellvalue, options, rowObject) {
						var anchorElement = document.createElement('a');
						anchorElement
								.setAttribute("href", "javascript:void(0)");
						anchorElement.innerHTML = "View";
						jq(anchorElement).attr("class", "submitViewClass");
						if (typeof rowObject.relCaseId != 'undefined')
						{
							anchorElement.setAttribute("onclick",
									"javascript:ComplianceController.getCaseDetails('"
											+ rowObject.relCaseId +"','"+rowObject.caseSeqId+"',true,'"+rowObject.complianceAction+"')");
						}
						else
						{	
						anchorElement.setAttribute("onclick",
								"javascript:ComplianceController.getCaseDetails('"
										+ rowObject.caseId + "','"+rowObject.caseSeqId+"',false,'"+rowObject.complianceAction+"')");
						}
						var anchorString = anchorElement.outerHTML.toString();
						return anchorString;

					}
					
					ComplianceController.CreateCaseSearchGridDownloadHyperLink = function(
							cellvalue, options, rowObject) {
						var caseId = rowObject.caseId;
						if (typeof rowObject.relCaseId != 'undefined')
							caseId = rowObject.relCaseId;

						var anchorElement = document.createElement('a');
						anchorElement
								.setAttribute("href", "javascript:void(0)");
						anchorElement.innerHTML = "Download PDF";
						jq(anchorElement).attr("class", "submitViewClass");
						anchorElement.setAttribute("onclick",
								"javascript:ComplianceController.DownloadConsolidatedPdf('"
										+ caseId + "','" + rowObject.pan
										+ "','" + rowObject.caseSeqId + "')");
						var anchorString = anchorElement.outerHTML.toString();
						return anchorString;

					}
					
					ComplianceController.DownloadConsolidatedPdf = function(caseId,pan,caseSeqId){
						var GET_CONSOLIDATED_PDF_DOWNLOAD_URL = complianceurls.GET_CONSOLIDATED_PDF_DOWNLOAD_URL;
						var dataTosend = {};
						dataTosend.pan =pan;
						dataTosend.caseId =caseId;
						dataTosend.caseSeqId =caseSeqId;
						var getAdditionalInfoDocument = ComplianceController
								.getCasesFile(GET_CONSOLIDATED_PDF_DOWNLOAD_URL,
										dataTosend, token, header);
					}
					

					ComplianceController.DownloadPopUpHyperLink = function(
							cellvalue, options, rowObject) {
						var anchorElement = document.createElement('a');
						anchorElement.innerHTML = "View";
						jq(anchorElement).attr("class", "submitViewClass");
						anchorElement.setAttribute("onclick",
								"javascript:ComplianceController.getDownloadDocuments('"
										+ rowObject.responseId + "')");
						anchorElement.setAttribute("data-toggle", "modal");
						anchorElement.setAttribute("data-target",
								"#downloadDocListModal");
						jq(anchorElement).css("cursor", "pointer");
						var anchorString = anchorElement.outerHTML.toString();
						return anchorString;

					}

					ComplianceController.CreateDownloadPdfHyperLink = function(
							cellvalue, options, rowObject) {
						var anchorElement = document.createElement('a');
						anchorElement.innerHTML = rowObject.responseId
								+ "<br/>Download Pdf";
						jq(anchorElement).attr("class", "submitViewClass");
						anchorElement.setAttribute("onclick",
								"javascript:ComplianceController.DownloadAdditionalInfoFile('"
										+ rowObject.responseId + "')");
						var anchorString = anchorElement.outerHTML.toString();
						return anchorString;

					}
					
					ComplianceController.AdditionalQuerySubmitHyperLink = function(
							cellvalue, options, rowObject) {
						var anchorElement = document.createElement('a');
						anchorElement
								.setAttribute("href", "javascript:void(0)");
						anchorElement.innerHTML = "Submit";
						jq(anchorElement).attr("class", "submitViewClass");
						anchorElement.setAttribute("onclick",
								"javascript:ComplianceController.getQueryDetails()");
						var anchorString = anchorElement.outerHTML.toString();
						return anchorString;

					}
					
					ComplianceController.AdditionalQueryViewHyperLink = function(
							cellvalue, options, rowObject) {
						var anchorElement = document.createElement('a');
						anchorElement
								.setAttribute("href", "javascript:void(0)");
						anchorElement.innerHTML = "View";
						jq(anchorElement).attr("class", "submitViewClass");
						anchorElement.setAttribute("onclick",
								"javascript:ComplianceController.getQueryDetails()");
						var anchorString = anchorElement.outerHTML.toString();
						return anchorString;

					}

					ComplianceController.CreateVerificationIssueDetailHyperLink = function(
							cellvalue, options, rowObject) {
						var anchorElement = document.createElement('a');
						anchorElement
								.setAttribute("href", "javascript:void(0)");
						anchorElement.innerHTML = "View";
						jq(anchorElement).attr("class", "submitViewClass");
						anchorElement.setAttribute("onclick",
								"javascript:ComplianceController.getVerificationIssueDetails('"
										+ rowObject.verifId + "','"
										+ rowObject.caseTypeId + "','"
										+ rowObject.issueId + "','"+rowObject.verifSeqId+"')");
						var anchorString = anchorElement.outerHTML.toString();
						return anchorString;

					}

					ComplianceController.CreateRelatedInfoSubmitGridHyperLink = function(
							cellvalue, options, rowObject) {

						var anchorElement = document.createElement('a');
						anchorElement
								.setAttribute("href", "javascript:void(0)");
						
						 
							if (rowObject.submitFlag == true) {
								anchorElement.innerHTML = "ReSubmit";
							} else {
								anchorElement.innerHTML = "Submit";
							}
							jq(anchorElement).attr("class", "submitViewClass");
							/*anchorElement.setAttribute("onclick",
									"javascript:ComplianceController.get"
											+ rowObject.infoGroup.replace(/ /g, '')
											+ "('" + rowObject.tsn + "','"
											+ rowObject.infoGroup.replace(/ /g, '')
											+ "','" + "Submit" + "')");*/
							
							anchorElement.setAttribute("onclick",
									"javascript:ComplianceController.get"
											+ rowObject.infoGroup.replace(/ /g, '')
											+ "('" + rowObject.tsn + "','"
											+ rowObject.infoGroup.replace(/ /g, '')
											+ "','"+rowObject.relInfoId+"','" + "Submit" + "')");	
						 
						
						var anchorString = anchorElement.outerHTML.toString();
						return anchorString;

					}
					
					ComplianceController.CreateVoluntarilyDisclosedInfoSubmitGridHyperLink = function(
							cellvalue, options, rowObject) {

						var anchorElement = document.createElement('a');
						anchorElement
								.setAttribute("href", "javascript:void(0)");
						if (rowObject.submitFlag == true) {
							anchorElement.innerHTML = "ReSubmit";
						} else {
							anchorElement.innerHTML = "Submit";
						}
						jq(anchorElement).attr("class", "submitViewClass");
						anchorElement.setAttribute("onclick",
								"javascript:ComplianceController.getOtherVoluntarilyDisclosedInfoDetails('" + rowObject.tsn + "','" + rowObject.verifType + "','" + rowObject.relInfoId + "','" + rowObject.infoGroup.replace(/ /g, '') + "','" + "Submit" + "')");
						var anchorString = anchorElement.outerHTML.toString();
						return anchorString;

					}
					
					
					ComplianceController.CreateRelatedInfoRemarkGridHyperLink = function(
							cellvalue, options, rowObject) {

						if (typeof rowObject.revisionType == 'undefined'
								|| rowObject.revisionType == null)
							return "";

						var anchorString = '';

						if (rowObject.revisionType.trim().toLowerCase() == "updated") {
							var anchorElement = document.createElement('a');
							anchorElement.setAttribute("href","javascript:void(0)");
							anchorElement.innerHTML = rowObject.revisionType;
							jq(anchorElement).attr("class", "submitViewClass");
							anchorElement.setAttribute("onclick",
									"javascript:ComplianceController.viewRelatedInfoRevisionTypeTableHistory('"
											+ rowObject.tsn + "','"
											+ rowObject.verifType + "','"
											+ rowObject.infoGroup + "','"
											+ rowObject.infoCode + "')");
							anchorString = anchorElement.outerHTML.toString();
						} else {
							anchorString = rowObject.revisionType;
						}

						return anchorString;

					}								
					
					ComplianceController.CreateRelatedInfoSubmitGridHyperLink = function(
							cellvalue, options, rowObject) {

						var anchorElement = document.createElement('a');
						
						if(ComplianceControllerInfo.getValueForParam(rowObject.infoFlag,"str")=="V2") {
							anchorElement.innerHTML = "----";
						}
						else{
							anchorElement.setAttribute("href", "javascript:void(0)");
							if (rowObject.submitFlag == true) {
								anchorElement.innerHTML = "ReSubmit";
							} else {
								anchorElement.innerHTML = "Submit";
							}
							jq(anchorElement).attr("class", "submitViewClass");
							/*anchorElement.setAttribute("onclick",
									"javascript:ComplianceController.get"
											+ rowObject.infoGroup.replace(/ /g, '')
											+ "('" + rowObject.tsn + "','"
											+ rowObject.infoGroup.replace(/ /g, '')
											+ "','" + "Submit" + "')");*/
							
							
							anchorElement.setAttribute("onclick",
									"javascript:ComplianceController.get"
											+ rowObject.infoGroup.replace(/ /g, '')
											+ "('" + rowObject.tsn + "','"
											+ rowObject.infoGroup.replace(/ /g, '')
											+ "','"+rowObject.relInfoId+"','" + "Submit" + "')");
						}
						
						 
						var anchorString = anchorElement.outerHTML.toString();
						return anchorString;

					}
					

					ComplianceController.CreateRelatedInfoViewGridHyperLink = function(
							cellvalue, options, rowObject) {

						var anchorElement = document.createElement('a');
						anchorElement
								.setAttribute("href", "javascript:void(0)");
						anchorElement.innerHTML = "View";
						jq(anchorElement).attr("class", "submitViewClass");
							
						anchorElement.setAttribute("onclick",
								"javascript:ComplianceController.viewRelatedInfoTableHistory('"
										+ rowObject.tsn + "','"
										+ rowObject.verifType + "','"
										+ rowObject.infoGroup + "','"
										+ rowObject.relInfoId + "','"
										+ rowObject.infoCode + "')");
						var anchorString = anchorElement.outerHTML.toString();
						return anchorString;

					}
					 

					ComplianceController.CreateAdditionalInfoSubmitGridHyperLink = function(
							cellvalue, options, rowObject) {
						var anchorElement = document.createElement('a');
						anchorElement
								.setAttribute("href", "javascript:void(0)");
						anchorElement.innerHTML = "Submit";
						anchorElement.setAttribute("onclick",
								"javascript:ComplianceController.getAdditionalInfoDetails('"
										+ rowObject.infoReqId + "')");
						jq(anchorElement).attr("class",
								"issueadditionalinfo submitViewClass");
						var anchorString = anchorElement.outerHTML.toString();
						return anchorString;

					}

					ComplianceController.CreateAdditionalInfoViewGridHyperLink = function(
							cellvalue, options, rowObject) {
						var anchorElement = document.createElement('a');
						anchorElement
								.setAttribute("href", "javascript:void(0)");
						anchorElement.innerHTML = "View";
						anchorElement.setAttribute("onclick",
								"javascript:ComplianceController.getDownloadDocumentDetails('"
										+ rowObject.infoReqId + "')");
						jq(anchorElement).attr("class",
								"issueadditionalinfo submitViewClass");
						var anchorString = anchorElement.outerHTML.toString();
						return anchorString;

					}

					ComplianceController.bindModelToForm = function(response,
							formparent, formelement) {
						for (i = 0; i < response.length; i++) {
							jq
									.each(
											response[i],
											function(index, value) {
												jq("#" + formparent)
														.find("." + formelement)
														.each(
																function() {
																	if (jq(this)
																			.attr(
																					"id") == index
																			|| jq(this).attr("title") == index || jq(this).attr("dbvalue") == index) {
																		if (jq(
																				this)
																				.is(
																						"input,select")) {
																			jq(
																					this)
																					.val(
																							value);
																		} else {
																			if (jq(
																					this)
																					.hasClass(
																							"formatnumber")) {
																				jq(
																						this)
																						.text(
																								ComplianceController
																										.numberFormatter(value));
																			} else {
																				jq(
																						this)
																						.text(
																								value);
																			}
																		}
																	}
																});
											});
						}

					}
					// TODO: This function to be moved to framework
					ComplianceController.bindModelToGridView = function(
							response, gridTable) {
						jq("#" + gridTable).jqGrid('clearGridData');
						for (var i = 0; i < response.length; i++) {
							jq("#" + gridTable).jqGrid('addRowData', i + 1,
									response[i]);
						}
					}

					ComplianceController.getURL = function(root, pageurl) {
						return root + pageurl;
					}
					// TODO: This function to be moved to framework
					ComplianceController.pageNavigate = function(mainContainer,
							targetpage) {
						for (i = 0; i < targetpage.length; i++) {
							jq(
									"." + mainContainer + ">*:not(."
											+ targetpage[i] + ")").hide();
						}
						for (i = 0; i < targetpage.length; i++) {
							jq("." + targetpage[i]).show();
						}
					}

					// TODO: This function to be moved to framework
					ComplianceController.getCasesModel = function(urlpath,
							requestObject, token, header,specificrequesttype) {
						var ajaxParams = {};
						ajaxParams.urlPath = urlpath;
						ajaxParams.token = token;
						if(specificrequesttype != undefined )
						{
							ajaxParams.requestType = specificrequesttype;
						}
						else
						{	
							ajaxParams.requestType = compliancecommon.REQUEST_TYPE_POST;
						}	
						ajaxParams.header = header;
						ajaxParams.data = JSON.stringify(requestObject);
						AjaxHandler.InitConfig(ajaxParams.urlPath,
								ajaxParams.requestType, null, ajaxParams.data,
								null, ajaxParams.token, ajaxParams.header);
						// Make the Ajax Call
						return AjaxHandler.getResponse();
					}

					// TODO: This function to be moved to framework
					ComplianceController.getCasesFile = function(urlpath,
							requestObject, token, header) {
						var ajaxParams = {};
						ajaxParams.urlPath = urlpath;
						ajaxParams.token = token;
						ajaxParams.requestType = compliancecommon.REQUEST_TYPE_POST;
						ajaxParams.header = header;
						ajaxParams.data = JSON.stringify(requestObject);
						AjaxHandler.InitConfig(ajaxParams.urlPath,
								ajaxParams.requestType, null, ajaxParams.data,
								null, ajaxParams.token, ajaxParams.header);
						// Make the Ajax Call
						
						AjaxHandler.DownloadFile();
					}

					// TODO: This function to be moved to framework
					ComplianceController.getMultipartCasesModel = function(
							urlpath, requestObject, token, header) {
						var ajaxParams = {};
						ajaxParams.urlPath = urlpath;
						ajaxParams.token = token;
						ajaxParams.requestType = compliancecommon.REQUEST_TYPE_POST;
						ajaxParams.header = header;
						ajaxParams.data = requestObject;
						AjaxHandler.InitConfig(ajaxParams.urlPath,
								ajaxParams.requestType, null, ajaxParams.data,
								null, ajaxParams.token, ajaxParams.header);
						// Make the Ajax Call
						return AjaxHandler.MakeMultipartGetResponse();
					}

					ComplianceController.getINFD = function(
							tsnId, infogroup,relInfoId, action) {
						var GET_RELATEDINFORMATION_DETAILS_URL = complianceurls.GET_RELATEDINFORMATION_INFORMATION_DETAILS_URL;
						var RELATED_INFO_DETAILS = complianceformids.RELATED_INFO_DETAILS;
						var RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS = complianceformelementclasses.RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS;
						var RELATED_INFO_DETAILS_PAGE_CONTAINER = compliancepagecontainers.RELATED_INFO_DETAILS_PAGE_CONTAINER;
						var dataTosend = {};
  						dataTosend.tsnId = tsnId; 
  						dataTosend.relInfoId = relInfoId;
						var relatedInformationDetails = ComplianceController
								.getURL(contextRoot,
										GET_RELATEDINFORMATION_DETAILS_URL);
						var relatedInfoDetails = ComplianceController
								.getCasesModel(relatedInformationDetails,
										dataTosend, token, header);
						var complianceviewRelInfoPropertyView = relatedInfoDetails.complianceviewRelInfoPropertyView;
						var relatedInfoArray = [];
						relatedInfoArray.push(dataTosend);
						ComplianceController.bindModelToForm(relatedInfoArray,
								RELATED_INFO_DETAILS,
								RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS);
						/*var propertyrelatedInfoadditionalInfo = relatedInfoDetails.complianceviewVerifRelInfoAddlInfoList;
						ComplianceController
								.bindModelToGridView(
										propertyrelatedInfoadditionalInfo,
										compliancetable.RELATED_INFO_ADDITIONAL_INFO_LIST_TABLE);*/
						var awareflastatus;
						var roundedamount;
						for (i = 0; i < complianceviewRelInfoPropertyView.length; i++) {
							awareflastatus = complianceviewRelInfoPropertyView[i].infoAwareFlag;
							roundedamount = Math
									.round(complianceviewRelInfoPropertyView[i].amount);
							complianceviewRelInfoPropertyView[i].amount = roundedamount;
						}
						ComplianceController.bindModelToForm(
								complianceviewRelInfoPropertyView,
								RELATED_INFO_DETAILS,
								RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS);
						if (awareflastatus == "Y") {
							jq("#aware").prop("checked", true);
							jq("#notAware").prop("checked", false);
							ComplianceController.detailedResponseProcessor();
						}
						if (awareflastatus == "N") {
							jq("#notAware").prop("checked", true);
							jq("#aware").prop("checked", false);
						}
						if (awareflastatus == "") {
							jq(
									"."
											+ compliancepagecontainers.AWARE_NOT_AWARE_BTN_CONTAINER)
									.show();
						}
						jq(".relatedinfoContainer").show();
						jq(".OtherRelatedinfoContainer").hide();
						var targetpages = [];
						targetpages
								.push(compliancepagecontainers.RELATED_INFO_DETAILS_PAGE_CONTAINER/* ,compliancepagecontainers.VERIFICATION_ISSUE_FILTER */);
						ComplianceController.pageNavigate(globalContainer,
								targetpages);
						jq("." + infogroup).show();
						if (action == "View") {
							ComplianceController
									.SFIMReadOnlyScreenProcessor(true);
						}
					}
					
					ComplianceController.getDMAD  = function(tsnId, infogroup, action) {
						var GET_DMAD_DETAILS_URL = complianceurls.GET_DMAD_DETAILS_URL;
						var RELATED_INFO_DETAILS = complianceformids.RELATED_INFO_DETAILS;
						var RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS = complianceformelementclasses.RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS;
						var RELATED_INFO_DETAILS_PAGE_CONTAINER = compliancepagecontainers.RELATED_INFO_DETAILS_PAGE_CONTAINER;
						var dataTosend = {};
						dataTosend.tsnId = tsnId;
						var relatedInformationDetails = ComplianceController
								.getURL(contextRoot,
										GET_DMAD_DETAILS_URL);
						var relatedInfoDetails = ComplianceController
								.getCasesModel(relatedInformationDetails,
										dataTosend, token, header);
						var complianceviewRelInfoDMADView = relatedInfoDetails.complianceviewRelInfoDMADView;
						var relatedInfoArray = [];
						relatedInfoArray.push(dataTosend);
						ComplianceController.bindModelToForm(relatedInfoArray,
								RELATED_INFO_DETAILS,
								RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS);
						var awareflastatus;
						var roundedamount;
						for (i = 0; i < complianceviewRelInfoDMADView.length; i++) {
							awareflastatus = complianceviewRelInfoDMADView[i].infoAwareFlag;
						}
						ComplianceController.bindModelToForm(
								complianceviewRelInfoDMADView,
								RELATED_INFO_DETAILS,
								RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS);
						if (awareflastatus == "Y") {
							jq("#aware").prop("checked", true);
							jq("#notAware").prop("checked", false);
							ComplianceController.detailedResponseProcessor();
						}
						if (awareflastatus == "N") {
							jq("#notAware").prop("checked", true);
							jq("#aware").prop("checked", false);
						}
						if (awareflastatus == "") {
							jq("."+ compliancepagecontainers.AWARE_NOT_AWARE_BTN_CONTAINER).show();
						}
						jq(".relatedinfoContainer").show();
						jq(".OtherRelatedinfoContainer").hide();
						var targetpages = [];
						targetpages.push(compliancepagecontainers.RELATED_INFO_DETAILS_PAGE_CONTAINER/* ,compliancepagecontainers.VERIFICATION_ISSUE_FILTER */);
						ComplianceController.pageNavigate(globalContainer,targetpages);
						jq("." + infogroup).show();
						if (action == "View") {
							ComplianceController.SFIMReadOnlyScreenProcessor(true);
						}
					}
					
					ComplianceController.getBPAD  = function(tsnId, infogroup, action) {
						var GET_BPAD_DETAILS_URL = complianceurls.GET_BPAD_DETAILS_URL;
						var RELATED_INFO_DETAILS = complianceformids.RELATED_INFO_DETAILS;
						var RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS = complianceformelementclasses.RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS;
						var RELATED_INFO_DETAILS_PAGE_CONTAINER = compliancepagecontainers.RELATED_INFO_DETAILS_PAGE_CONTAINER;
						var dataTosend = {};
						dataTosend.tsnId = tsnId;
						var relatedInformationDetails = ComplianceController
								.getURL(contextRoot,
										GET_BPAD_DETAILS_URL);
						var relatedInfoDetails = ComplianceController
								.getCasesModel(relatedInformationDetails,
										dataTosend, token, header);
						var complianceviewRelInfoBPADView = relatedInfoDetails.complianceviewRelInfoBPADView;
						var relatedInfoArray = [];
						relatedInfoArray.push(dataTosend);
						ComplianceController.bindModelToForm(relatedInfoArray,
								RELATED_INFO_DETAILS,
								RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS);
						var awareflastatus;
						var roundedamount;
						for (i = 0; i < complianceviewRelInfoBPADView.length; i++) {
							awareflastatus = complianceviewRelInfoBPADView[i].infoAwareFlag;
						}
						ComplianceController.bindModelToForm(
								complianceviewRelInfoBPADView,
								RELATED_INFO_DETAILS,
								RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS);
						if (awareflastatus == "Y") {
							jq("#aware").prop("checked", true);
							jq("#notAware").prop("checked", false);
							ComplianceController.detailedResponseProcessor();
						}
						if (awareflastatus == "N") {
							jq("#notAware").prop("checked", true);
							jq("#aware").prop("checked", false);
						}
						if (awareflastatus == "") {
							jq("."+ compliancepagecontainers.AWARE_NOT_AWARE_BTN_CONTAINER).show();
						}
						jq(".relatedinfoContainer").show();
						jq(".OtherRelatedinfoContainer").hide();
						var targetpages = [];
						targetpages.push(compliancepagecontainers.RELATED_INFO_DETAILS_PAGE_CONTAINER/* ,compliancepagecontainers.VERIFICATION_ISSUE_FILTER */);
						ComplianceController.pageNavigate(globalContainer,targetpages);
						jq("." + infogroup).show();
						if (action == "View") {
							ComplianceController.SFIMReadOnlyScreenProcessor(true);
						}
					}
					
					ComplianceController.getIPTD  = function(tsnId, infogroup, action) {
						var GET_IPTD_DETAILS_URL = complianceurls.GET_IPTD_DETAILS_URL;
						var RELATED_INFO_DETAILS = complianceformids.RELATED_INFO_DETAILS;
						var RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS = complianceformelementclasses.RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS;
						var RELATED_INFO_DETAILS_PAGE_CONTAINER = compliancepagecontainers.RELATED_INFO_DETAILS_PAGE_CONTAINER;
						var dataTosend = {};
						dataTosend.tsnId = tsnId;
						var relatedInformationDetails = ComplianceController
								.getURL(contextRoot,
										GET_IPTD_DETAILS_URL);
						var relatedInfoDetails = ComplianceController
								.getCasesModel(relatedInformationDetails,
										dataTosend, token, header);
						var complianceviewRelInfoIPTDView = relatedInfoDetails.complianceviewRelInfoIPTDView;
						var relatedInfoArray = [];
						relatedInfoArray.push(dataTosend);
						ComplianceController.bindModelToForm(relatedInfoArray,
								RELATED_INFO_DETAILS,
								RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS);
						var awareflastatus;
						var roundedamount;
						for (i = 0; i < complianceviewRelInfoIPTDView.length; i++) {
							awareflastatus = complianceviewRelInfoIPTDView[i].infoAwareFlag;
						}
						ComplianceController.bindModelToForm(
								complianceviewRelInfoIPTDView,
								RELATED_INFO_DETAILS,
								RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS);
						if (awareflastatus == "Y") {
							jq("#aware").prop("checked", true);
							jq("#notAware").prop("checked", false);
							ComplianceController.detailedResponseProcessor();
						}
						if (awareflastatus == "N") {
							jq("#notAware").prop("checked", true);
							jq("#aware").prop("checked", false);
						}
						if (awareflastatus == "") {
							jq("."+ compliancepagecontainers.AWARE_NOT_AWARE_BTN_CONTAINER).show();
						}
						jq(".relatedinfoContainer").show();
						jq(".OtherRelatedinfoContainer").hide();
						var targetpages = [];
						targetpages.push(compliancepagecontainers.RELATED_INFO_DETAILS_PAGE_CONTAINER/* ,compliancepagecontainers.VERIFICATION_ISSUE_FILTER */);
						ComplianceController.pageNavigate(globalContainer,targetpages);
						jq("." + infogroup).show();
						if (action == "View") {
							ComplianceController.SFIMReadOnlyScreenProcessor(true);
						}
					}
					
					ComplianceController.getPBRD  = function(tsnId, infogroup, action) {
						var GET_PBRD_DETAILS_URL = complianceurls.GET_PBRD_DETAILS_URL;
						var RELATED_INFO_DETAILS = complianceformids.RELATED_INFO_DETAILS;
						var RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS = complianceformelementclasses.RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS;
						var RELATED_INFO_DETAILS_PAGE_CONTAINER = compliancepagecontainers.RELATED_INFO_DETAILS_PAGE_CONTAINER;
						var dataTosend = {};
						dataTosend.tsnId = tsnId;
						var relatedInformationDetails = ComplianceController
								.getURL(contextRoot,
										GET_PBRD_DETAILS_URL);
						var relatedInfoDetails = ComplianceController
								.getCasesModel(relatedInformationDetails,
										dataTosend, token, header);
						var complianceviewRelInfoPBRDView = relatedInfoDetails.complianceviewRelInfoPBRDView;
						var relatedInfoArray = [];
						relatedInfoArray.push(dataTosend);
						ComplianceController.bindModelToForm(relatedInfoArray,
								RELATED_INFO_DETAILS,
								RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS);
						var awareflastatus;
						var roundedamount;
						for (i = 0; i < complianceviewRelInfoPBRDView.length; i++) {
							awareflastatus = complianceviewRelInfoPBRDView[i].infoAwareFlag;
						}
						ComplianceController.bindModelToForm(
								complianceviewRelInfoPBRDView,
								RELATED_INFO_DETAILS,
								RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS);
						if (awareflastatus == "Y") {
							jq("#aware").prop("checked", true);
							jq("#notAware").prop("checked", false);
							ComplianceController.detailedResponseProcessor();
						}
						if (awareflastatus == "N") {
							jq("#notAware").prop("checked", true);
							jq("#aware").prop("checked", false);
						}
						if (awareflastatus == "") {
							jq("."+ compliancepagecontainers.AWARE_NOT_AWARE_BTN_CONTAINER).show();
						}
						jq(".relatedinfoContainer").show();
						jq(".OtherRelatedinfoContainer").hide();
						var targetpages = [];
						targetpages.push(compliancepagecontainers.RELATED_INFO_DETAILS_PAGE_CONTAINER/* ,compliancepagecontainers.VERIFICATION_ISSUE_FILTER */);
						ComplianceController.pageNavigate(globalContainer,targetpages);
						jq("." + infogroup).show();
						if (action == "View") {
							ComplianceController.SFIMReadOnlyScreenProcessor(true);
						}
					}
					
					ComplianceController.getNA  = function(tsnId, infogroup, action) {
						var GET_OCM_DETAILS_URL = complianceurls.GET_OCM_DETAILS_URL;
						var RELATED_INFO_DETAILS = complianceformids.RELATED_INFO_DETAILS;
						var RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS = complianceformelementclasses.RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS;
						var RELATED_INFO_DETAILS_PAGE_CONTAINER = compliancepagecontainers.RELATED_INFO_DETAILS_PAGE_CONTAINER;
						var dataTosend = {};
						dataTosend.tsnId = tsnId;
						dataTosend.tsnId1 = tsnId;
						var relatedInformationDetails = ComplianceController
								.getURL(contextRoot,
										GET_OCM_DETAILS_URL);
						var relatedInfoDetails = ComplianceController
								.getCasesModel(relatedInformationDetails,
										dataTosend, token, header);
						var complianceviewRelInfoOCMView = relatedInfoDetails.complianceviewRelInfoOCMView;
						var relatedInfoArray = [];
						relatedInfoArray.push(dataTosend);
						ComplianceController.bindModelToForm(relatedInfoArray,
								RELATED_INFO_DETAILS,
								RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS);
						var awareflastatus;
						var roundedamount;
						for (i = 0; i < complianceviewRelInfoOCMView.length; i++) {
							awareflastatus = complianceviewRelInfoOCMView[i].infoAwareFlag;
						}
						ComplianceController.bindModelToForm(
								complianceviewRelInfoOCMView,
								RELATED_INFO_DETAILS,
								RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS);
						if (awareflastatus == "Y") {
							jq("#aware").prop("checked", true);
							jq("#notAware").prop("checked", false);
							ComplianceController.detailedResponseProcessor();
						}
						if (awareflastatus == "N") {
							jq("#notAware").prop("checked", true);
							jq("#aware").prop("checked", false);
						}
						if (awareflastatus == "") {
							jq("."+ compliancepagecontainers.AWARE_NOT_AWARE_BTN_CONTAINER).show();
						}
						jq(".relatedinfoContainer").show();
						jq(".OtherRelatedinfoContainer").hide();
						var targetpages = [];
						targetpages.push(compliancepagecontainers.RELATED_INFO_DETAILS_PAGE_CONTAINER/* ,compliancepagecontainers.VERIFICATION_ISSUE_FILTER */);
						ComplianceController.pageNavigate(globalContainer,targetpages);
						jq("." + infogroup).show();
						if (action == "View") {
							ComplianceController.SFIMReadOnlyScreenProcessor(true);
						}
					}
					
					ComplianceController.viewRelatedInfoRevisionTypeTableHistory=function(tsn,verifType,infoGroup,infoCode){
						var dataTosend = {};
						dataTosend.tsnId=tsn;
						dataTosend.infoGroup=infoGroup;
						var RelatedInfoRevisionTypeTablecolmodel=[];
						var RelatedInfoRevisionTypeTablecolnames=[];
						var GET_RELATED_INFO_REVISION_TYPE_TABLE_HISTORY_URL=complianceurls.GET_RELATED_INFO_REVISION_TYPE_TABLE_HISTORY_URL;
						var relatedInfoRevisionTypeHistoryDetails = ComplianceController.getCasesModel(GET_RELATED_INFO_REVISION_TYPE_TABLE_HISTORY_URL,dataTosend, token, header);
						jq("#relatedInfoRevisionTypeInfoCode").text(infoCode);
						if(relatedInfoRevisionTypeHistoryDetails.length <= 0)
						{
							jq(".relatedInfoRevisionTypeTableContainer").empty();
							jq(".relatedInfoRevisionTypeTableContainer").append("<div class='nodataavailable'>"+ miscmessages.NO_DATA_AVAILABLE+ "</div>");
						}
						else
						{
							var columnName='';
							jq.each(relatedInfoRevisionTypeHistoryDetails[0],function(index,value){
								columnName=index;
								var basicjqgridcolobject={							
										align : 'center',
										resizable : false,
										fixed : true											
									};
								basicjqgridcolobject.name=index;
								basicjqgridcolobject.index=index;
								
								if(columnName.toLowerCase().indexOf('amount')>-1){
									columnName=index.replace(/_/g, " ") +' (<img class="rupeessymbol" src="resources/images/rupeesymbol.png" alt="Rupees Symbol">)';
									basicjqgridcolobject.align = 'right';
									basicjqgridcolobject.formatter = ComplianceController.RelatedInfoCellValue;
											  
								}
								else{
									columnName=index.replace(/_/g, " ");
								}
								
								RelatedInfoRevisionTypeTablecolmodel.push(basicjqgridcolobject);
								RelatedInfoRevisionTypeTablecolnames.push(columnName);
							});
							jq(".relatedInfoRevisionTypeTableContainer").empty();
							jq(".relatedInfoRevisionTypeTableContainer").append("<table id='relatedInfoRevisionTypeTable' border='1'></table>");
							ComplianceController.dynamicjqgridtableprocessor(compliancetable.RELATED_INFO_REVISION_TYPE_TABLE,RelatedInfoRevisionTypeTablecolnames,RelatedInfoRevisionTypeTablecolmodel,relatedInfoRevisionTypeHistoryDetails);
						}	
						jq("#"+ compliancepagecontainers.RELATED_INFO_REVISION_TYPE_TABLE_MODAL_POPUP).modal("show");
					}
					
					
					ComplianceController.dynamicjqgridtableprocessor=function(gridtableid,gridcolnames,gridcolmodel,griddata)
					{
					jq("#"+gridtableid)
					.jqGrid(
							{
								data : griddata,
								datatype: 'local',
								colNames : gridcolnames,
								colModel : gridcolmodel,
								rowNum : 20,
								rowList : [ 10, 20, 30, 40, 50 ],
								pager : '',
								rownumbers : true,
								viewrecords : true,
								gridview : true,
								fixed : true
							});
							jq("#"+gridtableid).jqGrid("setLabel","rn","S. No.");	
					}
					ComplianceController.getTRND = function(
							tsnId, infogroup,relInfoId, action) {
						var GET_RELATEDINFORMATION_DETAILS_URL = complianceurls.GET_RELATEDINFORMATION_TRANSACTION_DETAILS_URL;
						var RELATED_INFO_DETAILS = complianceformids.RELATED_INFO_DETAILS;
						var RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS = complianceformelementclasses.RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS;
						var RELATED_INFO_DETAILS_PAGE_CONTAINER = compliancepagecontainers.RELATED_INFO_DETAILS_PAGE_CONTAINER;
						var dataTosend = {};
						dataTosend.tsnId = tsnId;
						dataTosend.relInfoId=relInfoId;
						dataTosend.activityAtLevel='IN';
						var relatedInformationDetails = ComplianceController
								.getURL(contextRoot,
										GET_RELATEDINFORMATION_DETAILS_URL);
						var relatedInfoDetails = ComplianceController
								.getCasesModel(relatedInformationDetails,
										dataTosend, token, header);
						var complianceviewRelInfoTransactionView = relatedInfoDetails.complianceviewRelInfoTransactionView;
						var complianceviewAdditionalQueryList=relatedInfoDetails.complianceviewAdditionalQueryList;						
						var relatedInfoArray = [];
						relatedInfoArray.push(dataTosend);
						ComplianceController.bindModelToForm(relatedInfoArray,
								RELATED_INFO_DETAILS,
								RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS);
						ComplianceController.bindModelToGridView(complianceviewAdditionalQueryList,compliancetable.INFO_ADDITIONAL_QUERIES_TABLE);
						/*var transactionrelatedInfoadditionalInfo = relatedInfoDetails.complianceviewVerifRelInfoAddlInfoList;
						ComplianceController
								.bindModelToGridView(
										transactionrelatedInfoadditionalInfo,
										compliancetable.RELATED_INFO_ADDITIONAL_INFO_LIST_TABLE);
					*/
						var awareflastatus;
						var roundedamount;
						for (i = 0; i < complianceviewRelInfoTransactionView.length; i++) {
							awareflastatus = complianceviewRelInfoTransactionView[i].infoAwareFlag;
							roundedamount = Math
									.round(complianceviewRelInfoTransactionView[i].amount);
							complianceviewRelInfoTransactionView[i].amount = roundedamount;
						}
						ComplianceController.bindModelToForm(
								complianceviewRelInfoTransactionView,
								RELATED_INFO_DETAILS,
								RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS);
						if (awareflastatus == "Y") {
							jq("#aware").prop("checked", true);
							jq("#notAware").prop("checked", false);
							ComplianceController.detailedResponseProcessor();
						}
						if (awareflastatus == "N") {
							jq("#notAware").prop("checked", true);
							jq("#aware").prop("checked", false);
						}
						jq(".relatedinfoContainer").show();
						jq(".OtherRelatedinfoContainer").hide();
						var targetpages = [];
						targetpages
								.push(compliancepagecontainers.RELATED_INFO_DETAILS_PAGE_CONTAINER,compliancepagecontainers.INFO_ADDITIONAL_QUERIES_CONTAINER/* ,compliancepagecontainers.VERIFICATION_ISSUE_FILTER */);
						ComplianceController.pageNavigate(globalContainer,
								targetpages);
						jq("." + infogroup).show();
						if (action == "View") {
							ComplianceController
									.SFIMReadOnlyScreenProcessor(true);
						}
					}

					ComplianceController.getSALD = function(tsnId,
							infogroup,relInfoId, action) {
						var GET_RELATEDINFORMATION_DETAILS_URL = complianceurls.GET_RELATEDINFORMATION_SALARY_DETAILS_URL;
						var RELATED_INFO_DETAILS = complianceformids.RELATED_INFO_DETAILS;
						var RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS = complianceformelementclasses.RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS;
						var RELATED_INFO_DETAILS_PAGE_CONTAINER = compliancepagecontainers.RELATED_INFO_DETAILS_PAGE_CONTAINER;
						var dataTosend = {};
						dataTosend.tsnId = tsnId;
						dataTosend.relInfoId=relInfoId;
						dataTosend.activityAtLevel='IN';
						var relatedInformationDetails = ComplianceController
								.getURL(contextRoot,
										GET_RELATEDINFORMATION_DETAILS_URL);
						var relatedInfoDetails = ComplianceController
								.getCasesModel(relatedInformationDetails,
										dataTosend, token, header);
						var complianceviewRelInfoSalaryView = relatedInfoDetails.complianceviewRelInfoSalaryView;
						var complianceviewAdditionalQueryList=relatedInfoDetails.complianceviewAdditionalQueryList;	
						var relatedInfoArray = [];
						relatedInfoArray.push(dataTosend);
						ComplianceController.bindModelToForm(relatedInfoArray,
								RELATED_INFO_DETAILS,
								RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS);
						/*var salaryrelatedInfoadditionalInfo = relatedInfoDetails.complianceviewVerifRelInfoAddlInfoList;
						ComplianceController
								.bindModelToGridView(
										salaryrelatedInfoadditionalInfo,
										compliancetable.RELATED_INFO_ADDITIONAL_INFO_LIST_TABLE);*/
						ComplianceController.bindModelToGridView(complianceviewAdditionalQueryList,compliancetable.INFO_ADDITIONAL_QUERIES_TABLE);
						var awareflastatus;
						var roundedamount;
						for (i = 0; i < complianceviewRelInfoSalaryView.length; i++) {
							awareflastatus = complianceviewRelInfoSalaryView[i].infoAwareFlag;
							roundedamount = Math
									.round(complianceviewRelInfoSalaryView[i].amount);
							complianceviewRelInfoSalaryView[i].amount = roundedamount;
						}
						ComplianceController.bindModelToForm(
								complianceviewRelInfoSalaryView,
								RELATED_INFO_DETAILS,
								RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS);
						if (awareflastatus == "Y") {
							jq("#aware").prop("checked", true);
							jq("#notAware").prop("checked", false);
							ComplianceController.detailedResponseProcessor();
						}
						if (awareflastatus == "N") {
							jq("#notAware").prop("checked", true);
							jq("#aware").prop("checked", false);
						}
						jq(".relatedinfoContainer").show();
						jq(".OtherRelatedinfoContainer").hide();
						var targetpages = [];
						targetpages
								.push(compliancepagecontainers.RELATED_INFO_DETAILS_PAGE_CONTAINER,compliancepagecontainers.INFO_ADDITIONAL_QUERIES_CONTAINER/* ,compliancepagecontainers.VERIFICATION_ISSUE_FILTER */);
						ComplianceController.pageNavigate(globalContainer,
								targetpages);
						jq("." + infogroup).show();
						if (action == "View") {
							ComplianceController
									.SFIMReadOnlyScreenProcessor(true);
						}
					}

					ComplianceController.getSTOD = function(
							tsnId, infogroup,relInfoId, action) {
						var GET_RELATEDINFORMATION_DETAILS_URL = complianceurls.GET_RELATEDINFORMATION_TURNOVER_DETAILS_URL;
						var RELATED_INFO_DETAILS = complianceformids.RELATED_INFO_DETAILS;
						var RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS = complianceformelementclasses.RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS;
						var RELATED_INFO_DETAILS_PAGE_CONTAINER = compliancepagecontainers.RELATED_INFO_DETAILS_PAGE_CONTAINER;
						var dataTosend = {};
						dataTosend.tsnId = tsnId;
						dataTosend.relInfoId=relInfoId;
						dataTosend.activityAtLevel='IN';
						var relatedInformationDetails = ComplianceController
								.getURL(contextRoot,
										GET_RELATEDINFORMATION_DETAILS_URL);
						var relatedInfoDetails = ComplianceController
								.getCasesModel(relatedInformationDetails,
										dataTosend, token, header);
						var complianceviewRelInfoTurnOverView = relatedInfoDetails.complianceviewRelInfoServicesTurnoverView;
						var complianceviewAdditionalQueryList=relatedInfoDetails.complianceviewAdditionalQueryList;	
						var relatedInfoArray = [];
						relatedInfoArray.push(dataTosend);
						ComplianceController.bindModelToForm(relatedInfoArray,
								RELATED_INFO_DETAILS,
								RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS);
						/*var turnoverrelatedInfoadditionalInfo = relatedInfoDetails.complianceviewVerifRelInfoAddlInfoList;
						ComplianceController
								.bindModelToGridView(
										turnoverrelatedInfoadditionalInfo,
										compliancetable.RELATED_INFO_ADDITIONAL_INFO_LIST_TABLE);*/
						ComplianceController.bindModelToGridView(complianceviewAdditionalQueryList,compliancetable.INFO_ADDITIONAL_QUERIES_TABLE);
						var awareflastatus;
						var roundedamount;
						for (i = 0; i < complianceviewRelInfoTurnOverView.length; i++) {
							awareflastatus = complianceviewRelInfoTurnOverView[i].infoAwareFlag;
							roundedamount = Math
									.round(complianceviewRelInfoTurnOverView[i].amount);
							complianceviewRelInfoTurnOverView[i].amount = roundedamount;
						}
						ComplianceController.bindModelToForm(
								complianceviewRelInfoTurnOverView,
								RELATED_INFO_DETAILS,
								RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS);
						if (awareflastatus == "Y") {
							jq("#aware").prop("checked", true);
							jq("#notAware").prop("checked", false);
							ComplianceController.detailedResponseProcessor();
						}
						if (awareflastatus == "N") {
							jq("#notAware").prop("checked", true);
							jq("#aware").prop("checked", false);
						}
						jq(".relatedinfoContainer").show();
						jq(".OtherRelatedinfoContainer").hide();
						var targetpages = [];
						targetpages
								.push(compliancepagecontainers.RELATED_INFO_DETAILS_PAGE_CONTAINER,compliancepagecontainers.INFO_ADDITIONAL_QUERIES_CONTAINER/* ,compliancepagecontainers.VERIFICATION_ISSUE_FILTER */);
						ComplianceController.pageNavigate(globalContainer,
								targetpages);
						jq("." + infogroup).show();
						if (action == "View") {
							ComplianceController
									.SFIMReadOnlyScreenProcessor(true);
						}
					}

					ComplianceController.getCIBD = function(tsnId,
							infogroup,relInfoId, action) {
						var GET_RELATEDINFORMATION_DETAILS_URL = complianceurls.GET_RELATEDINFORMATION_INFORMATION_DETAILS_URL;
						var RELATED_INFO_DETAILS = complianceformids.RELATED_INFO_DETAILS;
						var RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS = complianceformelementclasses.RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS;
						var RELATED_INFO_DETAILS_PAGE_CONTAINER = compliancepagecontainers.RELATED_INFO_DETAILS_PAGE_CONTAINER;
						var dataTosend = {};
						dataTosend.tsnId = tsnId;
						dataTosend.relInfoId=relInfoId;
						dataTosend.activityAtLevel='IN';
						var relatedInformationDetails = ComplianceController
								.getURL(contextRoot,
										GET_RELATEDINFORMATION_DETAILS_URL);
						var relatedInfoDetails = ComplianceController
								.getCasesModel(relatedInformationDetails,
										dataTosend, token, header);
						var complianceviewRelInfoPropertyView = relatedInfoDetails.complianceviewRelInfoPropertyView;
						var complianceviewAdditionalQueryList=relatedInfoDetails.complianceviewAdditionalQueryList;	
						var relatedInfoArray = [];
						relatedInfoArray.push(dataTosend);
						ComplianceController.bindModelToForm(relatedInfoArray,
								RELATED_INFO_DETAILS,
								RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS);
						/*var turnoverrelatedInfoadditionalInfo = relatedInfoDetails.complianceviewVerifRelInfoAddlInfoList;
						ComplianceController
								.bindModelToGridView(
										turnoverrelatedInfoadditionalInfo,
										compliancetable.RELATED_INFO_ADDITIONAL_INFO_LIST_TABLE);*/
						ComplianceController.bindModelToGridView(complianceviewAdditionalQueryList,compliancetable.INFO_ADDITIONAL_QUERIES_TABLE);
						var awareflastatus;
						var roundedamount;
						for (i = 0; i < complianceviewRelInfoPropertyView.length; i++) {
							awareflastatus = complianceviewRelInfoPropertyView[i].infoAwareFlag;
							roundedamount = Math
									.round(complianceviewRelInfoPropertyView[i].amount);
							complianceviewRelInfoPropertyView[i].amount = roundedamount;
						}
						ComplianceController.bindModelToForm(
								complianceviewRelInfoPropertyView,
								RELATED_INFO_DETAILS,
								RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS);
						if (awareflastatus == "Y") {
							jq("#aware").prop("checked", true);
							jq("#notAware").prop("checked", false);
							ComplianceController.detailedResponseProcessor();
						}
						if (awareflastatus == "N") {
							jq("#notAware").prop("checked", true);
							jq("#aware").prop("checked", false);
						}
						jq(".relatedinfoContainer").show();
						jq(".OtherRelatedinfoContainer").hide();
						var targetpages = [];
						targetpages
								.push(compliancepagecontainers.RELATED_INFO_DETAILS_PAGE_CONTAINER,compliancepagecontainers.INFO_ADDITIONAL_QUERIES_CONTAINER/* ,compliancepagecontainers.VERIFICATION_ISSUE_FILTER */);
						ComplianceController.pageNavigate(globalContainer,
								targetpages);
						jq("." + infogroup).show();
						if (action == "View") {
							ComplianceController
									.SFIMReadOnlyScreenProcessor(true);
						}
					}

					ComplianceController.getSCTD = function(
							tsnId, infogroup,relInfoId, action) {
						var GET_SECURITIES_TRANSACTION_DETAILS_URL = complianceurls.GET_SECURITIES_TRANSACTION_DETAILS_URL;
						var RELATED_INFO_DETAILS = complianceformids.RELATED_INFO_DETAILS;
						var RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS = complianceformelementclasses.RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS;
						var RELATED_INFO_DETAILS_PAGE_CONTAINER = compliancepagecontainers.RELATED_INFO_DETAILS_PAGE_CONTAINER;
						var dataTosend = {};
						dataTosend.tsnId = tsnId;
						dataTosend.relInfoId=relInfoId;
						dataTosend.activityAtLevel='IN';
						var relatedInformationDetails = ComplianceController
								.getURL(contextRoot,
										GET_SECURITIES_TRANSACTION_DETAILS_URL);
						var relatedInfoDetails = ComplianceController
								.getCasesModel(relatedInformationDetails,
										dataTosend, token, header);
						var complianceviewRelInfoSecurityView = relatedInfoDetails.complianceviewRelInfoSecurityView;
						var complianceviewAdditionalQueryList=relatedInfoDetails.complianceviewAdditionalQueryList;	
						var relatedInfoArray = [];
						relatedInfoArray.push(dataTosend);
						ComplianceController.bindModelToForm(relatedInfoArray,
								RELATED_INFO_DETAILS,
								RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS);
						/*var turnoverrelatedInfoadditionalInfo = relatedInfoDetails.complianceviewVerifRelInfoAddlInfoList;
						ComplianceController
								.bindModelToGridView(
										turnoverrelatedInfoadditionalInfo,
										compliancetable.RELATED_INFO_ADDITIONAL_INFO_LIST_TABLE);*/
						ComplianceController.bindModelToGridView(complianceviewAdditionalQueryList,compliancetable.INFO_ADDITIONAL_QUERIES_TABLE);
						var awareflastatus;
						var roundedamount;
						for (i = 0; i < complianceviewRelInfoSecurityView.length; i++) {
							awareflastatus = complianceviewRelInfoSecurityView[i].infoAwareFlag;
							roundedamount = Math
									.round(complianceviewRelInfoSecurityView[i].amount);
							complianceviewRelInfoSecurityView[i].amount = roundedamount;
						}
						ComplianceController.bindModelToForm(
								complianceviewRelInfoSecurityView,
								RELATED_INFO_DETAILS,
								RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS);
						if (awareflastatus == "Y") {
							jq("#aware").prop("checked", true);
							jq("#notAware").prop("checked", false);
							ComplianceController.detailedResponseProcessor();
						}
						if (awareflastatus == "N") {
							jq("#notAware").prop("checked", true);
							jq("#aware").prop("checked", false);
						}
						jq(".relatedinfoContainer").show();
						jq(".OtherRelatedinfoContainer").hide();
						var targetpages = [];
						targetpages
								.push(compliancepagecontainers.RELATED_INFO_DETAILS_PAGE_CONTAINER,compliancepagecontainers.INFO_ADDITIONAL_QUERIES_CONTAINER/* ,compliancepagecontainers.VERIFICATION_ISSUE_FILTER */);
						ComplianceController.pageNavigate(globalContainer,
								targetpages);
						jq("." + infogroup).show();
						if (action == "View") {
							ComplianceController
									.SFIMReadOnlyScreenProcessor(true);
						}
					}

					ComplianceController.get15CA = function(tsnId,
							infogroup,relInfoId, action) {
						var GET_15CA_DETAILS_URL = complianceurls.GET_15CA_DETAILS_URL;
						var RELATED_INFO_DETAILS = complianceformids.RELATED_INFO_DETAILS;
						var RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS = complianceformelementclasses.RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS;
						var RELATED_INFO_DETAILS_PAGE_CONTAINER = compliancepagecontainers.RELATED_INFO_DETAILS_PAGE_CONTAINER;
						var dataTosend = {};
						dataTosend.tsnId = tsnId;
						dataTosend.relInfoId=relInfoId;
						dataTosend.activityAtLevel='IN';
						var relatedInformationDetails = ComplianceController
								.getURL(contextRoot, GET_15CA_DETAILS_URL);
						var relatedInfoDetails = ComplianceController
								.getCasesModel(relatedInformationDetails,
										dataTosend, token, header);
						var complianceviewRelInfo15CAView = relatedInfoDetails.complianceviewRelInfo15CAView;
						var complianceviewAdditionalQueryList=relatedInfoDetails.complianceviewAdditionalQueryList;	
						var relatedInfoArray = [];
						relatedInfoArray.push(dataTosend);
						ComplianceController.bindModelToForm(relatedInfoArray,
								RELATED_INFO_DETAILS,
								RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS);
						/*var turnoverrelatedInfoadditionalInfo = relatedInfoDetails.complianceviewVerifRelInfoAddlInfoList;
						ComplianceController
								.bindModelToGridView(
										turnoverrelatedInfoadditionalInfo,
										compliancetable.RELATED_INFO_ADDITIONAL_INFO_LIST_TABLE);*/
						ComplianceController.bindModelToGridView(complianceviewAdditionalQueryList,compliancetable.INFO_ADDITIONAL_QUERIES_TABLE);
						var awareflastatus;
						var roundedamount;
						for (i = 0; i < complianceviewRelInfo15CAView.length; i++) {
							awareflastatus = complianceviewRelInfo15CAView[i].infoAwareFlag;
							roundedamount = Math
									.round(complianceviewRelInfo15CAView[i].amount);
							complianceviewRelInfo15CAView[i].amount = roundedamount;
						}
						ComplianceController.bindModelToForm(
								complianceviewRelInfo15CAView,
								RELATED_INFO_DETAILS,
								RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS);
						if (awareflastatus == "Y") {
							jq("#aware").prop("checked", true);
							jq("#notAware").prop("checked", false);
							ComplianceController.detailedResponseProcessor();
						}
						if (awareflastatus == "N") {
							jq("#notAware").prop("checked", true);
							jq("#aware").prop("checked", false);

						}
						jq(".relatedinfoContainer").show();
						jq(".OtherRelatedinfoContainer").hide();
						var targetpages = [];
						targetpages
								.push(compliancepagecontainers.RELATED_INFO_DETAILS_PAGE_CONTAINER,compliancepagecontainers.INFO_ADDITIONAL_QUERIES_CONTAINER/* ,compliancepagecontainers.VERIFICATION_ISSUE_FILTER */);
						ComplianceController.pageNavigate(globalContainer,
								targetpages);
						jq("." + infogroup).show();
						if (action == "View") {
							ComplianceController
									.SFIMReadOnlyScreenProcessor(true);
						}
					}

					ComplianceController.getDownloadDocumentDetails = function(
							infoReqId) {
						var GET_ADDITIONAL_INFO_DOC_DOWNLOAD_URL = complianceurls.GET_ADDITIONAL_INFO_DOC_DOWNLOAD_URL;
						var dataTosend = {};
						dataTosend.infoReqId = parseInt(infoReqId);
						var taxPayerDocList = ComplianceController.getURL(
								contextRoot,
								GET_ADDITIONAL_INFO_DOC_DOWNLOAD_URL);
						var docList = ComplianceController.getCasesModel(
								taxPayerDocList, dataTosend, token, header);
						var docInfoSearchResponse = docList.complianceviewAddlInfoDocDownloadView;
						ComplianceController.bindModelToGridView(
								docInfoSearchResponse,
								compliancetable.ADDITIONAL_INFO_DOC_TABLE);
						jq("#" + complianceformids.ADDITIONAL_INFO_UPLOAD_PAGE)
								.attr("title", "issueadditionalinfo");
						var targetpages = [];
						targetpages
								.push(compliancepagecontainers.DOWNLOAD_PAGE_CONTAINER);
						ComplianceController.pageNavigate(globalContainer,
								targetpages);
					}

					ComplianceController.addRow = function(originalObjectId,
							originalObjectClass, actionButtoncontainer,
							rowspanincrease, itemcontainer) {
						var cloneObject = jq("." + originalObjectClass+":first").clone();
						cloneObject[0].setAttribute('id', cloneObject[0]
								.getAttribute('id')
								+ jq("." + originalObjectClass).length);
						jq(cloneObject).insertBefore(
								"." + actionButtoncontainer).show().find('input').val('');
						var clonedObjectid = jq(cloneObject[0]).attr("id");						
						if (rowspanincrease) {
							jq("." + itemcontainer).find(".rowspandetector")
									.attr(
											"rowspan",
											parseInt(jq("." + itemcontainer)
													.find(".rowspandetector")
													.attr("rowspan")) + 1);
						}
					}

					ComplianceController.deleteRow = function(tableId,
							deleteElementClass, rowspandescrease, itemcontainer) {
						var checkedRow = jq("#" + tableId)
								.find('input:checked');

						jq(checkedRow)
								.each(
										function() {
											if (jq("." + deleteElementClass).length > 1) {
												if (jq(this)
														.closest(
																'tr.'
																		+ deleteElementClass).length > 0) {
													jq(this)
															.closest(
																	'tr.'
																			+ deleteElementClass)
															.remove();
													if (rowspandescrease) {
														jq("." + itemcontainer)
																.find(
																		".rowspandetector")
																.attr(
																		"rowspan",
																		parseInt(jq(
																				"."
																						+ itemcontainer)
																				.find(
																						".rowspandetector")
																				.attr(
																						"rowspan")) - 1);
													}
												}
											}
											if (jq("." + deleteElementClass).length == 1) {
												if (!jq(
														"."
																+ deleteElementClass)
														.is(":visible")) {
													jq("." + itemcontainer)
															.find(
																	".rowspandetector")
															.attr(
																	"rowspan",
																	parseInt(jq(
																			"."
																					+ itemcontainer)
																			.find(
																					".rowspandetector")
																			.attr(
																					"rowspan")) + 1);
													jq("." + deleteElementClass)
															.show();
												}
											}
										});

					}

					ComplianceController.validator = function(errormessage) {
						if (jq(
								"."
										+ compliancepagecontainers.ERROR_MESSAGE_CONTAINER)
								.children().length <= 0) {
							jq(
									"."
											+ compliancepagecontainers.ERROR_MESSAGE_CONTAINER)
									.show().append(
											"<div>" + errormessage + "</div>");
						} else {
							jq(
									"."
											+ compliancepagecontainers.ERROR_MESSAGE_CONTAINER)
									.show();
						}
						setTimeout(
								function() {
									jq(
											"."
													+ compliancepagecontainers.ERROR_MESSAGE_CONTAINER)
											.hide().children().remove();
								}, 10000);

					}

					ComplianceController.MandatoryFieldsChecker = function(
							domelements, ignoreelement, errormessage) {
						jq(domelements)
								.each(
										function() {
											if (jq(this).parent().parent()
													.attr("id") != ignoreelement
													|| jq(this).is(":visible")) {
												if (jq(this).val() == ""
														|| jq(this).val() == null) {
													jq(this).addClass(
															"errorElement");
													ComplianceController
															.validator(errormessage);
													validstatus = false;
													return false;
												} else if (jq(this).hasClass(
														"panformatchecker")) {
													var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
													if (regpan.test(jq(this)
															.val()) == false) {
														jq(this).addClass(
																"errorElement");
														ComplianceController
																.validator(errorMessages.PAN_FORMAT_CHECKER_ERROR);
														validstatus = false;
														return false;
													} else {
														jq(this).removeClass(
																"errorElement");
													}
												}

												else if (jq(this).hasClass(
														"ifscformatchecker")) {
													var regifsc = /^[A-Z|a-z]{4}[0][\w]{6}$/;
													if (regifsc.test(jq(this)
															.val()) == false) {
														jq(this).addClass(
																"errorElement");
														ComplianceController
																.validator(errorMessages.IFSC_FORMAT_CHECKER_ERROR);
														validstatus = false;
														return false;
													} else {
														jq(this).removeClass(
																"errorElement");
													}
												}

												else if (jq(this).hasClass(
														"nameformatchecker")) {
													var regname = /^[a-zA-Z ,.'-]+$/;
													if (regname.test(jq(this)
															.val()) == false) {
														jq(this).addClass(
																"errorElement");
														ComplianceController
																.validator(errorMessages.NAME_FORMAT_CHECKER_ERROR);
														validstatus = false;
														return false;
													} else {
														jq(this).removeClass(
																"errorElement");
													}
												}

												else if (jq(this).hasClass(
														"pinformatchecker")) {
													var regpin = /^[1-9]{1}[0-9]{5}|[X]{6}$/;
													if (regpin.test(jq(this)
															.val()) == false) {
														jq(this).addClass(
																"errorElement");
														ComplianceController
																.validator(errorMessages.PIN_FORMAT_CHECKER_ERROR);
														validstatus = false;
														return false;
													} else {
														jq(this).removeClass(
																"errorElement");
													}
												}

												else if (jq(this).hasClass(
														"addressformatchecker")) {
													var regaddress = /^(?![0-9]*$)[a-zA-Z0-9]{6,}$/;
													if (regaddress.test(jq(
															currentelement)
															.val()) == false) {
														jq(this).addClass(
																"errorElement");
														ComplianceController
																.validator(errorMessages.ADDRESS_FORMAT_CHECKER_ERROR);
														validstatus = false;
														return false;
													} else {
														jq(this).removeClass(
																"errorElement");
													}
												}

												else if (jq(this)
														.hasClass(
																"banknameformatchecker")) {
													var regbankName = /^[a-zA-Z\s]*$/;
													if (regbankName.test(jq(
															this).val()) == false) {
														jq(this).addClass(
																"errorElement");
														ComplianceController
																.validator(errorMessages.BANK_NAME_FORMAT_CHECKER_ERROR);
														validstatus = false;
														return false;
													} else {
														jq(this).removeClass(
																"errorElement");
													}
												}

												else {
													jq(this).removeClass(
															"errorElement");
												}
											}
										});
					}					

					ComplianceController.getMandatoryFields = function(rowname) {
						return detailedResponseMandatoryFields[rowname];
					}

					ComplianceController.isrowModified = function(row) {
						var modifiedrow;
						var rowMandatoryFields = ComplianceController
								.getMandatoryFields(jq(row).attr("class"));
						jq(row)
								.each(
										function() {
											for (i = 0; i < rowMandatoryFields.length; i++) {
												if (jq(this)
														.find(
																"."
																		+ rowMandatoryFields[i])
														.val() != "") {
													modifiedrow = true;
													return false;
												}
											}
										});
						return modifiedrow;
					}

					ComplianceController.getFieldValue = function(fieldid, row) {
						var fieldvalue;
						jq(row).each(function() {
							fieldvalue = jq(this).find("." + fieldid).val();
							return false;
						});
						return fieldvalue;
					}

					ComplianceController.zeroamountchecker = function(fieldid,
							row) {
						var hasfieldvaluezero;
						jq(row)
								.each(
										function() {
											var fieldclass = jq(this).find(
													"." + fieldid).hasClass(
													"requiredamount");
											if (fieldclass) {
												if (jq(this)
														.find("." + fieldid)
														.val() == 0) {
													hasfieldvaluezero = true;
												} else {
													hasfieldvaluezero = false;
												}
												return false;
											}
										});
						return hasfieldvaluezero;
					}

					ComplianceController.getFieldMandatoryValidationMessage = function(
							fieldid) {
						var validationmessage;
						jq.each(detailedresponsemandatoryfieldmessages,
								function(index, value) {
									if (index == fieldid) {
										validationmessage = value;
									}
								});
						return validationmessage;
					}

					ComplianceController.getzeroamounttrackedValidationMessage = function(
							fieldid) {
						var validationmessage;
						jq.each(zerovaluemessages, function(index, value) {
							if (index == fieldid) {
								validationmessage = value;
							}
						});
						return validationmessage;
					}

					ComplianceController.validateMandatoryFields = function(
							row, mandatoryFields) {
						for (i = 0; i < mandatoryFields.length; i++) {
							var fieldvalue = ComplianceController
									.getFieldValue(mandatoryFields[i], row);
							var haszeroamount = ComplianceController
									.zeroamountchecker(mandatoryFields[i], row);
							if (fieldvalue == "") {
								if (jq(row).find("." + mandatoryFields[i]).length > 0) {
									jq(row).find("." + mandatoryFields[i])
											.addClass("errorElement");
									ComplianceController
											.validator(ComplianceController
													.getFieldMandatoryValidationMessage(mandatoryFields[i]));
									return false;
								}
							}
							if (haszeroamount) {
								if (jq(row).find("." + mandatoryFields[i]).length > 0) {
									jq(row).find("." + mandatoryFields[i])
											.addClass("errorElement");
									ComplianceController
											.validator(ComplianceController
													.getzeroamounttrackedValidationMessage(mandatoryFields[i]));
									return false;
								}
							}
						}
					}

					ComplianceController.isNotDummyRow = function(row) {
						return jq(row).is(":visible");
					}
					
					ComplianceController.validateTTvalRelToOtherPanRows = function(
							rows) {
						var validationstatus = true;
						var validationStatusVal;
						jq(rows)
								.each(
										function() {
											if (ComplianceController
													.isNotDummyRow(jq(this))) {
												if (ComplianceController
														.isrowModified(jq(this))) {
													validationStatusVal = ComplianceController
															.validateMandatoryFields(
																	jq(this),
																	detailedResponseMandatoryFields.ttvalRelToOtherPanRowMandatoryfields);
													if (validationstatus == true) {
														if (validationStatusVal == false) {
															validationstatus = false;
														} else {
															validationstatus = true;
														}
													}
												}
											}
										});
						return validationstatus;
					}

					ComplianceController.validateTTSPcapitalGainRow = function(
							rows) {
						var validationstatus = true;
						var validationStatusVal;
						jq(rows)
								.each(
										function() {
											if (ComplianceController
													.isNotDummyRow(jq(this))) {
												if (ComplianceController
														.isrowModified(jq(this))) {
													validationStatusVal = ComplianceController
															.validateMandatoryFields(
																	jq(this),
																	detailedResponseMandatoryFields.ttspcapitalGainClass);
													if (validationstatus == true) {
														if (validationStatusVal == false) {
															validationstatus = false;
														} else {
															validationstatus = true;
														}
													}
												}
											}
										});
						return validationstatus;
					}

					ComplianceController.validateTTSPstampValueRow = function(
							rows) {
						var validationstatus = true;
						var validationStatusVal;
						jq(rows)
								.each(
										function() {
											if (ComplianceController
													.isNotDummyRow(jq(this))) {
												if (ComplianceController
														.isrowModified(jq(this))) {
													validationStatusVal = ComplianceController
															.validateMandatoryFields(
																	jq(this),
																	detailedResponseMandatoryFields.ttspStampValueClass);
													if (validationstatus == true) {
														if (validationStatusVal == false) {
															validationstatus = false;
														} else {
															validationstatus = true;
														}
													}
												}
											}
										});
						return validationstatus;
					}

					ComplianceController.validateTTSPvalRelToOtherPanRows = function(
							rows) {
						var validationstatus = true;
						var validationStatusVal;
						jq(rows)
								.each(
										function() {
											if (ComplianceController
													.isNotDummyRow(jq(this))) {
												if (ComplianceController
														.isrowModified(jq(this))) {
													validationStatusVal = ComplianceController
															.validateMandatoryFields(
																	jq(this),
																	detailedResponseMandatoryFields.ttspvalRelToOtherPanRowMandatoryfields);
													if (validationstatus == true) {
														if (validationStatusVal == false) {
															validationstatus = false;
														} else {
															validationstatus = true;
														}
													}
												}
											}
										});
						return validationstatus;
					}
					ComplianceController.validateTTAmountCoveredInOtherInformationRows = function(
							rows) {
						var validationstatus = true;
						var validationStatusVal;
						jq(rows)
								.each(
										function() {
											if (ComplianceController
													.isNotDummyRow(jq(this))) {
												if (ComplianceController
														.isrowModified(jq(this))) {
													validationStatusVal = ComplianceController
															.validateMandatoryFields(
																	jq(this),
																	detailedResponseMandatoryFields.ttvalCovrdInOtherInfoRowMandatoryfields);
													if (validationstatus == true) {
														if (validationStatusVal == false) {
															validationstatus = false;
														} else {
															validationstatus = true;
														}
													}
												}
											}
										});
						return validationstatus;
					}

					ComplianceController.validateTTSPAmountCoveredInOtherInformationRows = function(
							rows) {
						var validationstatus = true;
						var validationStatusVal;
						jq(rows)
								.each(
										function() {
											if (ComplianceController
													.isNotDummyRow(jq(this))) {
												if (ComplianceController
														.isrowModified(jq(this))) {
													validationStatusVal = ComplianceController
															.validateMandatoryFields(
																	jq(this),
																	detailedResponseMandatoryFields.ttspvalCvrdInOtherInfoRowMandatoryfields);
													if (validationstatus == true) {
														if (validationStatusVal == false) {
															validationstatus = false;
														} else {
															validationstatus = true;
														}
													}
												}
											}
										});
						return validationstatus;
					}

					ComplianceController.validateTTExemtionDeductionRows = function(
							rows) {
						var validationstatus = true;
						var validationStatusVal;
						jq(rows)
								.each(
										function() {
											if (ComplianceController
													.isNotDummyRow(jq(this))) {
												if (ComplianceController
														.isrowModified(jq(this))) {
													validationStatusVal = ComplianceController
															.validateMandatoryFields(
																	jq(this),
																	detailedResponseMandatoryFields.ttexmptDedctExpRowMandatoryfields);
													if (validationstatus == true) {
														if (validationStatusVal == false) {
															validationstatus = false;
														} else {
															validationstatus = true;
														}
													}
												}
											}
										});
						return validationstatus;
					}

					ComplianceController.validateTTSPExemtionDeductionRows = function(
							rows) {
						var validationstatus = true;
						var validationStatusVal;
						jq(rows)
								.each(
										function() {
											if (ComplianceController
													.isNotDummyRow(jq(this))) {
												if (ComplianceController
														.isrowModified(jq(this))) {
													validationStatusVal = ComplianceController
															.validateMandatoryFields(
																	jq(this),
																	detailedResponseMandatoryFields.ttspexptDedcExpRowMandatoryfields);
													if (validationstatus == true) {
														if (validationStatusVal == false) {
															validationstatus = false;
														} else {
															validationstatus = true;
														}
													}
												}
											}
										});
						return validationstatus;
					}

					ComplianceController.validateSFTIearlierIncomeRow = function(
							rows) {
						var validationstatus = true;
						var validationStatusVal;
						jq(rows)
								.each(
										function() {
											if (ComplianceController
													.isNotDummyRow(jq(this))) {
												if (ComplianceController
														.isrowModified(jq(this))) {
													validationStatusVal = ComplianceController
															.validateMandatoryFields(
																	jq(this),
																	detailedResponseMandatoryFields.sftiearlierIncomeRowMandatoryfields);
													if (validationstatus == true) {
														if (validationStatusVal == false) {
															validationstatus = false;
														} else {
															validationstatus = true;
														}
													}
												}
											}
										});
						return validationstatus;
					}

					ComplianceController.validateSFearlierIncomeRow = function(
							rows) {
						var validationstatus = true;
						var validationStatusVal;
						jq(rows)
								.each(
										function() {
											if (ComplianceController
													.isNotDummyRow(jq(this))) {
												if (ComplianceController
														.isrowModified(jq(this))) {
													validationStatusVal = ComplianceController
															.validateMandatoryFields(
																	jq(this),
																	detailedResponseMandatoryFields.sfearlierIncomeRowMandatoryfields);
													if (validationstatus == true) {
														if (validationStatusVal == false) {
															validationstatus = false;
														} else {
															validationstatus = true;
														}
													}
												}
											}
										});
						return validationstatus;
					}
					ComplianceController.validateSFTIoutofrecieptRow = function(
							rows) {
						var validationstatus = true;
						var validationStatusVal;
						jq(rows)
								.each(
										function() {
											if (ComplianceController
													.isNotDummyRow(jq(this))) {
												if (ComplianceController
														.isrowModified(jq(this))) {
													validationStatusVal = ComplianceController
															.validateMandatoryFields(
																	jq(this),
																	detailedResponseMandatoryFields.sftioutofreceiptRowMandatoryfields);
													if (validationstatus == true) {
														if (validationStatusVal == false) {
															validationstatus = false;
														} else {
															validationstatus = true;
														}
													}
												}
											}
										});
						return validationstatus;
					}
					ComplianceController.validateSFoutofrecieptRow = function(
							rows) {
						var validationstatus = true;
						var validationStatusVal;
						jq(rows)
								.each(
										function() {
											if (ComplianceController
													.isNotDummyRow(jq(this))) {
												if (ComplianceController
														.isrowModified(jq(this))) {
													validationStatusVal = ComplianceController
															.validateMandatoryFields(
																	jq(this),
																	detailedResponseMandatoryFields.sfoutofreceiptRowMandatoryfields);
													if (validationstatus == true) {
														if (validationStatusVal == false) {
															validationstatus = false;
														} else {
															validationstatus = true;
														}
													}
												}
											}
										});
						return validationstatus;
					}

					ComplianceController.validateSFTIidentifiablewithpanRow = function(
							rows) {
						var validationstatus = true;
						var validationStatusVal;
						jq(rows)
								.each(
										function() {
											if (ComplianceController
													.isNotDummyRow(jq(this))) {
												if (ComplianceController
														.isrowModified(jq(this))) {
													validationStatusVal = ComplianceController
															.validateMandatoryFields(
																	jq(this),
																	detailedResponseMandatoryFields.sftiidentifiablePersonWithPanRowMandatoryfields);
													if (validationstatus == true) {
														if (validationStatusVal == false) {
															validationstatus = false;
														} else {
															validationstatus = true;
														}
													}
												}
											}
										});
						return validationstatus;
					}

					ComplianceController.validateSFidentifiablewithpanRow = function(
							rows) {
						var validationstatus = true;
						var validationStatusVal;
						jq(rows)
								.each(
										function() {
											if (ComplianceController
													.isNotDummyRow(jq(this))) {
												if (ComplianceController
														.isrowModified(jq(this))) {
													validationStatusVal = ComplianceController
															.validateMandatoryFields(
																	jq(this),
																	detailedResponseMandatoryFields.sfidentifiablePersonWithPanRowMandatoryfields);
													if (validationstatus == true) {
														if (validationStatusVal == false) {
															validationstatus = false;
														} else {
															validationstatus = true;
														}
													}
												}
											}
										});
						return validationstatus;
					}

					ComplianceController.validateSFTIidentifiablewithoutpanRow = function(
							rows) {
						var validationstatus = true;
						var validationStatusVal;
						jq(rows)
								.each(
										function() {
											if (ComplianceController
													.isNotDummyRow(jq(this))) {
												if (ComplianceController
														.isrowModified(jq(this))) {
													validationStatusVal = ComplianceController
															.validateMandatoryFields(
																	jq(this),
																	detailedResponseMandatoryFields.sftiidentifiablePersonWithOutPanRowMandatoryfields);
													if (validationstatus == true) {
														if (validationStatusVal == false) {
															validationstatus = false;
														} else {
															validationstatus = true;
														}
													}
												}
											}
										});
						return validationstatus;
					}

					ComplianceController.validateSFidentifiablewithoutpanRow = function(
							rows) {
						var validationstatus = true;
						var validationStatusVal;
						jq(rows)
								.each(
										function() {
											if (ComplianceController
													.isNotDummyRow(jq(this))) {
												if (ComplianceController
														.isrowModified(jq(this))) {
													validationStatusVal = ComplianceController
															.validateMandatoryFields(
																	jq(this),
																	detailedResponseMandatoryFields.sfidentifiablePersonWithOutPanRowMandatoryfields);
													if (validationstatus == true) {
														if (validationStatusVal == false) {
															validationstatus = false;
														} else {
															validationstatus = true;
														}
													}
												}
											}
										});
						return validationstatus;
					}

					ComplianceController.validateSFTIundentifiablepersonRow = function(
							rows) {
						var validationstatus = true;
						var validationStatusVal;
						jq(rows)
								.each(
										function() {
											if (ComplianceController
													.isNotDummyRow(jq(this))) {
												if (ComplianceController
														.isrowModified(jq(this))) {
													validationStatusVal = ComplianceController
															.validateMandatoryFields(
																	jq(this),
																	detailedResponseMandatoryFields.sftiunidentifiablePersonRowMandatoryfields);
													if (validationstatus == true) {
														if (validationStatusVal == false) {
															validationstatus = false;
														} else {
															validationstatus = true;
														}
													}
												}
											}
										});
						return validationstatus;
					}

					ComplianceController.validateSFundentifiablepersonRow = function(
							rows) {
						var validationstatus = true;
						var validationStatusVal;
						jq(rows)
								.each(
										function() {
											if (ComplianceController
													.isNotDummyRow(jq(this))) {
												if (ComplianceController
														.isrowModified(jq(this))) {
													validationStatusVal = ComplianceController
															.validateMandatoryFields(
																	jq(this),
																	detailedResponseMandatoryFields.sfunidentifiablePersonRowMandatoryfields);
													if (validationstatus == true) {
														if (validationStatusVal == false) {
															validationstatus = false;
														} else {
															validationstatus = true;
														}
													}
												}
											}
										});
						return validationstatus;
					}

					ComplianceController.validateSFTIcashdisclosedRow = function(
							rows) {
						var validationstatus = true;
						var validationStatusVal;
						jq(rows)
								.each(
										function() {
											if (ComplianceController
													.isNotDummyRow(jq(this))) {
												if (ComplianceController
														.isrowModified(jq(this))) {
													validationStatusVal = ComplianceController
															.validateMandatoryFields(
																	jq(this),
																	detailedResponseMandatoryFields.sfticashDisclosedTobeDisclosedRowMandatoryfields);
													if (validationstatus == true) {
														if (validationStatusVal == false) {
															validationstatus = false;
														} else {
															validationstatus = true;
														}
													}
												}
											}
										});
						return validationstatus;
					}

					ComplianceController.validateSFcashdisclosedRow = function(
							rows) {
						var validationstatus = true;
						var validationStatusVal;
						jq(rows)
								.each(
										function() {
											if (ComplianceController
													.isNotDummyRow(jq(this))) {
												if (ComplianceController
														.isrowModified(jq(this))) {
													validationStatusVal = ComplianceController
															.validateMandatoryFields(
																	jq(this),
																	detailedResponseMandatoryFields.sfcashDisclosedTobeDisclosedRowMandatoryfields);
													if (validationstatus == true) {
														if (validationStatusVal == false) {
															validationstatus = false;
														} else {
															validationstatus = true;
														}
													}
												}
											}
										});
						return validationstatus;
					}

					ComplianceController.validateSFTIinvestmentduringyearRow = function(
							rows) {
						var validationstatus = true;
						var validationStatusVal;
						jq(rows)
								.each(
										function() {
											if (ComplianceController
													.isNotDummyRow(jq(this))) {
												if (ComplianceController
														.isrowModified(jq(this))) {
													validationStatusVal = ComplianceController
															.validateMandatoryFields(
																	jq(this),
																	detailedResponseMandatoryFields.sftiinvestmentDuringTheYearRowMandatoryfields);
													if (validationstatus == true) {
														if (validationStatusVal == false) {
															validationstatus = false;
														} else {
															validationstatus = true;
														}
													}
												}
											}
										});
						return validationstatus;
					}

ComplianceController.saveconsolidatedpdfbyteprocessor=function() {
	var GET_SAVE_CONSOLIDATED_PDF_BYTE=complianceurls.GET_SAVE_CONSOLIDATED_PDF_BYTE;
	var saveconsolidatedpdfbytedataToSend={};
	saveconsolidatedpdfbytedataToSend.caseSeqId = jq("#caseSeqId").text();
	saveconsolidatedpdfbytedataToSend.pan=jq("#loggedInPAN").text();
	saveconsolidatedpdfbytedataToSend.caseId=jq("#caseId").text();
	ComplianceController.getCasesModel(GET_SAVE_CONSOLIDATED_PDF_BYTE,saveconsolidatedpdfbytedataToSend, token, header);
}

					ComplianceController.TTdetailedResponseSubmit = function(
							buttonId, validationRequired) {
						var infoRespTTCompVal = {};
						var infoRespTTRcpt = [];
						var infoRespTTOthPanFy = [];
						var infoRespTTOthInfoVal = [];
						var infoRespTTExempDed = [];
						infoRespTTCompVal.relInfoId = jq("#hiddenRelInfoId").text();
						var TTreceiptRelToOtherInfoamount = jq(
								"."
										+ compliancepagecontainers.TT_DETAILED_RESPONSE_CONTAINER)
								.find(".ttreceiptRelToOtherInfoamount");
						var TTreceiptRelToOtherInforemarks = jq(
								"."
										+ compliancepagecontainers.TT_DETAILED_RESPONSE_CONTAINER)
								.find(".ttreceiptRelToOtherInforemarks");
						var TTvalRelToOtherPanPANNO = jq(
								"."
										+ compliancepagecontainers.TT_DETAILED_RESPONSE_CONTAINER)
								.find(".ttvalRelToOtherPanPANNO");
						var TTvalRelToOtherPanFinYear = jq(
								"."
										+ compliancepagecontainers.TT_DETAILED_RESPONSE_CONTAINER)
								.find(".ttvalRelToOtherPanFinYear");
						var TTvalRelToOtherPanamount = jq(
								"."
										+ compliancepagecontainers.TT_DETAILED_RESPONSE_CONTAINER)
								.find(".ttvalRelToOtherPanamount");
						var TTvalRelToOtherPanremarks = jq(
								"."
										+ compliancepagecontainers.TT_DETAILED_RESPONSE_CONTAINER)
								.find(".ttvalRelToOtherPanremarks");
						var TTvalCovrdInOtherInfoamount = jq(
								"."
										+ compliancepagecontainers.TT_DETAILED_RESPONSE_CONTAINER)
								.find(".ttvalCovrdInOtherInfoamount");
						var TTvalCovrdInOtherInforemarks = jq(
								"."
										+ compliancepagecontainers.TT_DETAILED_RESPONSE_CONTAINER)
								.find(".ttvalCovrdInOtherInforemarks");
						var TTexmptDedctExpFinYear = jq(
								"."
										+ compliancepagecontainers.TT_DETAILED_RESPONSE_CONTAINER)
								.find(".ttexmptDedctExpFinYear");
						var TTexmptDedctExpamount = jq(
								"."
										+ compliancepagecontainers.TT_DETAILED_RESPONSE_CONTAINER)
								.find(".ttexmptDedctExpamount");
						var TTexmptDedctExpremarks = jq(
								"."
										+ compliancepagecontainers.TT_DETAILED_RESPONSE_CONTAINER)
								.find(".ttexmptDedctExpremarks");

						var TTvalRelToOtherPanRow = jq(
								"."
										+ compliancepagecontainers.TT_DETAILED_RESPONSE_CONTAINER)
								.find(".ttvalRelToOtherPanClass");
						var TTamountCoveredInOtherInformationRow = jq(
								"."
										+ compliancepagecontainers.TT_DETAILED_RESPONSE_CONTAINER)
								.find(".ttvalCovrdInOtherInfoClass");
						var TTExceptionDeductionRow = jq(
								"."
										+ compliancepagecontainers.TT_DETAILED_RESPONSE_CONTAINER)
								.find(".ttexmptDedctExpClass");

						validstatus = null;

						var validTTvalRelToOtherPanStatus = null;
						var validTTAmountCoveredInOtherInfoStatus = null;
						var validTTExemptionDeductionStatus = null;
						var validPancheckerStatus = null;
						/* UI Validation for Mandatory fields Starts */
						if (validationRequired == true) {
							// REMARKS MANDATORY CHECKER FOR BUSINESS TURNOVER
							if (jq("#infoCode").val() == "NBR01") {
								ComplianceController.MandatoryFieldsChecker(
										TTreceiptRelToOtherInforemarks,
										"ttreceiptRelToOtherInfoObj",
										errorMessages.REMARKS_MANDATORY);
								document.getElementById("ttRemarksAsterick").style.display = "block";
							} else {
								document.getElementById("ttRemarksAsterick").style.display = "none";
							}
							ComplianceController.MandatoryFieldsChecker(
									TTreceiptRelToOtherInfoamount,
									"ttreceiptRelToOtherInfoObj",
									errorMessages.AMOUNT_MANDATORY);
							validTTvalRelToOtherPanStatus = ComplianceController
									.validateTTvalRelToOtherPanRows(TTvalRelToOtherPanRow);
							validTTAmountCoveredInOtherInfoStatus = ComplianceController
									.validateTTAmountCoveredInOtherInformationRows(TTamountCoveredInOtherInformationRow);
							validTTExemptionDeductionStatus = ComplianceController
									.validateTTExemtionDeductionRows(TTExceptionDeductionRow);
							ComplianceController.panChecker(compliancepagecontainers.TT_DETAILED_RESPONSE_CONTAINER);
							ComplianceController.nameformatchecker(compliancepagecontainers.TT_DETAILED_RESPONSE_CONTAINER);
							ComplianceController.pinformatchecker(compliancepagecontainers.TT_DETAILED_RESPONSE_CONTAINER);
							ComplianceController.addressformatchecker(compliancepagecontainers.TT_DETAILED_RESPONSE_CONTAINER);
						}
						if (validstatus == false
								|| validTTvalRelToOtherPanStatus == false
								|| validTTAmountCoveredInOtherInfoStatus == false
								|| validTTExemptionDeductionStatus == false) {
							jq('html, body').animate({
								scrollTop : 0
							});
							return false;
						}
						/* UI Validation for Mondatory fields Ends */

						ComplianceController.detailedResponseBaseConstructor(
								TTreceiptRelToOtherInfoamount, "amount",
								infoRespTTRcpt, "ttreceiptRelToOtherInfoObj");
						var infoRespTTRcptremarksArray = [];
						ComplianceController.detailedResponseGenerator(
								infoRespTTRcptremarksArray,
								TTreceiptRelToOtherInforemarks, infoRespTTRcpt,
								"remarks", "ttreceiptRelToOtherInfoObj");
						ComplianceController.detailedResponseBaseConstructor(
								TTvalRelToOtherPanPANNO, "pan",
								infoRespTTOthPanFy, "ttvalRelToOtherPanObj");
						var infoRespTTOthPanFyFinYearArray = [];
						ComplianceController.detailedResponseGenerator(
								infoRespTTOthPanFyFinYearArray,
								TTvalRelToOtherPanFinYear, infoRespTTOthPanFy,
								"finYearId", "ttvalRelToOtherPanObj");
						var infoRespTTOthPanFyAmountArray = [];
						ComplianceController.detailedResponseGenerator(
								infoRespTTOthPanFyAmountArray,
								TTvalRelToOtherPanamount, infoRespTTOthPanFy,
								"amount", "ttvalRelToOtherPanObj");
						var infoRespTTOthPanFyremarksArray = [];
						ComplianceController.detailedResponseGenerator(
								infoRespTTOthPanFyremarksArray,
								TTvalRelToOtherPanremarks, infoRespTTOthPanFy,
								"remarks", "ttvalRelToOtherPanObj");
						ComplianceController.detailedResponseBaseConstructor(
								TTvalCovrdInOtherInfoamount, "amount",
								infoRespTTOthInfoVal,
								"ttvalCovrdInOtherInfoObj");
						var infoRespTTOthInfoValremarksarray = [];
						ComplianceController.detailedResponseGenerator(
								infoRespTTOthInfoValremarksarray,
								TTvalCovrdInOtherInforemarks,
								infoRespTTOthInfoVal, "remarks",
								"ttvalCovrdInOtherInfoObj");
						ComplianceController.detailedResponseBaseConstructor(
								TTexmptDedctExpFinYear, "exempDedCatId",
								infoRespTTExempDed, "ttexmptDedctExpObj");
						var infoRespTTExempDedamountarray = [];
						ComplianceController.detailedResponseGenerator(
								infoRespTTExempDedamountarray,
								TTexmptDedctExpamount, infoRespTTExempDed,
								"amount", "ttexmptDedctExpObj");
						var infoRespTTExempDedremarksarray = [];
						ComplianceController.detailedResponseGenerator(
								infoRespTTExempDedremarksarray,
								TTexmptDedctExpremarks, infoRespTTExempDed,
								"remarks", "ttexmptDedctExpObj");

						var TTreceiptRelToOtherInfoamountSum = ComplianceController
								.amountCalculator(
										TTreceiptRelToOtherInfoamount,
										"TTreceiptRelToOtherInfoamountSum");
						var TTvalRelToOtherPanamountSum = ComplianceController
								.amountCalculator(TTvalRelToOtherPanamount,
										"TTvalRelToOtherPanamountSum");
						var TTvalCovrdInOtherInfoamountSum = ComplianceController
								.amountCalculator(TTvalCovrdInOtherInfoamount,
										"TTvalCovrdInOtherInfoamountSum");
						var TTexmptDedctExpamountSum = ComplianceController
								.amountCalculator(TTexmptDedctExpamount,
										"TTexmptDedctExpamountSum");
						var TTtotIncLossAmountSum = parseInt(jq(
								"#tttotalComputedAmount").val());
						infoRespTTCompVal.infoRespTTRcpt = infoRespTTRcpt;
						infoRespTTCompVal.infoRespTTOthPanFy = infoRespTTOthPanFy;
						infoRespTTCompVal.infoRespTTOthInfoVal = infoRespTTOthInfoVal;
						infoRespTTCompVal.infoRespTTExempDed = infoRespTTExempDed;
						infoRespTTCompVal.totRcptAmount = TTreceiptRelToOtherInfoamountSum;
						infoRespTTCompVal.totOthPanAmount = TTvalRelToOtherPanamountSum;
						infoRespTTCompVal.totInfoPanAmount = TTvalCovrdInOtherInfoamountSum;
						infoRespTTCompVal.totEdAmount = TTexmptDedctExpamountSum;
						infoRespTTCompVal.totIncLossAmount = TTtotIncLossAmountSum;
						if (jq("#hiddenRelInfoId").text() != "") {
							infoRespTTCompVal.relInfoId = jq("#hiddenRelInfoId").text();
						} else {
							infoRespTTCompVal.relInfoId = jq("#hiddenRelInfoId")
									.text();
						}
						infoRespTTCompVal.encValue=ComplianceControllerInfo.encrypt(TTtotIncLossAmountSum+'');
						ComplianceController.getTransId(infoRespTTCompVal,'TT');
						
						var TT_GET_DETAILED_RESPONSE_SUBMIT_URL = complianceurls.TT_GET_DETAILED_RESPONSE_SUBMIT_URL;
						var TT_GET_DETAILED_RESPONSE_DRAFT_URL = complianceurls.TT_GET_DETAILED_RESPONSE_DRAFT_URL;
						var ttdetailresponseinputs = jq(
								"."
										+ compliancepagecontainers.TT_DETAILED_RESPONSE_CONTAINER)
								.find("input");
						ComplianceController
								.sqlinjectionchecker(ttdetailresponseinputs)
						if (XSSFailed == true) {
							jq('html, body').animate({
								scrollTop : 0
							});
							return false;
						}
						if (buttonId == "TTdetailedResponseSubmit") {
							infoRespTTCompVal.transStatus = "S";
							ComplianceController
									.ttemptyrowprocessor(infoRespTTCompVal);
							var getTTdetailedresponsesubmit = ComplianceController.getCasesModel(
											TT_GET_DETAILED_RESPONSE_SUBMIT_URL,
											infoRespTTCompVal, token, header);
							if (getTTdetailedresponsesubmit.rspSubmitFlag.toUpperCase() == "S") {
									jq('html, body').animate({scrollTop : 0});
									ComplianceController
											.successor(sucessMessages.RESPOSNE_SUCCESS_WITHOUT_TRANSACTION_ID);
									ComplianceController.refrshInfoDetailsOnSave(getTTdetailedresponsesubmit,'TT');
									ComplianceController.saveconsolidatedpdfbyteprocessor();
								
							} else {
								jq('html, body').animate({scrollTop : 0});
								ComplianceController.validator(errorMessages.SERVER_RUNTIME_EXCEPTION);
							}
						} else if(buttonId == "TT_detailedResponseSaveDraft"){
							infoRespTTCompVal.transStatus = "D";
							ComplianceController
									.ttemptyrowprocessor(infoRespTTCompVal);
							var getTTdetailedresponsesubmit = ComplianceController.getCasesModel(
											TT_GET_DETAILED_RESPONSE_DRAFT_URL,
											infoRespTTCompVal, token, header);
							if(getTTdetailedresponsesubmit.rspSubmitFlag.toUpperCase() == "D" )
							{	
								jq('html, body').animate({scrollTop : 0});
								ComplianceController.successor(sucessMessages.DRAFT_SAVED_SUCCESSFULLY);
								ComplianceController.refrshInfoDetailsOnSave(getTTdetailedresponsesubmit,'TT');
							}
							else
							{
								jq('html, body').animate({scrollTop : 0});
								ComplianceController.validator(errorMessages.SERVER_RUNTIME_EXCEPTION);
							}
						}
					}

					ComplianceController.ttemptyrowprocessor = function(
							infoRespTTCompVal) {
						var infoRespTTModifiedCompVal = {};
						var infoRespTTRcpt = infoRespTTCompVal.infoRespTTRcpt;
						var infoRespTTOthPanFy = infoRespTTCompVal.infoRespTTOthPanFy;
						var infoRespTTOthInfoVal = infoRespTTCompVal.infoRespTTOthInfoVal;
						var infoRespTTExempDed = infoRespTTCompVal.infoRespTTExempDed;
						infoRespTTModifiedCompVal.infoRespTTRcpt = [];
						infoRespTTModifiedCompVal.infoRespTTOthPanFy = [];
						infoRespTTModifiedCompVal.infoRespTTOthInfoVal = [];
						infoRespTTModifiedCompVal.infoRespTTExempDed = [];
						ComplianceController.emptyrowremover(infoRespTTRcpt,
								"infoRespTTRcpt", infoRespTTModifiedCompVal,
								"relInfoId");
						ComplianceController.emptyrowremover(
								infoRespTTOthPanFy, "infoRespTTOthPanFy",
								infoRespTTModifiedCompVal, "relInfoId");
						ComplianceController.emptyrowremover(
								infoRespTTOthInfoVal, "infoRespTTOthInfoVal",
								infoRespTTModifiedCompVal, "relInfoId");
						ComplianceController.emptyrowremover(
								infoRespTTExempDed, "infoRespTTExempDed",
								infoRespTTModifiedCompVal, "relInfoId");
						infoRespTTCompVal.infoRespTTRcpt = infoRespTTModifiedCompVal.infoRespTTRcpt;
						infoRespTTCompVal.infoRespTTOthPanFy = infoRespTTModifiedCompVal.infoRespTTOthPanFy;
						infoRespTTCompVal.infoRespTTOthInfoVal = infoRespTTModifiedCompVal.infoRespTTOthInfoVal;
						infoRespTTCompVal.infoRespTTExempDed = infoRespTTModifiedCompVal.infoRespTTExempDed;
					}

					ComplianceController.TTSPdetailedResponseSubmit = function(
							buttonId, validationRequired) {
						var infoRespTTSPCompVal = {};
						var infoRespTTRcpt = [];
						var infoRespTTOthPanFy = [];
						var infoRespTTOthInfoVal = [];
						var infoRespTTExempDed = [];
						var infoRespTTSPCapGain = [];
						var infoRespTTSPStmpVal = [];
						infoRespTTSPCompVal.relInfoId = jq("#hiddenRelInfoId").text();
						var TTSPreceiptRelToabvInfoamount = jq(
								"."
										+ compliancepagecontainers.TTSP_DETAILED_RESPONSE_CONTAINER)
								.find(".ttspreceiptRelToabvInfoamount");
						var TTSPreceiptRelToabvInforemarks = jq(
								"."
										+ compliancepagecontainers.TTSP_DETAILED_RESPONSE_CONTAINER)
								.find(".ttspreceiptRelToabvInforemarks");
						var TTSPvalRelToOtherPanNo = jq(
								"."
										+ compliancepagecontainers.TTSP_DETAILED_RESPONSE_CONTAINER)
								.find(".ttspvalRelToOtherPanNo");
						var TTSPvalRelToOtherPanfinyear = jq(
								"."
										+ compliancepagecontainers.TTSP_DETAILED_RESPONSE_CONTAINER)
								.find(".ttspvalRelToOtherPanexemptIncomeType");
						var TTSPvalRelToOtherPanamount = jq(
								"."
										+ compliancepagecontainers.TTSP_DETAILED_RESPONSE_CONTAINER)
								.find(".ttspvalRelToOtherPanamount");
						var TTSPvalRelToOtherPanremarks = jq(
								"."
										+ compliancepagecontainers.TTSP_DETAILED_RESPONSE_CONTAINER)
								.find(".ttspvalRelToOtherPanremarks");
						var TTSPvalCvrdInOtherInfoamount = jq(
								"."
										+ compliancepagecontainers.TTSP_DETAILED_RESPONSE_CONTAINER)
								.find(".ttspvalCvrdInOtherInfoamount");
						var TTSPvalCvrdInOtherInforemarks = jq(
								"."
										+ compliancepagecontainers.TTSP_DETAILED_RESPONSE_CONTAINER)
								.find(".ttspvalCvrdInOtherInforemarks");
						var TTSPexptDedcExpexemptIncomeType = jq(
								"."
										+ compliancepagecontainers.TTSP_DETAILED_RESPONSE_CONTAINER)
								.find(".ttspexptDedcExpexemptIncomeType");
						var TTSPexptDedcExpamount = jq(
								"."
										+ compliancepagecontainers.TTSP_DETAILED_RESPONSE_CONTAINER)
								.find(".ttspexptDedcExpamount");
						var TTSPexptDedcExpremarks = jq(
								"."
										+ compliancepagecontainers.TTSP_DETAILED_RESPONSE_CONTAINER)
								.find(".ttspexptDedcExpremarks");
						var TTSPStampValueamount = jq(
								"."
										+ compliancepagecontainers.TTSP_DETAILED_RESPONSE_CONTAINER)
								.find(".ttspStampValueamount");
						var TTSPStampValueremarks = jq(
								"."
										+ compliancepagecontainers.TTSP_DETAILED_RESPONSE_CONTAINER)
								.find(".ttspStampValueremarks");

						var TTSPcapitalGainamount = jq(
								"."
										+ compliancepagecontainers.TTSP_DETAILED_RESPONSE_CONTAINER)
								.find(".ttspcapitalGainamount");
						var TTSPcapitalGainremarks = jq(
								"."
										+ compliancepagecontainers.TTSP_DETAILED_RESPONSE_CONTAINER)
								.find(".ttspcapitalGainremarks");

						var TTSPstampValueRow = jq(
								"."
										+ compliancepagecontainers.TTSP_DETAILED_RESPONSE_CONTAINER)
								.find(".ttspStampValueClass");
						var TTSPcapitalGainRow = jq(
								"."
										+ compliancepagecontainers.TTSP_DETAILED_RESPONSE_CONTAINER)
								.find(".ttspcapitalGainClass");
						var TTSPvalRelToOtherPanRow = jq(
								"."
										+ compliancepagecontainers.TTSP_DETAILED_RESPONSE_CONTAINER)
								.find(".ttspvalRelToOtherPanClass");
						var TTSPamountCoveredInOtherInformationRow = jq(
								"."
										+ compliancepagecontainers.TTSP_DETAILED_RESPONSE_CONTAINER)
								.find(".ttspvalCvrdInOtherInfoClass");
						var TTSPExceptionDeductionRow = jq(
								"."
										+ compliancepagecontainers.TTSP_DETAILED_RESPONSE_CONTAINER)
								.find(".ttspexptDedcExpClass");

						validstatus = null;

						var validTTSPvalRelToOtherPanStatus = null;
						var validTTSPAmountCoveredInOtherInfoStatus = null;
						var validTTSPExemptionDeductionStatus = null;
						var validTTSPstampValueStatus = null;
						var validTTSPcapitalGainRowStatus = null;
						/* UI Validation for Mandatory fields Starts */

						if (validationRequired == true) {
							ComplianceController.MandatoryFieldsChecker(
									TTSPreceiptRelToabvInfoamount,
									"ttspreceiptRelToabvInfoObj",
									errorMessages.AMOUNT_MANDATORY);
							ComplianceController.MandatoryFieldsChecker(TTSPStampValueamount,"ttspStampValueObj",errorMessages.AMOUNT_MANDATORY);
							ComplianceController.MandatoryFieldsChecker(TTSPcapitalGainamount,"ttspcapitalGainObj",errorMessages.AMOUNT_MANDATORY);
							validTTSPvalRelToOtherPanStatus = ComplianceController
									.validateTTSPvalRelToOtherPanRows(TTSPvalRelToOtherPanRow);
							validTTSPAmountCoveredInOtherInfoStatus = ComplianceController
									.validateTTSPAmountCoveredInOtherInformationRows(TTSPamountCoveredInOtherInformationRow);
							validTTSPExemptionDeductionStatus = ComplianceController
									.validateTTSPExemtionDeductionRows(TTSPExceptionDeductionRow);
							ComplianceController.panChecker(compliancepagecontainers.TTSP_DETAILED_RESPONSE_CONTAINER);
							ComplianceController.nameformatchecker(compliancepagecontainers.TTSP_DETAILED_RESPONSE_CONTAINER);
							ComplianceController.pinformatchecker(compliancepagecontainers.TTSP_DETAILED_RESPONSE_CONTAINER);
							ComplianceController.addressformatchecker(compliancepagecontainers.TTSP_DETAILED_RESPONSE_CONTAINER);
						}
						if (validstatus == false
								|| validTTSPvalRelToOtherPanStatus == false
								|| validTTSPAmountCoveredInOtherInfoStatus == false
								|| validTTSPExemptionDeductionStatus == false
								|| validTTSPstampValueStatus == false
								|| validTTSPcapitalGainRowStatus == false) {
							jq('html, body').animate({
								scrollTop : 0
							});
							return false;
						}
						
						
						ComplianceController.getQueryDetails=function()
						{
							
						}
						
						/* UI Validation for Mondatory fields Ends */

						ComplianceController.detailedResponseBaseConstructor(
								TTSPreceiptRelToabvInfoamount, "amount",
								infoRespTTRcpt, "ttspreceiptRelToabvInfoObj");
						var infoRespTTSPRcptremarksArray = [];
						ComplianceController.detailedResponseGenerator(
								infoRespTTSPRcptremarksArray,
								TTSPreceiptRelToabvInforemarks, infoRespTTRcpt,
								"remarks", "ttspreceiptRelToabvInfoObj");
						ComplianceController.detailedResponseBaseConstructor(
								TTSPvalRelToOtherPanNo, "pan",
								infoRespTTOthPanFy, "ttspvalRelToOtherPanObj");
						var infoRespTTSPOthPanFyFinYearArray = [];
						ComplianceController.detailedResponseGenerator(
								infoRespTTSPOthPanFyFinYearArray,
								TTSPvalRelToOtherPanfinyear,
								infoRespTTOthPanFy, "finYearId",
								"ttspvalRelToOtherPanObj");
						var infoRespTTSPOthPanFyAmountArray = [];
						ComplianceController.detailedResponseGenerator(
								infoRespTTSPOthPanFyAmountArray,
								TTSPvalRelToOtherPanamount, infoRespTTOthPanFy,
								"amount", "ttspvalRelToOtherPanObj");
						var infoRespTTSPOthPanFyremarksArray = [];
						ComplianceController.detailedResponseGenerator(
								infoRespTTSPOthPanFyremarksArray,
								TTSPvalRelToOtherPanremarks,
								infoRespTTOthPanFy, "remarks",
								"ttspvalRelToOtherPanObj");
						ComplianceController.detailedResponseBaseConstructor(
								TTSPvalCvrdInOtherInfoamount, "amount",
								infoRespTTOthInfoVal,
								"ttspvalCvrdInOtherInfoObj");
						var infoRespTTSPOthInfoValremarksarray = [];
						ComplianceController.detailedResponseGenerator(
								infoRespTTSPOthInfoValremarksarray,
								TTSPvalCvrdInOtherInforemarks,
								infoRespTTOthInfoVal, "remarks",
								"ttspvalCvrdInOtherInfoObj");
						ComplianceController.detailedResponseBaseConstructor(
								TTSPexptDedcExpexemptIncomeType,
								"exempDedCatId", infoRespTTExempDed,
								"ttspexptDedcExpObj");
						var infoRespTTSPExempDedamountarray = [];
						ComplianceController.detailedResponseGenerator(
								infoRespTTSPExempDedamountarray,
								TTSPexptDedcExpamount, infoRespTTExempDed,
								"amount", "ttspexptDedcExpObj");
						var infoRespTTSPExempDedremarksarray = [];
						ComplianceController.detailedResponseGenerator(
								infoRespTTSPExempDedremarksarray,
								TTSPexptDedcExpremarks, infoRespTTExempDed,
								"remarks", "ttspexptDedcExpObj");
						ComplianceController.detailedResponseBaseConstructor(
								TTSPStampValueamount, "amount",
								infoRespTTSPStmpVal, "ttspStampValueObj");
						var infoRespTTSPStmpValremarksArray = [];
						ComplianceController.detailedResponseGenerator(
								infoRespTTSPStmpValremarksArray,
								TTSPStampValueremarks, infoRespTTSPStmpVal,
								"remarks", "ttspStampValueObj");
						ComplianceController.detailedResponseBaseConstructor(
								TTSPcapitalGainamount, "amount",
								infoRespTTSPCapGain, "ttspcapitalGainObj");
						var infoRespTTSPCapGainremarksArray = [];
						ComplianceController.detailedResponseGenerator(
								infoRespTTSPCapGainremarksArray,
								TTSPcapitalGainremarks, infoRespTTSPCapGain,
								"remarks", "ttspcapitalGainObj");

						var TTSPreceiptRelToabvInfoamountSum = ComplianceController
								.amountCalculator(
										TTSPreceiptRelToabvInfoamount,
										"TTSPreceiptRelToabvInfoamountSum");
						var TTSPvalRelToOtherPanamountSum = ComplianceController
								.amountCalculator(TTSPvalRelToOtherPanamount,
										"TTSPvalRelToOtherPanamountSum");
						var TTSPvalCvrdInOtherInfoamountSum = ComplianceController
								.amountCalculator(TTSPvalCvrdInOtherInfoamount,
										"TTSPvalCvrdInOtherInfoamountSum");
						var TTSPexptDedcExpamountSum = ComplianceController
								.amountCalculator(TTSPexptDedcExpamount,
										"TTSPexptDedcExpamountSum");
						var TTSPStampValueamountSum = ComplianceController
								.amountCalculator(TTSPStampValueamount,
										"TTSPStampValueamountSum");
						var TTSPcapitalGainamountSum = ComplianceController
								.amountCalculator(TTSPcapitalGainamount,
										"TTSPcapitalGainamountSum");
						var TTSPtotIncLossAmountSum = parseInt(jq(
								"#ttsptotalComputedAmount").val());

						if (jq("#hiddenRelInfoId").text() != "") {
							infoRespTTSPCompVal.relInfoId = jq("#hiddenRelInfoId").text();
						} else {
							infoRespTTSPCompVal.relInfoId = jq("#hiddenRelInfoId").text();
						}
						infoRespTTSPCompVal.encValue=ComplianceControllerInfo.encrypt(TTSPtotIncLossAmountSum+'');
						ComplianceController.getTransId(infoRespTTSPCompVal,'TTSP');
						infoRespTTSPCompVal.infoRespTTRcpt = infoRespTTRcpt;
						infoRespTTSPCompVal.infoRespTTOthPanFy = infoRespTTOthPanFy;
						infoRespTTSPCompVal.infoRespTTOthInfoVal = infoRespTTOthInfoVal;
						infoRespTTSPCompVal.infoRespTTExempDed = infoRespTTExempDed;
						infoRespTTSPCompVal.infoRespTTSPCapGain = infoRespTTSPCapGain;
						infoRespTTSPCompVal.infoRespTTSPStmpVal = infoRespTTSPStmpVal;
						infoRespTTSPCompVal.totRcptAmount = TTSPreceiptRelToabvInfoamountSum;
						infoRespTTSPCompVal.totOthPanAmount = TTSPvalRelToOtherPanamountSum;
						infoRespTTSPCompVal.totInfoPanAmount = TTSPvalCvrdInOtherInfoamountSum;
						infoRespTTSPCompVal.totEdAmount = TTSPexptDedcExpamountSum;
						infoRespTTSPCompVal.totIncLossAmount = TTSPtotIncLossAmountSum;
						infoRespTTSPCompVal.totStampValue = TTSPStampValueamountSum;
						infoRespTTSPCompVal.totCapGainAmount = TTSPcapitalGainamountSum;
						var TTSP_GET_DETAILED_RESPONSE_SUBMIT_URL = complianceurls.TTSP_GET_DETAILED_RESPONSE_SUBMIT_URL;
						var TT_GET_DETAILED_RESPONSE_DRAFT_URL = complianceurls.TT_GET_DETAILED_RESPONSE_DRAFT_URL;
						var ttspdetailresponseinputs = jq(
								"."
										+ compliancepagecontainers.TTSP_DETAILED_RESPONSE_CONTAINER)
								.find("input");
						ComplianceController
								.sqlinjectionchecker(ttspdetailresponseinputs)
						if (XSSFailed == true) {
							jq('html, body').animate({
								scrollTop : 0
							});
							return false;
						}
						if (buttonId == "TTSP_detailedResponseSubmit") {
							infoRespTTSPCompVal.transStatus = "S";
							ComplianceController
									.ttspemptyrowprocessor(infoRespTTSPCompVal);
							var getTTSPdetailedresponsesubmit = ComplianceController
									.getCasesModel(
											TTSP_GET_DETAILED_RESPONSE_SUBMIT_URL,
											infoRespTTSPCompVal, token, header);
							if (getTTSPdetailedresponsesubmit.rspSubmitFlag.toUpperCase() == "S") {
									jq('html, body').animate({scrollTop : 0});
									ComplianceController
											.successor(sucessMessages.RESPOSNE_SUCCESS_WITHOUT_TRANSACTION_ID);
									
									ComplianceController.refrshInfoDetailsOnSave(getTTSPdetailedresponsesubmit,'TTSP');
									ComplianceController.saveconsolidatedpdfbyteprocessor();
							
							} else {
								jq('html, body').animate({scrollTop : 0});
								ComplianceController.validator(errorMessages.SERVER_RUNTIME_EXCEPTION);
							}
						}
						else if(buttonId == "TTSP_detailedResponseSaveDraft")
						{
							infoRespTTSPCompVal.transStatus = "D";
							ComplianceController
									.ttspemptyrowprocessor(infoRespTTSPCompVal);
							var getTTSPdetailedresponsesubmit = ComplianceController
									.getCasesModel(
											TT_GET_DETAILED_RESPONSE_DRAFT_URL,
											infoRespTTSPCompVal, token, header);
							if(getTTSPdetailedresponsesubmit.rspSubmitFlag.toUpperCase() == "D" )
							{
								jq('html, body').animate({scrollTop : 0});
								ComplianceController.successor(sucessMessages.DRAFT_SAVED_SUCCESSFULLY);
								ComplianceController.refrshInfoDetailsOnSave(getTTSPdetailedresponsesubmit,'TTSP');
							}
							else
							{
								jq('html, body').animate({scrollTop : 0});
								ComplianceController.validator(errorMessages.SERVER_RUNTIME_EXCEPTION);
							}
						}
					}

					ComplianceController.ttspemptyrowprocessor = function(
							infoRespTTSPCompVal) {
						var infoRespTTSPModifiedCompVal = {};
						var infoRespTTRcpt = infoRespTTSPCompVal.infoRespTTRcpt;
						var infoRespTTOthPanFy = infoRespTTSPCompVal.infoRespTTOthPanFy;
						var infoRespTTOthInfoVal = infoRespTTSPCompVal.infoRespTTOthInfoVal;
						var infoRespTTExempDed = infoRespTTSPCompVal.infoRespTTExempDed;
						var infoRespTTSPCapGain = infoRespTTSPCompVal.infoRespTTSPCapGain;
						var infoRespTTSPStmpVal = infoRespTTSPCompVal.infoRespTTSPStmpVal;
						infoRespTTSPModifiedCompVal.infoRespTTRcpt = [];
						infoRespTTSPModifiedCompVal.infoRespTTOthPanFy = [];
						infoRespTTSPModifiedCompVal.infoRespTTOthInfoVal = [];
						infoRespTTSPModifiedCompVal.infoRespTTExempDed = [];
						infoRespTTSPModifiedCompVal.infoRespTTSPCapGain = [];
						infoRespTTSPModifiedCompVal.infoRespTTSPStmpVal = [];
						ComplianceController.emptyrowremover(infoRespTTRcpt,
								"infoRespTTRcpt", infoRespTTSPModifiedCompVal,
								"relInfoId");
						ComplianceController.emptyrowremover(
								infoRespTTOthPanFy, "infoRespTTOthPanFy",
								infoRespTTSPModifiedCompVal, "relInfoId");
						ComplianceController.emptyrowremover(
								infoRespTTOthInfoVal, "infoRespTTOthInfoVal",
								infoRespTTSPModifiedCompVal, "relInfoId");
						ComplianceController.emptyrowremover(
								infoRespTTExempDed, "infoRespTTExempDed",
								infoRespTTSPModifiedCompVal, "relInfoId");
						ComplianceController.emptyrowremover(
								infoRespTTSPCapGain, "infoRespTTSPCapGain",
								infoRespTTSPModifiedCompVal, "relInfoId");
						ComplianceController.emptyrowremover(
								infoRespTTSPStmpVal, "infoRespTTSPStmpVal",
								infoRespTTSPModifiedCompVal, "relInfoId");
						infoRespTTSPCompVal.infoRespTTRcpt = infoRespTTSPModifiedCompVal.infoRespTTRcpt;
						infoRespTTSPCompVal.infoRespTTOthPanFy = infoRespTTSPModifiedCompVal.infoRespTTOthPanFy;
						infoRespTTSPCompVal.infoRespTTOthInfoVal = infoRespTTSPModifiedCompVal.infoRespTTOthInfoVal;
						infoRespTTSPCompVal.infoRespTTExempDed = infoRespTTSPModifiedCompVal.infoRespTTExempDed;
						infoRespTTSPCompVal.infoRespTTSPCapGain = infoRespTTSPModifiedCompVal.infoRespTTSPCapGain;
						infoRespTTSPCompVal.infoRespTTSPStmpVal = infoRespTTSPModifiedCompVal.infoRespTTSPStmpVal;
					}

					ComplianceController.SFTIdetailedResponseSubmit = function(
							buttonId, validationRequired) {
						var infoRespSFTICompVal = {};
						var sftiIncome = [];
						var sftiexemptReceipt = [];
						var sftirecievedFromIdentifiablePrsnsPan = [];
						var sftirecievedFromIdentifiablePrsnsNonPan = [];
						var sftirecievedFromUnIdentifiablePrsns = [];
						var sfticashDisclosed = [];
						var sftiinfoRespSFTIInvInc = [];
						var sftiinfoRespSFCiv = [];
						var SFTIcorrectInfoAmount = jq(
								"#"
										+ complianceformids.SFTI_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfticorrectInfoamount");
						var SFTIcorrectInfoRemarks = jq(
								"#"
										+ complianceformids.SFTI_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfticorrectInforemarks");
						var SFTIearlierIncomeAmount = jq(
								"#"
										+ complianceformids.SFTI_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sftiearlierIncomeamount");
						var SFTIearlierIncomeremarks = jq(
								"#"
										+ complianceformids.SFTI_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sftiearlierIncomeremarks");
						var SFTIexemptIncomeType = jq(
								"#"
										+ complianceformids.SFTI_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sftiexemptIncomeType");
						var SFTIoutofreceiptAmount = jq(
								"#"
										+ complianceformids.SFTI_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sftioutofreceiptamount");
						var SFTIoutofreceiptremarks = jq(
								"#"
										+ complianceformids.SFTI_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sftioutofreceiptremarks");
						var SFTIidentifiablePersonWithPanPANNO = jq(
								"#"
										+ complianceformids.SFTI_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sftiidentifiablePersonWithPanPANNO");
						var SFTIidentifiablePersonWithPanPersonName = jq(
								"#"
										+ complianceformids.SFTI_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(
										".sftiidentifiablePersonWithPanPersonName");
						var SFTIidentifiablePersonWithPanFinYear = jq(
								"#"
										+ complianceformids.SFTI_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sftiidentifiablePersonWithPanFinYear");
						var SFTIidentifiablePersonWithPanTranNature = jq(
								"#"
										+ complianceformids.SFTI_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(
										".sftiidentifiablePersonWithPanTranNature");
						var SFTIidentifiablePersonWithPanTransMode = jq(
								"#"
										+ complianceformids.SFTI_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sftiidentifiablePersonWithPanTransMode");
						var SFTIidentifiablePersonWithPanrcvdAmount = jq(
								"#"
										+ complianceformids.SFTI_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(
										".sftiidentifiablePersonWithPanrcvdAmount");
						var SFTIidentifiablePersonWithPanremarks = jq(
								"#"
										+ complianceformids.SFTI_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sftiidentifiablePersonWithPanremarks");
						var SFTIidentifiablePersonWithOutPanPersonName = jq(
								"#"
										+ complianceformids.SFTI_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(
										".sftiidentifiablePersonWithOutPanPersonName");
						var SFTIidentifiablePersonWithOutPanPersonAddress = jq(
								"#"
										+ complianceformids.SFTI_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(
										".sftiidentifiablePersonWithOutPanPersonAddress");
						var SFTIidentifiablePersonWithOutPanPinCode = jq(
								"#"
										+ complianceformids.SFTI_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(
										".sftiidentifiablePersonWithOutPanPinCode");
						var SFTIidentifiablePersonWithOutPanFinYear = jq(
								"#"
										+ complianceformids.SFTI_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(
										".sftiidentifiablePersonWithOutPanFinYear");
						var SFTIidentifiablePersonWithOutPanTransNature = jq(
								"#"
										+ complianceformids.SFTI_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(
										".sftiidentifiablePersonWithOutPanTransNature");
						var SFTIidentifiablePersonWithOutPanTransMode = jq(
								"#"
										+ complianceformids.SFTI_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(
										".sftiidentifiablePersonWithOutPanTransMode");
						var SFTIidentifiablePersonWithOutPanrcvdAmount = jq(
								"#"
										+ complianceformids.SFTI_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(
										".sftiidentifiablePersonWithOutPanrcvdAmount");
						var SFTIidentifiablePersonWithOutPanremarks = jq(
								"#"
										+ complianceformids.SFTI_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(
										".sftiidentifiablePersonWithOutPanremarks");
						var SFTIunidentifiablePersonFinYear = jq(
								"#"
										+ complianceformids.SFTI_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sftiunidentifiablePersonFinYear");
						var SFTIunidentifiablePersonTransNature = jq(
								"#"
										+ complianceformids.SFTI_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sftiunidentifiablePersonTransNature");
						var SFTIunidentifiablePersonTransMode = jq(
								"#"
										+ complianceformids.SFTI_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sftiunidentifiablePersonTransMode");
						var SFTIunidentifiablePersonrcvdAmount = jq(
								"#"
										+ complianceformids.SFTI_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sftiunidentifiablePersonrcvdAmount");
						var SFTIunidentifiablePersonremarks = jq(
								"#"
										+ complianceformids.SFTI_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sftiunidentifiablePersonremarks");
						var SFTIcashDisclosedTobeDisclosedamount = jq(
								"#"
										+ complianceformids.SFTI_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfticashDisclosedTobeDisclosedamount");
						var SFTIcashDisclosedTobeDisclosedremarks = jq(
								"#"
										+ complianceformids.SFTI_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfticashDisclosedTobeDisclosedremarks");
						var SFTIinvestmentAmount = jq(
								"#"
										+ complianceformids.SFTI_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sftiinvestmentAmount");
						var SFTIinvestmentAmountRemarks = jq(
								"#"
										+ complianceformids.SFTI_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sftiinvestmentAmountremarks");

						var SFTIearlierIncomeRow = jq(
								"."
										+ compliancepagecontainers.SFTI_DETAILED_RESPONSE_CONTAINER)
								.find(".sftiearlierIncomeClass");
						var SFTIoutofrecieptRow = jq(
								"."
										+ compliancepagecontainers.SFTI_DETAILED_RESPONSE_CONTAINER)
								.find(".sftioutofreceiptClass");
						var SFTIidentifiablewithpanRow = jq(
								"."
										+ compliancepagecontainers.SFTI_DETAILED_RESPONSE_CONTAINER)
								.find(".sftiidentifiablePersonWithPanClass");
						var SFTIidentifiablewithoutpanRow = jq(
								"."
										+ compliancepagecontainers.SFTI_DETAILED_RESPONSE_CONTAINER)
								.find(".sftiidentifiablePersonWithOutPanClass");
						var SFTIundentifiablepersonRow = jq(
								"."
										+ compliancepagecontainers.SFTI_DETAILED_RESPONSE_CONTAINER)
								.find(".sftiunidentifiablePersonClass");
						var SFTIcashdisclosedRow = jq(
								"."
										+ compliancepagecontainers.SFTI_DETAILED_RESPONSE_CONTAINER)
								.find(".sfticashDisclosedTobeDisclosedClass");
						var SFTIinvestmentduringyearRow = jq(
								"."
										+ compliancepagecontainers.SFTI_DETAILED_RESPONSE_CONTAINER)
								.find(".sftiinvestmentDuringTheYearClass");

						validstatus = null;
						var validSFTIearlierIncomeStatus = null;
						var validSFTIoutOfRecieptStatus = null;
						var validSFTIidentifiablePanStatus = null;
						var validSFTIidentifiableWithoutPanStatus = null;
						var validSFTIunidentfiablePersonStatus = null;
						var validSFTIcashDisclosedStatus = null;
						var validSFTIinvestmentStatus = null;
						/* UI Validation for Mondatory Fields Starts here */

						if (validationRequired == true) {
							ComplianceController.MandatoryFieldsChecker(
									SFTIcorrectInfoAmount,
									"sfticorrectInfoObj",
									errorMessages.AMOUNT_MANDATORY);
							validSFTIearlierIncomeStatus = ComplianceController
									.validateSFTIearlierIncomeRow(SFTIearlierIncomeRow);
							validSFTIoutOfRecieptStatus = ComplianceController
									.validateSFTIoutofrecieptRow(SFTIoutofrecieptRow);
							validSFTIidentifiablePanStatus = ComplianceController
									.validateSFTIidentifiablewithpanRow(SFTIidentifiablewithpanRow);
							validSFTIidentifiableWithoutPanStatus = ComplianceController
									.validateSFTIidentifiablewithoutpanRow(SFTIidentifiablewithoutpanRow);
							validSFTIunidentfiablePersonStatus = ComplianceController
									.validateSFTIundentifiablepersonRow(SFTIundentifiablepersonRow);
							validSFTIcashDisclosedStatus = ComplianceController
									.validateSFTIcashdisclosedRow(SFTIcashdisclosedRow);
							validSFTIinvestmentStatus = ComplianceController
									.validateSFTIinvestmentduringyearRow(SFTIinvestmentduringyearRow);
							ComplianceController.panChecker(compliancepagecontainers.SFTI_DETAILED_RESPONSE_CONTAINER);
							ComplianceController.nameformatchecker(compliancepagecontainers.SFTI_DETAILED_RESPONSE_CONTAINER);
							ComplianceController.pinformatchecker(compliancepagecontainers.SFTI_DETAILED_RESPONSE_CONTAINER);
							ComplianceController.addressformatchecker(compliancepagecontainers.SFTI_DETAILED_RESPONSE_CONTAINER);
							
							if(parseInt(ComplianceControllerInfo.getValueForParam(jq("#sftitotalComputedAmount").val(),'int'))<0){
								ComplianceController.validator(errorMessages.UNEXPLAINED_AMOUNT_MANDATORY);
								validstatus=false;
							}
							
						}
						if (validstatus == false
								|| validSFTIearlierIncomeStatus == false
								|| validSFTIoutOfRecieptStatus == false
								|| validSFTIidentifiablePanStatus == false
								|| validSFTIidentifiableWithoutPanStatus == false
								|| validSFTIunidentfiablePersonStatus == false
								|| validSFTIcashDisclosedStatus == false
								|| validSFTIinvestmentStatus == false) {
							jq('html, body').animate({
								scrollTop : 0
							});
							return false;
						}
						/* UI Validation for Mondatory Fields Ends here */
               
						ComplianceController.detailedResponseBaseConstructor(
								SFTIcorrectInfoAmount, "amount",
								sftiinfoRespSFCiv,
								"sftiinvestmentDuringTheYearObj");
						var sftiinfoRespSFCivRemarksArray = [];
						ComplianceController.detailedResponseGenerator(
								sftiinfoRespSFCivRemarksArray,
								SFTIcorrectInfoRemarks, sftiinfoRespSFCiv,
								"remarks", "sftiinvestmentDuringTheYearObj");
						ComplianceController.detailedResponseBaseConstructor(
								SFTIearlierIncomeAmount, "amount", sftiIncome,
								"sftiearlierIncomeObj");
						var sftiearlierIncomeRemarksArray = []; 
						
						ComplianceController.detailedResponseGenerator(
								sftiearlierIncomeRemarksArray,
								SFTIearlierIncomeremarks, sftiIncome,
								"remarks", "sftiearlierIncomeObj");
						ComplianceController.detailedResponseBaseConstructor(
								SFTIoutofreceiptAmount, "amount",
								sftiexemptReceipt, "sftioutofreceiptObj");
						var sftioutofreceiptRemarksArray = [];
						ComplianceController.detailedResponseGenerator(
								sftioutofreceiptRemarksArray,
								SFTIoutofreceiptremarks, sftiexemptReceipt,
								"remarks", "sftioutofreceiptObj");
						var sftiexemptIncTypeIdArray = [];
						ComplianceController.detailedResponseGenerator(
								sftiexemptIncTypeIdArray, SFTIexemptIncomeType,
								sftiexemptReceipt, "exemptIncTypeId",
								"sftioutofreceiptObj");
						ComplianceController.detailedResponseBaseConstructor(
								SFTIidentifiablePersonWithPanPANNO,
								"personPan",
								sftirecievedFromIdentifiablePrsnsPan,
								"sftiidentifiablePersonWithPanObj");
						var sftiidentifiablePersonWithPanPersonNameArray = [];
						ComplianceController.detailedResponseGenerator(
								sftiidentifiablePersonWithPanPersonNameArray,
								SFTIidentifiablePersonWithPanPersonName,
								sftirecievedFromIdentifiablePrsnsPan,
								"personName",
								"sftiidentifiablePersonWithPanObj");
						var sftiidentifiablePersonWithPanFinYearArray = [];
						ComplianceController.detailedResponseGenerator(
								sftiidentifiablePersonWithPanFinYearArray,
								SFTIidentifiablePersonWithPanFinYear,
								sftirecievedFromIdentifiablePrsnsPan,
								"finYear", "sftiidentifiablePersonWithPanObj");
						var sftiidentifiablePersonWithPanTranNatureArray = [];
						ComplianceController.detailedResponseGenerator(
								sftiidentifiablePersonWithPanTranNatureArray,
								SFTIidentifiablePersonWithPanTranNature,
								sftirecievedFromIdentifiablePrsnsPan,
								"transNatureId",
								"sftiidentifiablePersonWithPanObj");
						var sftiidentifiablePersonWithPanTransModeArray = [];
						ComplianceController.detailedResponseGenerator(
								sftiidentifiablePersonWithPanTransModeArray,
								SFTIidentifiablePersonWithPanTransMode,
								sftirecievedFromIdentifiablePrsnsPan,
								"transModeId",
								"sftiidentifiablePersonWithPanObj");
						var sftiidentifiablePersonWithPanrcvdAmountArray = [];
						ComplianceController.detailedResponseGenerator(
								sftiidentifiablePersonWithPanrcvdAmountArray,
								SFTIidentifiablePersonWithPanrcvdAmount,
								sftirecievedFromIdentifiablePrsnsPan,
								"receivedAmt",
								"sftiidentifiablePersonWithPanObj");
						var sftiidentifiablePersonWithPanremarksArray = [];
						ComplianceController.detailedResponseGenerator(
								sftiidentifiablePersonWithPanremarksArray,
								SFTIidentifiablePersonWithPanremarks,
								sftirecievedFromIdentifiablePrsnsPan,
								"remarks", "sftiidentifiablePersonWithPanObj");
						ComplianceController.detailedResponseBaseConstructor(
								SFTIidentifiablePersonWithOutPanPersonName,
								"personName",
								sftirecievedFromIdentifiablePrsnsNonPan,
								"sftiidentifiablePersonWithOutPanObj");
						var sftiidentifiablePersonWithOutPanPersonAddressArray = [];
						ComplianceController
								.detailedResponseGenerator(
										sftiidentifiablePersonWithOutPanPersonAddressArray,
										SFTIidentifiablePersonWithOutPanPersonAddress,
										sftirecievedFromIdentifiablePrsnsNonPan,
										"personAddr",
										"sftiidentifiablePersonWithOutPanObj");
						var sftiidentifiablePersonWithOutPanPinCodeArray = [];
						ComplianceController.detailedResponseGenerator(
								sftiidentifiablePersonWithOutPanPinCodeArray,
								SFTIidentifiablePersonWithOutPanPinCode,
								sftirecievedFromIdentifiablePrsnsNonPan,
								"pinCode",
								"sftiidentifiablePersonWithOutPanObj");
						var sftiidentifiablePersonWithOutPanFinYearArray = [];
						ComplianceController.detailedResponseGenerator(
								sftiidentifiablePersonWithOutPanFinYearArray,
								SFTIidentifiablePersonWithOutPanFinYear,
								sftirecievedFromIdentifiablePrsnsNonPan,
								"finYear",
								"sftiidentifiablePersonWithOutPanObj");
						var sftiidentifiablePersonWithOutPanTransNatureArray = [];
						ComplianceController
								.detailedResponseGenerator(
										sftiidentifiablePersonWithOutPanTransNatureArray,
										SFTIidentifiablePersonWithOutPanTransNature,
										sftirecievedFromIdentifiablePrsnsNonPan,
										"transNatureId",
										"sftiidentifiablePersonWithOutPanObj");
						var sftiidentifiablePersonWithOutPanTransModeArray = [];
						ComplianceController.detailedResponseGenerator(
								sftiidentifiablePersonWithOutPanTransModeArray,
								SFTIidentifiablePersonWithOutPanTransMode,
								sftirecievedFromIdentifiablePrsnsNonPan,
								"transModeId",
								"sftiidentifiablePersonWithOutPanObj");
						var sftiidentifiablePersonWithOutPanrcvdAmountArray = [];
						ComplianceController
								.detailedResponseGenerator(
										sftiidentifiablePersonWithOutPanrcvdAmountArray,
										SFTIidentifiablePersonWithOutPanrcvdAmount,
										sftirecievedFromIdentifiablePrsnsNonPan,
										"receivedAmt",
										"sftiidentifiablePersonWithOutPanObj");
						var sftiidentifiablePersonWithOutPanremarksArray = [];
						ComplianceController.detailedResponseGenerator(
								sftiidentifiablePersonWithOutPanremarksArray,
								SFTIidentifiablePersonWithOutPanremarks,
								sftirecievedFromIdentifiablePrsnsNonPan,
								"remarks",
								"sftiidentifiablePersonWithOutPanObj");
						ComplianceController.detailedResponseBaseConstructor(
								SFTIunidentifiablePersonTransNature,
								"transNatureId",
								sftirecievedFromUnIdentifiablePrsns,
								"sftiunidentifiablePersonObj");
						var sftiunidentifiablePersonTransModeArray = [];
						ComplianceController.detailedResponseGenerator(
								sftiunidentifiablePersonTransModeArray,
								SFTIunidentifiablePersonTransMode,
								sftirecievedFromUnIdentifiablePrsns,
								"transModeId", "sftiunidentifiablePersonObj");
						var sftiunidentifiablePersonrcvdAmountArray = [];
						ComplianceController.detailedResponseGenerator(
								sftiunidentifiablePersonrcvdAmountArray,
								SFTIunidentifiablePersonrcvdAmount,
								sftirecievedFromUnIdentifiablePrsns,
								"receivedAmt", "sftiunidentifiablePersonObj");
						var sftiunidentifiablePersonFinYearArray = [];
						ComplianceController.detailedResponseGenerator(
								sftiunidentifiablePersonFinYearArray,
								SFTIunidentifiablePersonFinYear,
								sftirecievedFromUnIdentifiablePrsns, "finYear",
								"sftiunidentifiablePersonObj");
						var sftiunidentifiablePersonremarksArray = [];
						ComplianceController.detailedResponseGenerator(
								sftiunidentifiablePersonremarksArray,
								SFTIunidentifiablePersonremarks,
								sftirecievedFromUnIdentifiablePrsns, "remarks",
								"sftiunidentifiablePersonObj");
						ComplianceController.detailedResponseBaseConstructor(
								SFTIcashDisclosedTobeDisclosedamount,
								"otherAmount", sfticashDisclosed,
								"sfticashDisclosedTobeDisclosedObj");
						var sfticashDisclosedTobeDisclosedremarksArray = [];
						ComplianceController.detailedResponseGenerator(
								sfticashDisclosedTobeDisclosedremarksArray,
								SFTIcashDisclosedTobeDisclosedremarks,
								sfticashDisclosed, "remarks",
								"sfticashDisclosedTobeDisclosedObj");
						ComplianceController.detailedResponseBaseConstructor(
								SFTIinvestmentAmount, "amount",
								sftiinfoRespSFTIInvInc,
								"sftiinvestmentDuringTheYearObj");
						var sftiInvestmentRemarksArray = [];
						ComplianceController.detailedResponseGenerator(
								sftiInvestmentRemarksArray,
								SFTIinvestmentAmountRemarks,
								sftiinfoRespSFTIInvInc, "remarks",
								"sftiinvestmentDuringTheYearObj");
						var SFTIearlierIncomeAmount = ComplianceController
								.amountCalculator(SFTIearlierIncomeAmount,
										"SFTIearlierIncomeAmount");
						var SFTIcorrectInfoAmount = ComplianceController
								.amountCalculator(SFTIcorrectInfoAmount,
										"SFTIcorrectInfoAmount");
						var SFTIoutofreceiptAmountSum = ComplianceController
								.amountCalculator(SFTIoutofreceiptAmount,
										"SFTIoutofreceiptAmountSum");
						var SFTIidentifiablePersonWithPanrcvdAmountSum = ComplianceController
								.amountCalculator(
										SFTIidentifiablePersonWithPanrcvdAmount,
										"SFTIidentifiablePersonWithPanrcvdAmountSum");
						var SFTIidentifiablePersonWithOutPanrcvdAmountSum = ComplianceController
								.amountCalculator(
										SFTIidentifiablePersonWithOutPanrcvdAmount,
										"SFTIidentifiablePersonWithOutPanrcvdAmountSum");
						var SFTIunidentifiablePersonrcvdAmountSum = ComplianceController
								.amountCalculator(
										SFTIunidentifiablePersonrcvdAmount,
										"SFTIunidentifiablePersonrcvdAmountSum");
						var SFTIcashDisclosedTobeDisclosedamountSum = ComplianceController
								.amountCalculator(
										SFTIcashDisclosedTobeDisclosedamount,
										"SFTIcashDisclosedTobeDisclosedamountSum");
						var SFTIinvestmentAmount = ComplianceController
								.amountCalculator(SFTIinvestmentAmount,
										"SFTIinvestmentAmount");
						var SFTItotalcomputedSum =parseInt(ComplianceControllerInfo.getValueForParam(jq("#sftitotalComputedAmount").val(),'int'));
						
						infoRespSFTICompVal.totIncAmount = SFTIearlierIncomeAmount;
						infoRespSFTICompVal.totExemptAmt = SFTIoutofreceiptAmountSum;
						infoRespSFTICompVal.totRcvdPanAmt = SFTIidentifiablePersonWithPanrcvdAmountSum;
						infoRespSFTICompVal.totRcvdNonPanAmt = SFTIidentifiablePersonWithOutPanrcvdAmountSum;
						infoRespSFTICompVal.totRcvdUnidnAmt = SFTIunidentifiablePersonrcvdAmountSum;
						infoRespSFTICompVal.totOtherAmt = SFTIcashDisclosedTobeDisclosedamountSum;
						infoRespSFTICompVal.totCivAmount = SFTIcorrectInfoAmount;
						infoRespSFTICompVal.totInvIncAmount = SFTIinvestmentAmount;
						infoRespSFTICompVal.totAdjAmt = SFTItotalcomputedSum;
						
						if (jq("#hiddenRelInfoId").text() != "") {
							infoRespSFTICompVal.relInfoId = jq("#hiddenRelInfoId").text();
						} else {
							infoRespSFTICompVal.relInfoId = jq("#hiddenRelInfoId").text();
						}
						infoRespSFTICompVal.encValue=ComplianceControllerInfo.encrypt(SFTItotalcomputedSum+'');
						ComplianceController.getTransId(infoRespSFTICompVal,'SFTI');
						infoRespSFTICompVal.sfIncome = sftiIncome;
						infoRespSFTICompVal.exemptReceipt = sftiexemptReceipt;
						infoRespSFTICompVal.recievedFromIdentifiablePrsnsPan = sftirecievedFromIdentifiablePrsnsPan;
						infoRespSFTICompVal.recievedFromIdentifiablePrsnsNonPan = sftirecievedFromIdentifiablePrsnsNonPan;
						infoRespSFTICompVal.recievedFromUnIdentifiablePrsns = sftirecievedFromUnIdentifiablePrsns;
						infoRespSFTICompVal.cashDisclosed = sfticashDisclosed;
						infoRespSFTICompVal.infoRespSFTIInvInc = sftiinfoRespSFTIInvInc;
						infoRespSFTICompVal.infoRespSFCiv = sftiinfoRespSFCiv;
						var SF_DETAILED_RESPONSE_SUBMIT_URL = complianceurls.SF_DETAILED_RESPONSE_SUBMIT_URL;
						var SF_DETAILED_RESPONSE_DRAFT_URL = complianceurls.SF_DETAILED_RESPONSE_DRAFT_URL;
						var detailresponseinputs = jq(
								"#"
										+ complianceformids.SFTI_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find("input");
						ComplianceController
								.sqlinjectionchecker(detailresponseinputs)
						if (XSSFailed == true) {
							jq('html, body').animate({
								scrollTop : 0
							});
							return false;
						}
						if (buttonId == "SFTI_detailedResponseSubmit") {
							infoRespSFTICompVal.transStatus = "S";
							ComplianceController
									.sftiemptyrowprocessor(infoRespSFTICompVal);
							var getdetailedresponsesubmit = ComplianceController
									.getCasesModel(
											SF_DETAILED_RESPONSE_SUBMIT_URL,
											infoRespSFTICompVal, token, header);							
							// Note"This is a workaround and a quick fix.
							// Ideally the status should
							// be updated based on the value returned from
							// service
							// THIS MECHANISM MUST NOT BE REPLICATED IN INSIGHT
							// PORTAL

							if (getdetailedresponsesubmit.rspSubmitFlag.toUpperCase() == "S" ) {

								jq('html, body').animate({scrollTop : 0});
								ComplianceController.successor(sucessMessages.RESPOSNE_SUCCESS_WITHOUT_TRANSACTION_ID);
								ComplianceController.refrshInfoDetailsOnSave(getdetailedresponsesubmit,'SFTI');
								ComplianceController.saveconsolidatedpdfbyteprocessor();
							}
							else
							{
								jq('html, body').animate({scrollTop : 0});
								ComplianceController.validator(errorMessages.SERVER_RUNTIME_EXCEPTION);
							}
						}
						else if(buttonId == "SFTI_detailedResponseSaveDraft")
						{
							infoRespSFTICompVal.transStatus = "D";
							//infoRespSFTICompVal.transId = jq("#transId").text();
							ComplianceController.sftiemptyrowprocessor(infoRespSFTICompVal,'relInfoId');
							var getdetailedresponsesubmit = ComplianceController
									.getCasesModel(
											SF_DETAILED_RESPONSE_DRAFT_URL,
											infoRespSFTICompVal, token, header);
							if (getdetailedresponsesubmit.rspSubmitFlag.toUpperCase() == "D")
							{
								jq('html, body').animate({scrollTop : 0});
								ComplianceController.successor(sucessMessages.DRAFT_SAVED_SUCCESSFULLY);
								ComplianceController.refrshInfoDetailsOnSave(getdetailedresponsesubmit,'SFTI');
							}
							else
							{
								jq('html, body').animate({scrollTop : 0});
								ComplianceController.validator(errorMessages.SERVER_RUNTIME_EXCEPTION);
							}
						}
					}

					ComplianceController.sftiemptyrowprocessor = function(
							infoRespSFTICompVal,ignoredIndex) {
						var infoRespSFTIModifiedCompVal = {};
						var sfIncome = infoRespSFTICompVal.sfIncome;
						var exemptReceipt = infoRespSFTICompVal.exemptReceipt;
						var recievedFromIdentifiablePrsnsPan = infoRespSFTICompVal.recievedFromIdentifiablePrsnsPan;
						var recievedFromIdentifiablePrsnsNonPan = infoRespSFTICompVal.recievedFromIdentifiablePrsnsNonPan;
						var recievedFromUnIdentifiablePrsns = infoRespSFTICompVal.recievedFromUnIdentifiablePrsns;
						var cashDisclosed = infoRespSFTICompVal.cashDisclosed;
						var infoRespSFCiv = infoRespSFTICompVal.infoRespSFCiv;
						var infoRespSFTIInvInc = infoRespSFTICompVal.infoRespSFTIInvInc;
						infoRespSFTIModifiedCompVal.sfIncome = [];
						infoRespSFTIModifiedCompVal.exemptReceipt = [];
						infoRespSFTIModifiedCompVal.recievedFromIdentifiablePrsnsPan = [];
						infoRespSFTIModifiedCompVal.recievedFromIdentifiablePrsnsNonPan = [];
						infoRespSFTIModifiedCompVal.recievedFromUnIdentifiablePrsns = [];
						infoRespSFTIModifiedCompVal.cashDisclosed = [];
						infoRespSFTIModifiedCompVal.infoRespSFCiv = [];
						infoRespSFTIModifiedCompVal.infoRespSFTIInvInc = [];
						
						
						
						if(typeof ignoredIndex=='undefined') ignoredIndex='relInfoId';
						
						ComplianceController.emptyrowremover(sfIncome,
								"sfIncome", infoRespSFTIModifiedCompVal,
								ignoredIndex);
						ComplianceController.emptyrowremover(exemptReceipt,
								"exemptReceipt", infoRespSFTIModifiedCompVal,
								ignoredIndex);
						ComplianceController.emptyrowremover(
								recievedFromIdentifiablePrsnsPan,
								"recievedFromIdentifiablePrsnsPan",
								infoRespSFTIModifiedCompVal, ignoredIndex);
						ComplianceController.emptyrowremover(
								recievedFromIdentifiablePrsnsNonPan,
								"recievedFromIdentifiablePrsnsNonPan",
								infoRespSFTIModifiedCompVal, ignoredIndex);
						ComplianceController.emptyrowremover(
								recievedFromUnIdentifiablePrsns,
								"recievedFromUnIdentifiablePrsns",
								infoRespSFTIModifiedCompVal, ignoredIndex);
						ComplianceController.emptyrowremover(cashDisclosed,
								"cashDisclosed", infoRespSFTIModifiedCompVal,
								ignoredIndex);
						ComplianceController.emptyrowremover(infoRespSFCiv,
								"infoRespSFCiv", infoRespSFTIModifiedCompVal,
								ignoredIndex);
						ComplianceController.emptyrowremover(
								infoRespSFTIInvInc, "infoRespSFTIInvInc",
								infoRespSFTIModifiedCompVal, ignoredIndex);
						
						infoRespSFTICompVal.sfIncome = infoRespSFTIModifiedCompVal.sfIncome;
						infoRespSFTICompVal.exemptReceipt = infoRespSFTIModifiedCompVal.exemptReceipt;
						infoRespSFTICompVal.recievedFromIdentifiablePrsnsPan = infoRespSFTIModifiedCompVal.recievedFromIdentifiablePrsnsPan;
						infoRespSFTICompVal.recievedFromIdentifiablePrsnsNonPan = infoRespSFTIModifiedCompVal.recievedFromIdentifiablePrsnsNonPan;
						infoRespSFTICompVal.recievedFromUnIdentifiablePrsns = infoRespSFTIModifiedCompVal.recievedFromUnIdentifiablePrsns;
						infoRespSFTICompVal.cashDisclosed = infoRespSFTIModifiedCompVal.cashDisclosed;
						infoRespSFTICompVal.infoRespSFCiv = infoRespSFTIModifiedCompVal.infoRespSFCiv;
						infoRespSFTICompVal.infoRespSFTIInvInc = infoRespSFTIModifiedCompVal.infoRespSFTIInvInc;
					}

					ComplianceController.SFdetailedResponseSubmit = function(
							buttonId, validationRequired,belongsto) {
						var infoRespSFCompVal = {};
						var sfIncome = [];
						var exemptReceipt = [];
						var recievedFromIdentifiablePrsnsPan = [];
						var recievedFromIdentifiablePrsnsNonPan = [];
						var recievedFromUnIdentifiablePrsns = [];
						var cashDisclosed = [];
						var infoRespSFCiv = [];
						
						
						var SFCorrectInfoAmount = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfcorrectInfoamount");
						var SFCorrectInforemarks = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfcorrectInforemarks");
						var SFearlierIncomeAmount = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfearlierIncomeamount");
						var SFearlierIncomeremarks = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfearlierIncomeremarks");
						var SFoutofreceiptAmount = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfoutofreceiptamount");
						var SFoutofreceiptremarks = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfoutofreceiptremarks");
						var SFoutofreceiptexmptIncomeType = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfoutofreceiptexmptIncomeType");
						var SFwithdrawnOutOfBankBankName = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfwithdrawnOutOfBankBankName");
						var SFwithdrawnOutOfBankifsccode = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfwithdrawnOutOfBankifsccode");
						var SFwithdrawnOutOfBankaccountNo = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfwithdrawnOutOfBankaccountNo");
						var SFwithdrawnOutOfBankwithdrwnAmount = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfwithdrawnOutOfBankwithdrwnAmount");
						var SFwithdrawnOutOfBankTransactionMode = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfwithdrawnOutOfBankTransactionMode");
						var SFwithdrawnOutOfBankremarks = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfwithdrawnOutOfBankremarks");
						var SFidentifiablePersonWithPanPANNO = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfidentifiablePersonWithPanPANNO");
						var SFidentifiablePersonWithPanPersonName = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfidentifiablePersonWithPanPersonName");
						var SFidentifiablePersonWithPanFinYear = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfidentifiablePersonWithPanfinYear");
						var SFidentifiablePersonWithPanTranNature = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfidentifiablePersonWithPanTranNature");
						var SFidentifiablePersonWithPanTransMode = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfidentifiablePersonWithPanTransMode");
						var SFidentifiablePersonWithPanrcvdAmount = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfidentifiablePersonWithPanrcvdAmount");
						var SFidentifiablePersonWithPanremarks = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfidentifiablePersonWithPanremarks");
						var SFidentifiablePersonWithOutPanPersonName = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(
										".sfidentifiablePersonWithOutPanPersonName");
						var SFidentifiablePersonWithOutPanPersonAddress = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(
										".sfidentifiablePersonWithOutPanPersonAddress");
						var SFidentifiablePersonWithOutPanPinCode = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfidentifiablePersonWithOutPanPinCode");
						var SFidentifiablePersonWithOutPanFinYear = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfidentifiablePersonWithOutPanfinYear");
						var SFidentifiablePersonWithOutPanTransNature = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(
										".sfidentifiablePersonWithOutPanTransNature");
						var SFidentifiablePersonWithOutPanTransMode = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(
										".sfidentifiablePersonWithOutPanTransMode");
						var SFidentifiablePersonWithOutPanrcvdAmount = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(
										".sfidentifiablePersonWithOutPanrcvdAmount");
						var SFidentifiablePersonWithOutPanremarks = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfidentifiablePersonWithOutPanremarks");
						var SFunidentifiablePersonFinYear = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfunidentifiablePersonfinYear");
						var SFunidentifiablePersonTransNature = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfunidentifiablePersonTransNature");
						var SFunidentifiablePersonTransMode = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfunidentifiablePersonTransMode");
						var SFunidentifiablePersonrcvdAmount = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfunidentifiablePersonrcvdAmount");
						var SFunidentifiablePersonremarks = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfunidentifiablePersonremarks");
						var SFcashDisclosedTobeDisclosedamount = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfcashDisclosedTobeDisclosedamount");
						var SFcashDisclosedTobeDisclosedremarks = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find(".sfcashDisclosedTobeDisclosedremarks");
						
						var SFearlierIncomeRow = jq(
								"."
										+ compliancepagecontainers.SF_DETAILED_RESPONSE_CONTAINER)
								.find(".sfearlierIncomeClass");
						var SFoutofrecieptRow = jq(
								"."
										+ compliancepagecontainers.SF_DETAILED_RESPONSE_CONTAINER)
								.find(".sfoutofreceiptClass");
						var SFidentifiablewithpanRow = jq(
								"."
										+ compliancepagecontainers.SF_DETAILED_RESPONSE_CONTAINER)
								.find(".sfidentifiablePersonWithPanClass");
						var SFidentifiablewithoutpanRow = jq(
								"."
										+ compliancepagecontainers.SF_DETAILED_RESPONSE_CONTAINER)
								.find(".sfidentifiablePersonWithOutPanClass");
						var SFundentifiablepersonRow = jq(
								"."
										+ compliancepagecontainers.SF_DETAILED_RESPONSE_CONTAINER)
								.find(".sfunidentifiablePersonClass");
						var SFcashdisclosedRow = jq(
								"."
										+ compliancepagecontainers.SF_DETAILED_RESPONSE_CONTAINER)
								.find(".sfcashDisclosedTobeDisclosedClass");

						validstatus = null;
						var validSFearlierIncomeStatus = null;
						var validSFoutOfRecieptStatus = null;
						var validSFidentifiablePanStatus = null;
						var validSFidentifiableWithoutPanStatus = null;
						var validSFunidentfiablePersonStatus = null;
						var validSFcashDisclosedStatus = null;
						var otherRelatedInfoAdditionalFieldvalidationfailed=false;
						/* UI Validation for Mondatory Fields Starts here */

						if (validationRequired == true) {
							if(belongsto == "OtherRelatedInfoDetils")
							{
							jq(".OtherRelatedinfoContainer").find("input").each(function(){
								if(jq(this).hasClass("MANDATORY"))
								{
									if(jq(this).attr("mandatoryvalidationdesc") == "Y")
									{
										if(jq(this).val() == "")
										{
											jq('html, body').animate({scrollTop : 0});
											jq(this).addClass("errorElement");
											ComplianceController.validator(jq(this).attr("mandatory").replace(/_/g," "));
											otherRelatedInfoAdditionalFieldvalidationfailed=true;
											return false;
										}
									}
								}
								if(jq(this).hasClass("PATTERN"))
								{
									if((new RegExp(jq(this).attr("patternvalidationdesc"))).test(jq(this).val()) == false )
									{
										jq('html, body').animate({scrollTop : 0});
										jq(this).addClass("errorElement");
										ComplianceController.validator(jq(this).attr("pattern").replace(/_/g," "));
										otherRelatedInfoAdditionalFieldvalidationfailed=true;
										return false;
									}
									
								}
								if(jq(this).hasClass("MAXLENGTH"))
								{
									if(jq(this).val().length > jq(this).attr("maxlengthvalidationdesc"))
									{
										jq('html, body').animate({scrollTop : 0});
										jq(this).addClass("errorElement");
										ComplianceController.validator(jq(this).attr("maxlength").replace(/_/g," "));
										otherRelatedInfoAdditionalFieldvalidationfailed=true;
										return false;
									}
								}	
								if(jq(this).hasClass("MINLENGTH"))
								{
									if(jq(this).val().length < jq(this).attr("minlengthvalidationdesc"))
									{
										jq('html, body').animate({scrollTop : 0});
										jq(this).addClass("errorElement");
										ComplianceController.validator(jq(this).attr("minlength").replace(/_/g," "));
										otherRelatedInfoAdditionalFieldvalidationfailed=true;
										return false;
									}
								}
								if(jq(this).hasClass("NOTCONTAIN"))
								{
									if(jq(this).val()== parseInt(jq(this).attr("notcontainvalidationdesc")))
									{
										jq('html, body').animate({scrollTop : 0});
										jq(this).addClass("errorElement");
										ComplianceController.validator(jq(this).attr("notcontain").replace(/_/g," "));
										otherRelatedInfoAdditionalFieldvalidationfailed=true;
										return false;
									}
								}
							});
							}
							if(otherRelatedInfoAdditionalFieldvalidationfailed)
							{
								return false;
							}
							ComplianceController.MandatoryFieldsChecker(
									SFCorrectInfoAmount, "sfCorrectInfoObj",
									errorMessages.AMOUNT_MANDATORY);
							validSFearlierIncomeStatus = ComplianceController
									.validateSFearlierIncomeRow(SFearlierIncomeRow);
							validSFoutOfRecieptStatus = ComplianceController
									.validateSFoutofrecieptRow(SFoutofrecieptRow);
							validSFidentifiablePanStatus = ComplianceController
									.validateSFidentifiablewithpanRow(SFidentifiablewithpanRow);
							validSFidentifiableWithoutPanStatus = ComplianceController
									.validateSFidentifiablewithoutpanRow(SFidentifiablewithoutpanRow);
							validSFunidentfiablePersonStatus = ComplianceController
									.validateSFundentifiablepersonRow(SFundentifiablepersonRow);
							validSFcashDisclosedStatus = ComplianceController
									.validateSFcashdisclosedRow(SFcashdisclosedRow);
							ComplianceController.panChecker(compliancepagecontainers.SF_DETAILED_RESPONSE_CONTAINER);
							ComplianceController.nameformatchecker(compliancepagecontainers.SF_DETAILED_RESPONSE_CONTAINER);
							ComplianceController.pinformatchecker(compliancepagecontainers.SF_DETAILED_RESPONSE_CONTAINER);
							ComplianceController.addressformatchecker(compliancepagecontainers.SF_DETAILED_RESPONSE_CONTAINER);
							
							if(parseInt(ComplianceControllerInfo.getValueForParam(jq("#sftotalComputedAmount").val(),'int'))<0){
								ComplianceController.validator(errorMessages.UNEXPLAINED_AMOUNT_MANDATORY);
								validstatus=false;
							}
						}			
						
						
						if (validstatus == false
								|| validSFearlierIncomeStatus == false
								|| validSFoutOfRecieptStatus == false
								|| validSFidentifiablePanStatus == false
								|| validSFidentifiableWithoutPanStatus == false
								|| validSFunidentfiablePersonStatus == false
								|| validSFcashDisclosedStatus == false) {
							jq('html, body').animate({
								scrollTop : 0
							});
							return false;
						} 
						
						//detailedResponseGenerator
						/* UI Validation for Mondatory Fields Ends here */
						ComplianceController.detailedResponseBaseConstructor(
								SFCorrectInfoAmount, "amount", infoRespSFCiv,
								"sfCorrectInfoObj");
						var infoRespSFCivRemarksArray = [];
						
						ComplianceController.detailedResponseGenerator(infoRespSFCivRemarksArray,SFCorrectInforemarks, infoRespSFCiv, "remarks","sfCorrectInfoObj");
						ComplianceController.detailedResponseBaseConstructor(SFearlierIncomeAmount, "amount", sfIncome,"sfearlierIncomeObj");
						var earlierIncomeRemarksArray = [];
						
						
						
						ComplianceController.detailedResponseGenerator(earlierIncomeRemarksArray,SFearlierIncomeremarks, sfIncome, "remarks","sfearlierIncomeObj");
						ComplianceController.detailedResponseBaseConstructor(
								SFoutofreceiptAmount, "amount", exemptReceipt,
								"sfOutofreceiptObj");
						var outofreceiptRemarksArray = [];
						
						
						ComplianceController.detailedResponseGenerator(outofreceiptRemarksArray,SFoutofreceiptremarks, exemptReceipt,"remarks", "sfOutofreceiptObj");
						var outofreceiptexemptrcptArray = [];
						
						
						
						ComplianceController.detailedResponseGenerator(
								outofreceiptexemptrcptArray,
								SFoutofreceiptexmptIncomeType, exemptReceipt,
								"exemptIncTypeId", "sfOutofreceiptObj");
						ComplianceController.detailedResponseBaseConstructor(
								SFidentifiablePersonWithPanPANNO, "personPan",
								recievedFromIdentifiablePrsnsPan,
								"sfidentifiablePersonWithPanObj");
						var identifiablePersonWithPanPersonNameArray = [];
						
						
						
						ComplianceController.detailedResponseGenerator(
								identifiablePersonWithPanPersonNameArray,
								SFidentifiablePersonWithPanPersonName,
								recievedFromIdentifiablePrsnsPan, "personName",
								"sfidentifiablePersonWithPanObj");
						var identifiablePersonWithPanFinYearArray = [];
						
						
						
						ComplianceController.detailedResponseGenerator(
								identifiablePersonWithPanFinYearArray,
								SFidentifiablePersonWithPanFinYear,
								recievedFromIdentifiablePrsnsPan, "finYear",
								"sfidentifiablePersonWithPanObj");
						var identifiablePersonWithPanTranNatureArray = [];
						
						
						
						ComplianceController.detailedResponseGenerator(
								identifiablePersonWithPanTranNatureArray,
								SFidentifiablePersonWithPanTranNature,
								recievedFromIdentifiablePrsnsPan,
								"transNatureId",
								"sfidentifiablePersonWithPanObj");
						var identifiablePersonWithPanTransModeArray = [];
						
						
						
						ComplianceController
								.detailedResponseGenerator(
										identifiablePersonWithPanTransModeArray,
										SFidentifiablePersonWithPanTransMode,
										recievedFromIdentifiablePrsnsPan,
										"transModeId",
										"sfidentifiablePersonWithPanObj");
						var identifiablePersonWithPanrcvdAmountArray = [];
						
						
						
						ComplianceController
								.detailedResponseGenerator(
										identifiablePersonWithPanrcvdAmountArray,
										SFidentifiablePersonWithPanrcvdAmount,
										recievedFromIdentifiablePrsnsPan,
										"receivedAmt",
										"sfidentifiablePersonWithPanObj");
						var identifiablePersonWithPanremarksArray = [];
						
						
						
						ComplianceController.detailedResponseGenerator(
								identifiablePersonWithPanremarksArray,
								SFidentifiablePersonWithPanremarks,
								recievedFromIdentifiablePrsnsPan, "remarks",
								"sfidentifiablePersonWithPanObj");
						ComplianceController.detailedResponseBaseConstructor(
								SFidentifiablePersonWithOutPanPersonName,
								"personName",
								recievedFromIdentifiablePrsnsNonPan,
								"sfidentifiablePersonWithOutPanObj");
						var identifiablePersonWithOutPanPersonAddressArray = [];
						
						
						
						ComplianceController.detailedResponseGenerator(
								identifiablePersonWithOutPanPersonAddressArray,
								SFidentifiablePersonWithOutPanPersonAddress,
								recievedFromIdentifiablePrsnsNonPan,
								"personAddr",
								"sfidentifiablePersonWithOutPanObj");
						var identifiablePersonWithOutPanPinCodeArray = [];
						
						
						
						ComplianceController.detailedResponseGenerator(
								identifiablePersonWithOutPanPinCodeArray,
								SFidentifiablePersonWithOutPanPinCode,
								recievedFromIdentifiablePrsnsNonPan, "pinCode",
								"sfidentifiablePersonWithOutPanObj");
						var identifiablePersonWithOutPanFinYearArray = [];
						
						
						ComplianceController.detailedResponseGenerator(
								identifiablePersonWithOutPanFinYearArray,
								SFidentifiablePersonWithOutPanFinYear,
								recievedFromIdentifiablePrsnsNonPan, "finYear",
								"sfidentifiablePersonWithOutPanObj");
						var identifiablePersonWithOutPanTransNatureArray = [];
						
						
						ComplianceController.detailedResponseGenerator(
								identifiablePersonWithOutPanTransNatureArray,
								SFidentifiablePersonWithOutPanTransNature,
								recievedFromIdentifiablePrsnsNonPan,
								"transNatureId",
								"sfidentifiablePersonWithOutPanObj");
						var identifiablePersonWithOutPanTransModeArray = [];
						
						
						ComplianceController.detailedResponseGenerator(
								identifiablePersonWithOutPanTransModeArray,
								SFidentifiablePersonWithOutPanTransMode,
								recievedFromIdentifiablePrsnsNonPan,
								"transModeId",
								"sfidentifiablePersonWithOutPanObj");
						var identifiablePersonWithOutPanrcvdAmountArray = [];
						
						
						ComplianceController.detailedResponseGenerator(
								identifiablePersonWithOutPanrcvdAmountArray,
								SFidentifiablePersonWithOutPanrcvdAmount,
								recievedFromIdentifiablePrsnsNonPan,
								"receivedAmt",
								"sfidentifiablePersonWithOutPanObj");
						var identifiablePersonWithOutPanremarksArray = [];
						
						
						ComplianceController.detailedResponseGenerator(
								identifiablePersonWithOutPanremarksArray,
								SFidentifiablePersonWithOutPanremarks,
								recievedFromIdentifiablePrsnsNonPan, "remarks",
								"sfidentifiablePersonWithOutPanObj");
						ComplianceController.detailedResponseBaseConstructor(
								SFunidentifiablePersonTransNature,
								"transNatureId",
								recievedFromUnIdentifiablePrsns,
								"sfunidentifiablePersonObj");
						var unidentifiablePersonFinYearArray = [];
						
						
						ComplianceController.detailedResponseGenerator(
								unidentifiablePersonFinYearArray,
								SFunidentifiablePersonFinYear,
								recievedFromUnIdentifiablePrsns, "finYear",
								"sfunidentifiablePersonObj");
						var unidentifiablePersonTransModeArray = [];
						
						
						ComplianceController.detailedResponseGenerator(
								unidentifiablePersonTransModeArray,
								SFunidentifiablePersonTransMode,
								recievedFromUnIdentifiablePrsns, "transModeId",
								"sfunidentifiablePersonObj");
						var unidentifiablePersonrcvdAmountArray = [];
						
						
						ComplianceController.detailedResponseGenerator(
								unidentifiablePersonrcvdAmountArray,
								SFunidentifiablePersonrcvdAmount,
								recievedFromUnIdentifiablePrsns, "receivedAmt",
								"sfunidentifiablePersonObj");
						var unidentifiablePersonremarksArray = [];
						
						
						ComplianceController.detailedResponseGenerator(
								unidentifiablePersonremarksArray,
								SFunidentifiablePersonremarks,
								recievedFromUnIdentifiablePrsns, "remarks",
								"sfunidentifiablePersonObj");
						ComplianceController.detailedResponseBaseConstructor(
								SFcashDisclosedTobeDisclosedamount,
								"otherAmount", cashDisclosed,
								"sfcashDisclosedTobeDisclosedObj");
						var cashDisclosedTobeDisclosedremarksArray = [];
						
						
						ComplianceController.detailedResponseGenerator(
								cashDisclosedTobeDisclosedremarksArray,
								SFcashDisclosedTobeDisclosedremarks,
								cashDisclosed, "remarks",
								"sfcashDisclosedTobeDisclosedObj");

						var SFoutofreceiptAmountSum = ComplianceController
								.amountCalculator(SFoutofreceiptAmount,
										"SFoutofreceiptAmountSum");
						var SFwithdrawnOutOfBankwithdrwnAmountSum = ComplianceController
								.amountCalculator(
										SFwithdrawnOutOfBankwithdrwnAmount,
										"SFwithdrawnOutOfBankwithdrwnAmountSum");
						var SFidentifiablePersonWithPanrcvdAmountSum = ComplianceController
								.amountCalculator(
										SFidentifiablePersonWithPanrcvdAmount,
										"SFidentifiablePersonWithPanrcvdAmountSum");
						var SFidentifiablePersonWithOutPanrcvdAmountSum = ComplianceController
								.amountCalculator(
										SFidentifiablePersonWithOutPanrcvdAmount,
										"SFidentifiablePersonWithOutPanrcvdAmountSum");
						var SFunidentifiablePersonrcvdAmountSum = ComplianceController
								.amountCalculator(
										SFunidentifiablePersonrcvdAmount,
										"SFunidentifiablePersonrcvdAmountSum");
						var SFcashDisclosedTobeDisclosedamountSum = ComplianceController
								.amountCalculator(
										SFcashDisclosedTobeDisclosedamount,
										"SFcashDisclosedTobeDisclosedamountSum");
						var SFinfoRespSFCivamountSum = ComplianceController
								.amountCalculator(SFCorrectInfoAmount,
										"SFSFCorrectInfoAmountSum");
						var SFtotIncAmountSum = ComplianceController
								.amountCalculator(SFearlierIncomeAmount,
										"SFearlierIncomeAmountSum");
						var SFtotalComputedvalue = parseInt(ComplianceControllerInfo.getValueForParam(jq("#sftotalComputedAmount").val(),'int'));
						
						infoRespSFCompVal.totExemptAmt = SFoutofreceiptAmountSum;
						infoRespSFCompVal.totWithdrnAcctAmt = SFwithdrawnOutOfBankwithdrwnAmountSum;
						infoRespSFCompVal.totRcvdPanAmt = SFidentifiablePersonWithPanrcvdAmountSum;
						infoRespSFCompVal.totRcvdNonPanAmt = SFidentifiablePersonWithOutPanrcvdAmountSum;
						infoRespSFCompVal.totRcvdUnidnAmt = SFunidentifiablePersonrcvdAmountSum;
						infoRespSFCompVal.totOtherAmt = SFcashDisclosedTobeDisclosedamountSum;
						infoRespSFCompVal.totCivAmount = SFinfoRespSFCivamountSum;
						infoRespSFCompVal.totIncAmount = SFtotIncAmountSum;
						infoRespSFCompVal.totAdjAmt = SFtotalComputedvalue;
						if (jq("#hiddenRelInfoId").text() != "") {
							infoRespSFCompVal.relInfoId = jq("#hiddenRelInfoId").text();
						} else {
							infoRespSFCompVal.relInfoId = jq("#hiddenRelInfoId").text();
						}
						infoRespSFCompVal.encValue=ComplianceControllerInfo.encrypt(SFtotalComputedvalue+'');
						ComplianceController.getTransId(infoRespSFCompVal,'SF');
						
						infoRespSFCompVal.sfIncome = sfIncome;
						infoRespSFCompVal.exemptReceipt = exemptReceipt;
						infoRespSFCompVal.recievedFromIdentifiablePrsnsPan = recievedFromIdentifiablePrsnsPan;
						infoRespSFCompVal.recievedFromIdentifiablePrsnsNonPan = recievedFromIdentifiablePrsnsNonPan;
						infoRespSFCompVal.recievedFromUnIdentifiablePrsns = recievedFromUnIdentifiablePrsns;
						infoRespSFCompVal.cashDisclosed = cashDisclosed;
						infoRespSFCompVal.infoRespSFCiv = infoRespSFCiv;
						if(belongsto == "RelatedInfoDetils")
						{
							var GET_DETAILED_RESPONSE_SUBMIT_URL = complianceurls.SF_DETAILED_RESPONSE_SUBMIT_URL;
						}
						else if( belongsto == "OtherRelatedInfoDetils")
						{
							var GET_DETAILED_RESPONSE_SUBMIT_URL = complianceurls.OTHER_DETAILED_RESPONSE_SUBMIT_URL;
						}	
						var SF_DETAILED_RESPONSE_DRAFT_URL = complianceurls.SF_DETAILED_RESPONSE_DRAFT_URL
						var detailresponseinputs = jq(
								"#"
										+ complianceformids.SF_RELATED_INFO_DETAILED_RESPONSE_TABLE)
								.find("input");
						ComplianceController.sqlinjectionchecker(detailresponseinputs)
						if (XSSFailed == true) {
							jq('html, body').animate({
								scrollTop : 0
							});
							return false;
						}
						if (buttonId == "SF_detailedResponseSubmit") {
							infoRespSFCompVal.transStatus = "S";
							
							ComplianceController.sfemptyrowprocessor(infoRespSFCompVal);
							var getdetailedresponsesubmit=null;
							if(belongsto == "RelatedInfoDetils")
							{
								  getdetailedresponsesubmit = ComplianceController.getCasesModel(GET_DETAILED_RESPONSE_SUBMIT_URL,infoRespSFCompVal, token, header);
							}
							else if(belongsto == "OtherRelatedInfoDetils")
							{
								var otherDataMap={};
								var otherreltedInfodtatosend={};								  
								var infoDetails={};
								var otherRelatedInfoAdditionalFieldvalidationfailed=false;
								jq(".OtherRelatedinfoContainer").find("input").each(function(){
									infoDetails[jq(this).attr("id")]=jq(this).val();
								});
								otherreltedInfodtatosend.infoRespSFCompVal=infoRespSFCompVal;
								otherDataMap.verifSeqId=jq("#verifSeqId").text();
								otherDataMap.caseSeqId=jq("#caseSeqId").text();
								otherDataMap.partyName=jq("#mainEntityName").text();
								otherDataMap.infoTypeId=jq("#otherRelatedInfoinfoTypeId").text();
								otherDataMap.verifType=jq("#otherRelatedInfoverifTypeId").text();
								otherDataMap.infoGroupId=jq("#otherRelatedInfobelongingfieldinfoGroup").text();
								otherDataMap.infoDetails=infoDetails;
								otherreltedInfodtatosend.otherDataMap=otherDataMap;
								  getdetailedresponsesubmit = ComplianceController.getCasesModel(GET_DETAILED_RESPONSE_SUBMIT_URL,otherreltedInfodtatosend, token, header);
							}
							
							if (getdetailedresponsesubmit.rspSubmitFlag.toUpperCase() == "S") {								
									jq('html, body').animate({scrollTop : 0});
									ComplianceController.successor(sucessMessages.RESPOSNE_SUCCESS_WITHOUT_TRANSACTION_ID);
									
									setTimeout(
								function() {
									ComplianceController.refrshInfoDetailsOnSave(getdetailedresponsesubmit,jq("#verifType").text());
								}, 1000);
									
									if(belongsto == "RelatedInfoDetils")
									{
										ComplianceController.saveconsolidatedpdfbyteprocessor();
									}
								
								
							} else {
								jq('html, body').animate({scrollTop : 0});
								ComplianceController.validator(errorMessages.SERVER_RUNTIME_EXCEPTION);
							}
						} else if(buttonId == "SF_detailedResponseSaveDraft"){
							infoRespSFCompVal.transStatus = "D";
							ComplianceController.sfemptyrowprocessor(infoRespSFCompVal);
							var getdetailedresponsesubmit=null;
							if(belongsto == "RelatedInfoDetils")
							{
								  getdetailedresponsesubmit = ComplianceController.getCasesModel(SF_DETAILED_RESPONSE_DRAFT_URL,infoRespSFCompVal, token, header);
							}
							else if(belongsto == "OtherRelatedInfoDetils")
							{
								var SF_OTHER_SF_DETAILED_RESPONSE_DRAFT_URL=complianceurls.SF_OTHER_SF_DETAILED_RESPONSE_DRAFT_URL;
								var otherDataMap={};
								var otherreltedInfodtatosend={};								  
								var infoDetails={};
								jq(".OtherRelatedinfoContainer").find("input").each(function(){
									infoDetails[jq(this).attr("id")]=jq(this).val();
								});
								otherreltedInfodtatosend.infoRespSFCompVal=infoRespSFCompVal;
								otherDataMap.verifSeqId=jq("#verifSeqId").text();
								otherDataMap.caseSeqId=jq("#caseSeqId").text();
								otherDataMap.partyName=jq("#mainEntityName").text();
								otherDataMap.infoTypeId=jq("#otherRelatedInfoinfoTypeId").text();
								otherDataMap.verifType=jq("#otherRelatedInfoverifTypeId").text();
								otherDataMap.infoGroupId=jq("#otherRelatedInfobelongingfieldinfoGroup").text();
								otherDataMap.tsnId=jq("#otherRelatedInfobelongingfieldtsnId").text();
								otherDataMap.infoDetails=infoDetails;
								otherreltedInfodtatosend.otherDataMap=otherDataMap;
								  getdetailedresponsesubmit = ComplianceController.getCasesModel(SF_OTHER_SF_DETAILED_RESPONSE_DRAFT_URL,otherreltedInfodtatosend, token, header);
							}
								if(getdetailedresponsesubmit.rspSubmitFlag.toUpperCase() == "D")
								{	
										jq('html, body').animate({scrollTop : 0});
										ComplianceController.successor(sucessMessages.DRAFT_SAVED_SUCCESSFULLY);
										 
										setTimeout(
												function() {
													ComplianceController.refrshInfoDetailsOnSave(getdetailedresponsesubmit,belongsto == "OtherRelatedInfoDetils"?'SFVOL':'SF');
												}, 1000);
													
									
								}
								else {
									jq('html, body').animate({scrollTop : 0});
									ComplianceController.validator(errorMessages.SERVER_RUNTIME_EXCEPTION);
								}
							}
													
					}

					ComplianceController.sfemptyrowprocessor = function(
							infoRespSFCompVal) {
						var infoRespSFModifiedCompVal = {};
						var sfIncome = infoRespSFCompVal.sfIncome;
						var exemptReceipt = infoRespSFCompVal.exemptReceipt;
						var recievedFromIdentifiablePrsnsPan = infoRespSFCompVal.recievedFromIdentifiablePrsnsPan;
						var recievedFromIdentifiablePrsnsNonPan = infoRespSFCompVal.recievedFromIdentifiablePrsnsNonPan;
						var recievedFromUnIdentifiablePrsns = infoRespSFCompVal.recievedFromUnIdentifiablePrsns;
						var cashDisclosed = infoRespSFCompVal.cashDisclosed;
						var infoRespSFCiv = infoRespSFCompVal.infoRespSFCiv;
						infoRespSFModifiedCompVal.sfIncome = [];
						infoRespSFModifiedCompVal.exemptReceipt = [];
						infoRespSFModifiedCompVal.recievedFromIdentifiablePrsnsPan = [];
						infoRespSFModifiedCompVal.recievedFromIdentifiablePrsnsNonPan = [];
						infoRespSFModifiedCompVal.recievedFromUnIdentifiablePrsns = [];
						infoRespSFModifiedCompVal.cashDisclosed = [];
						infoRespSFModifiedCompVal.infoRespSFCiv = [];
						
						var ignoredIndex='relInfoId';
						
						ComplianceController.emptyrowremover(sfIncome,
								"sfIncome", infoRespSFModifiedCompVal,
								ignoredIndex);
						ComplianceController.emptyrowremover(exemptReceipt,
								"exemptReceipt", infoRespSFModifiedCompVal,
								ignoredIndex);
						ComplianceController.emptyrowremover(
								recievedFromIdentifiablePrsnsPan,
								"recievedFromIdentifiablePrsnsPan",
								infoRespSFModifiedCompVal, ignoredIndex);
						ComplianceController.emptyrowremover(
								recievedFromIdentifiablePrsnsNonPan,
								"recievedFromIdentifiablePrsnsNonPan",
								infoRespSFModifiedCompVal, ignoredIndex);
						ComplianceController.emptyrowremover(
								recievedFromUnIdentifiablePrsns,
								"recievedFromUnIdentifiablePrsns",
								infoRespSFModifiedCompVal, ignoredIndex);
						ComplianceController.emptyrowremover(cashDisclosed,
								"cashDisclosed", infoRespSFModifiedCompVal,
								ignoredIndex);
						ComplianceController.emptyrowremover(infoRespSFCiv,
								"infoRespSFCiv", infoRespSFModifiedCompVal,
								ignoredIndex);
						
						infoRespSFCompVal.sfIncome = infoRespSFModifiedCompVal.sfIncome;
						infoRespSFCompVal.exemptReceipt = infoRespSFModifiedCompVal.exemptReceipt;
						infoRespSFCompVal.recievedFromIdentifiablePrsnsPan = infoRespSFModifiedCompVal.recievedFromIdentifiablePrsnsPan;
						infoRespSFCompVal.recievedFromIdentifiablePrsnsNonPan = infoRespSFModifiedCompVal.recievedFromIdentifiablePrsnsNonPan;
						infoRespSFCompVal.recievedFromUnIdentifiablePrsns = infoRespSFModifiedCompVal.recievedFromUnIdentifiablePrsns;
						infoRespSFCompVal.cashDisclosed = infoRespSFModifiedCompVal.cashDisclosed;
						infoRespSFCompVal.infoRespSFCiv = infoRespSFModifiedCompVal.infoRespSFCiv;
					}

					// TODO: This is a quick fix. Need to revisit this function
					// and refactor it to
					// make it readable
					ComplianceController.emptyrowremover = function(
							sourceArray, childAarray, parentArray, ignoreField) {
						var sourceArray = sourceArray;
						var temparray = [];
						for (i = 0; i < sourceArray.length; i++) {
							var isRowEmpty = true;
							jq.each(sourceArray[i], function(index, value) {
								if (index!=ignoreField) {
										if (isRowEmpty) {
										if (sourceArray[i][index] != "") {
											isRowEmpty = false;
											return true;
										}
									}
								}
							});

							if (!isRowEmpty) {
								temparray.push(sourceArray[i]);
							}
						}

						parentArray[childAarray] = temparray;
					}

					ComplianceController.relatedInfoStatusUpdator = function() {
						var GET_VERIF_ISSUES_DETAILS_URL = complianceurls.GET_VERIF_ISSUES_DETAILS_URL;
						var VERIF_ISSUE_DETAILS_FILTER_FORM_ID = complianceformids.VERIF_ISSUE_DETAILS_FILTER_FORM_ID;
						var VERIF_ISSUE_DETAILS_FORM_ELEMENT_CLASS = complianceformelementclasses.VERIF_ISSUE_DETAILS_FORM_ELEMENT_CLASS;
						var dataTosend = {};
						dataTosend.verifId = jq("#verifId").text();

						var verfiIssueDetailsURL = ComplianceController.getURL(
								contextRoot, GET_VERIF_ISSUES_DETAILS_URL);
						var verifIssueDetails = ComplianceController
								.getCasesModel(verfiIssueDetailsURL,
										dataTosend, token, header);
						var verifIssueDetailsFilters = verifIssueDetails.complianceviewVerifDetailDisplay;
						ComplianceController.bindModelToForm(
								verifIssueDetailsFilters,
								VERIF_ISSUE_DETAILS_FILTER_FORM_ID,
								VERIF_ISSUE_DETAILS_FORM_ELEMENT_CLASS);
						var relatedInfoList = verifIssueDetails.complianceviewVerifRelInfoList;
						ComplianceController.bindModelToGridView(
								relatedInfoList,
								compliancetable.RELATED_INFO_TABLE);
					}

					ComplianceController.successor = function(successmessage) {
						jq(
								"."
										+ compliancepagecontainers.SUCCESS_MESSAGE_CONTAINER)
								.show().append(
										"<div>" + successmessage + "</div>");
						setTimeout(
								function() {
									jq(
											"."
													+ compliancepagecontainers.SUCCESS_MESSAGE_CONTAINER)
											.hide().children().remove();
								}, 5000);
					}

					ComplianceController.detailedResponseBaseConstructor = function(
							domelements, constructorObjectKey, wrapperarray,
							ignoreelement) {
						jq(domelements)
								.each(
										function(index) {
											if (jq(this).parent().parent()
													.attr("id") != ignoreelement
													|| jq("#" + ignoreelement)
															.is(":visible")) {
												var domelementsObjectConstructor = {};
												if(jq(this).is("input,textarea,select"))
												{
												domelementsObjectConstructor[constructorObjectKey] = jq(
														this).val().trim();
												}
												else
												{
													domelementsObjectConstructor[constructorObjectKey] = jq(
															this).text().trim();
												}	
												//domelementsObjectConstructor['seqNum']=index;
												wrapperarray
														.push(domelementsObjectConstructor);
											}
										});
					}

					ComplianceController.detailedResponseGenerator = function(
							innerObjectArray, domelements, wrapperarray,
							newkeyname, ignoreelement) {
						var additionalElement=[];
						var parentElement;
						jq(domelements)
								.each(
										function() {
											parentElement=jq(this).parent().parent();
											if (parentElement.attr("id") != ignoreelement || jq("#" + ignoreelement).is(":visible")) {
												
												if(jq(this).is("input,textarea,select")) {	
													innerObjectArray.push(jq(this).val().trim());
												}
												else
												{
													innerObjectArray.push(jq(this).text().trim());
												}
												
												var hdnElement=parentElement.find('input[type=hidden]')
												
												if(ComplianceControllerInfo.getValueForParam(hdnElement,'str')!=='' && jq('#hdnIsIgnoredHdnElmnt').val()=='false'){
													additionalElement.push({"key":hdnElement.attr('title'),"value":hdnElement.val()});	
												}else {
													additionalElement.push({"key":null,"value":null});
												}
												
													
												
											}
										});
												
						for (i = 0; i < wrapperarray.length; i++) {
							wrapperarray[i][newkeyname] = innerObjectArray[i];
							wrapperarray[i].relInfoId = jq("#hiddenRelInfoId").text();
							
							if(ComplianceControllerInfo.getValueForParam(additionalElement[i]['key'],'str')!=='')
								wrapperarray[i][additionalElement[i]['key']]=additionalElement[i]['value'];
							
						}
					}

					ComplianceController.caseResponseSubmit = function() {
						var caseInfoNmsPrelimResp = {}
						if(jq("#caseSeqId").length > 0 )
						{	
						caseInfoNmsPrelimResp.caseSeqId = jq("#caseSeqId")
								.text();
						}
						else
						{							
							var getprelimdata=JSON.parse(sessionStorage.getItem("ecampaign"));
							caseInfoNmsPrelimResp.caseSeqId=getprelimdata.caseSeqId;
						}	
						caseInfoNmsPrelimResp.statusId = jq("#statusId").text();
						caseInfoNmsPrelimResp.respTypeId = jq("#respTypeId")
								.val();
						if (jq("#respModeId").val() == "PF") {
							caseInfoNmsPrelimResp.circleWardCity = jq(
									"#circleWardCity").val();
						}
						if (jq("#respReasonId").val() == "") {
							caseInfoNmsPrelimResp.respReasonId = null;
						} else {
							caseInfoNmsPrelimResp.respReasonId = jq(
									"#respReasonId").val();
						}
						if (jq("#respModeId").val() == "") {
							caseInfoNmsPrelimResp.respModeId = null;
						} else {
							caseInfoNmsPrelimResp.respModeId = jq("#respModeId")
									.val();
						}
						caseInfoNmsPrelimResp.itrAckNo = jq("#itrAckNo").val();
						caseInfoNmsPrelimResp.remarks = jq("#respremarks")
								.val();
						caseInfoNmsPrelimResp.filingDate = jq("#filingDate")
								.val();
						var GET_CASE_RESPONSE_MODEL_URL = complianceurls.GET_CASE_RESPONSE_MODEL_URL;						
						if (jq("#respTypeId").val() == "") {
							jq('html, body').animate({
								scrollTop : 0
							});
							ComplianceController
									.validator(errorMessages.PRELEMINERY_RESPONSE_MONDATORY);
							return false;
						}

						if (jq("#respTypeId").val() == "NF"
								&& (jq("#respReasonId").val() == "")) {
							jq('html, body').animate({
								scrollTop : 0
							});
							ComplianceController
									.validator(errorMessages.PRELEMINERY_REASON_MONDATORY);
							return false;
						}
						if (jq("#respTypeId").val() == "FL"
								&& (jq("#respModeId").val() == ""
										|| jq("#filingDate").val() == "" || jq(
										"#itrAckNo").val() == "")) {
							jq('html, body').animate({
								scrollTop : 0
							});
							ComplianceController
									.validator(errorMessages.PRELEMINERY_MODE_DATE_ACKNOLEDGEMENT_NO_MONDATORY);
							return false;
						}
						if (jq("#respTypeId").val() == "FL" && jq("#itrAckNo").val() != "")
						{
							var itracknopattern = new RegExp("^[0,1](3[01]|[12][0-9]|0[1-9])(1[0-2]|0[1-9])[0-9]{2}$");	
							if(jq("#respModeId").val() == "EF")
							{
							if(itracknopattern.test(jq("#itrAckNo").val().substr(jq("#itrAckNo").val().length-7,jq("#itrAckNo").val().length)) == false )
							{
								jq('html, body').animate({scrollTop : 0});
								ComplianceController.validator(errorMessages.ITR_ACK_NO_FORMAT_ERROR);
								return false;
							}
							}
						}	
						if (jq("#respModeId").val() == "PF"
								&& jq("#circleWardCity").val() == "") {
							jq('html, body').animate({
								scrollTop : 0
							});
							ComplianceController
									.validator(errorMessages.CIRCLE_WARD_MANDATORY);
							return false;
						}
						if (jq("#respTypeId").val() == "NF" && jq("#respReasonId").val() == "NL" && jq("#respremarks").val().trim() == "") {
						jq('html, body').animate({
							scrollTop : 0
						});
						ComplianceController
								.validator(errorMessages.REMARKS_MANDATORY);
						return false;
					}
						
						
						var caseResponseTableInputs = jq(
								"#" + complianceformids.CASE_RESPONSE_FORM_ID)
								.find("input");
						ComplianceController
								.sqlinjectionchecker(caseResponseTableInputs);
						if (XSSFailed == true) {
							jq('html, body').animate({
								scrollTop : 0
							});
							return false;
						}
						var getcaseresponsemodel = ComplianceController
								.getCasesModel(GET_CASE_RESPONSE_MODEL_URL,
										caseInfoNmsPrelimResp, token, header);						 
						if (getcaseresponsemodel != "" && getcaseresponsemodel != null ) {
							if (caseInfoNmsPrelimResp.respTypeId == 'NF'
									&& caseInfoNmsPrelimResp.respReasonId == 'NL') {
								/*
								 * jq('html, body').animate({scrollTop: 0});
								 * jq("."+compliancepagecontainers.SUCCESS_MESSAGE_CONTAINER).show().append("<div>"+sucessMessages.RESPOSNE_SUCCESS_WITH_TRANSACTION_ID+""+getcaseresponsemodel+"</div>");
								 * setTimeout(function(){
								 * jq("."+compliancepagecontainers.SUCCESS_MESSAGE_CONTAINER).hide().children().remove();
								 * },5000 );
								 */
								jq(
										"."
												+ compliancepagecontainers.VERIFICATION_ISSUES_CONTAINER)
										.show();
							} else {
								jq('html, body').animate({
									scrollTop : 0
								});
								jq(
										"."
												+ compliancepagecontainers.SUCCESS_MESSAGE_CONTAINER)
										.show()
										.append(
												"<div>"
														+ sucessMessages.Response_SUCCESS_Filing_IncomeTax
														+ "</div>");
								setTimeout(
										function() {
											jq(
													"."
															+ compliancepagecontainers.SUCCESS_MESSAGE_CONTAINER)
													.hide().children().remove();
										}, 20000);
								jq(
										"."
												+ compliancepagecontainers.CASE_RESPONSE_SUBMIT_BTN_CONTAINER)
										.show();

								jq(
										"."
												+ compliancepagecontainers.CASE_RESPONSE_SUBMIT_BTN_CONTAINER)
										.find("#caseResponseSubmit").attr(
												"disabled", false);

								jq(
										"."
												+ compliancepagecontainers.VERIFICATION_ISSUES_CONTAINER)
										.show();
								ComplianceController.saveconsolidatedpdfbyteprocessor();
							}

						}
						else
						{	
							jq('html, body').animate({scrollTop : 0});
							ComplianceController.validator(errorMessages.SERVER_RUNTIME_EXCEPTION);
						}
					}

					ComplianceController.addMoreAttachment = function(
							originalObjectId, originalObjectClass,
							actionButtoncontainer) {
						var cloneObject = jq("#" + originalObjectId).clone();
						cloneObject[0].setAttribute('id', cloneObject[0]
								.getAttribute('id')
								+ jq("." + originalObjectClass).length);
						jq(cloneObject).insertBefore(
								"." + actionButtoncontainer);
						var clonedObjectid = jq(cloneObject[0]).attr("id");
						jq("#" + clonedObjectid).find('#documentHeader')
								.remove();
						jq("#" + clonedObjectid).find('input').val('');
					}

					ComplianceController.submitadditionalInfoRequest = function() {
						var form = document
								.getElementById("addInfoRequestform");
						var formData = new FormData(form);
						var GET_ADDITIONAL_INFO_REQUEST_URL = complianceurls.GET_ADDITIONAL_INFO_REQUEST_URL;
						var GET_RELATED_INFO_ADDITIONAL_INFO_REQUEST_URL = complianceurls.GET_RELATED_INFO_ADDITIONAL_INFO_REQUEST_URL;						
						if (jq("#addinfotextarea").val() == "") {
							jq('html, body').animate({
								scrollTop : 0
							});
							ComplianceController
									.validator(errorMessages.RESPONSE_MONDATORY);
							return false;
						}
						var fileuploadresponseinputs = jq(
								"#"
										+ complianceformids.ADDITIONAL_INFO_UPLOAD_PAGE)
								.find("textarea");
						ComplianceController
								.sqlinjectionchecker(fileuploadresponseinputs)
						if (XSSFailed == true) {
							jq('html, body').animate({
								scrollTop : 0
							});
							return false;
						}
						if (jq(
								"#"
										+ complianceformids.ADDITIONAL_INFO_UPLOAD_PAGE)
								.attr("title") == "issueadditionalinfo") {
							var getadditionalInfoRequestList = ComplianceController
									.getMultipartCasesModel(
											GET_ADDITIONAL_INFO_REQUEST_URL,
											formData, token, header);
						}

						if (jq(
								"#"
										+ complianceformids.ADDITIONAL_INFO_UPLOAD_PAGE)
								.attr("title") == "issuerelatedInfoadditionalinfo") {
							var getadditionalInfoRequestList = ComplianceController
									.getMultipartCasesModel(
											GET_RELATED_INFO_ADDITIONAL_INFO_REQUEST_URL,
											formData, token, header);
						}
						// To Be shown on success from server end
						if (checkSuccessFailure != "Failure") {
							var saveconsolidatedpdfbytedataToSend={};							
							jq('html, body').animate({
								scrollTop : 0
							});
							jq(
									"."
											+ compliancepagecontainers.SUCCESS_MESSAGE_CONTAINER)
									.show()
									.append(
											"<div>"
													+ sucessMessages.RESPOSNE_SUCCESS_WITHOUT_TRANSACTION_ID
													+ "</div>");
							setTimeout(
									function() {
										jq("#addinfotextarea,.attachment").val(
												"");
										jq(
												"."
														+ compliancepagecontainers.SUCCESS_MESSAGE_CONTAINER)
												.hide().children().remove();
									}, 3000);
							ComplianceController.saveconsolidatedpdfbyteprocessor();
						} else {
							jq('html, body').animate({
								scrollTop : 0
							});
							ComplianceController
									.validator(errorMessages.PROPER_FILE);
							jq("#addinfotextarea,.attachment").val("");
						}
					}

					ComplianceController.detailedResponseProcessor = function() {
						if (jq("#verifType").text() == "SF") {
							ComplianceController.SFResponseProcessor();
						} else if (jq("#verifType").text() == "SFTI") {
							ComplianceController.SFTIResponseProcessor();
						} else if (jq("#verifType").text() == "TT") {
							ComplianceController.TTResponseProcessor();
						} else if (jq("#verifType").text() == "TTSP") {
							ComplianceController.TTSPResponseProcessor();
						}else if(jq("#verifType").text() == "CS") {
							ComplianceController.CSResponseProcessor();
						}else if(jq("#verifType").text() == "TCR") {
							ComplianceController.TCRResponseProcessor();
						}else if(jq("#verifType").text() == "EISC") {
							ComplianceController.EISCResponseProcessor();
						}else if(jq("#verifType").text() == "ERC") {
							ComplianceController.ERCResponseProcessor();
						}else if(jq("#verifType").text() == "CWBA") {
							ComplianceController.CWBAResponseProcessor();
						} 						
					}
					ComplianceController.staticrowparser=function(rows,response,rowbinderclassname){
						if(response.length > 0)
						{
						jq(rows).each(function(index){
								var specificrowresponse=[];
								specificrowresponse.push(response[index]);
								ComplianceController.bindModelToForm(specificrowresponse,jq(this).attr("id"), rowbinderclassname);	
						});
						}
					}
					
					ComplianceController.validateERCcashReceivedOutofExemptReceiptRow = function(
							rows) {
						var validationstatus = true;
						var validationStatusVal;
						jq(rows)
								.each(
										function() {
											if (ComplianceController
													.isNotDummyRow(jq(this))) {
												if (ComplianceController
														.isrowModified(jq(this))) {
													validationStatusVal = ComplianceController
															.validateMandatoryFields(
																	jq(this),
																	detailedResponseMandatoryFields.ERCcashreceiptOutofExemptReceiptRowMandatoryfields);
													if (validationstatus == true) {
														if (validationStatusVal == false) {
															validationstatus = false;
														} else {
															validationstatus = true;
														}
													}
												}
											}
										});
						return validationstatus;
					}
					
					ComplianceController.ERCDetailedResponseSubmit = function(buttonId, validationRequired){
						var ERC_DETAILED_RESPONSE_SUBMIT_URL=complianceurls.ERC_DETAILED_RESPONSE_SUBMIT_URL;
						var ERC_DETAILED_RESPONSE_SAVE_DRAFT_URL=complianceurls.ERC_DETAILED_RESPONSE_SAVE_DRAFT_URL;
						var dataTosend = {};
						var infoRespERCRcvd=[];
						var validateERCcashReceivedOutofExemptReceipt=null;
						validstatus = null;
						var ERCcashReceivedOutofExemptReceiptExemptIncomeType=jq("."+compliancepagecontainers.ERC_DETAILED_RESPONSE_CONTAINER).find(".ERCcashReceivedOutofExemptReceiptExemptIncomeType");
						var ERCcashReceivedOutofExemptReceiptAmount=jq("."+compliancepagecontainers.ERC_DETAILED_RESPONSE_CONTAINER).find(".ERCcashReceivedOutofExemptReceiptAmount");
						var ERCcashReceivedOutofExemptReceiptRemarks=jq("."+compliancepagecontainers.ERC_DETAILED_RESPONSE_CONTAINER).find(".ERCcashReceivedOutofExemptReceiptRemarks");
						var ERCcashReceivedOutofExemptReceiptRow=jq("."+compliancepagecontainers.ERC_DETAILED_RESPONSE_CONTAINER).find(".ERCcashreceiptOutofExemptReceiptClass");						
						if(validationRequired)
						{
							validateERCcashReceivedOutofExemptReceipt = ComplianceController.validateERCcashReceivedOutofExemptReceiptRow(ERCcashReceivedOutofExemptReceiptRow);
						}
						if (validstatus == false || validateERCcashReceivedOutofExemptReceipt == false ) {
							jq('html, body').animate({scrollTop : 0});
							return false;
						}
						ComplianceController.detailedResponseBaseConstructor(ERCcashReceivedOutofExemptReceiptExemptIncomeType,"exemptIncTypeId",infoRespERCRcvd, "ERCcashreceiptOutofExemptReceiptObj");
						var ERCcashReceivedOutofExemptReceiptAmountArray=[];
						ComplianceController.detailedResponseGenerator(ERCcashReceivedOutofExemptReceiptAmountArray,ERCcashReceivedOutofExemptReceiptAmount, infoRespERCRcvd,"rcvdAmount","ERCcashreceiptOutofExemptReceiptObj");
						var ERCcashReceivedOutofExemptReceiptRemarksArray=[];
						ComplianceController.detailedResponseGenerator(ERCcashReceivedOutofExemptReceiptRemarksArray,ERCcashReceivedOutofExemptReceiptRemarks, infoRespERCRcvd,"remarks","ERCcashreceiptOutofExemptReceiptObj");
						dataTosend.infoRespERCRcvd=infoRespERCRcvd;
						dataTosend.relInfoId=jq("#hiddenRelInfoId").text();
						ComplianceController.getTransId(dataTosend,'ERC');
						var ERCcashReceivedOutofExemptReceiptAmountSum = ComplianceController.amountCalculator(ERCcashReceivedOutofExemptReceiptAmount,"ERCcashReceivedOutofExemptReceiptAmountSum");
						dataTosend.totRcvdAmt=ERCcashReceivedOutofExemptReceiptAmountSum;
						dataTosend.totBalAmt=ERCcashReceivedOutofExemptReceiptAmountSum;
						dataTosend.encValue=ComplianceControllerInfo.encrypt(totBalAmt+'');
						
						var detailresponseinputs = jq("."+ compliancepagecontainers.ERC_DETAILED_RESPONSE_CONTAINER).find("input");
						ComplianceController.sqlinjectionchecker(detailresponseinputs)
						if (XSSFailed == true) {
							jq('html, body').animate({scrollTop : 0});
							return false;
						}
						ComplianceController.ercemptyrowprocessor(dataTosend);
						if(buttonId == "ERC_detailedResponseSubmit")
						{
							var getdetailedresponsesubmit = ComplianceController.getCasesModel(ERC_DETAILED_RESPONSE_SUBMIT_URL,dataTosend, token, header);						
							if (getdetailedresponsesubmit.rspSubmitFlag.toUpperCase() == "S")
							{	
								jq('html, body').animate({scrollTop : 0});
								ComplianceController.successor(sucessMessages.RESPOSNE_SUCCESS_WITHOUT_TRANSACTION_ID);
								ComplianceController.refrshInfoDetailsOnSave(getdetailedresponsesubmit,'ERC');
								ComplianceController.saveconsolidatedpdfbyteprocessor();
							}
							else
							{
								jq('html, body').animate({scrollTop : 0});
								ComplianceController.validator(errorMessages.SERVER_RUNTIME_EXCEPTION);
							}
						}
						else if(buttonId == "ERC_detailedResponseSaveDraft")
						{
							var getdetailedresponsesubmit = ComplianceController.getCasesModel(ERC_DETAILED_RESPONSE_SAVE_DRAFT_URL,dataTosend, token, header);						
							if (getdetailedresponsesubmit.rspSubmitFlag.toUpperCase() == "D")
							{	
								jq('html, body').animate({scrollTop : 0});
								ComplianceController.successor(sucessMessages.DRAFT_SAVED_SUCCESSFULLY);
								ComplianceController.refrshInfoDetailsOnSave(getdetailedresponsesubmit,'ERC');
							}
							else
							{
								jq('html, body').animate({scrollTop : 0});
								ComplianceController.validator(errorMessages.SERVER_RUNTIME_EXCEPTION);
							}	
						}
					}
					
					ComplianceController.ercemptyrowprocessor = function(dataTosend) {
						var dataTosendModified = {};
						var infoRespERCRcvd = dataTosend.infoRespERCRcvd;
						dataTosendModified.infoRespERCRcvd = [];						
						ComplianceController.emptyrowremover(infoRespERCRcvd,"infoRespERCRcvd", dataTosendModified,"relInfoId");
						dataTosend.infoRespERCRcvd = dataTosendModified.infoRespERCRcvd;
					}
					
					ComplianceController.CSResponseProcessor=function(){
						var dataTosend = {};
						dataTosend.relInfoId = jq("#hiddenRelInfoId").text();
						var GET_DETAILED_RELATED_CS_RESPONSE_URL = complianceurls.GET_DETAILED_RELATED_CS_RESPONSE_URL;
						var CS_RESPONSE_BINDER=complianceformelementclasses.CS_RESPONSE_BINDER;
						var detailedRelated_CS_URL = ComplianceController.getURL(contextRoot,GET_DETAILED_RELATED_CS_RESPONSE_URL);
						var detailedRelated_CS_ResponseList = ComplianceController.getCasesModel(detailedRelated_CS_URL,dataTosend, token, header);
						var complianceviewInfoCSDtlsResp=detailedRelated_CS_ResponseList.complianceviewInfoCSDtlsResp;
						var getcscashsalesrows=jq("#CS_relatedInfoDetailedResponseTable").find(".cscashsalesrowcontainer");
						ComplianceController.staticrowparser(getcscashsalesrows,complianceviewInfoCSDtlsResp,CS_RESPONSE_BINDER);
						var complianceviewInfoCSCIDtlsResp=detailedRelated_CS_ResponseList.complianceviewInfoCSCIDtlsResp;
						
						ComplianceController.setIgnoredHdnElmntStatusTransStatus(detailedRelated_CS_ResponseList.complianceviewInfoCSCompValResp);

						ComplianceController.bindModelToForm(detailedRelated_CS_ResponseList.complianceviewInfoCSCompValResp,"CS_relatedInfoDetailedResponseTable", "csresponsebinder.grpTransId");
						ComplianceController.bindModelToForm(detailedRelated_CS_ResponseList.complianceviewInfoCSCompValResp,"CS_relatedInfoDetailedResponseTable", "csresponsebinder.relInfoRespId");
						
						var getcscashinhandoneighthofeverymonthrows=jq("#CS_relatedInfoDetailedResponseTable").find(".cscashinhandoneighthofeverymonthcontainer");
						ComplianceController.staticrowparser(getcscashinhandoneighthofeverymonthrows,complianceviewInfoCSCIDtlsResp,CS_RESPONSE_BINDER);
						jq("#CS_detailedResponseSubmit").attr("belongsTo","RelatedInfoDetils");
						ComplianceController.hidepagesectionsprocessor(detailedresponsetypecontainers);
						jq("."+ compliancepagecontainers.CS_DETAILED_RESPONSE_CONTAINER).show();
						
						
					}
					
					ComplianceController.EISCDetailedResponseSubmit=function(buttonId, validationRequired){
						var EISC_DETAILED_RESPONSE_SUBMIT_URL=complianceurls.EISC_DETAILED_RESPONSE_SUBMIT_URL;
						var EISC_DETAILED_RESPONSE_SAVE_DRAFT_URL=complianceurls.EISC_DETAILED_RESPONSE_SAVE_DRAFT_URL;
						var dataTosend = {};
						validstatus = null;
						var infoRespEICashSaving=[];
						var infoRespEICashSavingSecondArray=[]
						var EISCcashinhandoutofearlierincomefifteenthyearAmount=jq("."+compliancepagecontainers.EISC_DETAILED_RESPONSE_CONTAINER).find(".EISCcashinhandoutofearlierincomefifteenthyearAmount");
						var EISCcashinhandoutofearlierincomefifteenthyearRemarks=jq("."+compliancepagecontainers.EISC_DETAILED_RESPONSE_CONTAINER).find(".EISCcashinhandoutofearlierincomefifteenthyearRemarks");
						var EISCcashinhandoutofearlierincomeSixteenthYearAmount=jq("."+compliancepagecontainers.EISC_DETAILED_RESPONSE_CONTAINER).find(".EISCcashinhandoutofearlierincomeSixteenthYearAmount");
						var EISCcashinhandoutofearlierincomeSixteenthYearRemarks=jq("."+compliancepagecontainers.EISC_DETAILED_RESPONSE_CONTAINER).find(".EISCcashinhandoutofearlierincomeSixteenthYearRemarks");
						
						if(validationRequired)
						{
							ComplianceController.MandatoryFieldsChecker(EISCcashinhandoutofearlierincomefifteenthyearAmount,"EISCcashinhandoutofearlierincomefifteenthyearObj",errorMessages.AMOUNT_MANDATORY);
							ComplianceController.MandatoryFieldsChecker(EISCcashinhandoutofearlierincomeSixteenthYearAmount,"EISCcashinhandoutofearlierincomeSixteenthYearObj",errorMessages.AMOUNT_MANDATORY);
						}
						if (validstatus == false) {
							jq('html, body').animate({scrollTop : 0});
							return false;
						}
						ComplianceController.detailedResponseBaseConstructor(EISCcashinhandoutofearlierincomefifteenthyearAmount,"cashAmount",infoRespEICashSaving, "EISCcashinhandoutofearlierincomefifteenthyearObj");
						var EISCcashinhandoutofearlierincomefifteenthyearRemarksArray=[];
						ComplianceController.detailedResponseGenerator(EISCcashinhandoutofearlierincomefifteenthyearRemarksArray,EISCcashinhandoutofearlierincomefifteenthyearRemarks, infoRespEICashSaving,"remarks","EISCcashinhandoutofearlierincomefifteenthyearObj");
						ComplianceController.detailedResponseBaseConstructor(EISCcashinhandoutofearlierincomeSixteenthYearAmount,"cashAmount",infoRespEICashSavingSecondArray, "EISCcashinhandoutofearlierincomeSixteenthYearObj");
						var EISCcashinhandoutofearlierincomeSixteenthYearRemarksArray=[];
						ComplianceController.detailedResponseGenerator(EISCcashinhandoutofearlierincomeSixteenthYearRemarksArray,EISCcashinhandoutofearlierincomeSixteenthYearRemarks, infoRespEICashSavingSecondArray,"remarks","EISCcashinhandoutofearlierincomeSixteenthYearObj");
						infoRespEICashSaving[0].cashSvngId=1;
						infoRespEICashSavingSecondArray[0].cashSvngId=2;
						infoRespEICashSaving.push(infoRespEICashSavingSecondArray[0]);
						dataTosend.infoRespEICashSaving=infoRespEICashSaving;
						dataTosend.relInfoId=jq("#hiddenRelInfoId").text();
						ComplianceController.getTransId(dataTosend,'EISC');
						var EISCcashinhandoutofearlierincomefifteenthyearAmountSum = ComplianceController.amountCalculator(EISCcashinhandoutofearlierincomefifteenthyearAmount,"EISCcashinhandoutofearlierincomefifteenthyearAmountSum");
						var EISCcashinhandoutofearlierincomeSixteenthYearAmountSum = ComplianceController.amountCalculator(EISCcashinhandoutofearlierincomeSixteenthYearAmount,"EISCcashinhandoutofearlierincomeSixteenthYearAmountSum");
						dataTosend.totcihamount1=EISCcashinhandoutofearlierincomefifteenthyearAmountSum;
						dataTosend.totcihamount2=EISCcashinhandoutofearlierincomeSixteenthYearAmountSum;
						var detailresponseinputs = jq("."+ compliancepagecontainers.EISC_DETAILED_RESPONSE_CONTAINER).find("input");
						ComplianceController.sqlinjectionchecker(detailresponseinputs)
						if (XSSFailed == true) {
							jq('html, body').animate({scrollTop : 0});
							return false;
						}
						if(buttonId == "EISC_detailedResponseSubmit")
						{
							var getdetailedresponsesubmit = ComplianceController.getCasesModel(EISC_DETAILED_RESPONSE_SUBMIT_URL,dataTosend, token, header);						
							if (getdetailedresponsesubmit.rspSubmitFlag.toUpperCase() == "S")
							{	
								jq('html, body').animate({scrollTop : 0});
								ComplianceController.successor(sucessMessages.RESPOSNE_SUCCESS_WITHOUT_TRANSACTION_ID);
								ComplianceController.refrshInfoDetailsOnSave(getdetailedresponsesubmit,'EISC');
								ComplianceController.saveconsolidatedpdfbyteprocessor();
							}
							else
							{
								jq('html, body').animate({scrollTop : 0});
								ComplianceController.validator(errorMessages.SERVER_RUNTIME_EXCEPTION);
							}	
						}
						else if(buttonId == "EISC_detailedResponseSaveDraft")
						{
							var getdetailedresponsesubmit = ComplianceController.getCasesModel(EISC_DETAILED_RESPONSE_SAVE_DRAFT_URL,dataTosend, token, header);						
							if (getdetailedresponsesubmit.rspSubmitFlag.toUpperCase() == "D")
							{	
								jq('html, body').animate({scrollTop : 0});
								ComplianceController.successor(sucessMessages.DRAFT_SAVED_SUCCESSFULLY);
								ComplianceController.refrshInfoDetailsOnSave(getdetailedresponsesubmit,'EISC');
							}
							else
							{
								jq('html, body').animate({scrollTop : 0});
								ComplianceController.validator(errorMessages.SERVER_RUNTIME_EXCEPTION);
							}
						}
					}
					
					ComplianceController.validateTCRamountrcvdfromidentifiablepersonwithpanRow = function(
							rows) {
						var validationstatus = true;
						var validationStatusVal;
						jq(rows)
								.each(
										function() {
											if (ComplianceController
													.isNotDummyRow(jq(this))) {
												if (ComplianceController
														.isrowModified(jq(this))) {
													validationStatusVal = ComplianceController
															.validateMandatoryFields(
																	jq(this),
																	detailedResponseMandatoryFields.tcridentifiablepersonwithpanRowMandatoryfields);
													if (validationstatus == true) {
														if (validationStatusVal == false) {
															validationstatus = false;
														} else {
															validationstatus = true;
														}
													}
												}
											}
										});
						return validationstatus;
					}
					
					ComplianceController.TCRDetailedResponseSubmit=function(buttonId, validationRequired){
						var TCR_DETAILED_RESPONSE_SUBMIT_URL=complianceurls.TCR_DETAILED_RESPONSE_SUBMIT_URL;
						var TCR_DETAILED_RESPONSE_SAVE_DRAFT_URL=complianceurls.TCR_DETAILED_RESPONSE_SAVE_DRAFT_URL;
						var dataTosend = {};
						validstatus = null;
						var validTCRTCRamountrcvdfromidentifiablepersonwithpan=null;
						var infoRespTcrRcvdPan=[];
						var TCRamountrcvdfromidentifiablepersonwithpantcrpersonPan=jq("."+compliancepagecontainers.TCR_DETAILED_RESPONSE_CONTAINER).find(".tcrpersonPan");
						var TCRamountrcvdfromidentifiablepersonwithpantcrpersonName=jq("."+compliancepagecontainers.TCR_DETAILED_RESPONSE_CONTAINER).find(".tcrpersonName");
						var TCRamountrcvdfromidentifiablepersonwithpantcrnatureoftransaction=jq("."+compliancepagecontainers.TCR_DETAILED_RESPONSE_CONTAINER).find(".tcrnatureoftransaction");
						var TCRamountrcvdfromidentifiablepersonwithpantcrreceivedamount=jq("."+compliancepagecontainers.TCR_DETAILED_RESPONSE_CONTAINER).find(".tcrreceivedamount");
						var TCRamountrcvdfromidentifiablepersonwithpantcrremarks=jq("."+compliancepagecontainers.TCR_DETAILED_RESPONSE_CONTAINER).find(".tcrremarks");
						var TCRamountrcvdfromidentifiablepersonwithpanRow = jq("."+ compliancepagecontainers.TCR_DETAILED_RESPONSE_CONTAINER).find(".tcridentifiablepersonwithpanClass");
						if(validationRequired)
						{
							validTCRTCRamountrcvdfromidentifiablepersonwithpan = ComplianceController.validateTCRamountrcvdfromidentifiablepersonwithpanRow(TCRamountrcvdfromidentifiablepersonwithpanRow);
							ComplianceController.panChecker(compliancepagecontainers.TCR_DETAILED_RESPONSE_CONTAINER);
							ComplianceController.nameformatchecker(compliancepagecontainers.TCR_DETAILED_RESPONSE_CONTAINER);
						}
						if (validstatus == false || validTCRTCRamountrcvdfromidentifiablepersonwithpan == false ) {
							jq('html, body').animate({scrollTop : 0});
							return false;
						}
						ComplianceController.detailedResponseBaseConstructor(TCRamountrcvdfromidentifiablepersonwithpantcrpersonPan,"personPan",infoRespTcrRcvdPan, "tcridentifiablepersonwithpanObj");
						var TCRamountrcvdfromidentifiablepersonwithpantcrpersonNameArray=[];
						ComplianceController.detailedResponseGenerator(TCRamountrcvdfromidentifiablepersonwithpantcrpersonNameArray,TCRamountrcvdfromidentifiablepersonwithpantcrpersonName, infoRespTcrRcvdPan,"personName","tcridentifiablepersonwithpanObj");
						var TCRamountrcvdfromidentifiablepersonwithpantcrnatureoftransactionArray=[];
						ComplianceController.detailedResponseGenerator(TCRamountrcvdfromidentifiablepersonwithpantcrnatureoftransactionArray,TCRamountrcvdfromidentifiablepersonwithpantcrnatureoftransaction, infoRespTcrRcvdPan,"transNatureId","tcridentifiablepersonwithpanObj");
						var TCRamountrcvdfromidentifiablepersonwithpantcrreceivedamountArray=[];
						ComplianceController.detailedResponseGenerator(TCRamountrcvdfromidentifiablepersonwithpantcrreceivedamountArray,TCRamountrcvdfromidentifiablepersonwithpantcrreceivedamount, infoRespTcrRcvdPan,"rcvdAmt","tcridentifiablepersonwithpanObj");
						var TCRamountrcvdfromidentifiablepersonwithpantcrremarksArray=[];
						ComplianceController.detailedResponseGenerator(TCRamountrcvdfromidentifiablepersonwithpantcrremarksArray,TCRamountrcvdfromidentifiablepersonwithpantcrremarks, infoRespTcrRcvdPan,"remarks","tcridentifiablepersonwithpanObj");
						dataTosend.infoRespTcrRcvdPan=infoRespTcrRcvdPan;
						dataTosend.relInfoId=jq("#hiddenRelInfoId").text();
						ComplianceController.getTransId(dataTosend,'TCR');
						var TCRidentifiablePersonWithPanrcvdAmountSum = ComplianceController.amountCalculator(TCRamountrcvdfromidentifiablepersonwithpantcrreceivedamount,"TCRidentifiablePersonWithPanrcvdAmountSum");
						dataTosend.totRcvdPanAmt=TCRidentifiablePersonWithPanrcvdAmountSum;
						dataTosend.totBalAmt=TCRidentifiablePersonWithPanrcvdAmountSum;
						dataTosend.encValue=ComplianceControllerInfo.encrypt(TCRidentifiablePersonWithPanrcvdAmountSum+'');
						
						var detailresponseinputs = jq("."+ compliancepagecontainers.TCR_DETAILED_RESPONSE_CONTAINER).find("input");
						ComplianceController.sqlinjectionchecker(detailresponseinputs)
						if (XSSFailed == true) {
							jq('html, body').animate({scrollTop : 0});
							return false;
						}
						ComplianceController.tcremptyrowprocessor(dataTosend);
						if(buttonId == "TCR_detailedResponseSubmit")
						{	
							var getdetailedresponsesubmit = ComplianceController.getCasesModel(TCR_DETAILED_RESPONSE_SUBMIT_URL,dataTosend, token, header);						
							if (getdetailedresponsesubmit.rspSubmitFlag.toUpperCase() == "S")
							{	
								jq('html, body').animate({scrollTop : 0});
								ComplianceController.successor(sucessMessages.RESPOSNE_SUCCESS_WITHOUT_TRANSACTION_ID);
								ComplianceController.refrshInfoDetailsOnSave(getdetailedresponsesubmit,'TCR');
								ComplianceController.saveconsolidatedpdfbyteprocessor();
							}
							else
							{
								jq('html, body').animate({scrollTop : 0});
								ComplianceController.validator(errorMessages.SERVER_RUNTIME_EXCEPTION);
							}	
						}
						else if(buttonId == "TCR_detailedResponseSaveDraft")
						{
							var getdetailedresponsesubmit = ComplianceController.getCasesModel(TCR_DETAILED_RESPONSE_SAVE_DRAFT_URL,dataTosend, token, header);						
							if (getdetailedresponsesubmit.rspSubmitFlag.toUpperCase() == "D")
							{	
								jq('html, body').animate({scrollTop : 0});
								ComplianceController.successor(sucessMessages.DRAFT_SAVED_SUCCESSFULLY);
								ComplianceController.refrshInfoDetailsOnSave(getdetailedresponsesubmit,'TCR');
							}
							else
							{
								jq('html, body').animate({scrollTop : 0});
								ComplianceController.validator(errorMessages.SERVER_RUNTIME_EXCEPTION);
							}	
						}
					}
					
					ComplianceController.tcremptyrowprocessor = function(dataTosend) {
						var dataTosendModified = {};
						var infoRespTcrRcvdPan = dataTosend.infoRespTcrRcvdPan;
						dataTosendModified.infoRespTcrRcvdPan = [];						
						ComplianceController.emptyrowremover(infoRespTcrRcvdPan,"infoRespTcrRcvdPan", dataTosendModified,"relInfoId");
						dataTosend.infoRespTcrRcvdPan = dataTosendModified.infoRespTcrRcvdPan;
					}
					
					ComplianceController.cwbaemptyrowprocessor = function(dataTosend) {
						var dataTosendModified = {};
						var infoRespCWAcntArray = dataTosend.infoRespCWAcntArray;
						dataTosendModified.infoRespCWAcntArray = [];						
						ComplianceController.emptyrowremover(infoRespCWAcntArray,"infoRespCWAcntArray", dataTosendModified,"relInfoId");
						dataTosend.infoRespCWAcntArray = dataTosendModified.infoRespCWAcntArray;
					}
					
					ComplianceController.validateCWBAcwbacashwithdrwnoutofbankRow = function(
							rows) {
						var validationstatus = true;
						var validationStatusVal;
						jq(rows)
								.each(
										function() {
											if (ComplianceController
													.isNotDummyRow(jq(this))) {
												if (ComplianceController
														.isrowModified(jq(this))) {
													validationStatusVal = ComplianceController
															.validateMandatoryFields(
																	jq(this),
																	detailedResponseMandatoryFields.cwbacashwithdrwnoutofbankRowMandatoryfields);
													if (validationstatus == true) {
														if (validationStatusVal == false) {
															validationstatus = false;
														} else {
															validationstatus = true;
														}
													}
												}
											}
										});
						return validationstatus;
					}
					
					ComplianceController.CWBADetailedResponseSubmit=function(buttonId, validationRequired){
						var CWBA_DETAILED_RESPONSE_SUBMIT_URL=complianceurls.CWBA_DETAILED_RESPONSE_SUBMIT_URL;
						var CWBA_DETAILED_RESPONSE_SAVE_DRAFT_URL=complianceurls.CWBA_DETAILED_RESPONSE_SAVE_DRAFT_URL;
						validstatus = null;
						var validCWBAcwbacashwithdrwnoutofbank=null;
						var dataTosend = {};
						var infoRespCWAcntArray=[];
						var CWBAcwbacashwithdrwnoutofbankbankname=jq("."+compliancepagecontainers.CWBA_DETAILED_RESPONSE_CONTAINER).find(".CWBAcwbacashwithdrwnoutofbankbankname");
						var CWBAcwbacashwithdrwnoutofbankifsccode=jq("."+compliancepagecontainers.CWBA_DETAILED_RESPONSE_CONTAINER).find(".CWBAcwbacashwithdrwnoutofbankifsccode");
						var CWBAcwbacashwithdrwnoutofbankaccountnumber=jq("."+compliancepagecontainers.CWBA_DETAILED_RESPONSE_CONTAINER).find(".CWBAcwbacashwithdrwnoutofbankaccountnumber");
						var CWBAcwbacashwithdrwnoutofbankAmountWithdrawn=jq("."+compliancepagecontainers.CWBA_DETAILED_RESPONSE_CONTAINER).find(".CWBAcwbacashwithdrwnoutofbankAmountWithdrawn");
						var CWBAcwbacashwithdrwnoutofbankremarks=jq("."+compliancepagecontainers.CWBA_DETAILED_RESPONSE_CONTAINER).find(".CWBAcwbacashwithdrwnoutofbankremarks");
						var CWBAcwbacashwithdrwnoutofbankRow = jq("."+ compliancepagecontainers.CWBA_DETAILED_RESPONSE_CONTAINER).find(".cwbacashwithdrwnoutofbankClass");
						if(validationRequired)
						{
							validCWBAcwbacashwithdrwnoutofbank = ComplianceController.validateCWBAcwbacashwithdrwnoutofbankRow(CWBAcwbacashwithdrwnoutofbankRow);
							ComplianceController.ifscformatchecker(compliancepagecontainers.CWBA_DETAILED_RESPONSE_CONTAINER);
						}
						if (validstatus == false || validCWBAcwbacashwithdrwnoutofbank == false ) {
							jq('html, body').animate({scrollTop : 0});
							return false;
						}
						ComplianceController.detailedResponseBaseConstructor(CWBAcwbacashwithdrwnoutofbankbankname,"bankName",infoRespCWAcntArray, "cwbacashwithdrwnoutofbankObj");
						var CWBAcwbacashwithdrwnoutofbankifsccodeArray=[];
						ComplianceController.detailedResponseGenerator(CWBAcwbacashwithdrwnoutofbankifsccodeArray,CWBAcwbacashwithdrwnoutofbankifsccode, infoRespCWAcntArray,"ifscCode","cwbacashwithdrwnoutofbankObj");
						var CWBAcwbacashwithdrwnoutofbankaccountnumberArray=[];
						ComplianceController.detailedResponseGenerator(CWBAcwbacashwithdrwnoutofbankaccountnumberArray,CWBAcwbacashwithdrwnoutofbankaccountnumber, infoRespCWAcntArray,"acntNum","cwbacashwithdrwnoutofbankObj");
						var CWBAcwbacashwithdrwnoutofbankAmountWithdrawnArray=[];
						ComplianceController.detailedResponseGenerator(CWBAcwbacashwithdrwnoutofbankAmountWithdrawnArray,CWBAcwbacashwithdrwnoutofbankAmountWithdrawn, infoRespCWAcntArray,"wdrnAmount","cwbacashwithdrwnoutofbankObj");
						var CWBAcwbacashwithdrwnoutofbankremarksArray=[];
						ComplianceController.detailedResponseGenerator(CWBAcwbacashwithdrwnoutofbankremarksArray,CWBAcwbacashwithdrwnoutofbankremarks, infoRespCWAcntArray,"remarks","cwbacashwithdrwnoutofbankObj");
						dataTosend.infoRespCWAcntArray=infoRespCWAcntArray;
						dataTosend.relInfoId=jq("#hiddenRelInfoId").text();
						ComplianceController.getTransId(dataTosend,'CWBA');
						var CWBAcwbacashwithdrwnoutofbankwithdrawnAmountSum = ComplianceController.amountCalculator(CWBAcwbacashwithdrwnoutofbankAmountWithdrawn,"CWBAcwbacashwithdrwnoutofbankwithdrawnAmountSum");
						dataTosend.totWdrwnAmount=CWBAcwbacashwithdrwnoutofbankwithdrawnAmountSum;
						dataTosend.totBalAmount=CWBAcwbacashwithdrwnoutofbankwithdrawnAmountSum;
						dataTosend.encValue=ComplianceControllerInfo.encrypt(CWBAcwbacashwithdrwnoutofbankwithdrawnAmountSum+'');
						
						var detailresponseinputs = jq("."+ compliancepagecontainers.CWBA_DETAILED_RESPONSE_CONTAINER).find("input");
						ComplianceController.sqlinjectionchecker(detailresponseinputs)
						if (XSSFailed == true) {
							jq('html, body').animate({scrollTop : 0});
							return false;
						}
						ComplianceController.cwbaemptyrowprocessor(dataTosend);
						if(buttonId == "CWBA_detailedResponseSubmit")
						{
							var getdetailedresponsesubmit = ComplianceController.getCasesModel(CWBA_DETAILED_RESPONSE_SUBMIT_URL,dataTosend, token, header);						
							if (getdetailedresponsesubmit.rspSubmitFlag.toUpperCase() == "S")
							{	
								jq('html, body').animate({scrollTop : 0});
								ComplianceController.successor(sucessMessages.RESPOSNE_SUCCESS_WITHOUT_TRANSACTION_ID);
								ComplianceController.refrshInfoDetailsOnSave(getdetailedresponsesubmit,'CWBA');
								ComplianceController.saveconsolidatedpdfbyteprocessor();
							}
							else
							{
								jq('html, body').animate({scrollTop : 0});
								ComplianceController.validator(errorMessages.SERVER_RUNTIME_EXCEPTION);
							}	
						}
						else if(buttonId == "CWBA_detailedResponseSaveDraft")
						{
							var getdetailedresponsesubmit = ComplianceController.getCasesModel(CWBA_DETAILED_RESPONSE_SAVE_DRAFT_URL,dataTosend, token, header);						
							if (getdetailedresponsesubmit.rspSubmitFlag.toUpperCase() == "D")
							{	
								jq('html, body').animate({scrollTop : 0});
								ComplianceController.successor(sucessMessages.DRAFT_SAVED_SUCCESSFULLY);
								ComplianceController.refrshInfoDetailsOnSave(getdetailedresponsesubmit,'CWBA');
							}
							else
							{
								jq('html, body').animate({scrollTop : 0});
								ComplianceController.validator(errorMessages.SERVER_RUNTIME_EXCEPTION);
							}
						}
					}
					
					ComplianceController.CSDetailedResponseSubmit=function(buttonId, validationRequired){
						validstatus = null;
						var CS_DETAILED_RESPONSE_SUBMIT_URL=complianceurls.CS_DETAILED_RESPONSE_SUBMIT_URL;
						var CS_DETAILED_RESPONSE_SAVE_DRAFT_URL=complianceurls.CS_DETAILED_RESPONSE_SAVE_DRAFT_URL;
						var dataTosend = {};
						var infoRespCSCIDtlArray=[];
						var infoRespCSDtlArray=[];
						var CSCashSalesfinYear=jq("."+compliancepagecontainers.CS_DETAILED_RESPONSE_CONTAINER).find(".cscashsalesfinYear");
						var CSCashSalesmonthName=jq("."+compliancepagecontainers.CS_DETAILED_RESPONSE_CONTAINER).find(".cscashsalesmonthName");
						var CSCashSalescashSaleAmount=jq("."+compliancepagecontainers.CS_DETAILED_RESPONSE_CONTAINER).find(".cscashsalescashSaleAmount");
						var CSCashSalestotalSaleAmount=jq("."+compliancepagecontainers.CS_DETAILED_RESPONSE_CONTAINER).find(".cscashsalestotalSaleAmount");
						var CSCashSalescashPurchaseAmount=jq("."+compliancepagecontainers.CS_DETAILED_RESPONSE_CONTAINER).find(".cscashsalescashPurchaseAmount");
						var CSCashSalestotalPurchaseAmount=jq("."+compliancepagecontainers.CS_DETAILED_RESPONSE_CONTAINER).find(".cscashsalestotalPurchaseAmount");
						var CSCashSalescashDpstAmount=jq("."+compliancepagecontainers.CS_DETAILED_RESPONSE_CONTAINER).find(".cscashsalescashDpstAmount");
						var CSCashSalescashWdrwnAmount=jq("."+compliancepagecontainers.CS_DETAILED_RESPONSE_CONTAINER).find(".cscashsalescashWdrwnAmount");
						var CSCashSalesremarks=jq("."+compliancepagecontainers.CS_DETAILED_RESPONSE_CONTAINER).find(".cscashsalesremarks");
						
						var CSCashinHandoneighthofeverymonthfinYear=jq("."+compliancepagecontainers.CS_DETAILED_RESPONSE_CONTAINER).find(".CSCashinHandoneighthofeverymonthfinYear");
						var CSCashinHandoneighthofeverymonthmonthName=jq("."+compliancepagecontainers.CS_DETAILED_RESPONSE_CONTAINER).find(".CSCashinHandoneighthofeverymonthmonthName");
						var CSCashinHandoneighthofeverymonthcashInHandAmount=jq("."+compliancepagecontainers.CS_DETAILED_RESPONSE_CONTAINER).find(".CSCashinHandoneighthofeverymonthcashInHandAmount");
						var CSCashinHandoneighthofeverymonthremarks=jq("."+compliancepagecontainers.CS_DETAILED_RESPONSE_CONTAINER).find(".CSCashinHandoneighthofeverymonthremarks");
						
						if(validationRequired)
						{
							ComplianceController.MandatoryFieldsChecker(CSCashSalescashSaleAmount,true,errorMessages.AMOUNT_MANDATORY);
							ComplianceController.MandatoryFieldsChecker(CSCashSalestotalSaleAmount,true,errorMessages.AMOUNT_MANDATORY);
							ComplianceController.MandatoryFieldsChecker(CSCashSalescashPurchaseAmount,true,errorMessages.AMOUNT_MANDATORY);
							ComplianceController.MandatoryFieldsChecker(CSCashSalestotalPurchaseAmount,true,errorMessages.AMOUNT_MANDATORY);
							ComplianceController.MandatoryFieldsChecker(CSCashSalescashDpstAmount,true,errorMessages.AMOUNT_MANDATORY);
							ComplianceController.MandatoryFieldsChecker(CSCashSalescashWdrwnAmount,true,errorMessages.AMOUNT_MANDATORY);
							ComplianceController.MandatoryFieldsChecker(CSCashinHandoneighthofeverymonthcashInHandAmount,true,errorMessages.AMOUNT_MANDATORY);
						}
						
						if (validstatus == false) {
							jq('html, body').animate({scrollTop : 0});
							return false;
						}
						ComplianceController.detailedResponseBaseConstructor(CSCashSalesfinYear,"finYear",infoRespCSDtlArray, true);
						var CSCashSalesmonthNameArray = [];
						ComplianceController.detailedResponseGenerator(CSCashSalesmonthNameArray,CSCashSalesmonthName, infoRespCSDtlArray,"monthName",true);
						var CSCashSalescashSaleAmountArray=[];
						ComplianceController.detailedResponseGenerator(CSCashSalescashSaleAmountArray,CSCashSalescashSaleAmount, infoRespCSDtlArray,"cashSaleAmount",true);
						var CSCashSalestotalSaleAmountArray=[];
						ComplianceController.detailedResponseGenerator(CSCashSalestotalSaleAmountArray,CSCashSalestotalSaleAmount, infoRespCSDtlArray,"totalSaleAmount",true);
						var CSCashSalescashPurchaseAmountArray=[];
						ComplianceController.detailedResponseGenerator(CSCashSalescashPurchaseAmountArray,CSCashSalescashPurchaseAmount, infoRespCSDtlArray,"cashPurchaseAmount",true);
						var CSCashSalestotalPurchaseAmountArray=[];
						ComplianceController.detailedResponseGenerator(CSCashSalestotalPurchaseAmountArray,CSCashSalestotalPurchaseAmount, infoRespCSDtlArray,"totalPurchaseAmount",true);
						var CSCashSalescashDpstAmountArray=[];
						ComplianceController.detailedResponseGenerator(CSCashSalescashDpstAmountArray,CSCashSalescashDpstAmount, infoRespCSDtlArray,"cashDpstAmount",true);
						var CSCashSalescashWdrwnAmountArray=[];
						ComplianceController.detailedResponseGenerator(CSCashSalescashWdrwnAmountArray,CSCashSalescashWdrwnAmount, infoRespCSDtlArray,"cashWdrwnAmount",true);
						var CSCashSalesremarksArray=[];
						ComplianceController.detailedResponseGenerator(CSCashSalesremarksArray,CSCashSalesremarks, infoRespCSDtlArray,"remarks",true);
						
						ComplianceController.detailedResponseBaseConstructor(CSCashinHandoneighthofeverymonthfinYear,"finYear",infoRespCSCIDtlArray, true);
						var CSCashinHandoneighthofeverymonthmonthNameArray=[];
						ComplianceController.detailedResponseGenerator(CSCashinHandoneighthofeverymonthmonthNameArray,CSCashinHandoneighthofeverymonthmonthName, infoRespCSCIDtlArray,"monthName",true);
						var CSCashinHandoneighthofeverymonthcashInHandAmountArray=[];
						ComplianceController.detailedResponseGenerator(CSCashinHandoneighthofeverymonthcashInHandAmountArray,CSCashinHandoneighthofeverymonthcashInHandAmount, infoRespCSCIDtlArray,"cashInHandAmount",true);
						var CSCashinHandoneighthofeverymonthremarksArray=[];
						ComplianceController.detailedResponseGenerator(CSCashinHandoneighthofeverymonthremarksArray,CSCashinHandoneighthofeverymonthremarks, infoRespCSCIDtlArray,"remarks",true);
						var CSCashSalescashSaleAmountSum=ComplianceController.amountCalculator(CSCashSalescashSaleAmount,"CSCashSalescashSaleAmountSum");
						var CSCashinHandoneighthofeverymonthcashInHandAmountSum=ComplianceController.amountCalculator(CSCashinHandoneighthofeverymonthcashInHandAmount,"CSCashinHandoneighthofeverymonthcashInHandAmountSum");						
						dataTosend.infoRespCSDtlArray=infoRespCSDtlArray;
						dataTosend.infoRespCSCIDtlArray=infoRespCSCIDtlArray;
						dataTosend.relInfoId=jq("#hiddenRelInfoId").text();		
						ComplianceController.getTransId(dataTosend,'CS');
						dataTosend.totCsAmount=CSCashSalescashSaleAmountSum;
						dataTosend.totCiAmount=CSCashinHandoneighthofeverymonthcashInHandAmountSum;
						dataTosend.totBalAmount=CSCashSalescashSaleAmountSum+CSCashinHandoneighthofeverymonthcashInHandAmountSum;

						dataTosend.encValue=ComplianceControllerInfo.encrypt(dataTosend.totBalAmount+'');
						
						var detailresponseinputs = jq("."+ compliancepagecontainers.CS_DETAILED_RESPONSE_CONTAINER).find("input");
						ComplianceController.sqlinjectionchecker(detailresponseinputs)
						if (XSSFailed == true) {
							jq('html, body').animate({scrollTop : 0});
							return false;
						}
						if(buttonId == "CS_detailedResponseSubmit")
						{
							var getdetailedresponsesubmit = ComplianceController.getCasesModel(CS_DETAILED_RESPONSE_SUBMIT_URL,dataTosend, token, header);
							if (getdetailedresponsesubmit.rspSubmitFlag.toUpperCase() == "S")
							{	
								jq('html, body').animate({scrollTop : 0});
								ComplianceController.successor(sucessMessages.RESPOSNE_SUCCESS_WITHOUT_TRANSACTION_ID);
								ComplianceController.refrshInfoDetailsOnSave(getdetailedresponsesubmit,'CS');
								ComplianceController.saveconsolidatedpdfbyteprocessor();
							}
							else
							{
								jq('html, body').animate({scrollTop : 0});
								ComplianceController.validator(errorMessages.SERVER_RUNTIME_EXCEPTION);
							}
						}
						else if(buttonId == "CS_detailedResponseSaveDraft")
						{
							var getdetailedresponsesubmit = ComplianceController.getCasesModel(CS_DETAILED_RESPONSE_SAVE_DRAFT_URL,dataTosend, token, header);
							if (getdetailedresponsesubmit.rspSubmitFlag.toUpperCase() == "D")
							{
								jq('html, body').animate({scrollTop : 0});
								ComplianceController.successor(sucessMessages.DRAFT_SAVED_SUCCESSFULLY);
								ComplianceController.refrshInfoDetailsOnSave(getdetailedresponsesubmit,'CS');
							}
							else
							{
								jq('html, body').animate({scrollTop : 0});
								ComplianceController.validator(errorMessages.SERVER_RUNTIME_EXCEPTION);
							}
						}						
					}	
					ComplianceController.TCRResponseProcessor=function(){
						var dataTosend = {};
						var GET_TCR_TRANSACTION_NATURE_URL = complianceurls.GET_TCR_TRANSACTION_NATURE_URL;
						var dropdownresponse = ComplianceController.getCasesModel(GET_TCR_TRANSACTION_NATURE_URL,dataTosend, token, header,compliancecommon.REQUEST_TYPE_GET);
						ComplianceController.DetailResponseDropdownProcessor("tcrnatureoftransaction", dropdownresponse,"transNatureId", "description");
						var dataTosend = {};
						dataTosend.relInfoId = jq("#hiddenRelInfoId").text();
						var GET_DETAILED_RELATED_TCR_RESPONSE_URL = complianceurls.GET_DETAILED_RELATED_TCR_RESPONSE_URL;
						var TCR_RESPONSE_BINDER=complianceformelementclasses.TCR_RESPONSE_BINDER;
						var detailedRelated_TCR_URL = ComplianceController.getURL(contextRoot,GET_DETAILED_RELATED_TCR_RESPONSE_URL);
						var detailedRelated_TCR_ResponseList = ComplianceController.getCasesModel(detailedRelated_TCR_URL,dataTosend, token, header);
						var complianceviewInfoTCRRCVDPanResponse=detailedRelated_TCR_ResponseList.complianceviewInfoTCRRCVDPanResponse;
						var tcridentifiablepersonwithpanresponsearray=[];
						ComplianceController.rowparser(complianceviewInfoTCRRCVDPanResponse,tcridentifiablepersonwithpanresponsearray,"tcridentifiablepersonwithpanObj","tcridentifiablepersonwithpanrow","tcridentifiablepersonwithpanClass","tcridentifiablepersonwithpanadddeletebtncontainer","tcridentifiablepersonwithpanrowid",TCR_RESPONSE_BINDER,"tcridentifiablepersonwithpancontainer",false);
						var complianceviewInfoTCRCompValResponse=detailedRelated_TCR_ResponseList.complianceviewInfoTCRCompValResponse;
						ComplianceController.setIgnoredHdnElmntStatusTransStatus(complianceviewInfoTCRCompValResponse);
						if(ComplianceControllerInfo.getValueForParam(complianceviewInfoTCRCompValResponse,'array')!== 0 ){
							jq("#tcrtotalbalance").val(complianceviewInfoTCRCompValResponse[0].totBalAmt);	
							jq("#tcrtotalbalance").next().val(complianceviewInfoTCRCompValResponse[0].grptransId);
						}
												
						jq("#TCRidentifiablePersonWithPanrcvdAmountSum").val(jq("#tcrtotalbalance").val());
						jq("#TCR_detailedResponseSubmit").attr("belongsTo","RelatedInfoDetils");
						ComplianceController.hidepagesectionsprocessor(detailedresponsetypecontainers);
						jq("."+ compliancepagecontainers.TCR_DETAILED_RESPONSE_CONTAINER).show();
					}
					
					ComplianceController.CWBAResponseProcessor=function(){
						var dataTosend = {};
						dataTosend.relInfoId = jq("#hiddenRelInfoId").text();
						var GET_DETAILED_RELATED_CWBA_RESPONSE_URL = complianceurls.GET_DETAILED_RELATED_CWBA_RESPONSE_URL;
						var CWBA_RESPONSE_BINDER=complianceformelementclasses.CWBA_RESPONSE_BINDER;
						var detailedRelated_CWBA_URL = ComplianceController.getURL(contextRoot,GET_DETAILED_RELATED_CWBA_RESPONSE_URL);
						var detailedRelated_CWBA_ResponseList = ComplianceController.getCasesModel(detailedRelated_CWBA_URL,dataTosend, token, header);
						var complianceviewInfoCWAcntDtlsResp=detailedRelated_CWBA_ResponseList.complianceviewInfoCWAcntDtlsResp;
						var complianceviewInfoCWAcntDtlsRespArray=[];
						ComplianceController.rowparser(complianceviewInfoCWAcntDtlsResp,complianceviewInfoCWAcntDtlsRespArray,"cwbacashwithdrwnoutofbankObj","cwbacashwithdrwnoutofbankrow","cwbacashwithdrwnoutofbankClass","cwbacashwithdrwnoutofbankadddeletebtncontainer","cwbacashwithdrwnoutofbankrowid",CWBA_RESPONSE_BINDER,"cwbacashwithdrwnoutofbankContainer",false);
						
						var complianceviewInfoCWCompValResp=detailedRelated_CWBA_ResponseList.complianceviewInfoCWCompValResp;
						ComplianceController.setIgnoredHdnElmntStatusTransStatus(complianceviewInfoCWCompValResp);
						
						if(ComplianceControllerInfo.getValueForParam(complianceviewInfoCWCompValResp,'array')!== 0 )
						{
							jq("#cwbatotalbalance").val(complianceviewInfoCWCompValResp[0].totBalAmount);
							jq("#cwbatotalbalance").next().val(complianceviewInfoCWCompValResp[0].grpTransId);
						}
						
						jq("#CWBAcwbacashwithdrwnoutofbankwithdrawnAmountSum").val(jq("#cwbatotalbalance").val());
						jq("#CWBA_detailedResponseSubmit").attr("belongsTo","RelatedInfoDetils");
						ComplianceController.hidepagesectionsprocessor(detailedresponsetypecontainers);
						jq("."+ compliancepagecontainers.CWBA_DETAILED_RESPONSE_CONTAINER).show();
					}
					
					ComplianceController.EISCResponseProcessor=function(){
						var dataTosend = {};
						dataTosend.relInfoId = jq("#hiddenRelInfoId").text();
						var GET_DETAILED_RELATED_EISC_RESPONSE_URL = complianceurls.GET_DETAILED_RELATED_EISC_RESPONSE_URL;
 						var EISC_RESPONSE_BINDER=complianceformelementclasses.EISC_RESPONSE_BINDER;
						var detailedRelated_EISC_URL = ComplianceController.getURL(contextRoot,GET_DETAILED_RELATED_EISC_RESPONSE_URL);
						var detailedRelated_EISC_ResponseList = ComplianceController.getCasesModel(detailedRelated_EISC_URL,dataTosend, token, header);
						var complianceviewInfoEICashSavingResponse=detailedRelated_EISC_ResponseList.complianceviewInfoEICashSavingResponse;
						var EISCcashinhandoutofearlierincomefifteenthyearResponse=complianceviewInfoEICashSavingResponse[0];
						var EISCcashinhandoutofearlierincomefifteenthyearResponseArray=[];
 
						
						if(ComplianceControllerInfo.getValueForParam(EISCcashinhandoutofearlierincomefifteenthyearResponse,'array')!==0){
							EISCcashinhandoutofearlierincomefifteenthyearResponseArray.push(EISCcashinhandoutofearlierincomefifteenthyearResponse);	
						}
						
 
						var fifteenthYearcashinhandoutofearlierincomeresponsearray=[];
						ComplianceController.rowparser(EISCcashinhandoutofearlierincomefifteenthyearResponseArray,fifteenthYearcashinhandoutofearlierincomeresponsearray,"EISCcashinhandoutofearlierincomefifteenthyearObj","EISCcashinhandoutofearlierincomefifteenthyearObjrow","EISCcashinhandoutofearlierincomefifteenthyearClass","EISCcashinhandoutofearlierincomeSixteenthYearContainer","EISCcashinhandoutofearlierincomefifteenthyearrowid",EISC_RESPONSE_BINDER,"EISCcashinhandoutofearlierincomefifteenthyearContainer",false);
						var EISCcashinhandoutofearlierincomeSixteenthYearResponse=complianceviewInfoEICashSavingResponse[1];
						var EISCcashinhandoutofearlierincomeSixteenthYearResponseArray=[];
 

						if(ComplianceControllerInfo.getValueForParam(EISCcashinhandoutofearlierincomeSixteenthYearResponse,'array')!==0){
							EISCcashinhandoutofearlierincomeSixteenthYearResponseArray.push(EISCcashinhandoutofearlierincomeSixteenthYearResponse);
						}
						
 
						var sisteenthyearcashinhandoutofearlierincomeresponsearray=[];
						ComplianceController.rowparser(EISCcashinhandoutofearlierincomeSixteenthYearResponseArray,sisteenthyearcashinhandoutofearlierincomeresponsearray,"EISCcashinhandoutofearlierincomeSixteenthYearObj","EISCcashinhandoutofearlierincomeSixteenthYearObjrow","EISCcashinhandoutofearlierincomeSixteenthYearClass","EISCsubmitbtncontainer","EISCcashinhandoutofearlierincomeSixteenthYearrowid",EISC_RESPONSE_BINDER,"EISCcashinhandoutofearlierincomeSixteenthYearContainer",false);
						var complianceviewInfoEICompValResponse=detailedRelated_EISC_ResponseList.complianceviewInfoEICompValResponse;
 
						 ComplianceController.bindModelToForm(complianceviewInfoEICompValResponse,"EISC_relatedInfoDetailedResponseTable", "grptransId");
						 ComplianceController.bindModelToForm(complianceviewInfoEICompValResponse,"EISC_relatedInfoDetailedResponseTable", "relInfoRespId");
 
						ComplianceController.setIgnoredHdnElmntStatusTransStatus(complianceviewInfoEICompValResponse);
						jq("#EISC_detailedResponseSubmit").attr("belongsTo","RelatedInfoDetils");
						ComplianceController.hidepagesectionsprocessor(detailedresponsetypecontainers);
						jq("."+ compliancepagecontainers.EISC_DETAILED_RESPONSE_CONTAINER).show();
					}
					
					ComplianceController.ERCResponseProcessor=function(){
						var dataTosend = {};
						var GET_ERC_EXEMPT_INCOME_TYPE_URL = complianceurls.GET_ERC_EXEMPT_INCOME_TYPE_URL;
						var dropdownresponse = ComplianceController.getCasesModel(GET_ERC_EXEMPT_INCOME_TYPE_URL,dataTosend, token, header,compliancecommon.REQUEST_TYPE_GET);
						ComplianceController.DetailResponseDropdownProcessor("ERCcashReceivedOutofExemptReceiptExemptIncomeType", dropdownresponse,"exemptIncTypeId", "description");
						var dataTosend = {};
						dataTosend.relInfoId = jq("#hiddenRelInfoId").text();
						var GET_DETAILED_RELATED_ERC_RESPONSE_URL = complianceurls.GET_DETAILED_RELATED_ERC_RESPONSE_URL;
						var ERC_RESPONSE_BINDER=complianceformelementclasses.ERC_RESPONSE_BINDER;
						var detailedRelated_ERC_URL = ComplianceController.getURL(contextRoot,GET_DETAILED_RELATED_ERC_RESPONSE_URL);
						var detailedRelated_ERC_ResponseList = ComplianceController.getCasesModel(detailedRelated_ERC_URL,dataTosend, token, header);
						var complianceviewInfoERCRCVDResponse=detailedRelated_ERC_ResponseList.complianceviewInfoERCRCVDResponse;
						var ERCcomplianceviewInfoERCRCVDResponseArray=[];
						ComplianceController.rowparser(complianceviewInfoERCRCVDResponse,ERCcomplianceviewInfoERCRCVDResponseArray,"ERCcashreceiptOutofExemptReceiptObj","ERCcashreceiptOutofExemptReceiptObjrow","ERCcashreceiptOutofExemptReceiptClass","ERCcashreceiptOutofExemptReceiptAddDeleteContainer","ERCcashreceiptOutofExemptReceiptrowid",ERC_RESPONSE_BINDER,"ERCcashreceiptOutofExemptReceiptContainer",false);
						
						var complianceviewInfoERCCompValResponse=detailedRelated_ERC_ResponseList.complianceviewInfoERCCompValResponse;
						ComplianceController.setIgnoredHdnElmntStatusTransStatus(complianceviewInfoERCCompValResponse);
						if(ComplianceControllerInfo.getValueForParam(complianceviewInfoERCCompValResponse,'array')!==0){
							jq("#erctotalbalance").val(complianceviewInfoERCCompValResponse[0].balAmount);
							jq("#erctotalbalance").next().val(complianceviewInfoERCCompValResponse[0].grptransId);
						}
								
						jq("#ERCcashReceivedOutofExemptReceiptAmountSum").val(jq("#erctotalbalance").val());
						jq("#ERC_detailedResponseSubmit").attr("belongsTo","RelatedInfoDetils");
						ComplianceController.hidepagesectionsprocessor(detailedresponsetypecontainers);
						jq("."+ compliancepagecontainers.ERC_DETAILED_RESPONSE_CONTAINER).show();
					}
					
					ComplianceController.hidepagesectionsprocessor=function(sectionsforhiding){
						for(i=0;i<sectionsforhiding.length;i++)
						{
							jq("."+sectionsforhiding[i]).hide();
							jq("."+sectionsforhiding[i]).find("input,select").removeClass("errorElement");
						}
					}
					
					ComplianceController.CalculateDetailedResponse = function() {
						var computevalueObject = jq(".computevalue");
						var computevaluesum = 0;
						jq(computevalueObject).each(
								function() {
									if (jq(this).val() != "") {
										computevaluesum = computevaluesum
												+ parseInt(jq(this).val());
									}
								});
						if (jq("#correctInfoValue").val() != "") {
							jq("#computedValue").val(
									parseInt(jq("#correctInfoValue").val())
											- computevaluesum);
						}
						var additionvalueObject = jq(".additionvalue");
						var additionvaluesum = 0;
						jq(additionvalueObject).each(
								function() {
									if (jq(this).val() != "") {
										additionvaluesum = additionvaluesum
												+ parseInt(jq(this).val());
									}
								});
						if (jq("#computedValue").val() == "") {
							jq("#computedValue").val(additionvaluesum);
						} else {
							var basevalue = parseInt(jq("#computedValue").val());
							jq("#computedValue").val(
									basevalue + additionvaluesum);
						}
					}

					ComplianceController.relatedInfoadditionalInfoSubmitHyperLink = function(
							cellvalue, options, rowObject) {
						var anchorElement = document.createElement('a');
						anchorElement
								.setAttribute("href", "javascript:void(0)");
						anchorElement.innerHTML = "Submit";
						jq(anchorElement).attr("class", "submitViewClass");
						anchorElement.setAttribute("onclick",
								"javascript:ComplianceController.getrelatedInfoadditionalInfoDetails('"
										+ rowObject.infoReqId + "')");
						var anchorString = anchorElement.outerHTML.toString();
						return anchorString;

					}

					ComplianceController.getrelatedInfoadditionalInfoDetails = function(
							infoReqid) {
						var GET_RALATED_INFO_ADDITIONAL_INFO_DOC_UPLOAD = complianceurls.GET_RALATED_INFO_ADDITIONAL_INFO_DOC_UPLOAD;
						var dataTosend = {};
						dataTosend.infoReqId = parseInt(infoReqid);
						var ADD_INFO_UPLOAD_FORM_FORM_ID = complianceformids.ADD_INFO_UPLOAD_FORM_FORM_ID;
						var ADD_INFO_UPLOAD_FORM_ELEMENT_CLASS = complianceformelementclasses.ADD_INFO_UPLOAD_FORM_ELEMENT_CLASS;
						var relatedInfoaddInfoDetailsURL = ComplianceController
								.getURL(contextRoot,
										GET_RALATED_INFO_ADDITIONAL_INFO_DOC_UPLOAD);
						var relatedInfoAddInfoDetails = ComplianceController
								.getCasesModel(relatedInfoaddInfoDetailsURL,
										dataTosend, token, header);
						var additionalInfoDocUpload = relatedInfoAddInfoDetails.complianceviewRelAddlInfoDocUploadView;
						ComplianceController.bindModelToForm(
								additionalInfoDocUpload,
								ADD_INFO_UPLOAD_FORM_FORM_ID,
								ADD_INFO_UPLOAD_FORM_ELEMENT_CLASS);
						jq("#" + complianceformids.ADDITIONAL_INFO_UPLOAD_PAGE)
								.attr("title", "issuerelatedInfoadditionalinfo");
						var targetpages = [];
						targetpages
								.push(compliancepagecontainers.ADD_INFO_DETAILS_PAGE_CONTAINER);
						ComplianceController.pageNavigate(globalContainer,
								targetpages);

					}

					ComplianceController.relatedInfoadditionalInfoViewHyperLink = function(
							cellvalue, options, rowObject) {
						var anchorElement = document.createElement('a');
						anchorElement
								.setAttribute("href", "javascript:void(0)");
						anchorElement.innerHTML = "View";
						jq(anchorElement).attr("class", "submitViewClass");
						anchorElement
								.setAttribute(
										"onclick",
										"javascript:ComplianceController.getrelatedInfoAdditionalInfoDownloadDocumentDetails('"
												+ rowObject.infoReqId + "')");
						var anchorString = anchorElement.outerHTML.toString();
						return anchorString;

					}

					ComplianceController.getrelatedInfoAdditionalInfoDownloadDocumentDetails = function(
							infoReqid) {
						var GET_ADDITIONAL_INFO_DOC_DOWNLOAD_URL = complianceurls.GET_RELATED_INFO_ADDITIONAL_INFO_DETAILS;
						var dataTosend = {};
						dataTosend.infoReqId = parseInt(infoReqid);
						var taxPayerDocList = ComplianceController.getURL(
								contextRoot,
								GET_ADDITIONAL_INFO_DOC_DOWNLOAD_URL);
						var docList = ComplianceController.getCasesModel(
								taxPayerDocList, dataTosend, token, header);
						var docInfoSearchResponse = docList.complianceviewRelInfoAddlInfoDoc;
						ComplianceController.bindModelToGridView(
								docInfoSearchResponse,
								compliancetable.ADDITIONAL_INFO_DOC_TABLE);
						jq("#" + complianceformids.ADDITIONAL_INFO_UPLOAD_PAGE)
								.attr("title", "issuerelatedInfoadditionalinfo");
						var targetpages = [];
						targetpages
								.push(compliancepagecontainers.DOWNLOAD_PAGE_CONTAINER);
						ComplianceController.pageNavigate(globalContainer,
								targetpages);
					}

					ComplianceController.sqlinjectionchecker = function(formid) {
						XSSFailed = null;
						jq(formid)
								.each(
										function() {
											var XSSResponse = XSSProtector(jq(
													this).val());
											if (XSSResponse == false) {
												jq(this).addClass(
														"errorElement");
												jq(
														"."
																+ compliancepagecontainers.ERROR_MESSAGE_CONTAINER)
														.show()
														.append(
																"<div>"
																		+ errorMessages.MALICIOUS_CHARACTERS
																		+ "</div>");
												setTimeout(
														function() {
															jq(
																	"."
																			+ compliancepagecontainers.ERROR_MESSAGE_CONTAINER)
																	.hide()
																	.children()
																	.remove();
														}, 5000);
												XSSFailed = true;
												return false;
											} else {
												jq(this).removeClass(
														"errorElement");
											}
										});

					}

					ComplianceController.TTResponseProcessor = function() {
						var dataTosend = {};
						dataTosend.issueId = jq("#issueId").text();
						var GET_EXEMPT_DED_CAT_MASTER_URL = complianceurls.GET_EXEMPT_DED_CAT_MASTER_URL;
						var detailedRelated_EXEMPTDEDCAT_URL = ComplianceController
								.getURL(contextRoot,
										GET_EXEMPT_DED_CAT_MASTER_URL);
						var dropdownresponse = ComplianceController
								.getCasesModel(
										detailedRelated_EXEMPTDEDCAT_URL,
										dataTosend, token, header);
						var dropdownresponseList = dropdownresponse.complianceviewExempDedCatViewList;
						ComplianceController.DetailResponseDropdownProcessor(
								"ttexmptDedctExpFinYear", dropdownresponseList,
								"exemptDedCatId", "description");

						var dataTosend = {};
						dataTosend.relInfoId = jq("#hiddenRelInfoId").text();
						var TT_RESPONSE_BINDER = complianceformelementclasses.TT_RESPONSE_BINDER;
						var GET_DETAILED_RELATED_TT_RESPONSE_URL = complianceurls.GET_DETAILED_RELATED_TT_RESPONSE_URL;
						var detailedRelated_TT_URL = ComplianceController
								.getURL(contextRoot,
										GET_DETAILED_RELATED_TT_RESPONSE_URL);
						var detailedRelated_TT_ResponseList = ComplianceController
								.getCasesModel(detailedRelated_TT_URL,
										dataTosend, token, header);
						var detailedRelated_TT_complianceviewInfoTTRcptResp = detailedRelated_TT_ResponseList.complianceviewInfoTTRcptResp;
						var receiptRelToOtherresponsearray = [];
						ComplianceController
								.rowparser(
										detailedRelated_TT_complianceviewInfoTTRcptResp,
										receiptRelToOtherresponsearray,
										"ttreceiptRelToOtherInfoObj",
										"receiptRelToOtherrow",
										"ttreceiptRelToOtherInfoClass",
										"ttvalRelToOtherPanContainer",
										"receiptRelToOtherrowid",
										TT_RESPONSE_BINDER,
										"ttreceiptReltoOtherInfoContainer",false);
						var detailedRelated_TT_complianceviewInfoTTOthFyPanResp = detailedRelated_TT_ResponseList.complianceviewInfoTTOthFyPanResp;
						var valRelToOtherresponsearray = [];
						ComplianceController
								.rowparser(
										detailedRelated_TT_complianceviewInfoTTOthFyPanResp,
										valRelToOtherresponsearray,
										"ttvalRelToOtherPanObj",
										"valRelToOtherPanrow",
										"ttvalRelToOtherPanClass",
										"ttvalRelToOtherPanAddbDeletebtnContainer",
										"valRelToOtherPanrowid",
										TT_RESPONSE_BINDER,
										"ttvalRelToOtherPanContainer",false);
						var detailedRelated_TT_complianceviewInfoTTOthInfoValResp = detailedRelated_TT_ResponseList.complianceviewInfoTTOthInfoValResp;
						var valCovrdInOtherresponsearray = [];
						ComplianceController
								.rowparser(
										detailedRelated_TT_complianceviewInfoTTOthInfoValResp,
										valCovrdInOtherresponsearray,
										"ttvalCovrdInOtherInfoObj",
										"valCovrdInOtherrow",
										"ttvalCovrdInOtherInfoClass",
										"ttexmptDedctExpContainer",
										"valCovrdInOtherrowid",
										TT_RESPONSE_BINDER,
										"ttvalCovrdInOtherContainer",false);
						var detailedRelated_TT_complianceviewInfoTTExempDedResp = detailedRelated_TT_ResponseList.complianceviewInfoTTExempDedResp;
						var exemptionresponsearray = [];
						ComplianceController
								.rowparser(
										detailedRelated_TT_complianceviewInfoTTExempDedResp,
										exemptionresponsearray,
										"ttexmptDedctExpObj",
										"ttexmptDedctExprow",
										"ttexmptDedctExpClass",
										"ttexmptDedctExpaddDeletebtnContainer",
										"ttexmptDedctExprowid",
										TT_RESPONSE_BINDER,
										"ttexmptDedctExpContainer",false);
						var detailedRelated_TT_complianceviewInfoTTCompValResp = detailedRelated_TT_ResponseList.complianceviewInfoTTCompValResp;
						ComplianceController.setIgnoredHdnElmntStatusTransStatus(detailedRelated_TT_complianceviewInfoTTCompValResp);
						
						ComplianceController
								.bindModelToForm(
										detailedRelated_TT_complianceviewInfoTTCompValResp,
										"ttincomeGainLossContainer",
										TT_RESPONSE_BINDER);
						jq("#TTdetailedResponseSubmit").attr("belongsTo","RelatedInfoDetils");
						ComplianceController.hidepagesectionsprocessor(detailedresponsetypecontainers);
						jq("."+ compliancepagecontainers.TT_DETAILED_RESPONSE_CONTAINER).show();
						var ttATwoSum = ComplianceController.amountCalculator(
								jq(".ttATwo"), "ttATwoSum");
						jq("#ttvalreltootherpancomputed").val(ttATwoSum);
						var ttAFourSum = ComplianceController.amountCalculator(
								jq(".ttAFour"), "ttAFourSum");
						jq("#ttexemptdedcexpenditurecomputed").val(ttAFourSum);
					}

					ComplianceController.TTSPResponseProcessor = function() {
						var dataTosend = {};
						dataTosend.issueId = jq("#issueId").text();
						var GET_EXEMPT_DED_CAT_MASTER_URL = complianceurls.GET_EXEMPT_DED_CAT_MASTER_URL;
						var detailedRelated_EXEMPTDEDCAT_URL = ComplianceController
								.getURL(contextRoot,
										GET_EXEMPT_DED_CAT_MASTER_URL);
						var dropdownresponse = ComplianceController
								.getCasesModel(
										detailedRelated_EXEMPTDEDCAT_URL,
										dataTosend, token, header);
						var dropdownresponseList = dropdownresponse.complianceviewExempDedCatViewList;
						ComplianceController.DetailResponseDropdownProcessor(
								"ttspexptDedcExpexemptIncomeType", dropdownresponseList,
								"exemptDedCatId", "description");

						var dataTosend = {};
						dataTosend.relInfoId = jq("#hiddenRelInfoId").text();
						var TTSP_RESPONSE_BINDER = complianceformelementclasses.TTSP_RESPONSE_BINDER;
						var GET_DETAILED_RELATED_TTSP_RESPONSE_URL = complianceurls.GET_DETAILED_RELATED_TTSP_RESPONSE_URL;
						var detailedRelated_TTSP_URL = ComplianceController
								.getURL(contextRoot,
										GET_DETAILED_RELATED_TTSP_RESPONSE_URL);
						var detailedRelated_TTSP_ResponseList = ComplianceController
								.getCasesModel(detailedRelated_TTSP_URL,
										dataTosend, token, header);
						var detailedRelated_TTSP_complianceviewInfoTTRcptResp = detailedRelated_TTSP_ResponseList.complianceviewInfoTTRcptResp;
						var ttspreceiptRelToabvresponsearray = [];
						ComplianceController
								.rowparser(
										detailedRelated_TTSP_complianceviewInfoTTRcptResp,
										ttspreceiptRelToabvresponsearray,
										"ttspreceiptRelToabvInfoObj",
										"ttspreceiptRelToabvrow",
										"ttspreceiptRelToabvInfoClass",
										"ttspStampValueContainer",
										"ttspreceiptRelToabvrowid",
										TTSP_RESPONSE_BINDER,
										"ttspRcptRelToAbvInfoContainer",false);
						var detailedRelated_TTSP_complianceviewInfoTTSPStmpValResp = detailedRelated_TTSP_ResponseList.complianceviewInfoTTSPStmpValResp;
						var ttspstmpValresponsearray = [];
						ComplianceController
								.rowparser(
										detailedRelated_TTSP_complianceviewInfoTTSPStmpValResp,
										ttspstmpValresponsearray,
										"ttspStampValueObj",
										"ttspStampValuerow",
										"ttspStampValueClass",
										"ttspcapitalGainContainer",
										"ttspStampValuerowid",
										TTSP_RESPONSE_BINDER,
										"ttspStampValueContainer",false);
						var detailedRelated_TTSP_complianceviewInfoTTSPCapGainResp = detailedRelated_TTSP_ResponseList.complianceviewInfoTTSPCapGainResp;
						var ttspcapitalGainresponsearray = [];
						ComplianceController
								.rowparser(
										detailedRelated_TTSP_complianceviewInfoTTSPCapGainResp,
										ttspcapitalGainresponsearray,
										"ttspcapitalGainObj",
										"ttspcapitalGainrow",
										"ttspcapitalGainClass",
										"ttspvalRelToOtherPanContainer",
										"ttspcapitalGainrowid",
										TTSP_RESPONSE_BINDER,
										"ttspcapitalGainContainer",false);
						var detailedRelated_TTSP_complianceviewInfoTTOthFyPanResp = detailedRelated_TTSP_ResponseList.complianceviewInfoTTOthFyPanResp;
						var ttspvalRelToOtherPanresponsearray = [];
						ComplianceController
								.rowparser(
										detailedRelated_TTSP_complianceviewInfoTTOthFyPanResp,
										ttspvalRelToOtherPanresponsearray,
										"ttspvalRelToOtherPanObj",
										"ttspvalRelToOtherPanrow",
										"ttspvalRelToOtherPanClass",
										"ttspvalRelToOtherPanadddeletebtnContainer",
										"ttspvalRelToOtherPanrowid",
										TTSP_RESPONSE_BINDER,
										"ttspvalRelToOtherPanContainer",false);
						var detailedRelated_TTSP_complianceviewInfoTTOthInfoValResp = detailedRelated_TTSP_ResponseList.complianceviewInfoTTOthInfoValResp;
						var ttspvalCvrdInOtherresponsearray = [];
						ComplianceController
								.rowparser(
										detailedRelated_TTSP_complianceviewInfoTTOthInfoValResp,
										ttspvalCvrdInOtherresponsearray,
										"ttspvalCvrdInOtherInfoObj",
										"ttspvalCvrdInOtherrow",
										"ttspvalCvrdInOtherInfoClass",
										"ttspexptDedcExpContainer",
										"ttspvalCvrdInOtherrowid",
										TTSP_RESPONSE_BINDER,
										"ttspvalcvrdInOtherInfoContainer",false);
						var detailedRelated_TTSP_complianceviewInfoExempDedResp = detailedRelated_TTSP_ResponseList.complianceviewInfoTTExempDedResp;
						var ttInfoExempDedresponsearray = [];
						ComplianceController
								.rowparser(
										detailedRelated_TTSP_complianceviewInfoExempDedResp,
										ttInfoExempDedresponsearray,
										"ttspexptDedcExpObj",
										"ttspexptDedcExprow",
										"ttspexptDedcExpClass",
										"ttspexptDedcExpadddeletebtnContainer",
										"ttspexptDedcExprowid",
										TTSP_RESPONSE_BINDER,
										"ttspexptDedcExpContainer",false);
						var detailedRelated_TTSP_complianceviewInfoCompValResp = detailedRelated_TTSP_ResponseList.complianceviewInfoTTCompValResp;
						ComplianceController.setIgnoredHdnElmntStatusTransStatus(detailedRelated_TTSP_complianceviewInfoCompValResp);
						ComplianceController
								.bindModelToForm(
										detailedRelated_TTSP_complianceviewInfoCompValResp,
										"ttspIncomeGainLossContainer",
										TTSP_RESPONSE_BINDER);
						jq("#TTSP_detailedResponseSubmit").attr("belongsTo","RelatedInfoDetils");
						ComplianceController.hidepagesectionsprocessor(detailedresponsetypecontainers);
						jq("."+ compliancepagecontainers.TTSP_DETAILED_RESPONSE_CONTAINER).show();	
						var ttspAFourSum = ComplianceController
								.amountCalculator(jq(".ttspAFour"),
										"ttspAFourSum");
						jq("#ttspvalreltootherpancomputed").val(ttspAFourSum);
						var ttspASixSum = ComplianceController
								.amountCalculator(jq(".ttspASix"),
										"ttspASixSum");
						jq("#ttspexemptdedcexpenditurecomputed").val(
								ttspASixSum);
					}

					ComplianceController.DetailResponseDropdownProcessor = function(
							dropdownElement, dropdownresponseList,
							dropdownValue, dropdownText) {

						jq("." + dropdownElement).empty();
						jq("." + dropdownElement).append(
								"<option value=''>-Select-</option>");
						for (i = 0; i < dropdownresponseList.length; i++) {
							jq("." + dropdownElement)
									.append(
											"<option value="
													+ dropdownresponseList[i][dropdownValue]
													+ ">"
													+ dropdownresponseList[i][dropdownText]
													+ "</option>");
						}
					}
					ComplianceController.setIgnoredHdnElmntStatusTransStatus = function(obj){
						
						if(ComplianceControllerInfo.getValueForParam(obj,'array')!==0 
								 && ComplianceControllerInfo.getValueForParam(obj[0],'array')!==0 
								 && ComplianceControllerInfo.getValueForParam(obj[0].transStatus,'str')=="D") {
							 	jq('#hdnIsIgnoredHdnElmnt').val('false');
						 } else jq('#hdnIsIgnoredHdnElmnt').val('true');
						
					} 
					
					ComplianceController.getTransId = function(obj,key){
						
						key=key.toLowerCase();
						
						switch(key)
						{
						
						
							case "sf":
							case "sfti":
							case "tt":
							case "ttsp":
								if(jq('#hdnIsIgnoredHdnElmnt').val()=='false' 
									&& ComplianceControllerInfo.getValueForParam(jq('#'+key+'totalComputedAmount').next().val(),'str')!==''
									){
										obj.transId=jq('#'+key+'totalComputedAmount').next().val();
										obj.relInfoRespId=jq('#'+key+'totalComputedAmount').next().next().val();
								}
								break;
							case "tcr":
							case "erc":
								if(jq('#hdnIsIgnoredHdnElmnt').val()=='false' 
									&& ComplianceControllerInfo.getValueForParam(jq('#'+key+'totalbalance').next().val(),'str')!==''){
										obj.grptransId=jq('#'+key+'totalbalance').next().val();
										obj.relInfoRespId=jq('#'+key+'totalbalance').next().next().val();
									}
									break;
								
							case "cwba":
								if(jq('#hdnIsIgnoredHdnElmnt').val()=='false' 
										&& ComplianceControllerInfo.getValueForParam(jq('#'+key+'totalbalance').next().val(),'str')!==''){
										obj.grpTransId=jq('#'+key+'totalbalance').next().val();
										obj.relInfoRespId=jq('#'+key+'totalbalance').next().next().val();
								}
								break;
							case "cs":
								if(jq('#hdnIsIgnoredHdnElmnt').val()=='false' 
									&& ComplianceControllerInfo.getValueForParam(jq('#CS_relatedInfoDetailedResponseTable .grpTransId').val(),'str')!==''
								 ){
									obj.grpTransId=jq('#CS_relatedInfoDetailedResponseTable .grpTransId').val();
									obj.relInfoRespId=jq('#CS_relatedInfoDetailedResponseTable .relInfoRespId').val();
								 }
							break;
							case "eisc":
								if(jq('#hdnIsIgnoredHdnElmnt').val()=='false' 
									&& ComplianceControllerInfo.getValueForParam(jq('#EISC_relatedInfoDetailedResponseTable .grptransId').val(),'str')!==''
								 ){
									obj.grptransId=jq('.EISCsubmitbtncontainer .grptransId').val();
									obj.relInfoRespId=jq('.EISCsubmitbtncontainer .relInfoRespId').val();
									  
								 }
							
							
								break;
						
						}
						 
						
					} 
					
					
					ComplianceController.refrshInfoDetailsOnSave = function(obj,key){
						
						if(ComplianceControllerInfo.getValueForParam(obj,'array')==0) return;
						
						key=key.toLowerCase();
						
						switch(key)
						{
						
						
							case "sfvol":
								if(ComplianceControllerInfo.getValueForParam(obj.tsn,'str')!==''){
									ComplianceController.hidepagesectionsprocessor(relatedinfoInfogroupcontainers);
									ComplianceController.hidepagesectionsprocessor(detailedresponsetypecontainers);
									ComplianceController.relatedInfoDetailsPageRefresher(); 
									jq(".otherReltedInfoDynamicFieldsRows,.editVoluntarilyDisclosedRelInfoContainer").empty();
									 
									ComplianceController.getOtherVoluntarilyDisclosedInfoDetails(obj.tsn,obj.verifType,obj.relInfoId,obj.infoGroup,'Submit');
								}
								break;
							case "sf":
							case "sfti":
							case "tt":
							case "ttsp":
							case "cs":
							case "cwba":
							case "eise":
							case "tcr":
							case "erc":
								if(ComplianceControllerInfo.getValueForParam(obj.tsn,'str')!==''){
									ComplianceController.hidepagesectionsprocessor(relatedinfoInfogroupcontainers);
									ComplianceController.hidepagesectionsprocessor(detailedresponsetypecontainers);
									ComplianceController.relatedInfoDetailsPageRefresher(); 
									jq(".otherReltedInfoDynamicFieldsRows,.editVoluntarilyDisclosedRelInfoContainer").empty();
									 
									var getFuncName=obj.infoGroup.replace(/ /g, '');
									var func=window["ComplianceController"]["get"+getFuncName];
									if(typeof func=="function"){
										func.apply(null,[''+obj.tsn ,getFuncName,''+obj.relInfoId,'Submit']);	
									};
									//ComplianceController.getOtherVoluntarilyDisclosedInfoDetails(obj.tsn,obj.verifType,obj.relInfoId,obj.infoGroup,'Submit');
									
									
								}
								break;
							 
						
						}
						 
						
					} 
					
					
					ComplianceController.SFResponseProcessor = function() {
						var dataTosend = {};
						dataTosend.issueId = jq("#issueId").text();
						var GET_EXEMPT_INC_TYP_MASTER_URL = complianceurls.GET_EXEMPT_INC_TYP_MASTER_URL;
						var detailedRelated_INCTYPMASTER_URL = ComplianceController
								.getURL(contextRoot,
										GET_EXEMPT_INC_TYP_MASTER_URL);
						var dropdownresponse = ComplianceController
								.getCasesModel(
										detailedRelated_INCTYPMASTER_URL,
										dataTosend, token, header);
						var dropdownresponseList = dropdownresponse.complianceviewExempIncTypeViewList;
						ComplianceController.DetailResponseDropdownProcessor(
								"sfoutofreceiptexmptIncomeType", dropdownresponseList,
								"exemptIncTypeId", "description");

						var dataTosend = {};
						dataTosend.relInfoId = jq("#hiddenRelInfoId").text();
						var GET_DETAILED_RELATED_SF_RESPONSE_URL = complianceurls.GET_DETAILED_RELATED_SF_RESPONSE_URL;
						var detailedRelated_SF_URL = ComplianceController
								.getURL(contextRoot,
										GET_DETAILED_RELATED_SF_RESPONSE_URL);
						var detailedRelated_SF_ResponseList = ComplianceController
								.getCasesModel(detailedRelated_SF_URL,
										dataTosend, token, header);
						var SF_RESPONSE_BINDER = complianceformelementclasses.SF_RESPONSE_BINDER;
						var detailedRelated_SF_complianceviewcorrectInfoval = detailedRelated_SF_ResponseList.complianceviewInfoSFCivVWId;
						var sfcorrectinfovalresponsearray = [];
						ComplianceController
								.rowparser(
										detailedRelated_SF_complianceviewcorrectInfoval,
										sfcorrectinfovalresponsearray,
										"sfCorrectInfoObj", "sfcorrectinforow",
										"sfcorrectInfoClass",
										"sfearlierIncomeContainer",
										"sfcorrectinforowid",
										SF_RESPONSE_BINDER,
										"sfcorrectInfoValContainer",false);
						var detailedRelated_SF_complianceviewInfoSFIncomeResp = detailedRelated_SF_ResponseList.complianceviewInfoSFIncomeResp;
						var earlierIncomeresponsearray = [];
						ComplianceController
								.rowparser(
										detailedRelated_SF_complianceviewInfoSFIncomeResp,
										earlierIncomeresponsearray,
										"sfearlierIncomeObj",
										"earlierIncomerow",
										"sfearlierIncomeClass",
										"sfoutofreceiptContainer",
										"earlierIncomerowid",
										SF_RESPONSE_BINDER,
										"sfearlierIncomeContainer",false);
						var detailedRelated_SF_complianceviewInfoSFExemptRcptResp = detailedRelated_SF_ResponseList.complianceviewInfoSFExemptRcptResp;
						var outofreceiptresponsearray = [];
						ComplianceController
								.rowparser(
										detailedRelated_SF_complianceviewInfoSFExemptRcptResp,
										outofreceiptresponsearray,
										"sfOutofreceiptObj", "outofreceiptrow",
										"sfoutofreceiptClass",
										"sfoutofreceiptadddeletebtnContainer",
										"outofreceiptrowid",
										SF_RESPONSE_BINDER,
										"sfoutofreceiptContainer",false);
						var detailedRelated_SF_complianceviewInfoSFWithdrwnResp = detailedRelated_SF_ResponseList.complianceviewInfoSFWithdrwnResp;
						var withdrawnOutOfBankresponsearray = [];
						ComplianceController
								.rowparser(
										detailedRelated_SF_complianceviewInfoSFWithdrwnResp,
										withdrawnOutOfBankresponsearray,
										"sfwithdrawnOutOfBankObj",
										"withdrawnOutOfBankrow",
										"sfwithdrawnOutOfBankClass",
										"sfwithdrawnoutofbankadddeletebtnContainer",
										"withdrawnOutOfBankrowid",
										SF_RESPONSE_BINDER,
										"sfwithdrawnoutofbankContainer",false);
						var detailedRelated_SF_complianceviewInfoSFRcvdPanResp = detailedRelated_SF_ResponseList.complianceviewInfoSFRcvdPanResp;
						var identifiablePersonWithPanresponsearray = [];
						ComplianceController
								.rowparser(
										detailedRelated_SF_complianceviewInfoSFRcvdPanResp,
										identifiablePersonWithPanresponsearray,
										"sfidentifiablePersonWithPanObj",
										"identifiablePersonWithPanrow",
										"sfidentifiablePersonWithPanClass",
										"sfidentifiablePersonWithPanaddDeletebtnContainer",
										"identifiablePersonWithPanrowid",
										SF_RESPONSE_BINDER,
										"sfidentifiablepersonwithPanContainer",false);
						var detailedRelated_SF_complianceviewInfoSFRcvdWoPanResp = detailedRelated_SF_ResponseList.complianceviewInfoSFRcvdWoPanResp;
						var identifiablePersonWithOutPanresponsearray = [];
						ComplianceController
								.rowparser(
										detailedRelated_SF_complianceviewInfoSFRcvdWoPanResp,
										identifiablePersonWithOutPanresponsearray,
										"sfidentifiablePersonWithOutPanObj",
										"identifiablePersonWithOutPanrow",
										"sfidentifiablePersonWithOutPanClass",
										"sfidentifiablePersonWithoutPanadddeletebtnContainer",
										"identifiablePersonWithOutPanrowid",
										SF_RESPONSE_BINDER,
										"sfidentifiablepersonWithoutPanContainer",false);
						var detailedRelated_SF_complianceviewInfoSFRcvdUnIdnResp = detailedRelated_SF_ResponseList.complianceviewInfoSFRcvdUnIdnResp;
						var unidentifiablePersonresponsearray = [];
						ComplianceController
								.rowparser(
										detailedRelated_SF_complianceviewInfoSFRcvdUnIdnResp,
										unidentifiablePersonresponsearray,
										"sfunidentifiablePersonObj",
										"unidentifiablePersonrow",
										"sfunidentifiablePersonClass",
										"sfunidentifiablePersonadddeletebtnContainer",
										"unidentifiablePersonrowid",
										SF_RESPONSE_BINDER,
										"sfunidentifiablePersonContainer",false);
						var detailedRelated_SF_complianceviewInfoSFCashDiscResp = detailedRelated_SF_ResponseList.complianceviewInfoSFCashDiscResp;
						var cashDisclosedTobeDisclosedresponsearray = [];
						ComplianceController
								.rowparser(
										detailedRelated_SF_complianceviewInfoSFCashDiscResp,
										cashDisclosedTobeDisclosedresponsearray,
										"sfcashDisclosedTobeDisclosedObj",
										"cashDisclosedTobeDisclosedrow",
										"sfcashDisclosedTobeDisclosedClass",
										"sftotalContainer",
										"cashDisclosedTobeDisclosedrowid",
										SF_RESPONSE_BINDER,
										"sfcashDisclosedTobeDisclosedContainer",false);
						var detailedRelated_SF_complianceviewInfoSFCompValResp = detailedRelated_SF_ResponseList.complianceviewInfoSFCompValResp;
						
						ComplianceController.setIgnoredHdnElmntStatusTransStatus(detailedRelated_SF_complianceviewInfoSFCompValResp);
						
						ComplianceController
								.bindModelToForm(
										detailedRelated_SF_complianceviewInfoSFCompValResp,
										"sftotalContainer", SF_RESPONSE_BINDER);

						ComplianceController
								.bindModelToForm(
										detailedRelated_SF_complianceviewInfoSFCompValResp,
										"sftotalContainer", SF_RESPONSE_BINDER);
						jq("#SF_detailedResponseSubmit,#SF_detailedResponseSaveDraft").attr("belongsTo","RelatedInfoDetils");
						ComplianceController.hidepagesectionsprocessor(detailedresponsetypecontainers);
						jq("."+ compliancepagecontainers.SF_DETAILED_RESPONSE_CONTAINER).show();
						var sfAThreeSum = ComplianceController
						.amountCalculator(jq(".sfAThree"),
								"sfAThreeSum");
				jq("#sfoutofreceiptcomputed").val(sfAThreeSum);
				var sfAFourSum = ComplianceController.amountCalculator(
						jq(".sfAFour"), "sfAFourSum");
				jq("#sfidentifiablepersonwithpancomputed").val(
						sfAFourSum);
				var sfAFiveSum = ComplianceController.amountCalculator(
						jq(".sfAFive"), "sfAFiveSum");
				jq("#sfidentifiablepersonwithoutpancomputed").val(
						sfAFiveSum);
				var sfASixSum = ComplianceController
						.amountCalculator(jq(".sfASix"),
								"sfASixSum");
				jq("#sfunidentifiablecomputed").val(sfASixSum);
					}

					ComplianceController.SFTIResponseProcessor = function() {

						var dataTosend = {};
						dataTosend.issueId = jq("#issueId").text();
						var GET_EXEMPT_INC_TYP_MASTER_URL = complianceurls.GET_EXEMPT_INC_TYP_MASTER_URL;
						var detailedRelated_INCTYPMASTER_URL = ComplianceController
								.getURL(contextRoot,
										GET_EXEMPT_INC_TYP_MASTER_URL);
						var dropdownresponse = ComplianceController
								.getCasesModel(
										detailedRelated_INCTYPMASTER_URL,
										dataTosend, token, header);
						var dropdownresponseList = dropdownresponse.complianceviewExempIncTypeViewList;
						ComplianceController.DetailResponseDropdownProcessor(
								"sftiexemptIncomeType", dropdownresponseList,
								"exemptIncTypeId", "description");

						var dataTosend = {};
						dataTosend.relInfoId = jq("#hiddenRelInfoId").text();
						var GET_DETAILED_RELATED_SFTI_RESPONSE_URL = complianceurls.GET_DETAILED_RELATED_SFTI_RESPONSE_URL;
						var detailedRelated_SFTI_URL = ComplianceController
								.getURL(contextRoot,
										GET_DETAILED_RELATED_SFTI_RESPONSE_URL);
						var detailedRelated_SFTI_ResponseList = ComplianceController
								.getCasesModel(detailedRelated_SFTI_URL,
										dataTosend, token, header);
						var SFTI_RESPONSE_BINDER = complianceformelementclasses.SFTI_RESPONSE_BINDER;
						var detailedRelated_SFTI_complianceviewCorrectInfoResp = detailedRelated_SFTI_ResponseList.complianceviewInfoSFCivVWId;
						var CorrectInfoResponsearray = [];
						ComplianceController
								.rowparser(
										detailedRelated_SFTI_complianceviewCorrectInfoResp,
										CorrectInfoResponsearray,
										"sfticorrectInfoObj", "correctInforow",
										"sfticorrectInfoClass",
										"sftioutofincomeContainer",
										"sfticorrectInforowid",
										SFTI_RESPONSE_BINDER,
										"sfticorrevtInfoValContainer",false);
						var detailedRelated_SFTI_complianceviewInfoSFIncomeResp = detailedRelated_SFTI_ResponseList.complianceviewInfoSFIncomeResp;
						var earlierIncomeresponsearray = [];
						ComplianceController
								.rowparser(
										detailedRelated_SFTI_complianceviewInfoSFIncomeResp,
										earlierIncomeresponsearray,
										"sftiearlierIncomeObj",
										"earlierIncomerow",
										"sftiearlierIncomeClass",
										"sftioutofreceiptContainer",
										"earlierIncomerowid",
										SFTI_RESPONSE_BINDER,
										"sftioutofincomeContainer",false);
						var detailedRelated_SFTI_complianceviewInfoSFExemptRcptResp = detailedRelated_SFTI_ResponseList.complianceviewInfoSFExemptRcptResp;
						var outofreceiptresponsearray = [];
						ComplianceController
								.rowparser(
										detailedRelated_SFTI_complianceviewInfoSFExemptRcptResp,
										outofreceiptresponsearray,
										"sftioutofreceiptObj",
										"outofreceiptrow",
										"sftioutofreceiptClass",
										"sftioutofreceiptadddeletebtnContainer",
										"outofreceiptrowid",
										SFTI_RESPONSE_BINDER,
										"sftioutofreceiptContainer",false);
						var detailedRelated_SFTI_complianceviewInfoSFWithdrwnResp = detailedRelated_SFTI_ResponseList.complianceviewInfoSFWithdrwnResp;
						var withdrawnOutOfBankresponsearray = [];
						ComplianceController
								.rowparser(
										detailedRelated_SFTI_complianceviewInfoSFWithdrwnResp,
										withdrawnOutOfBankresponsearray,
										"sftiwithdrawnOutOfBankObj",
										"withdrawnOutOfBankrow",
										"sftiwithdrawnOutOfBankClass",
										"sftiwithdrawnOutOfBankadddeletebtnContainer",
										"withdrawnOutOfBankrowid",
										SFTI_RESPONSE_BINDER,
										"sftiwithdrawnoutofbankContainer",false);
						var detailedRelated_SFTI_complianceviewInfoSFRcvdPanResp = detailedRelated_SFTI_ResponseList.complianceviewInfoSFRcvdPanResp;
						var identifiablePersonWithPanresponsearray = [];
						ComplianceController
								.rowparser(
										detailedRelated_SFTI_complianceviewInfoSFRcvdPanResp,
										identifiablePersonWithPanresponsearray,
										"sftiidentifiablePersonWithPanObj",
										"identifiablePersonWithPanrow",
										"sftiidentifiablePersonWithPanClass",
										"sftiidentifiablePersonWithPanadddeletebtnContainer",
										"identifiablePersonWithPanrowid",
										SFTI_RESPONSE_BINDER,
										"sftiidentifiablepersonwithPanContainer",false);
						var detailedRelated_SFTI_complianceviewInfoSFRcvdWoPanResp = detailedRelated_SFTI_ResponseList.complianceviewInfoSFRcvdWoPanResp;
						var identifiablePersonWithOutPanresponsearray = [];
						ComplianceController
								.rowparser(
										detailedRelated_SFTI_complianceviewInfoSFRcvdWoPanResp,
										identifiablePersonWithOutPanresponsearray,
										"sftiidentifiablePersonWithOutPanObj",
										"identifiablePersonWithOutPanrow",
										"sftiidentifiablePersonWithOutPanClass",
										"sftiidentifiablePersonWithOutPanadddeletebtnContainer",
										"identifiablePersonWithOutPanrowid",
										SFTI_RESPONSE_BINDER,
										"sftiidentifiablepersonWithoutPanContainer",false);
						var detailedRelated_SFTI_complianceviewInfoSFRcvdUnIdnResp = detailedRelated_SFTI_ResponseList.complianceviewInfoSFRcvdUnIdnResp;
						var unidentifiablePersonresponsearray = [];
						ComplianceController
								.rowparser(
										detailedRelated_SFTI_complianceviewInfoSFRcvdUnIdnResp,
										unidentifiablePersonresponsearray,
										"sftiunidentifiablePersonObj",
										"unidentifiablePersonrow",
										"sftiunidentifiablePersonClass",
										"sftiunidentifiablePersonadddeletebtnContainer",
										"unidentifiablePersonrowid",
										SFTI_RESPONSE_BINDER,
										"sftiunidentifiablePersonContainer",false);
						var detailedRelated_SFTI_complianceviewInfoSFCashDiscResp = detailedRelated_SFTI_ResponseList.complianceviewInfoSFCashDiscResp;
						var cashDisclosedTobeDisclosedresponsearray = [];
						ComplianceController
								.rowparser(
										detailedRelated_SFTI_complianceviewInfoSFCashDiscResp,
										cashDisclosedTobeDisclosedresponsearray,
										"sfticashDisclosedTobeDisclosedObj",
										"cashDisclosedTobeDisclosedrow",
										"sfticashDisclosedTobeDisclosedClass",
										"sftitotalContainer",
										"cashDisclosedTobeDisclosedrowid",
										SFTI_RESPONSE_BINDER,
										"sfticashDisclosedTobeDisclosedContainer",false);
						var detailedRelated_SFTI_complianceviewInfoInvIncResp = detailedRelated_SFTI_ResponseList.complianceviewInfoSFTIInvInc;
						var investmentIncomeresponsearray = [];
						ComplianceController
								.rowparser(
										detailedRelated_SFTI_complianceviewInfoInvIncResp,
										investmentIncomeresponsearray,
										"sftiinvestmentDuringTheYearObj",
										"sftiinvestmentDuringTheYearrow",
										"sftiinvestmentDuringTheYearClass",
										"SFTISubmitbtnContainer",
										"sftiinvestmentDuringTheYearrowid",
										SFTI_RESPONSE_BINDER,
										"sftiinvestmentDuringTheYearContainer",false);
						var detailedRelated_SFTI_complianceviewInfoSFCompValResp = detailedRelated_SFTI_ResponseList.complianceviewInfoSFCompValResp;
						ComplianceController.setIgnoredHdnElmntStatusTransStatus(detailedRelated_SFTI_complianceviewInfoSFCompValResp);
						
						ComplianceController
								.bindModelToForm(
										detailedRelated_SFTI_complianceviewInfoSFCompValResp,
										"sftitotalContainer",
										SFTI_RESPONSE_BINDER);
						jq("#SFTI_detailedResponseSubmit").attr("belongsTo","RelatedInfoDetils");
						ComplianceController.hidepagesectionsprocessor(detailedresponsetypecontainers);
						jq("."+ compliancepagecontainers.SFTI_DETAILED_RESPONSE_CONTAINER).show();
						var sftiAThreeSum = ComplianceController
								.amountCalculator(jq(".sftiAThree"),
										"sftiAThreeSum");
						jq("#sftioutofreceiptcomputed").val(sftiAThreeSum);
						var sftiAFiveSum = ComplianceController
								.amountCalculator(jq(".sftiAFive"),
										"sftiAFiveSum");
						jq("#sftiidentifiablepersonwithpancomputed").val(
								sftiAFiveSum);
						var sftiASixSum = ComplianceController
								.amountCalculator(jq(".sftiASix"),
										"sftiASixSum");
						jq("#sftiidentifiablepersonwithoutpancomputed").val(
								sftiASixSum);
						var sftiASevenSum = ComplianceController
								.amountCalculator(jq(".sftiASeven"),
										"sftiASevenSum");
						jq("#sftiunidentifiablecomputed").val(sftiASevenSum);
					}

					ComplianceController.rowparser = function(
							backendrowresponse, specificrowresponsearray,
							originalelementforcloning, clonedelementname,
							originalelementclassname,
							insertionelementclassname, clonedelementid,
							rowbinderclassname, itemcontainer,loaddefaulttemplate) {
						if (jq(backendrowresponse).length > 0 || loaddefaulttemplate) {
							var specificrowresponsearray = specificrowresponsearray;
							for (j = 0; j < backendrowresponse.length; j++) {
								var clonedelementname = clonedelementname;
								var clonedelementname = jq(
										"." + originalelementclassname+":first")
										.clone();
								clonedelementname[0]
										.setAttribute(
												'id',
												clonedelementname[0]
														.getAttribute('id')
														+ jq("."
																+ originalelementclassname).length);
								jq(clonedelementname).insertBefore(
										"." + insertionelementclassname).show();
								specificrowresponsearray = [];
								var clonedelementid = clonedelementid;
								var clonedelementid = jq(clonedelementname[0])
										.attr("id");
								specificrowresponsearray
										.push(backendrowresponse[j]);
								ComplianceController.bindModelToForm(
										specificrowresponsearray,
										clonedelementid, rowbinderclassname);
								if (j > 0) {
									jq("." + itemcontainer).find(
											".rowspandetector").attr(
											"rowspan",
											parseInt(jq("." + itemcontainer)
													.find(".rowspandetector")
													.attr("rowspan")) + 1);
								}
							}
						} else {
							jq("#" + originalelementforcloning).show();
						}
					}

					ComplianceController.amountCalculator = function(
							elementsforcalculation, storagevariablename) {
						var elementsforcalculation = elementsforcalculation;
						var storagevariablename = storagevariablename;
						storagevariablename = 0;
						jq(elementsforcalculation)
								.each(
										function() {
											if (jq(this).val() != "" && jq(this).attr('type')!=='hidden') {
												storagevariablename = storagevariablename
														+ parseInt(jq(this)
																.val());
											}
										});
						return parseInt(storagevariablename);
					}

					ComplianceController.SFIMReadOnlyScreenProcessor = function(
							disablestatus) {
						if (jq(
								"."
										+ compliancepagecontainers.IM_DETAILED_RESPONSE_CONTAINER)
								.is(":visible")) {
							var IMinputsandselects = jq(
									"."
											+ compliancepagecontainers.IM_DETAILED_RESPONSE_CONTAINER)
									.find("input,select");
							ComplianceController.disableelements(
									IMinputsandselects, disablestatus);
							ComplianceController.statusbasedshowhideelements(
									IMreadonlyscreen, disablestatus);
						} else if (jq(
								"."
										+ compliancepagecontainers.SF_DETAILED_RESPONSE_CONTAINER)
								.is(":visible")) {
							var SFinputsandselects = jq(
									"."
											+ compliancepagecontainers.SF_DETAILED_RESPONSE_CONTAINER)
									.find("input,select");
							ComplianceController.disableelements(
									SFinputsandselects, disablestatus);
							ComplianceController.statusbasedshowhideelements(
									SFreadonlyscreen, disablestatus);
							ComplianceController.increasedecreaserowspanner(
									SFiteamcontainers, false);
						} else if (jq(
								"."
										+ compliancepagecontainers.SFTI_DETAILED_RESPONSE_CONTAINER)
								.is(":visible")) {
							var SFTIinputsandselects = jq(
									"."
											+ compliancepagecontainers.SFTI_DETAILED_RESPONSE_CONTAINER)
									.find("input,select");
							ComplianceController.disableelements(
									SFTIinputsandselects, disablestatus);
							ComplianceController.statusbasedshowhideelements(
									SFTIreadonlyscreen, disablestatus);
							ComplianceController.increasedecreaserowspanner(
									SFTIiteamcontainers, false);
						} else if (jq(
								"."
										+ compliancepagecontainers.TT_DETAILED_RESPONSE_CONTAINER)
								.is(":visible")) {
							var TTinputsandselects = jq(
									"."
											+ compliancepagecontainers.TT_DETAILED_RESPONSE_CONTAINER)
									.find("input,select");
							ComplianceController.disableelements(
									TTinputsandselects, disablestatus);
							ComplianceController.statusbasedshowhideelements(
									TTreadonlyscreen, disablestatus);
							ComplianceController.increasedecreaserowspanner(
									TTiteamcontainers, false);
						} else if (jq(
								"."
										+ compliancepagecontainers.TTSP_DETAILED_RESPONSE_CONTAINER)
								.is(":visible")) {
							var TTSPinputsandselects = jq(
									"."
											+ compliancepagecontainers.TTSP_DETAILED_RESPONSE_CONTAINER)
									.find("input,select");
							ComplianceController.disableelements(
									TTSPinputsandselects, disablestatus);
							ComplianceController.statusbasedshowhideelements(
									TTSPreadonlyscreen, disablestatus);
							ComplianceController.increasedecreaserowspanner(
									TTSPiteamcontainers, false);
						}
					}

					ComplianceController.disableelements = function(elements,
							status) {
						jq(elements).each(function() {
							jq(this).attr("disabled", status);
						});

					}

					ComplianceController.statusbasedshowhideelements = function(
							elements, status) {
						jq.each(elements, function(index, value) {
							if (status) {
								jq("." + value).hide();
							} else {
								jq("." + value).show();
							}
						});
					}

					ComplianceController.increasedecreaserowspanner = function(
							items, increaserowspan) {
						jq.each(items, function(index, value) {
							if (increaserowspan) {
								jq("." + value).find(".rowspandetector").attr(
										"rowspan",
										parseInt(jq("." + value).find(
												".rowspandetector").attr(
												"rowspan")) + 1);
							} else {
								jq("." + value).find(".rowspandetector").attr(
										"rowspan",
										parseInt(jq("." + value).find(
												".rowspandetector").attr(
												"rowspan")) - 1);
							}
						});
					}

					ComplianceController.viewRelatedInfoTableHistory = function(
							tsn, veriftype,infoGroup,relInfoId,infoCode) {
						var dataTosend = {};
						var verifType = null;
						dataTosend.relInfoId = relInfoId;
						dataTosend.verifType= veriftype;
						dataTosend.caseTypeId= jq("#rowcaseTypeId").text();
						verifType = veriftype;
						jq("#rowtsnid").text(tsn);
						jq("#rowveriftype").text(veriftype);
						jq("#rowinfogroup").text(infoGroup);
						jq("#rowinfoCode").text(infoCode);
						
						var GET_SFALL_VIEW_INFORMATION_RESPONSE_HISTORY_URL = complianceurls.GET_SFALL_VIEW_INFORMATION_RESPONSE_HISTORY_URL;
						var getSFviewinformationhistoryurl = ComplianceController
								.getURL(contextRoot,
										GET_SFALL_VIEW_INFORMATION_RESPONSE_HISTORY_URL);

						var GET_TTALL_VIEW_INFORMATION_RESPONSE_HISTORY_URL = complianceurls.GET_TTALL_VIEW_INFORMATION_RESPONSE_HISTORY_URL;
						var getTTviewinformationhistoryurl = ComplianceController
								.getURL(contextRoot,
										GET_TTALL_VIEW_INFORMATION_RESPONSE_HISTORY_URL);
						
						var GET_CSALL_VIEW_INFORMATION_RESPONSE_HISTORY_URL = complianceurls.GET_CSALL_VIEW_INFORMATION_RESPONSE_HISTORY_URL;
						var getCSviewinformationhistoryurl = ComplianceController.getURL(contextRoot,GET_CSALL_VIEW_INFORMATION_RESPONSE_HISTORY_URL);
						
						var GET_CWBAALL_VIEW_INFORMATION_RESPONSE_HISTORY_URL = complianceurls.GET_CWBAALL_VIEW_INFORMATION_RESPONSE_HISTORY_URL;
						var getCWBAviewinformationhistoryurl = ComplianceController.getURL(contextRoot,GET_CWBAALL_VIEW_INFORMATION_RESPONSE_HISTORY_URL);
						
						var GET_TCRALL_VIEW_INFORMATION_RESPONSE_HISTORY_URL = complianceurls.GET_TCRALL_VIEW_INFORMATION_RESPONSE_HISTORY_URL;
						var getTCRviewinformationhistoryurl = ComplianceController.getURL(contextRoot,GET_TCRALL_VIEW_INFORMATION_RESPONSE_HISTORY_URL);
						
						var GET_EISCALL_VIEW_INFORMATION_RESPONSE_HISTORY_URL = complianceurls.GET_EISCALL_VIEW_INFORMATION_RESPONSE_HISTORY_URL;
						var getEISCviewinformationhistoryurl = ComplianceController.getURL(contextRoot,GET_EISCALL_VIEW_INFORMATION_RESPONSE_HISTORY_URL);
						
						var GET_ERCALL_VIEW_INFORMATION_RESPONSE_HISTORY_URL = complianceurls.GET_ERCALL_VIEW_INFORMATION_RESPONSE_HISTORY_URL;
						var getERCviewinformationhistoryurl = ComplianceController.getURL(contextRoot,GET_ERCALL_VIEW_INFORMATION_RESPONSE_HISTORY_URL);
						
						if (verifType == "SF" || verifType == "SFTI") {
							var viewSFinformationresponsehistoryList = ComplianceController
									.getCasesModel(
											getSFviewinformationhistoryurl,
											dataTosend, token, header);
							var complianceviewRelInfoSFResponseHistoryList = viewSFinformationresponsehistoryList.complianceviewRelInfoSFALLResponseHistoryList;
							ComplianceController
									.ViewInformationResponseHistoryModalPopupProcessor(
											"relatedInfoTableModalTable",
											complianceviewRelInfoSFResponseHistoryList,
											"downloadrelatedInfoFile",
											"relInfoRespId", "tsnId", "createDate",tsn);
						}
						else if (verifType == "TT" || verifType == "TTSP") {
							var viewTTinformationresponsehistoryList = ComplianceController
									.getCasesModel(
											getTTviewinformationhistoryurl,
											dataTosend, token, header);
							var complianceviewRelInfoTTResponseHistoryList = viewTTinformationresponsehistoryList.complianceviewRelInfoTTALLResponseHistoryList;
							ComplianceController
									.ViewInformationResponseHistoryModalPopupProcessor(
											"relatedInfoTableModalTable",
											complianceviewRelInfoTTResponseHistoryList,
											"downloadrelatedInfoFile",
											"relInfoRespId", "tsnId", "createDate",tsn);
						}
						else if (verifType == "CS") {
							var viewCSinformationresponsehistoryList = ComplianceController.getCasesModel(getCSviewinformationhistoryurl,dataTosend, token, header);
							var complianceviewRelInfoCSALLResponseHistoryList = viewCSinformationresponsehistoryList.complianceviewRelInfoCSALLResponseHistoryList;
							ComplianceController.ViewInformationResponseHistoryModalPopupProcessor("relatedInfoTableModalTable",complianceviewRelInfoCSALLResponseHistoryList,"downloadrelatedInfoFile","relInfoRespId", "tsnId", "createDate",tsn);
						}
						else if (verifType == "CWBA") {
							var viewCWBAinformationresponsehistoryList = ComplianceController.getCasesModel(getCWBAviewinformationhistoryurl,dataTosend, token, header);
							var complianceviewRelInfoCWBAALLResponseHistoryList = viewCWBAinformationresponsehistoryList.complianceviewRelInfoCWBAALLResponseHistoryList;
							ComplianceController.ViewInformationResponseHistoryModalPopupProcessor("relatedInfoTableModalTable",complianceviewRelInfoCWBAALLResponseHistoryList,"downloadrelatedInfoFile","relInfoRespId", "tsnId", "createDate",tsn);
						}
						else if (verifType == "TCR") {
							var viewTCRinformationresponsehistoryList = ComplianceController.getCasesModel(getTCRviewinformationhistoryurl,dataTosend, token, header);
							var complianceviewRelInfoTCRALLResponseHistoryList = viewTCRinformationresponsehistoryList.complianceviewRelInfoTCRALLResponseHistoryList;
							ComplianceController.ViewInformationResponseHistoryModalPopupProcessor("relatedInfoTableModalTable",complianceviewRelInfoTCRALLResponseHistoryList,"downloadrelatedInfoFile","relInfoRespId", "tsnId", "createDate",tsn);
						}
						else if (verifType == "EISC") {
							var viewEISCinformationresponsehistoryList = ComplianceController.getCasesModel(getEISCviewinformationhistoryurl,dataTosend, token, header);
							var complianceviewRelInfoEISCALLResponseHistoryList = viewEISCinformationresponsehistoryList.complianceviewRelInfoEISCALLResponseHistoryList;
							ComplianceController.ViewInformationResponseHistoryModalPopupProcessor("relatedInfoTableModalTable",complianceviewRelInfoEISCALLResponseHistoryList,"downloadrelatedInfoFile","relInfoRespId", "tsnId", "createDate",tsn);
						}
						else if (verifType == "ERC") {
							var viewERCinformationresponsehistoryList = ComplianceController.getCasesModel(getERCviewinformationhistoryurl,dataTosend, token, header);
							var complianceviewRelInfoERCALLResponseHistoryList = viewERCinformationresponsehistoryList.complianceviewRelInfoERCALLResponseHistoryList;
							ComplianceController.ViewInformationResponseHistoryModalPopupProcessor("relatedInfoTableModalTable",complianceviewRelInfoERCALLResponseHistoryList,"downloadrelatedInfoFile","relInfoRespId", "tsnId", "createDate",tsn);
						}
						jq("#"+ compliancepagecontainers.RELATED_INFO_TABLE_MODAL_POPUP).modal("show");
					}

					ComplianceController.viewadditonalInfoTableHistory = function() {
						var additionalInfoGrid = jq("#"
								+ compliancetable.ADDITIONAL_INFO_TABLE);
						var selRowIds = additionalInfoGrid.jqGrid(
								"getGridParam", "selarrrow");
						var i, rowData, n = selRowIds.length;
						var additionalInfoRowData = [];
						var dataTosend = {};
						for (i = 0; i < n; i++) {
							var rowData = additionalInfoGrid.jqGrid(
									'getRowData', selRowIds[i]);
							if (jQuery.isEmptyObject(rowData) == false) {
								additionalInfoRowData.push(rowData);
							}

						}
						if (additionalInfoRowData.length <= 0) {
							alert(alerts.ADDITIONAL_INFO_VIEW_INFORMATION_HISTORY_ALERT);
							return false;
						}
						if (additionalInfoRowData.length > 1) {
							alert(alerts.MULTIPLE_ROW_SELECTED);
							return false;
						}
						for (i = 0; i < additionalInfoRowData.length; i++) {
							dataTosend.infoReqId = parseInt(additionalInfoRowData[i].infoReqId);
						}
						var GET_ADDITIONAL_VIEW_INFORMATION_RESPONSE_HISTORY_URL = complianceurls.GET_ADDITIONAL_VIEW_INFORMATION_RESPONSE_HISTORY_URL;
						var getadditionalinfoviewinformationhistoryurl = ComplianceController
								.getURL(contextRoot,
										GET_ADDITIONAL_VIEW_INFORMATION_RESPONSE_HISTORY_URL);
						var viewAdditionalInformationResponseHistoryList = ComplianceController
								.getCasesModel(
										getadditionalinfoviewinformationhistoryurl,
										dataTosend, token, header);
						var complianceviewAddlnInfoResponseHistoryList = viewAdditionalInformationResponseHistoryList.complianceviewAddlnInfoResponseHistoryList;
						ComplianceController
								.ViewInformationResponseHistoryModalPopupProcessor(
										"additionalInfoTableModalTable",
										complianceviewAddlnInfoResponseHistoryList,
										"downloadadditionalInfoFile",
										"responseId", "responseId",
										"createDate");
						jq(
								"#"
										+ compliancepagecontainers.ADDITIONAL_INFO_TABLE_MODAL_POPUP)
								.modal("show");
					}

					ComplianceController.viewrelatedInfoadditonalInfoTableHistory = function() {
						var realtedInfoadditionalInfoGrid = jq("#"
								+ compliancetable.RELATED_INFO_ADDITIONAL_INFO_LIST_TABLE);
						var selRowIds = realtedInfoadditionalInfoGrid.jqGrid(
								"getGridParam", "selarrrow");
						var i, rowData, n = selRowIds.length;
						var relatedInfoadditionalInfoRowData = [];
						var dataTosend = {};
						for (i = 0; i < n; i++) {
							var rowData = realtedInfoadditionalInfoGrid.jqGrid(
									'getRowData', selRowIds[i]);
							if (jQuery.isEmptyObject(rowData) == false) {
								relatedInfoadditionalInfoRowData.push(rowData);
							}

						}
						if (relatedInfoadditionalInfoRowData.length <= 0) {
							alert(alerts.NO_ROW_SELECTED);
							return false;
						}
						if (relatedInfoadditionalInfoRowData.length > 1) {
							alert(alerts.MULTIPLE_ROW_SELECTED);
							return false;
						}
						for (i = 0; i < relatedInfoadditionalInfoRowData.length; i++) {
							dataTosend.infoReqId = parseInt(relatedInfoadditionalInfoRowData[i].infoReqId);
						}
						var GET_RELATED_VIEW_ADDITIONAL_VIEW_INFORMATION_RESPONSE_HISTORY_URL = complianceurls.GET_RELATED_VIEW_ADDITIONAL_VIEW_INFORMATION_RESPONSE_HISTORY_URL;
						var getrelatedinformationviewadditionalinfoviewinformationhistoryurl = ComplianceController
								.getURL(contextRoot,
										GET_RELATED_VIEW_ADDITIONAL_VIEW_INFORMATION_RESPONSE_HISTORY_URL);
						var viewrelatedInfoAdditionalInformationResponseHistoryList = ComplianceController
								.getCasesModel(
										getrelatedinformationviewadditionalinfoviewinformationhistoryurl,
										dataTosend, token, header);
						var complianceviewRelInfoAddlnInfoResponseHistoryList = viewrelatedInfoAdditionalInformationResponseHistoryList.complianceviewRelInfoAddlnInfoResponseHistoryList;
						ComplianceController
								.ViewInformationResponseHistoryModalPopupProcessor(
										"relatedInfoadditionalInfoTableModalTable",
										complianceviewRelInfoAddlnInfoResponseHistoryList,
										"downloadrelatedInfoadditionalInfoFile",
										"responseId", "responseId",
										"createDate");
						jq(
								"#"
										+ compliancepagecontainers.RELATED_INFO_ADDITIONAL_INFO_TABLE_MODAL_POPUP)
								.modal("show");
					}

					ComplianceController.ViewInformationResponseHistoryModalPopupProcessor = function(
							modaltablename, response, downloadfileclassname,
							firstcolumncell, secondcolumncell, thirdcolumncell,tsnId) {
						jq("#" + modaltablename).children().not(':first')
								.remove();
						if (response.length <= 0) {
							jq("#tsnIdNum").text("");
							jq("#" + modaltablename).append(
									"<div class='nodataavailable'>"
											+ miscmessages.NO_DATA_AVAILABLE
											+ "</div>");
						} else {
							jq("#tsnIdNum").text(tsnId);
							for (i = 0; i < response.length; i++) {
								jq("#" + modaltablename)
										.append(
												"<div class='table-row'><div class='table-cell'>"
														+ (i+1)
														+ "</div><div class='table-cell'>"
														+ response[i][thirdcolumncell].split(" ")[0]
														+ "</div><div class='table-cell'><a href='javascript:void(0)' id='"
														+ response[i][firstcolumncell]
														+ "' class='"
														+ downloadfileclassname
														+ "'>"
														+ jq("#verifId").text()+"_"+response[i][firstcolumncell]
														+ ".pdf</a></div></div>");
							}
						}

					}

					ComplianceController.DownloadRelatedInfoAdditionalInfoFile = function(
							docid) {
						var GET_RELATED_INFO_ADDITIONAL_INFO_DOWNLOAD_URL = complianceurls.GET_RELATED_INFO_ADDITIONAL_INFO_DOWNLOAD_URL;
						var dataTosend = {};
						dataTosend.responseId = parseInt(docid);
						var getrelatedInfoAdditionalInfoDocument = ComplianceController
								.getCasesFile(
										GET_RELATED_INFO_ADDITIONAL_INFO_DOWNLOAD_URL,
										dataTosend, token, header);
					}

					ComplianceController.DownloadAdditionalInfoFile = function(
							docid) {
						var GET_ADDITIONAL_INFO_DOWNLOAD_URL = complianceurls.GET_ADDITIONAL_INFO_DOWNLOAD_URL;
						var dataTosend = {};
						dataTosend.responseId = parseInt(docid);
						var getAdditionalInfoDocument = ComplianceController
								.getCasesFile(GET_ADDITIONAL_INFO_DOWNLOAD_URL,
										dataTosend, token, header);
					}

					ComplianceController.DownloadRelatedInfoFile = function(
							tsnId, relInfoId, verifId, verifType,infoGroup,fileID,infoCode,filename) {
						var GET_RELATED_INFO_DOWNLOAD_URL = complianceurls.GET_RELATED_INFO_DOWNLOAD_URL;
						var dataTosend = {};
						var realtedInfoGrid = jq("#"
								+ compliancetable.RELATED_INFO_TABLE);
						var selRowIds = realtedInfoGrid.jqGrid("getGridParam",
								"selarrrow");
						var i, rowData, n = selRowIds.length;
						var relatedInfoRowData = [];
						var dataTosend = {};
						for (i = 0; i < n; i++) {
							var rowData = realtedInfoGrid.jqGrid('getRowData',
									selRowIds[i]);
							if (jQuery.isEmptyObject(rowData) == false) {
								relatedInfoRowData.push(rowData);
							}

						}
						for (i = 0; i < relatedInfoRowData.length; i++) {
							dataTosend.verifType = relatedInfoRowData[i].verifType;
						}
						dataTosend.transId = tsnId;
						dataTosend.relInfoId = relInfoId;
						dataTosend.verifId = verifId;
						dataTosend.verifType = verifType;
						dataTosend.infoGroup=infoGroup;
						dataTosend.fileID=fileID;
						dataTosend.infoCode=infoCode;
						dataTosend.filename=filename;
						dataTosend.caseTypeId= jq("#rowcaseTypeId").text();
						var getRelatedInfoDocument = ComplianceController
								.getCasesFile(GET_RELATED_INFO_DOWNLOAD_URL,
										dataTosend, token, header);
					}
					ComplianceController.numberFormatter = function(number) {
						number = number.toString();
						var afterPoint = '';
						if (number.indexOf('.') > 0) {
							afterPoint = number.substring(number.indexOf('.'),
									number.length);
						}
						number = Math.floor(number);
						number = number.toString();
						var lastThree = number.substring(number.length - 3);
						var otherNumbers = number.substring(0,
								number.length - 3);
						if (otherNumbers != '') {
							lastThree = ',' + lastThree;
						}
						var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g,
								",")
								+ lastThree + afterPoint;
						return res;
					}

					ComplianceController.panChecker = function(container) {
						jq("."+container).find(".panformatchecker")
								.each(
										function() {
											if(jq(this).is(":visible"))
											{
											if (jq(this).val() != "") {
												var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
												if (regpan
														.test((jq(this).val())
																.trim()) == false) {
													jq(this).addClass(
															"errorElement");
													ComplianceController
															.validator(errorMessages.PAN_FORMAT_CHECKER_ERROR);
													validstatus = false;
													// return false;
												} else {
													jq(this).removeClass(
															"errorElement");
												}
											}
											}
										});

					}

					ComplianceController.ifscformatchecker = function(container) {
						jq("."+container).find(".ifscformatchecker")
								.each(
										function() {
											if(jq(this).is(":visible"))
											{
											if (jq(this).val() != "") {
												var regifsc = /^[A-Z|a-z]{4}[0][\w]{6}$/;
												if (regifsc
														.test(jq(this).val()) == false) {
													jq(this).addClass(
															"errorElement");
													ComplianceController
															.validator(errorMessages.IFSC_FORMAT_CHECKER_ERROR);
													validstatus = false;
												} else {
													jq(this).removeClass(
															"errorElement");
												}
											}
											}
										});

					}

					ComplianceController.nameformatchecker = function(container) {						
						jq("."+container).find(".nameformatchecker")
								.each(
										function() {
											if(jq(this).is(":visible"))
											{
											if (jq(this).val() != "") {
												var regname = /^[a-zA-Z ,.'-]{1,100}$/;
												if (regname
														.test(jq(this).val()) == false) {
													jq(this).addClass(
															"errorElement");
													ComplianceController
													.validator(ComplianceControllerInfo.textFormat(errorMessages.TEXT_FORMAT_SIZE_CHECKER_ERROR,'name','100','characters'));
													validstatus = false;
												} else {
													jq(this).removeClass(
															"errorElement");
												}
											}
											}
										});

					}

					ComplianceController.pinformatchecker = function(container) {						
						jq(".container").find(".pinformatchecker")
								.each(
										function() {
											if(jq(this).is(":visible"))
											{
											if (jq(this).val() != "") {
												var regifsc = /^[A-Z|a-z]{4}[0][\w]{6}$/;
												var regpin = /^[1-9][0-9]{5}$/;
												if (regpin.test(jq(this).val()) == false) {
													jq(this).addClass(
															"errorElement");
													ComplianceController
															.validator(errorMessages.PIN_FORMAT_CHECKER_ERROR);
													validstatus = false;
												} else {
													jq(this).removeClass(
															"errorElement");
												}
											}
											}
										});

					}

					ComplianceController.addressformatchecker = function(container) {
						jq("."+container).find(".addressformatchecker")
								.each(
										function() {
											if(jq(this).is(":visible"))
											{
											if (jq(this).val() != "") {
												var regaddress = /^(?![0-9]*$)[a-zA-Z0-9]{6,}$/;
												if (regaddress.test(jq(this)
														.val()) == false) {
													jq(this).addClass(
															"errorElement");
													ComplianceController
															.validator(errorMessages.ADDRESS_FORMAT_CHECKER_ERROR);
													validstatus = false;
												} else {
													jq(this).removeClass(
															"errorElement");
												}
											}
											}
										});

					}

					ComplianceController.banknameformatchecker = function(container) {
						jq("."+container).find(".banknameformatchecker")
								.each(
										function() {
											if(jq(this).is(":visible"))
											{
											if (jq(this).val() != "") {
												var regbankName = /^[a-zA-Z\s]*$/;
												if (regbankName.test(jq(this)
														.val()) == false) {
													jq(this).addClass(
															"errorElement");
													ComplianceController
															.validator(errorMessages.BANK_NAME_FORMAT_CHECKER_ERROR);
													validstatus = false;
												} else {
													jq(this).removeClass(
															"errorElement");
												}
											}
											}
										});

					}

					ComplianceController.RelatedInfoValue = function(cellvalue,
							options, rowObject) {
						var val = Math.round(rowObject.value);
						if (isNaN(val)) {
							return rowObject.value;
						} else {
							var RelatedInfoValue = ComplianceController
									.numberFormatter(val);
							return RelatedInfoValue;
						}
					}
					ComplianceController.RelatedInfoCellValue = function(cellvalue,
							options, rowObject) {
						var val = Math.round(cellvalue);
						if (isNaN(val)) {
							return cellvalue;
						} else {
							var RelatedInfoValue = ComplianceController
									.numberFormatter(val);
							return RelatedInfoValue;
						}
					}
					ComplianceController.removeElementsUntilSpecificElement = function(
							startingendingelementObject) {
						jq.each(startingendingelementObject, function(index,
								value) {
							jq("." + index+":first").nextUntil("." + value).remove();
							jq("." + index).hide();
						});
					}

					ComplianceController.defaultrowspansetter = function(
							TTrowspanrowcontainerObject) {
						jq.each(TTrowspanrowcontainerObject, function(index,
								value) {
							var rowspancounter = jq("." + index).nextUntil(
									"." + value).length;
							jq("." + index).find(".rowspandetector").attr(
									"rowspan", (rowspancounter + 1));
						});
					}

					ComplianceController.onfocuschangevalidator = function(
							currentelement,formatter) {
						if(formatter == "nonemptyfield")
						{
							if (jq(currentelement).val() == "" || jq(currentelement).val() == null) {
								jq(currentelement).addClass("errorElement");
								ComplianceController.validator(errorMessages.AMOUNT_MANDATORY);
								validstatus = false;
								return false;
							}
						}						
						else if (formatter == "panformatchecker") {
							var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
							if (regpan.test(jq(currentelement).val()) == false) {
								jq(currentelement).addClass("errorElement");
								ComplianceController
										.validator(errorMessages.PAN_FORMAT_CHECKER_ERROR);
								validstatus = false;
							} else {
								jq(currentelement).removeClass("errorElement");
							}
						}else if (formatter == "ifscformatchecker") {
							var regifsc = /^[A-Z|a-z]{4}[0][\w]{6}$/;
							if (regifsc.test(jq(currentelement).val()) == false) {
								jq(currentelement).addClass("errorElement");
								ComplianceController
										.validator(errorMessages.IFSC_FORMAT_CHECKER_ERROR);
								validstatus = false;
							} else {
								jq(currentelement).removeClass("errorElement");
							}
						} else if (formatter ==  "nameformatchecker") {
							var regname = /^[a-zA-Z ,.'-]{1,100}$/;
							if (regname.test(jq(currentelement).val()) == false) {
								jq(currentelement).addClass("errorElement");
								ComplianceController
										.validator(ComplianceControllerInfo.textFormat(errorMessages.TEXT_FORMAT_SIZE_CHECKER_ERROR,'name','100','characters'));
								validstatus = false;
							} else {
								jq(currentelement).removeClass("errorElement");
							}
						} else if (formatter == "pinformatchecker") {
							var regpin = /^[1-9]{1}[0-9]{5}|[X]{6}$/;
							if (regpin.test(jq(currentelement).val()) == false) {
								jq(currentelement).addClass("errorElement");
								ComplianceController
										.validator(errorMessages.PIN_FORMAT_CHECKER_ERROR);
								validstatus = false;
							} else {
								jq(currentelement).removeClass("errorElement");
							}
						}else if (formatter == "addressformatchecker") {
							var regaddress = /^(?![0-9]*$)[a-zA-Z0-9]{6,}$/;
							if (regaddress.test(jq(currentelement).val()) == false) {
								jq(currentelement).addClass("errorElement");
								ComplianceController
										.validator(errorMessages.ADDRESS_FORMAT_CHECKER_ERROR);
								validstatus = false;
							} else {
								jq(currentelement).removeClass("errorElement");
							}
						}else if (formatter == "banknameformatchecker") {
							var regbankName = /^[a-zA-Z\s]*$/;
							if (regbankName.test(jq(currentelement).val()) == false) {
								jq(currentelement).addClass("errorElement");
								ComplianceController
										.validator(errorMessages.BANK_NAME_FORMAT_CHECKER_ERROR);
								validstatus = false;
							} else {
								jq(currentelement).removeClass("errorElement");
							}
						}

						else {
							jq(currentelement).removeClass("errorElement");
						}
					}

					ComplianceController.SFComputationprocessor = function() {
						var sfAOneSum = ComplianceController.amountCalculator(
								jq(".sfAOne"), "sfAOneSum");
						var sfATwoSum = ComplianceController.amountCalculator(
								jq(".sfATwo"), "sfATwoSum");
						var sfAThreeSum = ComplianceController
								.amountCalculator(jq(".sfAThree"),
										"sfAThreeSum");
						var sfAFourSum = ComplianceController.amountCalculator(
								jq(".sfAFour"), "sfAFourSum");
						var sfAFiveSum = ComplianceController.amountCalculator(
								jq(".sfAFive"), "sfAFiveSum");
						var sfASixSum = ComplianceController.amountCalculator(
								jq(".sfASix"), "sfASixSum");
						/*var sfASevenSum = ComplianceController
								.amountCalculator(jq(".sfASeven"),
										"sfASevenSum");*/
						var sfAEightSum = ComplianceController
								.amountCalculator(jq(".sfAEight"),
										"sfAEightSum");
						jq("#sftotalComputedAmount").val(
								sfAOneSum - sfATwoSum - sfAThreeSum
										- sfAFourSum - sfAFiveSum - sfASixSum
										-sfAEightSum);
					}

					ComplianceController.SFTIComputationprocessor = function() {
						var sftiAOneSum = ComplianceController
								.amountCalculator(jq(".sftiAOne"),
										"sftiAOneSum");
						var sftiATwoSum = ComplianceController
								.amountCalculator(jq(".sftiATwo"),
										"sftiATwoSum");
						var sftiAThreeSum = ComplianceController
								.amountCalculator(jq(".sftiAThree"),
										"sftiAThreeSum");
						var sftiAFourSum = ComplianceController
								.amountCalculator(jq(".sftiAFour"),
										"sftiAFourSum");
						var sftiAFiveSum = ComplianceController
								.amountCalculator(jq(".sftiAFive"),
										"sftiAFiveSum");
						var sftiASixSum = ComplianceController
								.amountCalculator(jq(".sftiASix"),
										"sftiASixSum");
						var sftiASevenSum = ComplianceController
								.amountCalculator(jq(".sftiASeven"),
										"sftiASevenSum");
						var sftiAEightSum = ComplianceController
								.amountCalculator(jq(".sftiAEight"),
										"sftiAEightSum");
						jq("#sftitotalComputedAmount").val(
								sftiAOneSum - sftiATwoSum - sftiAThreeSum
										- sftiAFourSum - sftiAFiveSum
										- sftiASixSum - sftiASevenSum
										- sftiAEightSum);
					}

					ComplianceController.TTComputationprocessor = function() {
						var ttAOneSum = ComplianceController.amountCalculator(
								jq(".ttAOne"), "ttAOneSum");
						var ttATwoSum = ComplianceController.amountCalculator(
								jq(".ttATwo"), "ttATwoSum");
						var ttAThreeSum = ComplianceController
								.amountCalculator(jq(".ttAThree"),
										"ttAThreeSum");
						var ttAFourSum = ComplianceController.amountCalculator(
								jq(".ttAFour"), "ttAFourSum");
						jq("#tttotalComputedAmount").val(
								ttAOneSum - ttATwoSum - ttAThreeSum
										- ttAFourSum);
					}

					ComplianceController.TTSPComputationprocessor = function() {
						var ttspAthreeSum = ComplianceController
								.amountCalculator(jq(".ttspAthree"),
										"ttspAthreeSum");
						var ttspAFourSum = ComplianceController
								.amountCalculator(jq(".ttspAFour"),
										"ttspAFourSum");
						var ttspAFiveSum = ComplianceController
								.amountCalculator(jq(".ttspAFive"),
										"ttspAFiveSum");
						var ttspASixSum = ComplianceController
								.amountCalculator(jq(".ttspASix"),
										"ttspASixSum");
						jq("#ttsptotalComputedAmount").val(
								ttspAthreeSum - ttspAFourSum - ttspAFiveSum
										- ttspASixSum);
					}

					ComplianceController.errorhighlightedremover = function(
							element) {
						if (jq(element).hasClass("errorElement")) {
							if (jq(element).val() != "") {
								jq(element).removeClass("errorElement");
							}
						}
					}
					ComplianceController.numberChecker=function(event,len,val){

						var charCode=event.keyCode?event.keyCode:event.which;
							if(charCode==8 || charCode==9 ) return;
						if(!(event.shiftKey==false && (charCode==8 || (charCode >=48 && charCode <=57)))) 
						{	event.preventDefault();
							return;
						
						}
						if(ComplianceControllerInfo.getValueForParam(val,'int')!==0 && !(val>len)){	event.preventDefault();
						return;
						}
					}
					 
					ComplianceController.getOtherRelatedInfoDetails=function(caseTypeId,issueId,infoTypeId){
						var GET_OTHER_RELATED_INFO_DETAILS_URL=complianceurls.GET_OTHER_RELATED_INFO_DETAILS_URL;
						var GET_OTHER_RELATED_INFO_DETAIL_BELONGING_FIELD_FORM_ID=complianceformids.GET_OTHER_RELATED_INFO_DETAIL_BELONGING_FIELD_FORM_ID;
						var GET_OTHER_RELATED_INFO_DETAIL_BELONGING_FIELD_FORM_ELEMENT_CLASS=complianceformelementclasses.GET_OTHER_RELATED_INFO_DETAIL_BELONGING_FIELD_FORM_ELEMENT_CLASS;
						var dataTosend = {};
						dataTosend.caseTypeId=caseTypeId;
						dataTosend.issueId=issueId;
						dataTosend.infoTypeId=infoTypeId;
						var otherRelatedInfoDetails=ComplianceController.getCasesModel(GET_OTHER_RELATED_INFO_DETAILS_URL,dataTosend, token, header);
						var infoGroupAddnlField=otherRelatedInfoDetails.infoGroupAddnlField;
						for(i=0;i<infoGroupAddnlField.length;i++)
						{
							var infoIGroupAdnlFieldVldtns={};
							var infoIGroupAdnlFieldAttrVldtns='';
 							var infoIGroupAdnlFieldAttr=['TYPE','MAXLENGTH','MINLENGTH'];
							var infoIGroupAdnlFieldvldtnErrDesc={};
							var infoIGroupAdnlFieldVldtnsArray=infoGroupAddnlField[i].infoIGroupAdnlFieldVldtns;
							 
							var numberCheckerFunc="";
							var madatrySymbolText="";
							 var maxLengthVal="this.value.length+1";
							for(j=0;j<infoIGroupAdnlFieldVldtnsArray.length;j++)
							{
								if(jq.inArray(infoIGroupAdnlFieldVldtnsArray[j].vldtnTypeId,infoIGroupAdnlFieldAttr)>-1)
								{
									infoIGroupAdnlFieldAttrVldtns+=infoIGroupAdnlFieldVldtnsArray[j].vldtnTypeId.toLowerCase()+"='"+infoIGroupAdnlFieldVldtnsArray[j].vldtnDesc.toLowerCase()+"' ";
									if(infoIGroupAdnlFieldVldtnsArray[j].vldtnDesc=='NUMBER')numberCheckerFunc+="ComplianceController.numberChecker(event,this.value.length,";//" "+"onkeypress=\"\"";
									else if(infoIGroupAdnlFieldVldtnsArray[j].vldtnTypeId=='MAXLENGTH') maxLengthVal=infoIGroupAdnlFieldVldtnsArray[j].vldtnDesc.toLowerCase();// numberCheckerFunc+=" if(this.value.length>"+infoIGroupAdnlFieldVldtnsArray[j].vldtnDesc.toLowerCase()+") return false;";
								}
								else
								{
									if(madatrySymbolText=="" && infoIGroupAdnlFieldVldtnsArray[j].vldtnTypeId == "MANDATORY" && infoIGroupAdnlFieldVldtnsArray[j].vldtnDesc == "Y")
										madatrySymbolText="<span class=\"asterick\">*</span>";
									infoIGroupAdnlFieldVldtns[infoIGroupAdnlFieldVldtnsArray[j].vldtnTypeId]=infoIGroupAdnlFieldVldtnsArray[j].vldtnDesc;
								}
								if( ComplianceControllerInfo.getValueForParam(infoIGroupAdnlFieldVldtnsArray[j].vldtnErrDesc,'str') != '' )
								{
									infoIGroupAdnlFieldvldtnErrDesc[infoIGroupAdnlFieldVldtnsArray[j].vldtnTypeId]=infoIGroupAdnlFieldVldtnsArray[j].vldtnErrDesc;
								}
							}
							
							if(numberCheckerFunc.length>0)
							{	numberCheckerFunc="onkeypress=\""+numberCheckerFunc+maxLengthVal +");\"";
								//numberCheckerFunc="onkeypress=\""+numberCheckerFunc+"\"";
								infoIGroupAdnlFieldAttrVldtns+=" "+numberCheckerFunc;
							}
							
							var dynamicvalidationdescriptions="";
							var dynamicvalidationnames=null;
							 
							var dynamicfieldtype="text";
							var dynamicvldtnerrordescrpt="";
							var numberValidator='';
							jq.each(infoIGroupAdnlFieldVldtns,function(index,value){								
								dynamicvalidationdescriptions=dynamicvalidationdescriptions+" "+index+(index=="MIN"?"=":"validationDesc=")+value;
								dynamicvalidationnames=dynamicvalidationnames+" "+index;
							});
							
							jq.each(infoIGroupAdnlFieldvldtnErrDesc,function(index,value){								
								dynamicvldtnerrordescrpt=dynamicvldtnerrordescrpt+index+"=\""+value.replace(/ /g,"_")+"\" ";	
							});
							jq(".otherReltedInfoDynamicFieldsRows").append("<div class='table-row'><div class='table-cell' style='width: 50%'><a>"+infoGroupAddnlField[i].fieldName+madatrySymbolText+"</a></div><div class='table-cell'><input "+infoIGroupAdnlFieldAttrVldtns+"  id='"+infoGroupAddnlField[i].dbFieldName+"' "+dynamicvldtnerrordescrpt+" "+dynamicvalidationdescriptions.replace("null ","")+" placeholder='Enter "+infoGroupAddnlField[i].fieldName+"' class='"+dynamicvalidationnames.replace("null ","")+" otherreltedInfoDynamicInputs' /></div></div>");
						}
						jq("#hiddenRelInfoId").text('');
						jq("#hdnIsIgnoredHdnElmnt").val('true');
						jq("#otherRelatedInfobelongingfieldtsnId").text('');
						
						jq(".relatedinfoContainer").hide();
						jq(".OtherRelatedinfoContainer").show();
						delete otherRelatedInfoDetails.infoGroupAddnlField;
						var otherRelatedInfbelongingfieldsArray=[];
						otherRelatedInfbelongingfieldsArray.push(otherRelatedInfoDetails);
						ComplianceController.bindModelToForm(otherRelatedInfbelongingfieldsArray,GET_OTHER_RELATED_INFO_DETAIL_BELONGING_FIELD_FORM_ID,GET_OTHER_RELATED_INFO_DETAIL_BELONGING_FIELD_FORM_ELEMENT_CLASS);
						ComplianceController.OtherRelatedInfoDetailedResponseProcessor();
						var targetpages = [];
						targetpages.push(compliancepagecontainers.RELATED_INFO_DETAILS_PAGE_CONTAINER/* ,compliancepagecontainers.VERIFICATION_ISSUE_FILTER */);
						ComplianceController.pageNavigate(globalContainer,targetpages);
					}
					
					ComplianceController.OtherRelatedInfoDetailedResponseProcessor = function(){
						if(jq("#otherRelatedInfoverifTypeId").text() == "SF")
						{
							ComplianceController.OtherRelatedInfoSFResponseProcessor();
						}
						else if(jq("#otherRelatedInfoverifTypeId").text() == "SFTI")
						{
							ComplianceController.OtherRelatedInfoSFTIResponseProcessor();
						}
						else if(jq("#otherRelatedInfoverifTypeId").text() == "TT")
						{
							ComplianceController.OtherRelatedInfoTTResponseProcessor();
						}
						else if(jq("#otherRelatedInfoverifTypeId").text() == "TTSP")
						{
							ComplianceController.OtherRelatedInfoTTSPResponseProcessor();
						}
						else if(jq("#otherRelatedInfoverifTypeId").text() == "CS")
						{
							ComplianceController.OtherRelatedInfoCSResponseProcessor();
						}
						else if(jq("#otherRelatedInfoverifTypeId").text() == "TCR")
						{
							ComplianceController.OtherRelatedInfoTCRResponseProcessor();
						}
						else if(jq("#otherRelatedInfoverifTypeId").text() == "EISC")
						{
							ComplianceController.OtherRelatedInfoEISCResponseProcessor();
						}
						else if(jq("#otherRelatedInfoverifTypeId").text() == "ERC")
						{
							ComplianceController.OtherRelatedInfoERCResponseProcessor();
						}
						else if(jq("#otherRelatedInfoverifTypeId").text() == "CWBA")
						{
							ComplianceController.OtherRelatedInfoCWBAResponseProcessor();
						}
					}
					
					ComplianceController.OtherRelatedInfoSFResponseProcessor=function(){
						var dataTosend = {};
						dataTosend.issueId = jq("#issueId").text();
						var GET_EXEMPT_INC_TYP_MASTER_URL = complianceurls.GET_EXEMPT_INC_TYP_MASTER_URL;
						var detailedRelated_INCTYPMASTER_URL = ComplianceController
								.getURL(contextRoot,
										GET_EXEMPT_INC_TYP_MASTER_URL);
						var dropdownresponse = ComplianceController
								.getCasesModel(
										detailedRelated_INCTYPMASTER_URL,
										dataTosend, token, header);
						var dropdownresponseList = dropdownresponse.complianceviewExempIncTypeViewList;
						ComplianceController.DetailResponseDropdownProcessor(
								"sfoutofreceiptexmptIncomeType", dropdownresponseList,
								"exemptIncTypeId", "description");						
						ComplianceController.rowparser(null,null,"sfCorrectInfoObj",null,null,null,null,null,null,false);
						ComplianceController.rowparser(null,null,"sfearlierIncomeObj",null,null,null,null,null,null,false);
						ComplianceController.rowparser(null,null,"sfOutofreceiptObj",null,null,null,null,null,null,false);
						ComplianceController.rowparser(null,null,"sfwithdrawnOutOfBankObj",null,null,null,null,null,null,false);
						ComplianceController.rowparser(null,null,"sfidentifiablePersonWithPanObj",null,null,null,null,null,null,false);
						ComplianceController.rowparser(null,null,"sfidentifiablePersonWithOutPanObj",null,null,null,null,null,null,false);
						ComplianceController.rowparser(null,null,"sfunidentifiablePersonObj",null,null,null,null,null,null,false);
						ComplianceController.rowparser(null,null,"sfcashDisclosedTobeDisclosedObj",null,null,null,null,null,null,false);
						jq("#SF_detailedResponseSubmit,#SF_detailedResponseSaveDraft").attr("belongsTo","OtherRelatedInfoDetils");
						ComplianceController.hidepagesectionsprocessor(detailedresponsetypecontainers);
						jq("."+ compliancepagecontainers.SF_DETAILED_RESPONSE_CONTAINER).show();
					}
					
					ComplianceController.OtherRelatedInfoSFTIResponseProcessor=function(){
						var dataTosend = {};
						dataTosend.issueId = jq("#issueId").text();
						var GET_EXEMPT_INC_TYP_MASTER_URL = complianceurls.GET_EXEMPT_INC_TYP_MASTER_URL;
						var detailedRelated_INCTYPMASTER_URL = ComplianceController
								.getURL(contextRoot,
										GET_EXEMPT_INC_TYP_MASTER_URL);
						var dropdownresponse = ComplianceController
								.getCasesModel(
										detailedRelated_INCTYPMASTER_URL,
										dataTosend, token, header);
						var dropdownresponseList = dropdownresponse.complianceviewExempIncTypeViewList;
						ComplianceController.DetailResponseDropdownProcessor(
								"sftiExemptIncomeType", dropdownresponseList,
								"exemptIncTypeId", "description");
						ComplianceController.rowparser(null,null,"sfticorrectInfoObj",null,null,null,null,null,null,false);
						ComplianceController.rowparser(null,null,"sftiearlierIncomeObj",null,null,null,null,null,null,false);
						ComplianceController.rowparser(null,null,"sftioutofreceiptObj",null,null,null,null,null,null,false);
						ComplianceController.rowparser(null,null,"sftiwithdrawnOutOfBankObj",null,null,null,null,null,null,false);
						ComplianceController.rowparser(null,null,"sftiidentifiablePersonWithPanObj",null,null,null,null,null,null,false);
						ComplianceController.rowparser(null,null,"sftiidentifiablePersonWithOutPanObj",null,null,null,null,null,null,false);
						ComplianceController.rowparser(null,null,"sftiunidentifiablePersonObj",null,null,null,null,null,null,false);
						ComplianceController.rowparser(null,null,"sfticashDisclosedTobeDisclosedObj",null,null,null,null,null,null,false);
						ComplianceController.rowparser(null,null,"sftiinvestmentDuringTheYearObj",null,null,null,null,null,null,false);
						jq("#SFTI_detailedResponseSubmit").attr("belongsTo","OtherRelatedInfoDetils");
						ComplianceController.hidepagesectionsprocessor(detailedresponsetypecontainers);
						jq("."+ compliancepagecontainers.SFTI_DETAILED_RESPONSE_CONTAINER).show();
					}
					
					ComplianceController.OtherRelatedInfoTTResponseProcessor=function(){
						var dataTosend = {};
						dataTosend.issueId = jq("#issueId").text();
						var GET_EXEMPT_DED_CAT_MASTER_URL = complianceurls.GET_EXEMPT_DED_CAT_MASTER_URL;
						var detailedRelated_EXEMPTDEDCAT_URL = ComplianceController
								.getURL(contextRoot,
										GET_EXEMPT_DED_CAT_MASTER_URL);
						var dropdownresponse = ComplianceController
								.getCasesModel(
										detailedRelated_EXEMPTDEDCAT_URL,
										dataTosend, token, header);
						var dropdownresponseList = dropdownresponse.complianceviewExempDedCatViewList;
						ComplianceController.DetailResponseDropdownProcessor(
								"ttexmptDedctExpFinYear", dropdownresponseList,
								"exemptDedCatId", "description");
						ComplianceController.rowparser(null,null,"ttreceiptRelToOtherInfoObj",null,null,null,null,null,null,false);
						ComplianceController.rowparser(null,null,"ttvalRelToOtherPanObj",null,null,null,null,null,null,false);
						ComplianceController.rowparser(null,null,"ttvalCovrdInOtherInfoObj",null,null,null,null,null,null,false);
						ComplianceController.rowparser(null,null,"ttexmptDedctExpObj",null,null,null,null,null,null,false);
						jq("#TTdetailedResponseSubmit").attr("belongsTo","OtherRelatedInfoDetils");
						ComplianceController.hidepagesectionsprocessor(detailedresponsetypecontainers);
						jq("."+ compliancepagecontainers.TT_DETAILED_RESPONSE_CONTAINER).show();
					}
					
					ComplianceController.OtherRelatedInfoTTSPResponseProcessor=function(){
						var dataTosend = {};
						dataTosend.issueId = jq("#issueId").text();
						var GET_EXEMPT_DED_CAT_MASTER_URL = complianceurls.GET_EXEMPT_DED_CAT_MASTER_URL;
						var detailedRelated_EXEMPTDEDCAT_URL = ComplianceController
								.getURL(contextRoot,
										GET_EXEMPT_DED_CAT_MASTER_URL);
						var dropdownresponse = ComplianceController
								.getCasesModel(
										detailedRelated_EXEMPTDEDCAT_URL,
										dataTosend, token, header);
						var dropdownresponseList = dropdownresponse.complianceviewExempDedCatViewList;
						ComplianceController.DetailResponseDropdownProcessor(
								"ttspexptDedcExpexemptIncomeType", dropdownresponseList,
								"exemptDedCatId", "description");
						ComplianceController.rowparser(null,null,"ttspreceiptRelToabvInfoObj",null,null,null,null,null,null,false);
						ComplianceController.rowparser(null,null,"ttspStampValueObj",null,null,null,null,null,null,false);
						ComplianceController.rowparser(null,null,"ttspcapitalGainObj",null,null,null,null,null,null,false);
						ComplianceController.rowparser(null,null,"ttspvalRelToOtherPanObj",null,null,null,null,null,null,false);
						ComplianceController.rowparser(null,null,"ttspvalCvrdInOtherInfoObj",null,null,null,null,null,null,false);
						ComplianceController.rowparser(null,null,"ttspexptDedcExpObj",null,null,null,null,null,null,false);
						jq("#TTSP_detailedResponseSubmit").attr("belongsTo","OtherRelatedInfoDetils");
						ComplianceController.hidepagesectionsprocessor(detailedresponsetypecontainers);
						jq("."+ compliancepagecontainers.TTSP_DETAILED_RESPONSE_CONTAINER).show();
					}
					
					ComplianceController.OtherRelatedInfoCSResponseProcessor=function()
					{
						jq("#CS_detailedResponseSubmit").attr("belongsTo","OtherRelatedInfoDetils");
						ComplianceController.hidepagesectionsprocessor(detailedresponsetypecontainers);
						jq("."+ compliancepagecontainers.CS_DETAILED_RESPONSE_CONTAINER).show();
					}
					
					ComplianceController.OtherRelatedInfoTCRResponseProcessor=function(){
						var dataTosend = {};
						var GET_TCR_TRANSACTION_NATURE_URL = complianceurls.GET_TCR_TRANSACTION_NATURE_URL;
						var dropdownresponse = ComplianceController.getCasesModel(GET_TCR_TRANSACTION_NATURE_URL,dataTosend, token, header,compliancecommon.REQUEST_TYPE_GET);
						ComplianceController.DetailResponseDropdownProcessor("tcrnatureoftransaction", dropdownresponse,"transNatureId", "description");
						ComplianceController.rowparser(null,null,"tcridentifiablepersonwithpanObj",null,null,null,null,null,null,false);
						jq("#TCR_detailedResponseSubmit").attr("belongsTo","OtherRelatedInfoDetils");
						ComplianceController.hidepagesectionsprocessor(detailedresponsetypecontainers);
						jq("."+ compliancepagecontainers.TCR_DETAILED_RESPONSE_CONTAINER).show();
					}
					
					ComplianceController.OtherRelatedInfoEISCResponseProcessor=function(){
						ComplianceController.rowparser(null,null,"EISCcashinhandoutofearlierincomefifteenthyearObj",null,null,null,null,null,null,false);
						ComplianceController.rowparser(null,null,"EISCcashinhandoutofearlierincomeSixteenthYearObj",null,null,null,null,null,null,false);
						jq("#EISC_detailedResponseSubmit").attr("belongsTo","OtherRelatedInfoDetils");
						ComplianceController.hidepagesectionsprocessor(detailedresponsetypecontainers);
						jq("."+ compliancepagecontainers.EISC_DETAILED_RESPONSE_CONTAINER).show();
					}
					
					ComplianceController.OtherRelatedInfoERCResponseProcessor=function(){
						var dataTosend = {};
						var GET_ERC_EXEMPT_INCOME_TYPE_URL = complianceurls.GET_ERC_EXEMPT_INCOME_TYPE_URL;
						var dropdownresponse = ComplianceController.getCasesModel(GET_ERC_EXEMPT_INCOME_TYPE_URL,dataTosend, token, header,compliancecommon.REQUEST_TYPE_GET);
						ComplianceController.DetailResponseDropdownProcessor("ERCcashReceivedOutofExemptReceiptExemptIncomeType", dropdownresponse,"exemptIncTypeId", "description");
						ComplianceController.rowparser(null,null,"ERCcashreceiptOutofExemptReceiptObj",null,null,null,null,null,null,false);
						jq("#ERC_detailedResponseSubmit").attr("belongsTo","OtherRelatedInfoDetils");
						ComplianceController.hidepagesectionsprocessor(detailedresponsetypecontainers);
						jq("."+ compliancepagecontainers.ERC_DETAILED_RESPONSE_CONTAINER).show();
					}
					
					ComplianceController.OtherRelatedInfoCWBAResponseProcessor=function(){
						ComplianceController.rowparser(null,null,"cwbacashwithdrwnoutofbankObj",null,null,null,null,null,null,false);
						jq("#CWBA_detailedResponseSubmit").attr("belongsTo","OtherRelatedInfoDetils");
						ComplianceController.hidepagesectionsprocessor(detailedresponsetypecontainers);
						jq("."+ compliancepagecontainers.CWBA_DETAILED_RESPONSE_CONTAINER).show();
					}
					
					ComplianceController.getOtherVoluntarilyDisclosedInfoDetails=function(tsn,verifType,relInfoId,infoGroup,buttontext){
						jq("#verifType").text(verifType);
						jq("#hiddenRelInfoId").text(relInfoId);
						var dataTosendvoluntarilyrelinfo = {};
						var GET_VOLUNTARILY_RELATED_INFO_DETAIL=complianceurls.GET_VOLUNTARILY_RELATED_INFO_DETAIL;
						dataTosendvoluntarilyrelinfo.tsnId=tsn;
						dataTosendvoluntarilyrelinfo.infoGroup=infoGroup;
						var voluntarilyrelinforesponse = ComplianceController.getCasesModel(GET_VOLUNTARILY_RELATED_INFO_DETAIL,dataTosendvoluntarilyrelinfo, token, header);
						for(i=0;i<voluntarilyrelinforesponse.length;i++)
						{
							var infoIGroupAdnlFieldVldtns={};
							var infoIGroupAdnlFieldAttrVldtns='';
							var  infoIGroupAdnlFieldAttr=['TYPE','MAXLENGTH','MINLENGTH'];
							var numberCheckerFunc="";
							var madatrySymbolText="";
							 var maxLengthVal="this.value.length+1";
							var infoIGroupAdnlFieldvldtnErrDesc={};
							var infoIGroupAdnlFieldVldtnsArray=voluntarilyrelinforesponse[i].infoIGroupAdnlFieldVldtns;
							for(j=0;j<infoIGroupAdnlFieldVldtnsArray.length;j++)
							{
								if(jq.inArray(infoIGroupAdnlFieldVldtnsArray[j].vldtnTypeId,infoIGroupAdnlFieldAttr)>-1)
								{
									infoIGroupAdnlFieldAttrVldtns+=infoIGroupAdnlFieldVldtnsArray[j].vldtnTypeId.toLowerCase()+"='"+infoIGroupAdnlFieldVldtnsArray[j].vldtnDesc.toLowerCase()+"' ";
									if(infoIGroupAdnlFieldVldtnsArray[j].vldtnDesc=='NUMBER')numberCheckerFunc+="ComplianceController.numberChecker(event,this.value.length,";//" "+"onkeypress=\"\"";
									else if(infoIGroupAdnlFieldVldtnsArray[j].vldtnTypeId=='MAXLENGTH') maxLengthVal=infoIGroupAdnlFieldVldtnsArray[j].vldtnDesc.toLowerCase();// numberCheckerFunc+=" if(this.value.length>"+infoIGroupAdnlFieldVldtnsArray[j].vldtnDesc.toLowerCase()+") return false;";
									
								}
								else
								{
									if(madatrySymbolText=="" && infoIGroupAdnlFieldVldtnsArray[j].vldtnTypeId == "MANDATORY" && infoIGroupAdnlFieldVldtnsArray[j].vldtnDesc == "Y")
										madatrySymbolText="<span class=\"asterick\">*</span>";
									infoIGroupAdnlFieldVldtns[infoIGroupAdnlFieldVldtnsArray[j].vldtnTypeId]=infoIGroupAdnlFieldVldtnsArray[j].vldtnDesc;
								}
								if(ComplianceControllerInfo.getValueForParam(infoIGroupAdnlFieldVldtnsArray[j].vldtnErrDesc,'str') != '' )
								{
									infoIGroupAdnlFieldvldtnErrDesc[infoIGroupAdnlFieldVldtnsArray[j].vldtnTypeId]=infoIGroupAdnlFieldVldtnsArray[j].vldtnErrDesc;
								}
								
								
							}
							
							if(numberCheckerFunc.length>0)
							{	numberCheckerFunc="onkeypress=\""+numberCheckerFunc+maxLengthVal +");\"";
								//numberCheckerFunc="onkeypress=\""+numberCheckerFunc+"\"";
								infoIGroupAdnlFieldAttrVldtns+=" "+numberCheckerFunc;
							}
							
							var dynamicvalidationdescriptions=null;
							var dynamicvalidationnames=null;
							var dynamicDataTypeValidation=null;
							 
							var dynamicvldtnerrordescrpt="";
							jq.each(infoIGroupAdnlFieldVldtns,function(index,value){								
								
								dynamicvalidationdescriptions=dynamicvalidationdescriptions+" "+index+(index=="MIN"?"=":"validationDesc=")+value;
								dynamicvalidationnames=dynamicvalidationnames+" "+index;
							});
						 
							jq.each(infoIGroupAdnlFieldvldtnErrDesc,function(index,value){								
								dynamicvldtnerrordescrpt=dynamicvldtnerrordescrpt+index+"=\""+value.replace(/ /g,"_")+"\" ";	
							});
							
							jq(".otherReltedInfoDynamicFieldsRows").append("<div class='table-row'><div class='table-cell' style='width: 50%'><a>"+voluntarilyrelinforesponse[i].fieldName+madatrySymbolText+"</a></div><div class='table-cell'><input "+infoIGroupAdnlFieldAttrVldtns+" id='"+voluntarilyrelinforesponse[i].dbFieldName+"' "+dynamicvldtnerrordescrpt+" "+dynamicvalidationdescriptions.replace("null ","")+" placeholder='Enter "+voluntarilyrelinforesponse[i].fieldName+"' value='"+voluntarilyrelinforesponse[i].fieldValue+"' disabled class='"+dynamicvalidationnames.replace("null ","")+" otherreltedInfoDynamicInputs' /></div></div>");
						}
						jq(".editVoluntarilyDisclosedRelInfoContainer").append("<a href='javascript:void(0)' id='editVoluntarilyDisclosedRelInfo' class='submitViewClass'>Edit</a>");
						jq("#otherRelatedInfobelongingfieldinfoGroup").text(infoGroup);
						jq("#otherRelatedInfobelongingfieldtsnId").text(tsn);
						ComplianceController.detailedResponseProcessor();
						switch (jq("#verifType").text()){
						case "SF":
								jq("#verifType").text('SFVOL');
								jq("."+compliancepagecontainers.SF_DETAILED_RESPONSE_CONTAINER).find("#SF_detailedResponseSaveDraft").attr("belongsto","OtherRelatedInfoDetils");
								//jq("#SF_detailedResponseSubmit,#SF_detailedResponseSaveDraft").attr("belongsTo","OtherRelatedInfoDetils");
								break;
						default:jq("#verifType").text(verifType);
									
						}
						jq(".relatedinfoContainer").hide();
						jq(".OtherRelatedinfoContainer").show();
						var targetpages = [];
						targetpages.push(compliancepagecontainers.RELATED_INFO_DETAILS_PAGE_CONTAINER/* ,compliancepagecontainers.VERIFICATION_ISSUE_FILTER */);
						ComplianceController.pageNavigate(globalContainer,targetpages);
						
					}
					
					jq(document).on("paste",".checklengthonpasting",function(event){
						var _this=this;
						setTimeout(function(){
						if (jq(_this).val().length > 500 )
						{							
							jq(_this).val("");
							alert(miscmessages.REMARKS_LENGTH_EXCEEDED);
						}
						},100);
					});
					
					ComplianceController.getecompaign=function(){
						var GET_E_COMPAIGN_DATA_URL=complianceurls.GET_E_COMPAIGN_DATA_URL;
						var dataTosend = {};
						dataTosend.pan=jq("#loggedInPAN").text();		
						var getecompaigndata = ComplianceController.getCasesModel(GET_E_COMPAIGN_DATA_URL, dataTosend, token, header);
						return getecompaigndata;
					}
					
					ComplianceController.respofincreturnview =function(caseId,caseSeqId){
						var GET_TAX_PAYER_VERIFICATION_ISSUES_URL = complianceurls.GET_TAX_PAYER_VERIFICATION_ISSUES_URL;
						var CASE_RESPONSE_FORM_ID = complianceformids.CASE_RESPONSE_FORM_ID;
						var CASE_RESPONSE_ELEMENT_CLASS = complianceformelementclasses.CASE_RESPONSE_ELEMENT_CLASS;
						var dataTosend = {};
						dataTosend.caseId = caseId;
						dataTosend.caseSeqId=caseSeqId;
						dataTosend.activityAtLevel='CS';
						var taxPayerCaseDetails = ComplianceController.getURL(
								contextRoot,
								GET_TAX_PAYER_VERIFICATION_ISSUES_URL);
						var caseDetails = ComplianceController.getCasesModel(
								taxPayerCaseDetails, dataTosend, token, header);
						var caseResponseList = caseDetails.complianceviewCasePrelimResp;
						var prelimresponsesubmitbutton;
						for (i = 0; i < caseResponseList.length; i++) {
							prelimresponsesubmitbutton = caseResponseList[i].resTypeIdEmpty;
						}
						jq("#respReasonId").empty();
						jq("#respReasonId")
								.append(
										"<option value=''>"
												+ miscmessages.SELECT_REASON
												+ "</option><option value='RP'>"
												+ miscmessages.RETURN_UNDER_PREPARATION
												+ "</option><option value='NL'>"
												+ miscmessages.NOT_LIABLE_TO_FILE_RETURN
												+ "</option>");
						ComplianceController.bindModelToForm(caseResponseList,
								CASE_RESPONSE_FORM_ID,
								CASE_RESPONSE_ELEMENT_CLASS);
						if (prelimresponsesubmitbutton == false) {
							var responseLength = caseResponseList.length;
							if (jq("#respTypeId").val() == "FL") {
								jq(
										"#"
												+ complianceformids.CASE_RESPONSE_FORM_ID)
										.find("#respReasonId").attr("disabled",
												true);
								jq(
										"#"
												+ complianceformids.CASE_RESPONSE_FORM_ID)
										.find(
												"#filingDate,#respModeId,#itrAckNo")
										.attr("disabled", false);
								if (jq("#respModeId").val() == "PF") {
									jq("#circleWardCity").attr("disabled",
											false)
								} else {
									jq("#circleWardCity")
											.attr("disabled", true)
								}
							} else if (jq("#respTypeId").val() == "NF") {
								jq(
										"#"
												+ complianceformids.CASE_RESPONSE_FORM_ID)
										.find(
												"#filingDate,#respModeId,#itrAckNo")
										.attr("disabled", true);
								jq(
										"#"
												+ complianceformids.CASE_RESPONSE_FORM_ID)
										.find("#respReasonId,#respremarks")
										.attr("disabled", false);
							}
							jq("."+ compliancepagecontainers.CASE_RESPONSE_SUBMIT_BTN_CONTAINER).show();
							jq('#cmpgnResponsePDF').on("click",function(){
								//var AjaxHandle = new AjaxHandle();
								var getprelimdata=JSON.parse(sessionStorage.getItem("ecampaign"));
								var dataTosend = {campaign : true};
								var panNo = jq("#loggedInPAN").text();	
								dataTosend.pan =panNo;
								dataTosend.caseId =getprelimdata.caseId;
								dataTosend.caseSeqId =getprelimdata.caseSeqId;
								AjaxHandler.InitConfig('consolidated/pdfDownload','POST',null,JSON.stringify(dataTosend),null,token,header);
								AjaxHandler.DownloadFile();
							})
						}
					}
					
					
					
					
					
				});
