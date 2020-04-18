var compliancecommon = {
	"CONTEXT_ROOT" : "restmap/compliance/view/",
	"GLOBAL_CONTAINER" : "mainContainer",
	"REQUEST_TYPE_POST" : "POST",
	"REQUEST_TYPE_GET" : "GET"
}
var compliancetable = {
	"CASE_SEARCH_TABLE" : "caseSearchTable",
	"VERIFICATION_ISSUES_TABLE" : "verificationIssuesTable",
	"ADDITIONAL_QUERIES_TABLE" : "additionalQueriesTable",
	"ISSUE_ADDITIONAL_QUERIES_TABLE":"issueAdditionalQueriesTable",
	"INFO_ADDITIONAL_QUERIES_TABLE":"infoAdditionalQueriesTable",
	"VERIFICATION_ISSUES_TABLE_INCOMPLETE" : "verificationIssuesTableWoAddlnInfoCount",
	"RELATED_INFO_TABLE" : "relatedInfoTable",
	"RELATED_EARLIER_INFO_TABLE" : "relatedEarlierInfoTable",
	"VOLUN_DISCLOSE_INFO_TABLE" : "volunDiscloseInfoTable",
	"ADDITIONAL_INFO_TABLE" : "additionalInfoTable",
	"ADDITIONAL_INFO_DOC_TABLE" : "addInfoDownloadTable",
	"DETAILED_RELATED_INFO_TABLE" : "relatedInfoDetailedResponseTable",
	"RELATED_INFO_ADDITIONAL_INFO_LIST_TABLE" : "relatedInfoadditionalInfoTable",
	"RELATED_INFO_REVISION_TYPE_TABLE" : "relatedInfoRevisionTypeTable",
	"E_VERIFICATION_HD_TABLE" : "E_VerificationTable",
	"RELATED_CASE_LIST_TABLE":"relatedCaseListTable",
	"QUERY_REQUEST_VERFIDETAIL_MODALTABLE":"queryRequestVerfiDetailModalTable",
	"RELATED_INFO_REVISION_TYPE_TABLE":"relatedInfoRevisionTypeTable",
	"VOLUNTARY_INFO_TABLE" : "voluntaryInfoTable",
	"VOLUNTARILY_DISCLOSED_INFO_TABLE":"voluntarilyDisclosedInfoTable"
}
var complianceurls = {
	"GET_DETAILED_RELATED_SFTI_RESPONSE_URL" : "InfoSFTIResponse",
	"GET_DETAILED_RELATED_TT_RESPONSE_URL" : "InfoTTResponse",
	"GET_DETAILED_RELATED_TTSP_RESPONSE_URL" : "InfoTTSPResponse",
	"GET_TAX_PAYER_CASE_LIST_URL" : "CaseList",
	"GET_TAX_PAYER_VERIFICATION_ISSUES_URL" : "CaseDetail",
	"GET_VERIF_ISSUES_DETAILS_URL" : "VerifDetail",
	"GET_EARLIER_INFO_DETAILS_URL" : "RelatedInfoEarlier",
	"GET_ADDITIONAL_REQUEST_INFO_DETAILS_URL" : "AdditionalInfoList",
	"GET_ADD_INFO_DETAILS_URL" : "AddlInfoDocUpload",
	"GET_DETAILED_RELATED_IM_RESPONSE_URL" : "InfoIMResponse",
	"GET_DETAILED_RELATED_SF_RESPONSE_URL" : "InfoSFResponse",
	"GET_RELATEDINFORMATION_INFORMATION_DETAILS_URL" : "RelInfoInformationDetails",
	"GET_RELATEDINFORMATION_TRANSACTION_DETAILS_URL" : "RelInfoTransactionDetails",
	"GET_RELATEDINFORMATION_SALARY_DETAILS_URL" : "RelInfoSalaryDetails",
	"GET_RELATEDINFORMATION_TURNOVER_DETAILS_URL" : "RelInfoServicesTurnoverDetails",
	"GET_SECURITIES_TRANSACTION_DETAILS_URL" : "RelInfoSecuritiesTransactionDetails",
	"GET_15CA_DETAILS_URL" : "RelInfo15CADetails",
	"GET_ADDITIONAL_INFO_DOC_DOWNLOAD_URL" : "AddlInfoDocDownload",
	"GET_DETAILED_RESPONSE_SUBMIT_URL" : "verificationIssue/RelatedInfo/submitIMResponse",
	"TT_GET_DETAILED_RESPONSE_SUBMIT_URL" : "verificationIssue/RelatedInfo/submitTTResponse",
	"TT_GET_DETAILED_RESPONSE_DRAFT_URL" : "verificationIssue/RelatedInfo/draftTTResponse",
	"TTSP_GET_DETAILED_RESPONSE_SUBMIT_URL" : "verificationIssue/RelatedInfo/submitTTResponse",
	"GET_CASE_RESPONSE_MODEL_URL" : "caseDetail/Preliminary/submitPRELIMResponse",
	"GET_ADDITIONAL_INFO_REQUEST_URL" : "addlnInfo/Document/uploadResponse",
	"AWARE_NOT_AWARE_URL" : "relInfo/InfoDetail/submitAwareIMResponse",
	"SF_DETAILED_RESPONSE_SUBMIT_URL" : "verificationIssue/RelatedInfo/submitSFResponse",
	"SF_DETAILED_RESPONSE_DRAFT_URL" : "verificationIssue/RelatedInfo/draftSFResponse",
	"GET_DOWNLOAD_DOCUMENTS_URL" : "AddlInfoDocRespList",
	"GET_DOWNLOAD_FILE_URL" : "addlInfo/InfoDetail/download",
	"GET_IM_VIEW_INFORMATION_RESPONSE_HISTORY_URL" : "RelInfoIMResponseHistory",
	"GET_ADDITIONAL_VIEW_INFORMATION_RESPONSE_HISTORY_URL" : "AddInfoResponseHistory",
	"GET_RELATED_INFO_ADDITIONAL_INFO_DETAILS" : "RelInfoAddlInfoDocDownload",
	"GET_RELATED_INFO_ADDITIONAL_INFO_REQUEST_URL" : "relInfo/Document/uploadResponse",
	"GET_RELATED_INFO_ADDITIONAL_INFO_DOCUMENTS_URL" : "RelInfoAddlInfoDocRespList",
	"RELATED_INFO_ADDITION_INFO_DOCUMENT_URL" : "relInfo/InfoDetail/download",
	"GET_SF_VIEW_INFORMATION_RESPONSE_HISTORY_URL" : "RelInfoSFResponseHistory",
	"GET_SFALL_VIEW_INFORMATION_RESPONSE_HISTORY_URL" : "SFHistoryList",
	"GET_RELATED_VIEW_ADDITIONAL_VIEW_INFORMATION_RESPONSE_HISTORY_URL" : "RelInfoAddInfoResponseHistory",
	"GET_RALATED_INFO_ADDITIONAL_INFO_DOC_UPLOAD" : "RelAddlInfoDocUpload",
	"GET_RELATED_INFO_ADDITIONAL_INFO_DOWNLOAD_URL" : "relInfoAddlInfo/InfoDetail/historydownload",
	"GET_ADDITIONAL_INFO_DOWNLOAD_URL" : "addlInfo/InfoDetail/historydownload",
	"GET_RELATED_INFO_DOWNLOAD_URL" : "relatedInfo/pdfDownload",
	"GET_TT_VIEW_INFORMATION_RESPONSE_HISTORY_URL" : "RelInfoTTResponseHistory",
	"GET_TTALL_VIEW_INFORMATION_RESPONSE_HISTORY_URL" : "TTHistoryList",
	"GET_EXEMPT_DED_CAT_MASTER_URL" : "ExempDedCatList",
	"GET_EXEMPT_INC_TYP_MASTER_URL" : "ExempincTypeList",
	"GUIDLINE_PDF_DOWNLOAD_URL" : "issue/guideline/download",
	"GET_CONSOLIDATED_PDF_DOWNLOAD_URL" : "consolidated/pdfDownload",
	"GET_SAVE_CONSOLIDATED_PDF_BYTE":"consolidated/savepdfByte",
	"CS_DETAILED_RESPONSE_SUBMIT_URL":"verificationIssue/RelatedInfo/submitCSResponse",
	"CS_DETAILED_RESPONSE_SAVE_DRAFT_URL":"verificationIssue/RelatedInfo/draftCSResponse",
	"GET_DETAILED_RELATED_CS_RESPONSE_URL":"InfoCSResponse",
	"TCR_DETAILED_RESPONSE_SUBMIT_URL":"verificationIssue/RelatedInfo/submitTCRResponse",
	"TCR_DETAILED_RESPONSE_SAVE_DRAFT_URL":"verificationIssue/RelatedInfo/draftTCRResponse",
	"GET_DETAILED_RELATED_TCR_RESPONSE_URL":"InfoTCRResponse",
	"EISC_DETAILED_RESPONSE_SUBMIT_URL":"verificationIssue/RelatedInfo/submitEIRResponse",
	"EISC_DETAILED_RESPONSE_SAVE_DRAFT_URL":"verificationIssue/RelatedInfo/draftEIRResponse",
	"GET_DETAILED_RELATED_EISC_RESPONSE_URL":"InfoEIResponse",
	"GET_DETAILED_RELATED_ERC_RESPONSE_URL":"InfoERCResponse",
	"ERC_DETAILED_RESPONSE_SUBMIT_URL":"verificationIssue/RelatedInfo/submitERCResponse",
	"ERC_DETAILED_RESPONSE_SAVE_DRAFT_URL":"verificationIssue/RelatedInfo/draftERCResponse",
	"GET_DETAILED_RELATED_CWBA_RESPONSE_URL":"InfoCWResponse",
	"CWBA_DETAILED_RESPONSE_SUBMIT_URL":"verificationIssue/RelatedInfo/submitCWResponse",
	"CWBA_DETAILED_RESPONSE_SAVE_DRAFT_URL":"verificationIssue/RelatedInfo/draftCWResponse",
	"GET_TCR_TRANSACTION_NATURE_URL":"get-tcr-natureOfResponse",
	"GET_ERC_EXEMPT_INCOME_TYPE_URL":"get-erc-exemptIncType",
	"GET_CSALL_VIEW_INFORMATION_RESPONSE_HISTORY_URL":"CSHistoryList",
	"GET_CWBAALL_VIEW_INFORMATION_RESPONSE_HISTORY_URL":"CWBAHistoryList",
	"GET_TCRALL_VIEW_INFORMATION_RESPONSE_HISTORY_URL":"TCRHistoryList",
	"GET_EISCALL_VIEW_INFORMATION_RESPONSE_HISTORY_URL":"EISCHistoryList",
	"GET_ERCALL_VIEW_INFORMATION_RESPONSE_HISTORY_URL":"ERCHistoryList",
	"GET_RELATED_INFO_REVISION_TYPE_TABLE_HISTORY_URL":"incementalData",
	"GET_DMAD_DETAILS_URL":"RelInfoDMADDetails",
	"GET_BPAD_DETAILS_URL":"RelInfoBPADDetails",
	"GET_IPTD_DETAILS_URL":"RelInfoIPTDDetails",
	"GET_PBRD_DETAILS_URL":"RelInfoPBRDDetails",
	"GET_OCM_DETAILS_URL":"RelInfoOCMDetails",
	"GET_RELATED_CASE_INFO_URL":"RelCaseDetail",
	"GET_OTHER_RELATED_INFO_CODE_URL":"getOtherRelInfoCode",
	"GET_OTHER_RELATED_INFO_DETAILS_URL":"getOtherRelInfoDetails",
	"OTHER_DETAILED_RESPONSE_SUBMIT_URL":"verificationIssue/RelatedInfo/submitOTHResponse",
	"GET_VOLUNTARILY_RELATED_INFO_DETAIL":"getVoluntarilyRelInfoDetail",
	"SF_OTHER_SF_DETAILED_RESPONSE_DRAFT_URL":"verificationIssue/RelatedInfo/saveDraftOTHResponse",
	"GET_E_COMPAIGN_DATA_URL":"getECampaignYearDetail",
	"GET_ECAMPAIGN_INFO_SUMMARY_URL":"getInformationSmry",
	"GET_ECAMPAIGN_INFO_SUMMARY_DETAILS_URL":"getInfoSmryDtls"
}

var compliancepagecontainers = {
	"SFTI_DETAILED_RESPONSE_CONTAINER" : "SFTI_detailedResponseContainer",
	"CASE_SEARCH_PAGE_CONTAINER" : "caseSearchContainer",
	"CASE_DETAILS_PAGE_CONTAINER" : "caseDetailsContainer",
	"ADDITIONAL_QUERIES_CONTAINER":"additionalQueriesContainer",
	"ISSUE_ADDITIONAL_QUERIES_CONTAINER":"issueAdditionalQueriesContainer",
	"INFO_ADDITIONAL_QUERIES_CONTAINER":"infoAdditionalQueriesContainer",
	"VERIF_ISSUE_DETAILS_PAGE_CONTAINER" : "verificationIssueDetailsContainer",
	"ADD_INFO_DETAILS_PAGE_CONTAINER" : "verifAdditionalInfoDetailsContainer",
	"RELATED_INFO_DETAILS_PAGE_CONTAINER" : "relatedInfoDetailContainer",
	"VERIFICATION_ISSUE_FILTER" : "verificationIssueFilterContainer",
	"VERIFICATION_ISSUES_CONTAINER" : "verificationIssuesContainer",
	"RELATED_CASE_LIST_CONTAINER" : "relatedCaseListContainer",
	"VOLUN_DISCLOSE_INFO_CONTAINER" : "volunDiscloseInfoContainer",
	"CASE_RESPONSE_SUBMIT_BTN_CONTAINER" : "caseResponseSubmitbtnContainer",
	"AWARE_NOT_AWARE_BTN_CONTAINER" : "awarenotawaresubmitbtncontainer",
	"SUCCESS_MESSAGE_CONTAINER" : "successMsgContainer",
	"ERROR_MESSAGE_CONTAINER" : "errorMsgContainer",
	"DOWNLOAD_PAGE_CONTAINER" : "verifAdditionalInfoDetailsViewContainer",
	"IM_DETAILED_RESPONSE_CONTAINER" : "IM_detailedResponseContainer",
	"SF_DETAILED_RESPONSE_CONTAINER" : "SF_detailedResponseContainer",
	"SFTI_DETAILED_RESPONSE_CONTAINER" : "SFTI_detailedResponseContainer",
	"TT_DETAILED_RESPONSE_CONTAINER" : "TT_detailedResponseContainer",
	"TTSP_DETAILED_RESPONSE_CONTAINER" : "TTSP_detailedResponseContainer",
	"VIEW_RELATED_INFO_TABLE_HISTORY" : "viewrelatedInfoTableHistory",
	"VIEW_ADDITIONAL_INFO_TABLE_HISTORY" : "viewadditionalInfoTableHistory",
	"DOWNLOAD_MODAL_POPUP_ID" : "downloadDocListModal",
	"VIEW_RALATED_INFO_ADDITIONAL_INFO_TABLE_HISTORY" : "viewrelatedInfoadditionalInfoTableHistory",
	"RELATED_INFO_TABLE_MODAL_POPUP" : "relatedInfoTableModalPopup",
	"RELATED_EARLIER_INFO_TABLE_CONTAINER" : "relatedEarlierInfoTableContainer",
	"RELATED_EARLIER_INFO_PAGE_CONTAINER" : "relatedInfoEarlierInfoPageContainer",

	"ADDITIONAL_INFO_TABLE_MODAL_POPUP" : "additionalInfoTableModalPopup",
	"RELATED_INFO_ADDITIONAL_INFO_TABLE_MODAL_POPUP" : "relatedInfoadditionalInfoTableModalPopup",
	"DOWNLOAD_RELATED_INFO_ADDITIONAL_INFO_FILE" : "downloadrelatedInfoadditionalInfoFile",
	"DOWNLOAD_ADDITIONAL_INFO_FILE" : "downloadadditionalInfoFile",
	"DOWNLOAD_RELATED_INFO_FILE" : "downloadrelatedInfoFile",
	"PRELIMINARY_RESPONSE_DETAIL" : "caseResponseContainer",
	"CS_DETAILED_RESPONSE_CONTAINER" : "CS_detailedResponseContainer",
	"TCR_DETAILED_RESPONSE_CONTAINER" : "TCR_detailedResponseContainer",
	"EISC_DETAILED_RESPONSE_CONTAINER" : "EISC_detailedResponseContainer",
	"ERC_DETAILED_RESPONSE_CONTAINER" : "ERC_detailedResponseContainer",
	"CWBA_DETAILED_RESPONSE_CONTAINER" : "CWBA_detailedResponseContainer",
	"RELATED_INFO_REVISION_TYPE_TABLE_MODAL_POPUP" : "relatedInfoRevisionTypeTableModalPopup",
	"VOLUN_DISCLOSED_INFO_LIST_CONTAINER":"voluntarilyDisclosedInfoListContainer",
	"EARLIER_INFO_LIST_CONTAINER":"earlierInfoListContainer"
}
var complianceid = {
	"COMPLIANCE_VERIF_BACK_BTN" : "complianceVerifBackBtn",
	"VERIF_ISSUE_DETAIL_TRANSID":"transId"
}
var complianceformids = {
	"CASE_DETAILS_FILTER_FORM_ID" : "caseDetailsFilter",
	"VERIF_ISSUE_DETAILS_FILTER_FORM_ID" : "verifIssueDetailsFilter",
	"ADD_INFO_UPLOAD_FORM_FORM_ID" : "addInfoUploadForm",
	"RELATED_INFO_DETAILS" : "relatedInformationDetails",
	"DETAILED_RELATED_INFO_COMPUTED_FORM_ID" : "detailedRelatedInfoComputedForm",
	"CASE_RESPONSE_FORM_ID" : "caseResponseTable",
	"CORRECT_INFO_AMOUNT" : "correctInfoAmount",
	"DETAILED_RESPONSE_REMARKS" : "detailedResponseRemarks",
	"ADDITIONAL_INFO_UPLOAD_PAGE" : "addInfoRequestform",
	"SF_RELATED_INFO_DETAILED_RESPONSE_TABLE" : "SF_relatedInfoDetailedResponseTable",
	"SFTI_RELATED_INFO_DETAILED_RESPONSE_TABLE" : "SFTI_relatedInfoDetailedResponseTable",
	"QUERY_REQUEST_VERFI_DETAIL_MODAL_POPUP":"queryRequestVerfiDetailModalPopUp",
	"GET_OTHER_RELATED_INFO_CODE_FORM_ID":"otherRelatedInfoFields",
	"GET_OTHER_RELATED_INFO_DETAIL_BELONGING_FIELD_FORM_ID":"otherRelatedInfbelongingfields"
}

var complianceformelementclasses = {
	"FORM_ELEMENT_CLASS" : "caseDetailsFilterBinder",
	"VERIF_ISSUE_DETAILS_FORM_ELEMENT_CLASS" : "verifIssueDetailsFilterBinder",
	"ADD_INFO_UPLOAD_FORM_ELEMENT_CLASS" : "addInfoUploadBinder",
	"ADDITIONAL_INFO_DOC_DOWNLOAD_CONTAINER" : "additionalInformationViewDetailContainer",
	"RELATED_INFO_DETAILS_FORM_ELEMENT_CLASS" : "relatedInformationDetailsBinder",
	"DETAILED_RELATED_INFO_COMPUTED_ELEMENT_CLASS" : "detailedRelatedInfoComputedBinder",
	"DETAILED_RELATED_INFO_BINDER" : "detailedrelatedinfoBinder",
	"CASE_RESPONSE_ELEMENT_CLASS" : "caseresponseBinder",
	"SF_RESPONSE_BINDER" : "depositsfresponsebinder",
	"SFTI_RESPONSE_BINDER" : "sftiresponseinvestbinder",
	"TT_RESPONSE_BINDER" : "ttresponsebinder",
	"TTSP_RESPONSE_BINDER" : "ttspresponsebinder",
	"TCR_RESPONSE_BINDER":"tcrresponsebinder",
	"EISC_RESPONSE_BINDER":"eiscresponsebinder",
	"CS_RESPONSE_BINDER":"csresponsebinder",
	"ERC_RESPONSE_BINDER":"ercresponsebinder",
	"CWBA_RESPONSE_BINDER":"cwbaresponsebinder",
	"GET_OTHER_RELATED_INFO_CODE_FORM_ELEMENT_CLASS":"otherRelatedInfoBinder",
	"GET_OTHER_RELATED_INFO_DETAIL_BELONGING_FIELD_FORM_ELEMENT_CLASS":"otherRelatedInfbelongingfieldsBinder"
}

var sucessMessages = {
	"RESPOSNE_SUCCESS_WITH_TRANSACTION_ID" : "Response Submitted Successfully. Transaction ID is ",
	"RESPOSNE_SUCCESS_WITHOUT_TRANSACTION_ID" : "Response for the information has been submitted successfully",
	"Response_SUCCESS_Filing_IncomeTax":"Response on Filing of Income Tax Return has been submitted successfully",
	"DRAFT_SAVED_SUCCESSFULLY" : "Draft Saved Successfully."
}

var errorMessages = {
	"COMPUTED_VALUE_ERROR" : "Computed value should be always 0",
	"PRELEMINERY_REASON_MONDATORY" : "Reason is Mandatory.",
	"PRELEMINERY_MODE_DATE_ACKNOLEDGEMENT_NO_MONDATORY" : "Mode,Date and Acknowledgement Number are Mandatory.",
	"PRELEMINERY_MODE_DATE_ACKNOLEDGEMENT_NO_CIRCLE_WARD_CITY_MANDATORY" : "Mode,Date, Acknowledgement Number, Circle/Ward and City are Mandatory.",
	"PRELEMINERY_RESPONSE_MONDATORY" : "Please Provide Preliminary Response.",
	"RESPONSE_MONDATORY" : "Please Provide Response.",
	"MALICIOUS_CHARACTERS" : "Your input contain malicious characters",
	"PAN_MANDATORY" : "PAN is Mandatory",
	"REMARKS_MANDATORY" : "Remarks is Mandatory",
	"AMOUNT_MANDATORY" : "Amount is Mandatory",
	"BANK_NAME_MANDATORY" : "Bank Name is Mandatory",
	"IFSC_CODE_IS_MONDATORY" : "IFSC Code is Mandatory",
	"ACCOUNT_NUMBER_IS_MONDATORY" : "Account Number is Mandatory",
	"AMOUNT_WITHDRAWN_IS_MONDATORY" : "Amount Withdrawn is Mandatory",
	"TRANSACTION_MODE_MONDATORY" : "Transaction Mode is Mandatory",
	"PERSON_NAME_MONDATORY" : "Person Name is Mandatory",
	"RECEIVED_AMOUNT_MONDATORY" : "Received Amount is Mandatory",
	"TRANSACTION_NATURE_MONDATORY" : "Transaction Nature is Mandatory",
	"PERSON_ADDRESS_MANDATORY" : "Person Address is Mandatory",
	"PROPER_FILE" : "Please select file with these extension only .doc,.docx,.odt,.txt,.csv,.rtf,.xls,.xlsx,.ppt,.pptx,.pdf,.jpg,.jpeg,.png,.gif,.zip,.rar",
	"PAN_FORMAT_CHECKER_ERROR" : "Pan Format should be like ABCDE1113D",
	"IFSC_FORMAT_CHECKER_ERROR" : "IFSC  should be of the format ABCD0000000",
	"NAME_FORMAT_CHECKER_ERROR" : "You have entered an invalid name",
	"TEXT_FORMAT_SIZE_CHECKER_ERROR" : "Please enter valid {0} with max {1} {2}",
	"BANK_NAME_FORMAT_CHECKER_ERROR" : "Bank Name should be of the format ABC Bank",
	"PIN_FORMAT_CHECKER_ERROR" : "PIN should be of the format 6 numeric digit",
	"EXEMPT_INCOME_TYPE" : "Exempt Income Type is Mandatory",
	"PIN_CODE_MONDATORY" : "Pin code is mandatory",
	"FINANCIAL_YEAR_MANDATORY" : "Financial year in mandatory",
	"CIRCLE_WARD_MANDATORY" : "Circle/Ward and City is Mandatory",
	"NATURE_OF_EXEMPTION_DEDUCTION_EXPENDITURE_MANDATORY" : "Nature of exemption/deduction/expenditure is mandatory",
	"SERVER_RUNTIME_EXCEPTION" : "Error at Server End",
	"UNEXPLAINED_AMOUNT_MANDATORY":"Unexplained amount should be greater or equal to zero (0)",
	"UNAUTORIZED":"Not authorized to access.",
	"ITR_ACK_NO_FORMAT_ERROR":"Please enter valid acknowledgement number"
}

var IMreadonlyscreen = {
	"IM_SUBMIT_BTN_CONTAINER" : "IMSubmitbtnContainer",
	"PAN_ROW_ADD_BTN_CONTAINER" : "panaddbtnContainer",
	"EXEMPTION_ROW_ADD_BTN_CONTAINER" : "exemptionaddbtnContainer",
	"ADDITION_ROW_ADD_BTN_CONTAINER" : "additionaddbtnContainer",
	"SF_SUBMIT_BTN_CONTAINER" : "SFSubmitbtnContainer"
}

var SFreadonlyscreen = {
	"SF_SUBMIT_BTN_CONTAINER" : "sfdetailedresponsesubmitContainer",
	"OUT_OF_RECEIPT_ROW_ADD_BTN_CONTAINER" : "sfoutofreceiptadddeletebtnContainer",
	"WITHDRAWN_OUT_OF_BANK_ROW_ADD_BTN_CONTAINER" : "sfwithdrawnoutofbankadddeletebtnContainer",
	"IDENTIFIABLE_PERSON_WITH_PAN_ROW_ADD_BTN_CONTAINER" : "sfidentifiablePersonWithPanaddDeletebtnContainer",
	"IDENTIFIABLE_PERSON_WITHOUT_PAN_ROW_ADD_BTN_CONTAINER" : "sfidentifiablePersonWithoutPanadddeletebtnContainer",
	"UNIDENTIFIABLE_PERSON_ROW_ADD_BTN_CONTAINER" : "sfunidentifiablePersonadddeletebtnContainer"
}
var SFiteamcontainers = {
	"SF_OUT_OF_RECEIPT_ITEM_CONTAINER" : "sfoutofreceiptContainer",
	"SF_WITHDRAWN_OUT_OF_BANK_ITEM_CONTAINER" : "sfwithdrawnoutofbankContainer",
	"SF_IDENTIFIABLE_PERSON_WITH_PAN_ITEM_CONTAINER" : "sfidentifiablepersonwithPanContainer",
	"SF_IDENTIFIABLE_PERSON_WITHOUT_PAN_ITEM_CONTAINER" : "sfidentifiablepersonWithoutPanContainer",
	"SF_UNIDENTIFIABLE_PERSON_ITEM_CONTAINER" : "sfunidentifiablePersonContainer"
}

var SFTIreadonlyscreen = {
	"SFTI_SUBMIT_BTN_CONTAINER" : "SFTISubmitbtnContainer",
	"OUT_OF_RECEIPT_ROW_ADD_BTN_CONTAINER" : "sftioutofreceiptadddeletebtnContainer",
	"WITHDRAWN_OUT_OF_BANK_ROW_ADD_BTN_CONTAINER" : "sftiwithdrawnOutOfBankadddeletebtnContainer",
	"IDENTIFIABLE_PERSON_WITH_PAN_ROW_ADD_BTN_CONTAINER" : "sftiidentifiablePersonWithPanadddeletebtnContainer",
	"IDENTIFIABLE_PERSON_WITHOUT_PAN_ROW_ADD_BTN_CONTAINER" : "sftiidentifiablePersonWithOutPanadddeletebtnContainer",
	"UNIDENTIFIABLE_PERSON_ROW_ADD_BTN_CONTAINER" : "sftiunidentifiablePersonadddeletebtnContainer"
}

var SFTIiteamcontainers = {
	"SFTI_OUT_OF_RECEIPT_ITEM_CONTAINER" : "sftioutofreceiptContainer",
	"SFTI_WITHDRAWN_OUT_OF_BANK_ITEM_CONTAINER" : "sftiwithdrawnoutofbankContainer",
	"SFTI_IDENTIFIABLE_PERSON_WITH_PAN_ITEM_CONTAINER" : "sftiidentifiablepersonwithPanContainer",
	"SFTI_IDENTIFIABLE_PERSON_WITHOUT_PAN_ITEM_CONTAINER" : "sftiidentifiablepersonWithoutPanContainer",
	"SFTI_UNIDENTIFIABLE_PERSON_ITEM_CONTAINER" : "sftiunidentifiablePersonContainer"
}

var TTreadonlyscreen = {
	"TT_SUBMIT_BTN_CONTAINER" : "TTdetailedResponseSubmitContainer",
	"TT_VAL_REL_TO_OTHER_PAN_ROW_ADD_BTN_CONTAINER" : "ttvalRelToOtherPanAddbDeletebtnContainer",
	"TT_EXEMPTION_DEDUCTION_EXPENDITURE_CONTAINER" : "ttexmptDedctExpaddDeletebtnContainer"
}

var TTiteamcontainers = {
	"TT_VAL_REL_TO_OTHER_PAN_ITEM_CONTAINER" : "ttvalRelToOtherPanContainer",
	"TT_EXEMPTION_DEDUCTION_EXPENDITURE_ITEM_CONTAINER" : "ttexmptDedctExpContainer"
}

var TTSPreadonlyscreen = {
	"TTSP_SUBMIT_BTN_CONTAINER" : "TTSPdetailedResponseSubmitContainer",
	"TTSP_VAL_REL_TO_OTHER_PAN_ROW_ADD_BTN_CONTAINER" : "ttspvalRelToOtherPanadddeletebtnContainer",
	"TTSP_EXEMPTION_DEDUCTION_EXPENDITURE_CONTAINER" : "ttspexptDedcExpadddeletebtnContainer"
}

var TTSPiteamcontainers = {
	"TT_VAL_REL_TO_OTHER_PAN_ITEM_CONTAINER" : "ttspvalRelToOtherPanContainer",
	"TT_EXEMPTION_DEDUCTION_EXPENDITURE_ITEM_CONTAINER" : "ttspexptDedcExpContainer"
}

var alerts = {
	"RELATED_INFO_VIEW_INFORMATION_HISTORY_ALERT" : "Please Select Any Row from Related Information Table",
	"ADDITIONAL_INFO_VIEW_INFORMATION_HISTORY_ALERT" : "Please Select Any Row from Addition Information Request Table",
	"MULTIPLE_ROW_SELECTED" : "Please Select only One Row at a Time",
	"NO_ROW_SELECTED" : "Please Select Any Row from Table",
	"NO_INFORAMTION_AVAILABLE" : "No Information available"
}

var miscmessages = {
	"NO_DATA_AVAILABLE" : "No Data Available",
	"NO_COMPLIANCE_RECORD" : "No compliance record has been generated for you.",
	"SELECT_REASON" : "- Select Reason -",
	"RETURN_UNDER_PREPARATION" : "Return under preparation",
	"NOT_LIABLE_TO_FILE_RETURN" : "Not liable to file return of income",
	"COMMON_MESSAGE_FOR_MANDATORY_FIELD":"Highlighted field is mandatory",
	"COMMON_MESSAGE_FOR_MINLENGTH_FIELD":"Minimum length of this field is ",
	"COMMON_MESSAGE_FOR_MAXLENGTH_FIELD":"Maximum length of this field is ",
	"COMMON_MESSAGE_FOR_PATTERN_FIELD":"Please provide this field in proper format",
	"REMARKS_LENGTH_EXCEEDED":"Remarks length exceeded 500 characters!"
}

var TTconstantrows = {
	"ttreceiptRelToOtherInfoClass" : "ttvalRelToOtherPanContainer",
	"ttvalRelToOtherPanClass" : "ttvalRelToOtherPanAddbDeletebtnContainer",
	"ttvalCovrdInOtherInfoClass" : "ttexmptDedctExpContainer",
	"ttexmptDedctExpClass" : "ttexmptDedctExpaddDeletebtnContainer"
}

var TTrowspanrowcontainerObject = {
	"ttreceiptReltoOtherInfoContainer" : "ttvalRelToOtherPanContainer",
	"ttvalRelToOtherPanContainer" : "ttvalCovrdInOtherContainer",
	"ttvalCovrdInOtherContainer" : "ttexmptDedctExpContainer",
	"ttexmptDedctExpContainer" : "ttincomeGainLossContainer"
};

var SFconstantrows = {
	"sfcorrectInfoClass" : "sfearlierIncomeContainer",
	"sfearlierIncomeClass" : "sfoutofreceiptContainer",
	"sfoutofreceiptClass" : "sfoutofreceiptadddeletebtnContainer",
	"sfidentifiablePersonWithPanClass" : "sfidentifiablePersonWithPanaddDeletebtnContainer",
	"sfidentifiablePersonWithOutPanClass" : "sfidentifiablePersonWithoutPanadddeletebtnContainer",
	"sfunidentifiablePersonClass" : "sfunidentifiablePersonadddeletebtnContainer",
	"sfcashDisclosedTobeDisclosedClass" : "sftotalContainer"
}

var SFrowspanrowcontainerObject = {
	"sfcorrectInfoValContainer" : "sfearlierIncomeContainer",
	"sfearlierIncomeContainer" : "sfoutofreceiptContainer",
	"sfoutofreceiptContainer" : "sfidentifiablepersonwithPanContainer",
	"sfidentifiablepersonwithPanContainer" : "sfidentifiablepersonWithoutPanContainer",
	"sfidentifiablepersonWithoutPanContainer" : "sfunidentifiablePersonContainer",
	"sfunidentifiablePersonContainer" : "sfcashDisclosedTobeDisclosedContainer",
	"sfcashDisclosedTobeDisclosedContainer" : "sftotalContainer"
}

var SFTIconstantrows = {
	"sfticorrectInfoClass" : "sftioutofincomeContainer",
	"sftiearlierIncomeClass" : "sftioutofreceiptContainer",
	"sftioutofreceiptClass" : "sftioutofreceiptadddeletebtnContainer",
	"sftiidentifiablePersonWithPanClass" : "sftiidentifiablePersonWithPanadddeletebtnContainer",
	"sftiidentifiablePersonWithOutPanClass" : "sftiidentifiablePersonWithOutPanadddeletebtnContainer",
	"sftiunidentifiablePersonClass" : "sftiunidentifiablePersonadddeletebtnContainer",
	"sfticashDisclosedTobeDisclosedClass" : "sftitotalContainer",
	"sftiinvestmentDuringTheYearClass" : "SFTISubmitbtnContainer"
}

var SFTIrowspanrowcontainerObject = {
	"sfticorrevtInfoValContainer" : "sftioutofincomeContainer",
	"sftioutofincomeContainer" : "sftioutofreceiptContainer",
	"sftioutofreceiptContainer" : "sftiidentifiablepersonwithPanContainer",
	"sftiidentifiablepersonwithPanContainer" : "sftiidentifiablepersonWithoutPanContainer",
	"sftiidentifiablepersonWithoutPanContainer" : "sftiunidentifiablePersonContainer",
	"sftiunidentifiablePersonContainer" : "sfticashDisclosedTobeDisclosedContainer",
	"sfticashDisclosedTobeDisclosedContainer" : "sftitotalContainer",
	"sftiinvestmentDuringTheYearContainer" : "SFTISubmitbtnContainer"

}

var TTSPconstantrows = {
	"ttspreceiptRelToabvInfoClass" : "ttspStampValueContainer",
	"ttspStampValueClass" : "ttspcapitalGainContainer",
	"ttspcapitalGainClass" : "ttspvalRelToOtherPanContainer",
	"ttspvalRelToOtherPanClass" : "ttspvalRelToOtherPanadddeletebtnContainer",
	"ttspvalCvrdInOtherInfoClass" : "ttspexptDedcExpContainer",
	"ttspexptDedcExpClass" : "ttspexptDedcExpadddeletebtnContainer"
}

var TTSProwspanrowcontainerObject = {
	"ttspRcptRelToAbvInfoContainer" : "ttspStampValueContainer",
	"ttspStampValueContainer" : "ttspcapitalGainContainer",
	"ttspcapitalGainContainer" : "ttspvalRelToOtherPanContainer",
	"ttspvalRelToOtherPanContainer" : "ttspvalcvrdInOtherInfoContainer",
	"ttspvalcvrdInOtherInfoContainer" : "ttspexptDedcExpContainer",
	"ttspexptDedcExpContainer" : "ttspIncomeGainLossContainer"
}

var TCRconstantrows = {
	"tcridentifiablepersonwithpanClass" : "tcridentifiablepersonwithpanadddeletebtncontainer"
}

var TCRrowspanrowcontainerObject = {
	"tcridentifiablepersonwithpancontainer" : "tcridentifiablepersonwithpanadddeletebtncontainer"
}

var ERCconstantrows = {
	"ERCcashreceiptOutofExemptReceiptClass" : "ERCcashreceiptOutofExemptReceiptAddDeleteContainer"
}

var ERCrowspanrowcontainerObject = {
	"ERCcashreceiptOutofExemptReceiptContainer" : "ERCcashreceiptOutofExemptReceiptAddDeleteContainer"
}

var CWBAconstantrows = {
	"cwbacashwithdrwnoutofbankClass" : "cwbacashwithdrwnoutofbankadddeletebtncontainer"
}

var CWBArowspanrowcontainerObject = {
	"cwbacashwithdrwnoutofbankContainer" : "cwbacashwithdrwnoutofbankadddeletebtncontainer"
}

var EISCconstantrows = {
	"EISCcashinhandoutofearlierincomefifteenthyearClass" : "EISCcashinhandoutofearlierincomeSixteenthYearContainer",
	"EISCcashinhandoutofearlierincomeSixteenthYearClass" : "EISCsubmitbtncontainer"
}

var EISCrowspanrowcontainerObject = {
	"EISCcashinhandoutofearlierincomefifteenthyearContainer" : "EISCcashinhandoutofearlierincomeSixteenthYearContainer",
	"EISCcashinhandoutofearlierincomeSixteenthYearContainer" : "EISCsubmitbtncontainer"
}

var detailedResponseMandatoryFields = {
	"ttvalRelToOtherPanClass" : [ "ttvalRelToOtherPanPANNO",
			"ttvalRelToOtherPanFinYear", "ttvalRelToOtherPanamount","ttvalRelToOtherPanremarks" ],
	"ttvalRelToOtherPanRowMandatoryfields" : [ "ttvalRelToOtherPanPANNO",
				"ttvalRelToOtherPanFinYear", "ttvalRelToOtherPanamount" ],
			
	"ttvalCovrdInOtherInfoClass" : [ "ttvalCovrdInOtherInfoamount","ttvalCovrdInOtherInforemarks" ],
	"ttvalCovrdInOtherInfoRowMandatoryfields" : [ "ttvalCovrdInOtherInfoamount" ],
	
	"ttexmptDedctExpClass" : [ "ttexmptDedctExpFinYear",
			"ttexmptDedctExpamount","ttexmptDedctExpremarks" ],
	"ttexmptDedctExpRowMandatoryfields" : [ "ttexmptDedctExpFinYear",
				"ttexmptDedctExpamount" ],			
			
	"ttspvalRelToOtherPanClass" : [ "ttspvalRelToOtherPanNo",
			"ttspvalRelToOtherPanexemptIncomeType",
			"ttspvalRelToOtherPanamount","ttspvalRelToOtherPanremarks" ],
	"ttspvalRelToOtherPanRowMandatoryfields" : [ "ttspvalRelToOtherPanNo",
				"ttspvalRelToOtherPanexemptIncomeType",
				"ttspvalRelToOtherPanamount" ],		
			
	"ttspexptDedcExpClass" : [ "ttspexptDedcExpexemptIncomeType",
			"ttspexptDedcExpamount","ttspexptDedcExpremarks" ],
	"ttspexptDedcExpRowMandatoryfields" : [ "ttspexptDedcExpexemptIncomeType",
				"ttspexptDedcExpamount" ],		
			
	"ttspvalCvrdInOtherInfoClass" : [ "ttspvalCvrdInOtherInfoamount","ttspvalCvrdInOtherInforemarks" ],
	"ttspvalCvrdInOtherInfoRowMandatoryfields" : [ "ttspvalCvrdInOtherInfoamount" ],
	
	
	"ttspcapitalGainClass" : [ "ttspcapitalGainamount" ],
	"ttspStampValueClass" : [ "ttspStampValueamount" ],

	"sfearlierIncomeClass" : [ "sfearlierIncomeamount","sfearlierIncomeremarks" ],
	"sfearlierIncomeRowMandatoryfields":[ "sfearlierIncomeamount" ],
	
	"sfoutofreceiptClass" : [ "sfoutofreceiptexmptIncomeType","sfoutofreceiptamount","sfoutofreceiptremarks" ],
	"sfoutofreceiptRowMandatoryfields":[ "sfoutofreceiptexmptIncomeType","sfoutofreceiptamount" ],
	
	"sfidentifiablePersonWithPanClass" : [ "sfidentifiablePersonWithPanPANNO",
			"sfidentifiablePersonWithPanPersonName",
			"sfidentifiablePersonWithPanfinYear",
			"sfidentifiablePersonWithPanTranNature",
			"sfidentifiablePersonWithPanTransMode",
			"sfidentifiablePersonWithPanrcvdAmount","sfidentifiablePersonWithPanremarks" ],
			
	"sfidentifiablePersonWithPanRowMandatoryfields" : [ "sfidentifiablePersonWithPanPANNO",
				"sfidentifiablePersonWithPanPersonName",
				"sfidentifiablePersonWithPanfinYear",
				"sfidentifiablePersonWithPanTranNature",
				"sfidentifiablePersonWithPanTransMode",
				"sfidentifiablePersonWithPanrcvdAmount" ],
				
	"sfidentifiablePersonWithOutPanClass" : [
			"sfidentifiablePersonWithOutPanPersonName",
			"sfidentifiablePersonWithOutPanPersonAddress",
			"sfidentifiablePersonWithOutPanPinCode",
			"sfidentifiablePersonWithOutPanfinYear",
			"sfidentifiablePersonWithOutPanTransNature",
			"sfidentifiablePersonWithOutPanTransMode",
			"sfidentifiablePersonWithOutPanrcvdAmount","sfidentifiablePersonWithOutPanremarks" ],
	
	"sfidentifiablePersonWithOutPanRowMandatoryfields" : [
				"sfidentifiablePersonWithOutPanPersonName",
				"sfidentifiablePersonWithOutPanPersonAddress",
				"sfidentifiablePersonWithOutPanPinCode",
				"sfidentifiablePersonWithOutPanfinYear",
				"sfidentifiablePersonWithOutPanTransNature",
				"sfidentifiablePersonWithOutPanTransMode",
				"sfidentifiablePersonWithOutPanrcvdAmount" ],	
			
			
	"sfunidentifiablePersonClass" : [ "sfunidentifiablePersonfinYear",
			"sfunidentifiablePersonTransNature",
			"sfunidentifiablePersonTransMode",
			"sfunidentifiablePersonrcvdAmount","sfunidentifiablePersonremarks" ],
	
	"sfunidentifiablePersonRowMandatoryfields" : [ "sfunidentifiablePersonfinYear",
				"sfunidentifiablePersonTransNature",
				"sfunidentifiablePersonTransMode",
				"sfunidentifiablePersonrcvdAmount" ],		
			
	"sfcashDisclosedTobeDisclosedClass" : [ "sfcashDisclosedTobeDisclosedamount","sfcashDisclosedTobeDisclosedremarks" ],
	"sfcashDisclosedTobeDisclosedRowMandatoryfields" : [ "sfcashDisclosedTobeDisclosedamount" ],

	"sftiearlierIncomeClass" : [ "sftiearlierIncomeamount","sftiearlierIncomeremarks" ],
	"sftiearlierIncomeRowMandatoryfields" : [ "sftiearlierIncomeamount" ],
	
	"sftioutofreceiptClass" : [ "sftiexemptIncomeType","sftioutofreceiptamount","sftioutofreceiptremarks"],
	"sftioutofreceiptRowMandatoryfields" : [ "sftiexemptIncomeType","sftioutofreceiptamount" ],
	
	"sftiidentifiablePersonWithPanClass" : [
			"sftiidentifiablePersonWithPanPANNO",
			"sftiidentifiablePersonWithPanPersonName",
			"sftiidentifiablePersonWithPanFinYear",
			"sftiidentifiablePersonWithPanTranNature",
			"sftiidentifiablePersonWithPanTransMode",
			"sftiidentifiablePersonWithPanrcvdAmount","sftiidentifiablePersonWithPanremarks" ],
	"sftiidentifiablePersonWithPanRowMandatoryfields" : [
				"sftiidentifiablePersonWithPanPANNO",
				"sftiidentifiablePersonWithPanPersonName",
				"sftiidentifiablePersonWithPanFinYear",
				"sftiidentifiablePersonWithPanTranNature",
				"sftiidentifiablePersonWithPanTransMode",
				"sftiidentifiablePersonWithPanrcvdAmount" ],		
			
	"sftiidentifiablePersonWithOutPanClass" : [
			"sftiidentifiablePersonWithOutPanPersonName",
			"sftiidentifiablePersonWithOutPanPersonAddress",
			"sftiidentifiablePersonWithOutPanPinCode",
			"sftiidentifiablePersonWithOutPanFinYear",
			"sftiidentifiablePersonWithOutPanTransNature",
			"sftiidentifiablePersonWithOutPanTransMode",
			"sftiidentifiablePersonWithOutPanrcvdAmount","sftiidentifiablePersonWithOutPanremarks" ],
	"sftiidentifiablePersonWithOutPanRowMandatoryfields" : [
				"sftiidentifiablePersonWithOutPanPersonName",
				"sftiidentifiablePersonWithOutPanPersonAddress",
				"sftiidentifiablePersonWithOutPanPinCode",
				"sftiidentifiablePersonWithOutPanFinYear",
				"sftiidentifiablePersonWithOutPanTransNature",
				"sftiidentifiablePersonWithOutPanTransMode",
				"sftiidentifiablePersonWithOutPanrcvdAmount" ],			
			
	"sftiunidentifiablePersonClass" : [ "sftiunidentifiablePersonFinYear",
			"sftiunidentifiablePersonTransNature",
			"sftiunidentifiablePersonTransMode",
			"sftiunidentifiablePersonrcvdAmount","sftiunidentifiablePersonremarks" ],
	"sftiunidentifiablePersonRowMandatoryfields" : [ "sftiunidentifiablePersonFinYear",
				"sftiunidentifiablePersonTransNature",
				"sftiunidentifiablePersonTransMode",
				"sftiunidentifiablePersonrcvdAmount" ],			
			
			
	"sfticashDisclosedTobeDisclosedClass" : [ "sfticashDisclosedTobeDisclosedamount","sfticashDisclosedTobeDisclosedremarks" ],
	"sfticashDisclosedTobeDisclosedRowMandatoryfields" : [ "sfticashDisclosedTobeDisclosedamount" ],
	
	
	"sftiinvestmentDuringTheYearClass" : [ "sftiinvestmentAmount","sftiinvestmentAmountremarks" ],
	"sftiinvestmentDuringTheYearRowMandatoryfields" : [ "sftiinvestmentAmount" ],
	
	"tcridentifiablepersonwithpanClass" : [ "tcrpersonPan", "tcrpersonName",
			"tcrnatureoftransaction", "tcrreceivedamount","tcrremarks"],
	"tcridentifiablepersonwithpanRowMandatoryfields" : [ "tcrpersonPan", "tcrpersonName",
				"tcrnatureoftransaction", "tcrreceivedamount" ],		
			
	"ERCcashreceiptOutofExemptReceiptClass" : [
			"ERCcashReceivedOutofExemptReceiptExemptIncomeType",
			"ERCcashReceivedOutofExemptReceiptAmount","ERCcashReceivedOutofExemptReceiptRemarks" ],
	"ERCcashreceiptOutofExemptReceiptRowMandatoryfields" : [
				"ERCcashReceivedOutofExemptReceiptExemptIncomeType",
				"ERCcashReceivedOutofExemptReceiptAmount" ],
				
	"cwbacashwithdrwnoutofbankClass" : [
			"CWBAcwbacashwithdrwnoutofbankbankname",
			"CWBAcwbacashwithdrwnoutofbankifsccode",
			"CWBAcwbacashwithdrwnoutofbankaccountnumber",
			"CWBAcwbacashwithdrwnoutofbankAmountWithdrawn","CWBAcwbacashwithdrwnoutofbankremarks" ],
	"cwbacashwithdrwnoutofbankRowMandatoryfields" : [
				"CWBAcwbacashwithdrwnoutofbankbankname",
				"CWBAcwbacashwithdrwnoutofbankifsccode",
				"CWBAcwbacashwithdrwnoutofbankaccountnumber",
				"CWBAcwbacashwithdrwnoutofbankAmountWithdrawn" ]		
};

var detailedresponsemandatoryfieldmessages = {
	"ttvalRelToOtherPanPANNO" : "PAN is Mandatory",
	"ttvalRelToOtherPanFinYear" : "Financial Year is Mandatory",
	"ttvalRelToOtherPanamount" : "Amount is Mandatory",
	"ttexmptDedctExpFinYear" : "Nature of exemption/deduction/expenditure is mandatory",
	"ttexmptDedctExpamount" : "Amount is Mandatory",
	"ttvalCovrdInOtherInfoamount" : "Amount is Mandatory",

	"ttspvalRelToOtherPanNo" : "PAN is Mandatory",
	"ttspvalRelToOtherPanexemptIncomeType" : "Financial Year is Mandatory",
	"ttspvalRelToOtherPanamount" : "Amount is Mandatory",
	"ttspexptDedcExpexemptIncomeType" : "Nature of exemption/deduction/expenditure is mandatory",
	"ttspexptDedcExpamount" : "Amount is Mandatory",
	"ttspvalCvrdInOtherInfoamount" : "Amount is Mandatory",
	"ttspcapitalGainamount" : "Amount is Mandatory",
	"ttspStampValueamount" : "Amount is Mandatory",

	"sfearlierIncomeamount" : "Amount is Mandatory",
	"sfoutofreceiptexmptIncomeType" : "Exempt Income Type is Mandatory",
	"sfoutofreceiptamount" : "Amount is Mandatory",
	"sfidentifiablePersonWithPanPANNO" : "PAN is Mandatory",
	"sfidentifiablePersonWithPanPersonName" : "Name of Person is Mandatory",
	"sfidentifiablePersonWithPanfinYear" : "Financial Year is Mandatory",
	"sfidentifiablePersonWithPanTranNature" : "Transaction Type is Mandatory",
	"sfidentifiablePersonWithPanTransMode" : "Transaction Mode is Mandatory",
	"sfidentifiablePersonWithPanrcvdAmount" : "Amount is Mandatory",
	"sfidentifiablePersonWithOutPanPersonName" : "Name of Person is Mandatory",
	"sfidentifiablePersonWithOutPanPersonAddress" : "Address of Person is Mandatory",
	"sfidentifiablePersonWithOutPanPinCode" : "PinCode is Mandatory",
	"sfidentifiablePersonWithOutPanfinYear" : "Financial Year is Mandatory",
	"sfidentifiablePersonWithOutPanTransNature" : "Transaction Type is Mandatory",
	"sfidentifiablePersonWithOutPanTransMode" : "Transaction Mode is Mandatory",
	"sfidentifiablePersonWithOutPanrcvdAmount" : "Amount is Mandatory",
	"sfunidentifiablePersonfinYear" : "Financial Year is Mandatory",
	"sfunidentifiablePersonTransNature" : "Transaction Type is Mandatory",
	"sfunidentifiablePersonTransMode" : "Transaction Mode is Mandatory",
	"sfunidentifiablePersonrcvdAmount" : "Amount is Mandatory",
	"sfcashDisclosedTobeDisclosedamount" : "Amount is Mandatory",

	"sftiearlierIncomeamount" : "Earlier Income Amount is Mandatory",
	"sftiexemptIncomeType" : "Exempt Income Type is Mandatory",
	"sftioutofreceiptamount" : "Amount is Mandatory",
	"sftiidentifiablePersonWithPanPANNO" : "PAN is Mandatory",
	"sftiidentifiablePersonWithPanPersonName" : "Name of Person is Mandatory",
	"sftiidentifiablePersonWithPanFinYear" : "Financial Year is Mandatory",
	"sftiidentifiablePersonWithPanTranNature" : "Transaction Type is Mandatory",
	"sftiidentifiablePersonWithPanTransMode" : "Transaction Mode is Mandatory",
	"sftiidentifiablePersonWithPanrcvdAmount" : "Amount is Mandatory",
	"sftiidentifiablePersonWithOutPanPersonName" : "Name of Person is Mandatory",
	"sftiidentifiablePersonWithOutPanPersonAddress" : "Address of Person is mandatory",
	"sftiidentifiablePersonWithOutPanPinCode" : "PinCode is Mandatory",
	"sftiidentifiablePersonWithOutPanFinYear" : "Financial Year is Mandatory",
	"sftiidentifiablePersonWithOutPanTransNature" : "Transaction Type is Mandatory",
	"sftiidentifiablePersonWithOutPanTransMode" : "Transaction Mode is Mandatory",
	"sftiidentifiablePersonWithOutPanrcvdAmount" : "Amount is Mandatory",
	"sftiunidentifiablePersonFinYear" : "Financial Year is Mandatory",
	"sftiunidentifiablePersonTransNature" : "Transaction Type is Mandatory",
	"sftiunidentifiablePersonTransMode" : "Transaction Mode is Mandatory",
	"sftiunidentifiablePersonrcvdAmount" : "Amount is Mandatory",
	"sfticashDisclosedTobeDisclosedamount" : "Amount is Mandatory",
	"sftiinvestmentAmount" : "Amount is Mandatory",

	"tcrpersonPan" : "PAN is Mandatory",
	"tcrpersonName" : "Name of Person is Mandatory",
	"tcrnatureoftransaction" : "Transaction Nature is Mandatory",
	"tcrreceivedamount" : "Amount is Mandatory",

	"ERCcashReceivedOutofExemptReceiptExemptIncomeType" : "Exempt Income Type is Mandatory",
	"ERCcashReceivedOutofExemptReceiptAmount" : "Amount is Mandatory",

	"CWBAcwbacashwithdrwnoutofbankbankname" : "Bank Name is Mandatory",
	"CWBAcwbacashwithdrwnoutofbankifsccode" : "IFSC Code is Mandatory",
	"CWBAcwbacashwithdrwnoutofbankaccountnumber" : "Account Number is Mandatory",
	"CWBAcwbacashwithdrwnoutofbankAmountWithdrawn" : "Amount is Mandatory"
}

var zerovaluemessages = {
	"sfearlierIncomeamount" : "Amount should be greater than zero",
	"sfoutofreceiptamount" : "Amount should be greater than zero",
	"sfidentifiablePersonWithPanrcvdAmount" : "Amount should be greater than zero",
	"sfidentifiablePersonWithOutPanrcvdAmount" : "Amount should be greater than zero",
	"sfunidentifiablePersonrcvdAmount" : "Amount should be greater than zero",
	"sfcashDisclosedTobeDisclosedamount" : "Amount should be greater than zero",

	"sftiearlierIncomeamount" : "Amount should be greater than zero",
	"sftioutofreceiptamount" : "Amount should be greater than zero",
	"sftiidentifiablePersonWithPanrcvdAmount" : "Amount should be greater than zero",
	"sftiidentifiablePersonWithOutPanrcvdAmount" : "Amount should be greater than zero",
	"sftiunidentifiablePersonrcvdAmount" : "Amount should be greater than zero",
	"sfticashDisclosedTobeDisclosedamount" : "Amount should be greater than zero",

	"ttvalRelToOtherPanamount" : "Amount should be greater than zero",
	"ttexmptDedctExpamount" : "Amount should be greater than zero",
	"ttvalCovrdInOtherInfoamount" : "Amount should be greater than zero",

	"ttspvalRelToOtherPanamount" : "Amount should be greater than zero",
	"ttspexptDedcExpamount" : "Amount should be greater than zero",
	"ttspvalCvrdInOtherInfoamount" : "Amount should be greater than zero",
	"ttspcapitalGainamount" : "Amount should be greater than zero",
	"ttspStampValueamount" : "Amount should be greater than zero",

	"tcrreceivedamount" : "Amount should be greater than zero",

	"ERCcashReceivedOutofExemptReceiptAmount" : "Amount should be greater than zero",

	"CWBAcwbacashwithdrwnoutofbankAmountWithdrawn" : "Amount should be greater than zero"
}
// ######################## resources Url and ids
// ###########################################
var FAQ_GET_FAQ_DATA = "getListOfFaqTopics";
var GET_FAQ_QUESTION_ANSWER = 'getFAQlist/';
var SURVEY_GET_TOPIC_LIST = 'getListOfSurveyTopics';
var SURVEY_GET_SURVEY_LIST = 'getSurveyList/';
var SURVEY_SAVE_SURVEY_LIST = 'saveSurveyResponse';
var DOWNLOAD_GET_DOWNLOAD_FILE_LIST = 'get-download-file-list';

var RECOURCE_MESSAGE_ALERT = '#resourceMessage';
var RECOURCE_MESSAGE_CONTENT_ALERT = '#resourceMessageContent';
var RECOURCE_MESSAGE_SUCCESS_ALERT = '#resourceMessageSuccess';
var RECOURCE_MESSAGE_SUCCESS_CONTENT_ALERT = '#resourceMessageSuccessContent';
var FAQ_TOPICID = "faqTopic";
var FAQ_QUESTION_ANSWER = "faqQuestionAnswer";
var SURVEY_TABS = "surveyTabs";
var SURVEY_QUESTION_ANSWER = "surveyQuestionAnswer";
var DOWNLOAD_SUBMIT_JSON_DATA = '#submitJsonData';
var DOWNLOAD_SUBMIT_DATA = "#submitData";

var TRAINING_MATERIAL_ID = "#trainingMaterial";
var TRAINING_MATERIAL_TAB_ID = "#trainingMaterialTab";
var USER_MANUAL_ID = "#userManual";
var USER_MANUAL_TAB_ID = "#userManualTab";

var REQUEST_TYPE_GET = 'GET';
var REQUEST_TYPE_POST = 'POST';

var detailedresponsetypecontainers = [ "SF_detailedResponseContainer", "SFTI_detailedResponseContainer",
		"TT_detailedResponseContainer", "TTSP_detailedResponseContainer",
		"CS_detailedResponseContainer", "TCR_detailedResponseContainer",
		"EISC_detailedResponseContainer", "ERC_detailedResponseContainer",
		"CWBA_detailedResponseContainer" ];
var relatedinfoInfogroupcontainers = [ "INFD",
		"TRND", "SALD", "STOD", 
		"CIBD", "SCTD", "15CA","DMAD","BPAD","IPTD","PBRD" ]

var compliancesubmitbtns=["caseResponseSubmit","submitRelatedInfoResponse","CS_detailedResponseSubmit","CS_detailedResponseSaveDraft","CWBA_detailedResponseSubmit","CWBA_detailedResponseSaveDraft","EISC_detailedResponseSubmit","EISC_detailedResponseSaveDraft","ERC_detailedResponseSubmit","ERC_detailedResponseSaveDraft","SF_detailedResponseSubmit","SF_detailedResponseSaveDraft","SFTI_detailedResponseSubmit","SFTI_detailedResponseSaveDraft","TCR_detailedResponseSubmit","TCR_detailedResponseSaveDraft","TTdetailedResponseSubmit","TT_detailedResponseSaveDraft","TTSP_detailedResponseSubmit","TTSP_detailedResponseSaveDraft"];