sap.ui.controller("timebee.calendar", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf timebee.calendar
	 */
	onInit : function() {

		var oModel3 = new sap.ui.model.json.JSONModel();

		sap.ui.getCore().setModel(oModel3, "table");
		oModel3.refresh(true);
		this.calendarDate();

	},

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the
	 * controller's View is re-rendered (NOT before the first rendering!
	 * onInit() is used for that one!).
	 * 
	 * @memberOf timebee.calendar
	 */
	// onBeforeRendering: function() {
	//
	// },
	message : function(oEvt) {

		var sClickedData = oEvt.getSource().getTitle();
		var oModel2 = sap.ui.getCore().getModel("model2");
		var oData2 = oModel2.getData();
		var oModel3 = sap.ui.getCore().getModel("table");
		var oNewData = [];
		var ok = 0;
		for (var i = 0; i < oData2.events['length']; i++) {
			if (oData2["events"][i]["name"] === sClickedData) {

				oNewData.push(oData2.events[i]);
			}

		}
		oModel3.setData(oNewData);
		console.log(oNewData);

	},
	changeAppContent : function(oEvt) {
		var model = sap.ui.getCore().getModel("table");
		var oData = model.getData();
		var model2 = sap.ui.getCore().getModel("model2");
		var oData2 = model.getData();
		var v1 = sap.ui.getCore().byId("newNameSet");
		var v2 = sap.ui.getCore().byId("newDaySet");
		var v3 = sap.ui.getCore().byId("newFromSet");
		var v4 = sap.ui.getCore().byId("newToSet");
		var v5 = sap.ui.getCore().byId("newReccurenceSet");
		var v6 = sap.ui.getCore().byId("newIdSet");
		var v7 = sap.ui.getCore().byId("newDescriptionSet");
		v1.setValue(oData[0].name);
		v2.setValue(oData[0].day);
		v3.setValue(oData[0].from);
		v4.setValue(oData[0].to);
		v5.setValue(oData[0].reccurence);
		v6.setValue(oData[0].id);
		v7.setValue(oData[0].description);
		var dialog = sap.ui.getCore().byId("dialogSet");

		dialog.open();

	},
	saveChangeEvt : function(oEvt) {
		var dialog = sap.ui.getCore().byId("dialogSet");
		var model = sap.ui.getCore().getModel("table");
		var oData = model.getData();
		var model2 = sap.ui.getCore().getModel("model2");
		var oDataE = model2.getData();
		var oModel3 = sap.ui.getCore().getModel("model");
		var oData3 = oModel3.getData();

		var v1 = sap.ui.getCore().byId("newNameSet").getValue();
		var v2 = sap.ui.getCore().byId("newDaySet").getValue();
		var v3 = sap.ui.getCore().byId("newFromSet").getValue();
		var v4 = sap.ui.getCore().byId("newToSet").getValue();
		var v5 = sap.ui.getCore().byId("newReccurenceSet").getValue();
		var v6 = sap.ui.getCore().byId("newIdSet").getValue();
		var v7 = sap.ui.getCore().byId("newDescriptionSet").getValue();

		v2 = v2.split(".").reverse().join("/");
		var oInput1 = sap.ui.getCore().byId("idName").getValue();
		var oInput2 = sap.ui.getCore().byId("idPass").getValue();
		var oInput3 = sap.ui.getCore().byId("idEmail").getValue();
		var sInputPass = sap.ui.getCore().byId("idName").getValue();

		var oModel4 = sap.ui.getCore().getModel("date");
		var oData4 = oModel4.getData();

		var oCalendar = sap.ui.getCore().byId("calendar");
		console.log(sInputPass);
		dialog.close();
		for (var i = 0; i < oData3.users['length']; i++) {
			if (oData3.users[i].name == sInputPass) {
				var sId = oData3.users[i].id;
			}
		}
		;
		for (var i = 0; i < oDataE.events['length']; i++) {
			if (oDataE.events[i].name == oData[0].name
					&& oDataE.events[i].day == oData[0].day
					&& oDataE.events[i].from == oData[0].from
					&& oDataE.events[i].to == oData[0].to) {
				oData4.pop(i);
				oData.pop(0);
				model.setData();
				model.refresh(true);
				oDataE.events.pop(oDataE.events[i]);

				oDataE.events.push({
					name : v1,
					from : v3,
					to : v4,
					reccurence : v5,
					day : v2,
					id : v6,
					description : v7
				}),

				model2.setData(oDataE);

				oData4.push(oDataE.events[i].day);

				model2.refresh(true);
				oModel3.refresh(true);
				this.calendarDate();

			}
		}
		;

		var oDataToUpdate = {
			name : oInput1,
			password : oInput2,
			email : oInput3,
			events : JSON.stringify(oDataE.events)

		};

		var sUrl = "http://localhost:5000/users/" + sId;
		jQuery.ajax({
			type : "PUT",
			url : sUrl,
			data : $.param(oDataToUpdate),

			contentType : 'application/x-www-form-urlencoded',
			success : function() {
				console.log("POST SUCCESS");

				dialog.close();
				this.calendarDate();
				// read inca o data cu userul
			}.bind(this),
			error : function(oError) {
				console.log("ERROR POST");
			}
		});

	},

	logout : function() {
		var oModel = sap.ui.getCore().getModel("model2");
		var oModel2 = sap.ui.getCore().getModel("table");
		var oCalendar = sap.ui.getCore().byId("calendar");
		oModel.setData("");
		oModel2.setData("");

		var oInput1 = sap.ui.getCore().byId("idName");
		var oInput2 = sap.ui.getCore().byId("idPass");
		oInput1.setValue("");
		oInput2.setValue("");
		var oInput3 = sap.ui.getCore().byId("idName1");
		var oInput4 = sap.ui.getCore().byId("idPass1");
		var oInput5 = sap.ui.getCore().byId("idEmail");
		var oInput6 = sap.ui.getCore().byId("idPass11");
		oInput3.setValue("");
		oInput4.setValue("");
		oInput5.setValue("");
		oInput6.setValue("");
		oCalendar.removeAllSpecialDates();

		app.to("idtimebee1");
	},
	appContent : function(oEvt) {
		var oInput1 = sap.ui.getCore().byId("idName1");
		var oInput2 = sap.ui.getCore().byId("idPass1");
		var oInput3 = sap.ui.getCore().byId("idEmail");
		var oInput4 = sap.ui.getCore().byId("idPass11");
		oInput1.setValue("");
		oInput2.setValue("");
		oInput3.setValue("");
		oInput4.setValue("");
		var oInput5 = sap.ui.getCore().byId("idName");
		var oInput6 = sap.ui.getCore().byId("idPass");
		oInput5.setValue("");
		oInput6.setValue("");
		app.back();
	},

	handleOpen : function(oEvt) {
		var v1 = sap.ui.getCore().byId("nameFormEvt");
		var v2 = sap.ui.getCore().byId("fromFormEvt");
		var v3 = sap.ui.getCore().byId("toFormEvt");
		var v4 = sap.ui.getCore().byId("reccureFormEvt");
		var v5 = sap.ui.getCore().byId("dayFormEvt");
		var v6 = sap.ui.getCore().byId("idFormEvt");
		var v7 = sap.ui.getCore().byId("descriptFormEvt");
		v1.setValue("");
		v2.setValue("");
		v3.setValue("");
		v4.setValue("");
		v5.setValue("");
		v6.setValue("");
		v7.setValue("");
		var oModel = sap.ui.getCore().getModel("model2");
		var oData = oModel.getData();
		var dialog = sap.ui.getCore().byId("dialog");

		dialog.open();

	},
	onPressCreateDataFormTest : function() {
		var a = sap.ui.getCore().byId("nameFormEvt").getValue();
		var b = sap.ui.getCore().byId("fromFormEvt").getValue();
		var c = sap.ui.getCore().byId("toFormEvt").getValue();
		var d = sap.ui.getCore().byId("reccureFormEvt").getValue();
		var e = sap.ui.getCore().byId("dayFormEvt").getValue();
		var f = sap.ui.getCore().byId("idFormEvt").getValue();
		var g = sap.ui.getCore().byId("descriptFormEvt").getValue();

		var oModel = sap.ui.getCore().getModel("model");
		var oData = oModel.getData();

		var oInput1 = sap.ui.getCore().byId("idName").getValue();
		var oInput2 = sap.ui.getCore().byId("idPass").getValue();
		var oInput3 = sap.ui.getCore().byId("idEmail").getValue();

		var j;
		var sInputPass = sap.ui.getCore().byId("idName").getValue();
		console.log(sInputPass);
		for (var i = 0; i < oData.users['length']; i++) {
			if (oData.users[i].name == sInputPass) {
				var sId = oData.users[i].id;
				j = oData.users[i].events['length'] + 1;
			}
		}
		var model2 = sap.ui.getCore().getModel("model2");
		var oDataE = model2.getData();

		var oDataToUpdate = {
			name : oInput1,
			password : oInput2,
			email : oInput3,
			events : JSON.stringify(oDataE.events)

		};

		console.log(sId);

		var sUrl = "http://localhost:5000/users/" + sId;
		jQuery.ajax({
			type : "PUT",
			url : sUrl,
			data : $.param(oDataToUpdate),

			contentType : 'application/x-www-form-urlencoded',
			success : function() {
				console.log("POST SUCCESS");

				// read inca o data cu userul
			}.bind(this),
			error : function(oError) {
				console.log("ERROR POST");
			}
		});
	},

	deleteAppContent : function() {
		var dialog = sap.ui.getCore().byId("dialogSet");
		var dialogDelete = sap.ui.getCore().byId("dialogDelete");
		var model = sap.ui.getCore().getModel("table");
		var oData = model.getData();
		var model2 = sap.ui.getCore().getModel("model2");
		var oDataE = model2.getData();
		var oModel3 = sap.ui.getCore().getModel("model");
		var oData3 = oModel3.getData();
		dialogDelete.open();
		var v1 = sap.ui.getCore().byId("newNameSet").getValue();
		var v2 = sap.ui.getCore().byId("newDaySet").getValue();
		var v3 = sap.ui.getCore().byId("newFromSet").getValue();
		var v4 = sap.ui.getCore().byId("newToSet").getValue();
		var v5 = sap.ui.getCore().byId("newReccurenceSet").getValue();
		var v6 = sap.ui.getCore().byId("newIdSet").getValue();
		var v7 = sap.ui.getCore().byId("newDescriptionSet").getValue();

		var oInput1 = sap.ui.getCore().byId("idName").getValue();
		var oInput2 = sap.ui.getCore().byId("idPass").getValue();
		var oInput3 = sap.ui.getCore().byId("idEmail").getValue();
		var sInputPass = sap.ui.getCore().byId("idName").getValue();

		var oModel4 = sap.ui.getCore().getModel("date");
		var oData4 = oModel4.getData();

		var oCalendar = sap.ui.getCore().byId("calendar");

		console.log(sInputPass);
		var oCal1 = this.byId("calendar");
		for (var i = 0; i < oData3.users['length']; i++) {
			if (oData3.users[i].name == sInputPass) {
				var sId = oData3.users[i].id;
			}
		}

		for (var i = 0; i < oDataE.events['length']; i++) {
			if (oDataE.events[i].name == oData[0].name
					&& oDataE.events[i].day == oData[0].day
					&& oDataE.events[i].from == oData[0].from
					&& oDataE.events[i].to == oData[0].to) {
				var oSpecialDate = new sap.ui.unified.DateTypeRange({
					startDate : new Date(oData4[i]),

				});
				oCalendar.removeSpecialDate(oSpecialDate);

				oDataE.events.pop(oDataE.events[i]);
				oData4.pop(i);
				oData.pop(0);

				model.setData();
				model.refresh(true);

				model2.setData(oDataE);

				model2.refresh(true);
				oModel3.refresh(true);

			}
		}

		var oDataToUpdate = {
			name : oInput1,
			password : oInput2,
			email : oInput3,
			events : JSON.stringify(oDataE.events)

		};

		var sUrl = "http://localhost:5000/users/" + sId;
		jQuery.ajax({
			type : "PUT",
			url : sUrl,
			data : $.param(oDataToUpdate),

			contentType : 'application/x-www-form-urlencoded',
			success : function() {
				console.log("DELETE SUCCESS");
				this.calendarDate();

				dialog.close();

				// read inca o data cu userul
			}.bind(this),
			error : function(oError) {
				console.log("ERROR POST");
			}
		});
	},

	saveForm : function(oEvt) {
		var dialog = sap.ui.getCore().byId("dialog");
		var oModel = sap.ui.getCore().getModel("model2");
		var oData = oModel.getData();
		var oModel3 = sap.ui.getCore().getModel("date");
		var oData3 = oModel3.getData();
		var a = sap.ui.getCore().byId("nameFormEvt").getValue();
		var b = sap.ui.getCore().byId("fromFormEvt").getValue();
		var c = sap.ui.getCore().byId("toFormEvt").getValue();
		var d = sap.ui.getCore().byId("reccureFormEvt").getValue();
		var e = sap.ui.getCore().byId("dayFormEvt").getValue();
		var f = sap.ui.getCore().byId("idFormEvt").getValue();
		var g = sap.ui.getCore().byId("descriptFormEvt").getValue();
		e = e.split(".").reverse().join("/");
		var oCalendar = sap.ui.getCore().byId("calendar");

		if (a != '' && b != '' && e != '') {
			oData.events.push({
				name : a,
				from : b,
				to : c,
				reccurence : d,
				day : e,
				id : f,
				description : g
			});

			oModel.setData(oData);
			var nr = oData.events['length'] - 1;
			oData3.push(oData.events[nr].day);
			var dataSearch = String(oData3[nr]);
			dataSearch = dataSearch.split('/');
			monthSearch = Number(dataSearch[1]);
			daySearch = Number(dataSearch[2]);
			var currentData = new Date();
			var currentMonth = Number(currentData.getMonth()) + 1;
			var currentDay = Number(currentData.getDate());
			if (monthSearch < currentMonth) {
				var oSpecialDate = new sap.ui.unified.DateTypeRange({

					startDate : new Date(oData3[nr]),
					title : oData.events[nr].name,
					type : sap.ui.unified.CalendarDayType.Type02

				});
			} else if (monthSearch > currentMonth) {
				var oSpecialDate = new sap.ui.unified.DateTypeRange({

					startDate : new Date(oData3[nr]),
					title : oData.events[nr].name,
					type : sap.ui.unified.CalendarDayType.Type01

				});
			} else if (monthSearch == currentMonth) {
				console.log(daySearch);
				if (daySearch < currentDay) {
					var oSpecialDate = new sap.ui.unified.DateTypeRange({

						startDate : new Date(oData3[nr]),
						title : oData.events[nr].name,
						type : sap.ui.unified.CalendarDayType.Type02

					});
				} else if (daySearch > currentDay) {

					var oSpecialDate = new sap.ui.unified.DateTypeRange({

						startDate : new Date(oData3[nr]),
						title : oData.events[nr].name,
						type : sap.ui.unified.CalendarDayType.Type01

					});
				} else {

					var oSpecialDate = new sap.ui.unified.DateTypeRange({

						startDate : new Date(oData3[nr]),
						title : oData.events[nr].name,
						type : sap.ui.unified.CalendarDayType.Type03

					});

				}

			}
			oCalendar.addSpecialDate(oSpecialDate);

			this.onPressCreateDataFormTest();

			dialog.close();
		} else {
			var dialog = new sap.m.Dialog({

				title : "Warning",
				state : sap.ui.core.ValueState.Warning,
				content : [ new sap.m.Label({
					text : "You need to complete all the spaces"
				}), new sap.m.Button({
					type : sap.m.ButtonType.Emphasized,
					text : "Try again",
					press : function() {
						dialog.close();
					}
				}).addStyleClass("btnError") ]
			});
			dialog.open();
		}

	},
	contSettings : function(oEvt) {
		var oModel = sap.ui.getCore().getModel("user");
		var oData = oModel.getData();
		console.log(oData);
		var dialog = sap.ui.getCore().byId("contDialog");
		dialog.open();
	},

	calendarDate : function(oEvt) {
		var oModel2 = sap.ui.getCore().getModel("model2");
		var oData2 = oModel2.getData();
		console.log(oData2);
		var oModel3 = sap.ui.getCore().getModel("date");
		var oData3 = oModel3.getData();
		var oCalendar = sap.ui.getCore().byId("calendar");
		for (var i = 0; i < oData2.events['length']; i++) {

			console.log(oData3[i]);
			var dataSearch = String(oData3[i]);
			dataSearch = dataSearch.split('/');
			monthSearch = Number(dataSearch[1]);
			daySearch = Number(dataSearch[2]);
			var currentData = new Date();
			var currentMonth = Number(currentData.getMonth()) + 1;
			var currentDay = Number(currentData.getDate());
			if (monthSearch < currentMonth) {
				var oSpecialDate = new sap.ui.unified.DateTypeRange({

					startDate : new Date(oData3[i]),
					title : oData2.events[i].name,
					type : sap.ui.unified.CalendarDayType.Type02

				});
			} else if (monthSearch > currentMonth) {
				var oSpecialDate = new sap.ui.unified.DateTypeRange({

					startDate : new Date(oData3[i]),
					title : oData2.events[i].name,
					type : sap.ui.unified.CalendarDayType.Type01

				});
			} else if (monthSearch == currentMonth) {
				console.log(daySearch);
				if (daySearch < currentDay) {
					var oSpecialDate = new sap.ui.unified.DateTypeRange({

						startDate : new Date(oData3[i]),
						title : oData2.events[i].name,
						type : sap.ui.unified.CalendarDayType.Type02

					});
				} else if (daySearch > currentDay) {

					var oSpecialDate = new sap.ui.unified.DateTypeRange({

						startDate : new Date(oData3[i]),
						title : oData2.events[i].name,
						type : sap.ui.unified.CalendarDayType.Type01

					});
				} else {

					var oSpecialDate = new sap.ui.unified.DateTypeRange({

						startDate : new Date(oData3[i]),
						title : oData2.events[i].name,
						type : sap.ui.unified.CalendarDayType.Type03

					});

				}

			}
			oCalendar.addSpecialDate(oSpecialDate);

		}
	},

/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf timebee.calendar
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf timebee.calendar
 */
// onExit: function() {
//
// }
});
