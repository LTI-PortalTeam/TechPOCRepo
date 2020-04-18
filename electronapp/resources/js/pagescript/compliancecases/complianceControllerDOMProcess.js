jq(document)
		.ready(
				function() {

					jq("#"+compliancetable.RELATED_EARLIER_INFO_TABLE)
							.jqGrid(
									{
										colNames : [
												'TSN',
												'Information Code',
												'Information Description',
												'Information Source',
												'Information Value(<img class="rupeessymbol" src="resources/images/rupeesymbol.png" alt="Rupees Symbol">)',
												'Response Status',
												'<div style="text-align:center">Response<div>',
												'', 'infoGroup', '',
												'verifType', 'relInfoId' ],
										colModel : [
												{
													name : 'tsn',
													index : 'tsn',
													width : 90,
													align : 'center',
													resizable : false,
													fixed : true,
													cellattr : function() {
														return 'id="relinfotsnIddata"';
													}
												},
												{
													name : 'infoCode',
													index : 'infoCode',
													width : 90,
													align : 'center',
													resizable : false,
													fixed : true
												},
												{
													name : 'information',
													index : 'information',
													width : 210,
													align : 'left',
													resizable : false,
													fixed : true,
													classes : "grid-col"
												},
												{
													name : 'source',
													index : 'source',
													width : 160,
													align : 'center',
													resizable : false,
													fixed : true
												},
												{
													name : 'value',
													index : 'value',
													width : 130,
													align : 'right',
													resizable : false,
													fixed : true,
													classes : "grid-col",
													formatter : ComplianceController.RelatedInfoValue

												},
												{
													name : 'statusDesc',
													index : 'statusDesc',
													width : 130,
													align : 'center',
													resizable : false,
													fixed : true,
													cellattr : function() {
														return "id='relinfostatus'";
													}
												},
												{
													name : 'submit',
													edittype : 'select',
													index : '',
													formatter : ComplianceController.CreateRelatedInfoSubmitGridHyperLink,
													width : 80,
													align : 'center',
													resizable : false,
													fixed : true,
													hidden:true
												},
												{
													name : 'View',
													edittype : 'select',
													index : '',
													formatter : ComplianceController.CreateRelatedInfoViewGridHyperLink,
													width : 80,
													align : 'center',
													resizable : false,
													fixed : true
												},
												{
													name : 'infoGroup',
													index : 'infoGroup',
													width : 20,
													hidden : true,
													align : 'center',
													resizable : false,
													fixed : true
												},
												{
													name : 'infoGroupId',
													index : 'infoGroupId',
													width : 20,
													hidden : true,
													align : 'center',
													resizable : false,
													fixed : true
												},
												{
													name : 'verifType',
													index : 'verifType',
													width : 20,
													hidden : true,
													align : 'center',
													resizable : false,
													fixed : true,
													cellattr : function() {
														return 'id="veriftypedata"';
													}
												},
												{
													name : 'relInfoId',
													index : 'relInfoId',
													hidden : true,
													width : 20,
													resizable : false,
													fixed : true,
													align : 'center',
													cellattr : function() {
														return 'id="relInfoIddata"';

													}
												} ],

										rowNum : 20,
										rowList : [ 10, 20, 30, 40, 50 ],
										pager : '',
										rownumbers : false,
										viewrecords : true,
										gridview : true,
										fixed : true

									});

					jq("#relatedInfoTable_submit").css("width", "160px");
					jq("#relatedInfoTable_submit").attr("colspan", "2");
					jq("#relatedInfoTable_View").remove();
				});