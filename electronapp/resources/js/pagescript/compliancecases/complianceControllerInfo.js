var ComplianceControllerInfo = {};
var globalContainer = compliancecommon.GLOBAL_CONTAINER;
jq(document)
		.ready(
				function() {
					/*
					 * ComplianceControllerInfo.CreateRelatedEarlierInfoViewGridHyperLink =
					 * function( verifId, caseId) {
					 * 
					 * if (jq('#relatedEarlierInfoDiv').find(
					 * ".submitViewClass").length <= 0) { var anchorElement =
					 * document.createElement('a');
					 * anchorElement.setAttribute("href", "javascript:void(0)");
					 * anchorElement.innerHTML = "View Earlier Information";
					 * jq(anchorElement).attr("class", "submitViewClass");
					 * anchorElement.setAttribute("onclick",
					 * "javascript:ComplianceControllerInfo.viewRelatedEarlierInfoTable('" +
					 * verifId + "','" + caseId + "')"); var anchorString =
					 * anchorElement.outerHTML .toString();
					 * jq('#relatedEarlierInfoDiv').append(
					 * anchorElement.outerHTML.toString()) }
					 *  }
					 */

					ComplianceControllerInfo.viewRelatedEarlierInfoTable = function(
							verifid, caseId) {

						var GET_VERIF_ISSUES_DETAILS_URL = complianceurls.GET_VERIF_ISSUES_DETAILS_URL;
						var dataTosend = {};
						dataTosend.verifId = verifid;
						dataTosend.caseId = caseId;

						var earlierInfoDetailsURL = ComplianceController
								.getURL(
										contextRoot,
										complianceurls.GET_EARLIER_INFO_DETAILS_URL);
						var earlierInfoDetails = ComplianceController
								.getCasesModel(earlierInfoDetailsURL,
										dataTosend, token, header);
						var earlierInfoList = earlierInfoDetails.complianceviewVerifRelInfoEarlierList;
						if (earlierInfoList.length > 0) {
							jq("#relatedEarlierInfoCollapse").find(
									".nodataavailable").remove();
							jq(".relatedErlierInfoTableContainer").show();
							jq('.earlierInfoListContainer').show();
							ComplianceController.bindModelToGridView(
									earlierInfoList,
									compliancetable.RELATED_EARLIER_INFO_TABLE);
						} else {
							jq('.earlierInfoListContainer').hide();
							jq(".relatedErlierInfoTableContainer").hide();
							if (jq("#relatedEarlierInfoCollapse").find(
									".nodataavailable").length <= 0) {
								jq("#relatedEarlierInfoCollapse")
										.append(
												"<div class='nodataavailable'>"
														+ miscmessages.NO_DATA_AVAILABLE
														+ "</div>");
							}
						}
						var targetpages = [];
						targetpages.push("relatedInfoEarlierInfoPageContainer",
								"verificationIssueFilterContainer");
						ComplianceController.pageNavigate(globalContainer,
								targetpages);
					}

					// e verif total Additional Queries Request by ITD pop up
					ComplianceControllerInfo.getRequestedVerfiDetails = function(
							caseSeqId) {
						jq(
								"#"
										+ compliancetable.QUERY_REQUEST_VERFIDETAIL_MODALTABLE
										+ " >tbody").children().not(':first')
								.remove();

						var dataTosend = {};
						dataTosend.caseSeqId = caseSeqId;

						var infoDetailURL = ComplianceController
								.getURL(
										contextRoot,
										complianceurls.GET_ADDITIONAL_REQUEST_INFO_DETAILS_URL);
						var infoDetails = ComplianceController.getCasesModel(
								infoDetailURL, dataTosend, token, header);
						var infoDetailList = infoDetails.complianceviewAdditionalInfo;

						jq(
								"#"
										+ compliancetable.QUERY_REQUEST_VERFIDETAIL_MODALTABLE
										+ " >tbody>tr").not(":first").empty()

						if (typeof infoDetailList == 'undefined'
								|| infoDetailList == null
								|| infoDetailList.length <= 0) {

							jq(
									"#"
											+ compliancetable.QUERY_REQUEST_VERFIDETAIL_MODALTABLE
											+ " >tbody").append(
									"<tr><td colspan='7' style='text-align: center;'><div class='nodataavailable'>"
											+ miscmessages.NO_DATA_AVAILABLE
											+ "</div></td></tr>");
						} else {

							for (i = 0; i < infoDetailList.length; i++) {
								jq(
										"#"
												+ compliancetable.QUERY_REQUEST_VERFIDETAIL_MODALTABLE
												+ " >tbody")
										.append(
												"<tr><td class='digits'>"
														+ ComplianceControllerInfo
																.getValueForParam(
																		infoDetailList[i].activityAtLevel,
																		'str')
														+ "</td>"
														+ "<td class='digits' ><a href='javascript:void(0)' style='color:#11527e; text-decoration:underline;'>"
														+ ComplianceControllerInfo
																.getValueForParam(
																		infoDetailList[i].identifier,
																		'str')
														+ "</a></td>"
														+ "<td class='digits'>"
														+ ComplianceControllerInfo
																.getValueForParam(
																		infoDetailList[i].description,
																		'str')
														+ "</td>"
														+ "<td class='digits'>"
														+ ComplianceControllerInfo
																.getValueForParam(
																		infoDetailList[i].requestDate,
																		'str')
														+ "</td>"
														+ "<td class='digits'>"
														+ ComplianceControllerInfo
																.getValueForParam(
																		infoDetailList[i].dueDate,
																		'str')
														+ "</td>"
														+ "<td class='digits'>"
														+ ComplianceControllerInfo
																.getValueForParam(
																		infoDetailList[i].activityStatus,
																		'str')
														+ "</td></tr>");
							}
							jq(
									"#"
											+ compliancetable.QUERY_REQUEST_VERFIDETAIL_MODALTABLE
											+ " >tbody")
									.append(
											"<tr><td colspan='7' class='digits cancelTdBtnModal'><a class='button' data-dismiss='modal'>Cancel</a></td></tr>");

						}

					}

					ComplianceControllerInfo.getValueForParam = function(obj,
							type) {

						if (typeof obj == 'undefined' || obj == null) {
							return ComplianceControllerInfo.typeReturn(type);
						} else if (obj.length == 0)
							return ComplianceControllerInfo.typeReturn(type);
						else
							return obj;
					}
					ComplianceControllerInfo.typeReturn = function(typ) {
						switch (typ) {
						case "str":
							return '';
						case "int":
						case "array":
							return 0;
						case "bool":
							return false;

						}
					}

					ComplianceControllerInfo.textFormat = function(format) { // jqgformat
						var args = jq.makeArray(arguments).slice(1);
						if (format == null) {
							format = "";
						}
						return format.replace(/\{(\d+)\}/g, function(m, i) {
							return args[i];
						});
					}

					ComplianceControllerInfo.maxLenChecker = function(event,
							len, val) {

						var charCode = event.keyCode ? event.keyCode
								: event.which;
						if (charCode == 8 || (charCode >= 33 && charCode < 40))
							return;

						if (!(val > len))
							event.preventDefault();
					}

					ComplianceControllerInfo.encrypt = function(plainText) {
						/*var iv = CryptoJS.lib.WordArray.random(128 / 8)
								.toString(CryptoJS.enc.Hex);
						var salt = CryptoJS.lib.WordArray.random(128 / 8)
								.toString(CryptoJS.enc.Hex);

						var keySize = 128;
						var iterationCount = 10000;
						var passPhrase = "aesalgoisbestbes";
						var aesUtil = new AesUtil(keySize, iterationCount);
						var encrypt = aesUtil.encrypt(salt, iv, passPhrase,
								plainText);
						return '{"encrypt":"' + encrypt + '","iv":"' + iv
								+ '","salt":"' + salt + '"}';*/
						var rand=Math.floor(Math.random()*10000)+"";
						var enc = window.btoa(plainText+rand+rand.length);
						var renc = '';
						var tenc = '';
						for (var i = enc.length - 1; i > -1; i--) {
							renc += enc[i]
						}

						for (var i = 0; i < renc.length; i++) {
							tenc += String.fromCharCode(renc.charCodeAt(i) + 4);
						}
						return tenc;

						// return window.btoa(plainText);
					}

				});
