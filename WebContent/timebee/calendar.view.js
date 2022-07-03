sap.ui.jsview("timebee.calendar", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf timebee.calendar
	*/ 
	getControllerName : function() {
		return "timebee.calendar";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf timebee.calendar
	*/ 
	createContent : function(oController) {
		var oModel =sap.ui.getCore().getModel("model2");
		var oData= oModel.getData();
		var oModel3 =sap.ui.getCore().getModel("date");
		var date=oModel3.getData();
		var oModelUser =sap.ui.getCore().getModel("user");
   	    var oDataUser=oModelUser.getData();
		
		var oLabel=new sap.m.Label("idLabel").addStyleClass("styleFont");
	  
		var oCalendar=new  sap.ui.unified.Calendar({
			id:"calendar",
            intervalSelection:true,
		    legend:"legend"
		  
		      	});
		var legend=new sap.ui.unified.CalendarLegend({
			id:"legend"
		});

        legend.addItem(new sap.ui.unified.CalendarLegendItem({
			text : "Events " ,	}));
        legend.addItem(new sap.ui.unified.CalendarLegendItem({
			text : "Day birth " ,	}));
        legend.addItem(new sap.ui.unified.CalendarLegendItem({
			text : "Exams " ,	}));
        legend.addItem(new sap.ui.unified.CalendarLegendItem({
			text : "Call " ,	}));
        legend.addItem(new sap.ui.unified.CalendarLegendItem({
			text : "Metting " ,	}));
       
		var oList=new sap.m.List("list",{
			headerText:"Appointments",
			items:[
                 
			     ]
		});
		oList.bindItems({
			path:"/events",
			template:new sap.m.StandardListItem("itemName",{
				title:"{name}",
				type: sap.m.ListType.Navigation,
				press:[oController.message,oController]
			
				
			        }),
		      
					
				
			});
		 var oCol1 = new sap.m.Column({
	            header: new sap.m.Label({
	                text: "Name"
	            })
	        });
		 var oCol2 = new sap.m.Column({
	            header: new sap.m.Label({
	                text: "Day"
	            }),
	        });
	        var oCol3 = new sap.m.Column({
	            header: new sap.m.Label({
	                text: "From"
	            }),
	        });
	        
	        var oCol4 = new sap.m.Column({
	            header: new sap.m.Label({
	                text: "To"
	            }),  });
	            var oCol5 = new sap.m.Column({
		            header: new sap.m.Label({
		                text: "reccurence"
		            }),
		        });
		        var oCol6 = new sap.m.Column({
		            header: new sap.m.Label({
		                text: "description"
		            }),
		        });
		        var oCol7 = new sap.m.Column({
		            header: new sap.m.Label({
		                text: "id"
		            })
		        });
		        var oCol8 = new sap.m.Column({
		            header: new sap.m.Label({
		                text: "setting"
		            })
			           
			            
	            
	        });

	        var oTableItems = new sap.m.ColumnListItem("tabel",{
	            cells: [
	                new sap.m.Text("nameTabel",{
	                    text: "{table>name}"
	                }), new sap.m.Text("dayTabel",{
	                    text: "{table>day}"
	                }), new sap.m.Text("fromTabel",{
	                    text: "{table>from}"
	                }),
	                new sap.m.Text({
	                    text: "{table>to}"
	                }), new sap.m.Text({
	                    text: "{table>reccurence}"
	                }), new sap.m.Text({
	                    text: "{table>description}"
	                }),
	                new sap.m.Text({
	                    text: "{table>id}"
	                }),
	               new sap.m.VBox({
	        			items:[
	                new sap.m.Button({
	                    text: "change",
	                    press:[oController.changeAppContent,oController]
	                   
	                }),
	                new sap.m.Button({
	                    text: "delete",
	                    press:[oController.deleteAppContent,oController]
	                   
	                }).addStyleClass(".btnDelete")]})
	            ]
	        });

	        var oTable = new sap.m.Table("tableD",{
	            columns: [
	                oCol1,
	                oCol2,
	                oCol3,
	                oCol4,
	                oCol5,
	                oCol6,
	                oCol7,
	                oCol8
	            	
	            ]
	          
	        });


	       
	        oTable.bindItems({
	            path: "table>/",
	            template: oTableItems,
	        
	        });
		var buttonBox=new sap.m.HBox({
			items:[new sap.m.Button({
				text:"Create",
			 ariaHasPopup:"Dialog",
				press:[oController.handleOpen,oController]
			}),
//			new sap.m.Button({
//				text:"Profil",
//			 ariaHasPopup:"Dialog",
//			 press:[oController.contSettings,oController]
//			}),
			new sap.m.Button({
				text:"Logout",
				id:"Logout", 
			    press:[oController.logout,oController],
			    tooltip:"logout"
			})
			]
		}).addStyleClass("moveBtn");
	
		oModel.setData(oData);
		oList.setModel(oModel);
	
			var spliter=new sap.ui.layout.Splitter({
				 contentAreas:[
			      oList,
			      oTable
			      
			       ]
			      
			
			});
			
			var dialog = new sap.m.Dialog("dialog",{
				title: 'add events',
				content:[
			    	      	   new sap.m.Label({
			   	 			   text:"Name",
			   	 			   required : true
			   	 			  
			   	 		   }),
			   	               new sap.m.Input("nameFormEvt"),
			   	               new sap.m.Label({
			   	            	text:"Day",
			   	            	required:true
			   	               }),
			   	               new sap.m.DatePicker("dayFormEvt"),
			   	            new sap.m.Label({
			   	            	text:"From",
			   	            	required:true
			   	               }),
			   	            new sap.m.TimePicker("fromFormEvt").addStyleClass("timeForm"),
			   	            new sap.m.Label({
			   	            	text:"To",
			   	            	required:true
			   	               }),
			   	            new sap.m.TimePicker("toFormEvt").addStyleClass("timeForm"),
			   	            new sap.m.Label({
			   	 			   text:"Reccurence",
			   	 			   required : true
			   	 			  
			   	 		   }),
			   	           new sap.m.Input("reccureFormEvt"),
			   	           new sap.m.Label({
			   	 			   text:"Id",
			   	 			   required : true
			   	 			  
			   	 		   }),
			   	            new sap.m.Input("idFormEvt"),
			   	            new sap.m.Label({
			   	 			   text:"Description",
			   	 			  
			   	 			  
			   	 		   }),
			   	            new sap.m.Input("descriptFormEvt"),
			   	         new sap.m.Button({
			   	      	text: 'Save',
			   	      	
			   	      	press: [oController.saveForm,oController]}),
			   	     new sap.m.Button({
				   	      	text: 'Close',
				   	      	
				   	      	press: function(){
				   	      		dialog.close();
				   	      	}}).addStyleClass("closeDialog")
				   	         
			   	         ],
			   	            });
			var dialog2=new sap.m.Dialog("dialogSet",{
				title: 'setting events',
				content:[
			    	      	   new sap.m.Label({
			   	 			   text:"Name",
			   	 			   required : true
			   	 			  
			   	 		   }),
			   	               new sap.m.Input("newNameSet",{
			   	            	 }),
			   	               
			   	               new sap.m.Label({
			   	            	text:"Day",
			   	            	required:true
			   	               }),
			   	               new sap.m.DatePicker("newDaySet",{
			   	            	
			   	               }),
			   	            new sap.m.Label({
			   	            	text:"From",
			   	            	required:true
			   	               }),
			   	            new sap.m.TimePicker("newFromSet",{
			   	         	}),
			   	            
			   	            new sap.m.Label({
			   	            	text:"To",
			   	            	required:true
			   	               }),
			   	            new sap.m.TimePicker("newToSet",{
			   	            	
			   	            }).addStyleClass("timeForm"),
			   	            new sap.m.Label({
			   	 			   text:"Reccurence",
			   	 			   required : true
			   	 			  
			   	 		   }),
			   	           new sap.m.Input("newReccurenceSet",{
			   	        	  
			   	           }),
			   	           new sap.m.Label({
			   	 			   text:"Id",
			   	 			   required : true
			   	 			  
			   	 		   }),
			   	            new sap.m.Input("newIdSet",{
			   	            	
			   	            }),
			   	            new sap.m.Label({
			   	 			   text:"Description",
			   	 			  
			   	 			  
			   	 		   }),
			   	            new sap.m.Input("newDescriptionSet",{
			   	            	
			   	            }),
			   	         new sap.m.Button({
			   	      	text: 'Save',
			   	      	press:[oController.saveChangeEvt,oController]
			   	      	}),
			   	     new sap.m.Button({
				   	      	text: 'Close',
				   	      	press:function(){
				   	      		dialog2.close();
				   	      	}
				   	      	})
			   	      	]});
			var dialog3=new sap.m.Dialog("dialogDelete",{
				title: 'Successfull',
				content:[
			    	      	
			   	     new sap.m.Button({
				   	      	text: 'Close',
				   	      	press:function(){
				   	      		dialog3.close();
				   	      	}
				   	      	})
			   	      	]}).addStyleClass("deleteEvent");
	
			
//			var dialog4 = new sap.m.Dialog("contDialog",{
//				title: 'Information cont',
//				content:[
//			    
//			   	     new sap.m.Button({
//				   	      	text: 'Close',
//				   	      	
//				   	      	press: function(){
//				   	      		dialog4.close();
//				   	      	}}).addStyleClass("closeDialog")
//				   	         
//			   	         ],
//			   	            });
 		var oPage= new sap.m.Page({
			title: "View your time",
			showNavButton:true,
			navButtonPress:[oController.appContent,oController],
			content: [
			new sap.m.Label({
				text:" Welcome, "
			}).addStyleClass("styleWelcome"),
			oLabel,
			buttonBox,
			oCalendar,
			legend,
			spliter
			
			]
		});
 		return oPage;
	}

});