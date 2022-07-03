sap.ui.jsview("timebee.timebee", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf timebee.timebee
	*/ 
	getControllerName : function() {
		return "timebee.timebee";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf timebee.timebee
	*/ 
	createContent : function(oController) {
	

		var oLogin=new sap.m.Label({
			text:"Chose your time"
		}).addStyleClass("sapMLabel2");
		boxLog=new sap.m.VBox({
			items:[
			     	  
					new sap.m.Input("idName",{

                       value:"",
						placeholder:"name"
					
					}).addStyleClass("dataLog"),
					new sap.m.Input("idPass",{
						value:"",
						placeholder:"password",
							type:"Password"
							
					}).addStyleClass("dataLog"),
					
			         new sap.m.Button({
							    	text:"Login",
							    	press:[oController.validateContCalendar,oController]
							    }).addStyleClass("styleBtn2"),
				      new sap.m.Button({
							    	text:"Create new account",
							    	press:[oController.goToCreate,oController]
							    }).addStyleClass("styleBtn")
						     
				  
			       ]
		}).addStyleClass("posLogin");
		boxImg=new sap.m.VBox({
			items:[
			       
			       new sap.m.Image({
			    	   src:'timebee/image/img2.jpg'
			       }).addStyleClass("imgStyle")]
		}).addStyleClass("boxImg");
		boxH=new sap.m.HBox({
			items:[
			       boxLog,
			       boxImg
			    
			      
			     
			       ]
		}).addStyleClass("styleBackground");
	
       
	   
 		var oPage= new sap.m.Page({
			title: "Time Bee",
			content: [
			          
			          oLogin,
			          boxH
			
			]
		});
 		return oPage;
	}

});