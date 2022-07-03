sap.ui.jsview("timebee.accountcreate", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf timebee.accountcreate
	*/ 
	getControllerName : function() {
		return "timebee.accountcreate";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf timebee.accountcreate
	*/ 
	createContent : function(oController) {
	     var form=new sap.ui.layout.form.SimpleForm("form",{
	    	 content:[
	    	      	  new sap.m.Label({
	   	 			   text:"Name",
	   	 			    required : true,
	   	 			  
	   	 		   }).addStyleClass("elementC1"),
	   	    new sap.m.Input("idName1").addStyleClass("elementC2"),
	   	    new sap.m.Label({
	   	 			   text:"Email",
	   	 			  required : true
	   	 		   }).addStyleClass("elementC1"),
	     	new sap.m.Input("idEmail").addStyleClass("elementC2"),
	   	 	new sap.m.Label({
	   	 			   text:"Password",
	   	 			  required:true
	   	 		   }).addStyleClass("elementC1"),
	   	    new sap.m.Input("idPass11",{
	   	 				type:"Password"
	   	 				
	   	 			}).addStyleClass("elementC2"),
	   	 		new sap.m.Label({
	   	 			   text:"Password",
	   	 			  required:true
	   	 		   }).addStyleClass("elementC1"),
	   	 		   new sap.m.Input("idPass1",{
	   	 				type:"Password"
	   	 				
	   	 			}).addStyleClass("elementC2"),
	   	 		
	    	          ]
	  
	      })
	     var oBtn =	new sap.m.Button({
		    	text:"Create",
   		    	press:[oController.createCont,oController]
			}).addStyleClass("styleBtnCreate");
		       
 		var oPage= new sap.m.Page({
			title: "Create account",
			showNavButton:true,
			navButtonPress:function(){
				app.back();
			},
			content: [
			form,
			oBtn
			
	 		
			]
		});
 		return oPage;
	

}});