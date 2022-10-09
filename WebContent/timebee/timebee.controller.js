sap.ui
		.controller(
				"timebee.timebee",
				{

					/**
					 * Called when a controller is instantiated and its View
					 * controls (if available) are already created. Can be used
					 * to modify the View before it is displayed, to bind event
					 * handlers and do other one-time initialization.
					 * 
					 * @memberOf timebee.timebee
					 */

					onInit : function() {

						var oModel = new sap.ui.model.json.JSONModel();
						sap.ui.getCore().setModel(oModel, "model");
						this.loadingData();
						var oModel2 = new sap.ui.model.json.JSONModel();
						var appData = {
							"events" : []
						};
						oModel2.setData(appData);
						var oModel3 = new sap.ui.model.json.JSONModel();
						var modelUser = new sap.ui.model.json.JSONModel();
						sap.ui.getCore().setModel(oModel2, "model2");
						sap.ui.getCore().setModel(oModel3, "date");
						sap.ui.getCore().setModel(modelUser, "user");
					},

					loadingData : function() {
						var oModel = sap.ui.getCore().getModel("model");
						var i;
						var sUrl = "http://localhost:5000/users";
						var oModel = sap.ui.getCore().getModel("model");

						jQuery
								.ajax({
									type : "GET",
									contentType : "application/json",
									url : sUrl,
									dataType : "json",
									async : false,
									success : function(aResults) {
										// Success

										for (i = 0; i < aResults.length; i++) {
											if (typeof (aResults[i].events) === "string") {
												aResults[i].events = JSON
														.parse(aResults[i].events);
											}
										}
										var oModelData = {
											users : aResults
										}
										oModel.setData(oModelData);
										console.log(aResults);
									},
									error : function() {
										// Error
										// Afisare eroare
										console.log("Error");
									}
								})

					},

					/**
					 * Similar to onAfterRendering, but this hook is invoked
					 * before the controller's View is re-rendered (NOT before
					 * the first rendering! onInit() is used for that one!).
					 * 
					 * @memberOf timebee.timebee
					 */
					// onBeforeRendering: function() {
					//
					// },
					validateContCalendar : function(oEvt) {
						var oModel = sap.ui.getCore().getModel("model");
						var oData = oModel.getData();
						var oModel2 = sap.ui.getCore().getModel("model2");
						var oData2 = oModel2.getData();
						var oModel3 = sap.ui.getCore().getModel("date");
						var oData3 = [];
						var modelUser = sap.ui.getCore().getModel("user");

						var errorId = 1;
						var errorPass = 1;
						oModel.refresh(true);
						var oInput = sap.ui.getCore().byId("idName").getValue();
						var oPass = sap.ui.getCore().byId("idPass").getValue();
						var oLabel = sap.ui.getCore().byId("idLabel");
						oLabel.setText(oInput);
						for (var i = 0; i < oData.users['length']; i++) {
							if (oData.users[i].name == oInput) {
								errorId--;
								if (oData.users[i].password == oPass) {
									var userData = {
										name : oData.users[i].name,
										email : oData.users[i].email,
										password : oData.users[i].password,
									};

									modelUser.setData(userData);
									console.log(modelUser);
									for (var j = 0; j < oData.users[i].events['length']; j++) {
										if (oData.users[i].events[j]) {

											oData2.events
													.push({
														name : oData.users[i].events[j].name,
														from : oData.users[i].events[j].from,
														to : oData.users[i].events[j].to,
														reccurence : oData.users[i].events[j].reccurence,
														day : oData.users[i].events[j].day
																.split(".")
																.reverse()
																.join("/"),
														id : oData.users[i].events[j].id,
														description : oData.users[i].events[j].description
													});
											oData3
													.push(oData.users[i].events[j].day);
										}

									}
									oModel2.setData(oData2);
									oModel3.setData(oData3);
									oModel2.refresh(true);
									oModel3.refresh(true);
									console.log(oData3);
									errorPass--;
									this.calendarDate();
									app.to("idtimebee3");

								}
							}

						}

						if (errorPass == 1 && errorId == 1) {
							var dialog = new sap.m.Dialog(
									{

										title : "Warning",
										state : sap.ui.core.ValueState.Warning,
										content : [
												new sap.m.Label(
														{
															text : "Ruling the world is a time-consuming task. You don't have an account here"
														}),
												new sap.m.Button(
														{
															type : sap.m.ButtonType.Emphasized,
															text : "OK",
															press : function() {
																dialog.close();
															}
														})
														.addStyleClass("btnError") ]
									});
							dialog.open();
						} else if (errorPass == 1) {
							var dialog = new sap.m.Dialog(
									{

										title : "Error",
										state : sap.ui.core.ValueState.Error,
										content : [
												new sap.m.Label(
														{
															text : "The only error you can make is to not fail your password."
														}),

												new sap.m.Button(
														{
															type : sap.m.ButtonType.Emphasized,
															text : "OK",
															press : function() {
																dialog.close();
															}
														})
														.addStyleClass("btnError2") ]
									});
							dialog.open();
						}

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
								var oSpecialDate = new sap.ui.unified.DateTypeRange(
										{

											startDate : new Date(oData3[i]),
											title : oData2.events[i].name,
											type : sap.ui.unified.CalendarDayType.Type02

										});
							} else if (monthSearch > currentMonth) {
								var oSpecialDate = new sap.ui.unified.DateTypeRange(
										{

											startDate : new Date(oData3[i]),
											title : oData2.events[i].name,
											type : sap.ui.unified.CalendarDayType.Type01

										});
							} else if (monthSearch == currentMonth) {
								console.log(daySearch);
								if (daySearch < currentDay) {
									var oSpecialDate = new sap.ui.unified.DateTypeRange(
											{

												startDate : new Date(oData3[i]),
												title : oData2.events[i].name,
												type : sap.ui.unified.CalendarDayType.Type02

											});
								} else if (daySearch > currentDay) {

									var oSpecialDate = new sap.ui.unified.DateTypeRange(
											{

												startDate : new Date(oData3[i]),
												title : oData2.events[i].name,
												type : sap.ui.unified.CalendarDayType.Type01

											});
								} else {

									var oSpecialDate = new sap.ui.unified.DateTypeRange(
											{

												startDate : new Date(oData3[i]),
												title : oData2.events[i].name,
												type : sap.ui.unified.CalendarDayType.Type03

											});

								}

							}
							oCalendar.addSpecialDate(oSpecialDate);

						}

					},

					goToCreate : function(oEvt) {
						app.to("idtimebee2");

					},

				/**
				 * Called when the View has been rendered (so its HTML is part
				 * of the document). Post-rendering manipulations of the HTML
				 * could be done here. This hook is the same one that SAPUI5
				 * controls get after being rendered.
				 * 
				 * @memberOf timebee.timebee
				 */
				// onAfterRendering: function() {
				//
				// },
				/**
				 * Called when the Controller is destroyed. Use this one to free
				 * resources and finalize activities.
				 * 
				 * @memberOf timebee.timebee
				 */
				// onExit: function() {
				//
				// }
				});
