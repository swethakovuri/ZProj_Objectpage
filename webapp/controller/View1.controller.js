sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
	
], function(Controller, JSONModel, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("ObjectpageZProj_Objectpage.controller.View1", {

		onInit: function() {

			var oDocType = {
				"SelectedType": "",
				"DocumentType": [{
					"DocType": "Pid",
					"Name": "ProductID"
				}, {
				"DocType": "Sid",
					"Name": "Salesorder"
				},
				]
			};

			var oView = this.getView();
			var oDocTypeModel = new JSONModel(oDocType);
			oView.setModel(oDocTypeModel, "doctype");
			this._oDocumentInput = this.byId("documentInput");
            this._oDocumentDrop = this.byId("idDropdown");
		
		 
//set i18n model

		},
		
		handleInputSubmit: function(oEvent){
		    debugger;
	    	this._oDocumentInput = this.byId("documentInput");
			var sValue = this._oDocumentInput.getValue();
			var data = "/sap/opu/odata/iwbep/GWSAMPLE_BASIC/";
			var odatamodel1 = new sap.ui.model.odata.ODataModel(data);
			var jsonmodel1 = new sap.ui.model.json.JSONModel();
			sap.ui.core.BusyIndicator.show(0);
			var filter1 = new Filter("ProductID",FilterOperator.EQ, sValue);
			odatamodel1.read("/ProductSet", {
				filters: [filter1],
				success: function(req, resp) {
					sap.ui.core.BusyIndicator.hide();
					jsonmodel1.setSizeLimit(1000); //to show more records in output
					jsonmodel1.setData(req.results);
					this.getView().byId("idHeader").setModel(jsonmodel1, "Header");
					var _id2 = this.getView().byId("idHeader");
					_id2.setVisible(true);
					
				}.bind(this),
				error: function(msg) {
					sap.ui.core.BusyIndicator.hide();
					sap.m.MessageToast("Failed to reload" + msg);
				}
			});
		}
			
	});
	});