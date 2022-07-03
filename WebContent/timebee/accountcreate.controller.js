sap.ui.controller("timebee.accountcreate", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf timebee.accountcreate
*/
	onInit: function() {
		
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf timebee.accountcreate
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf timebee.accountcreate
*/
//	onAfterRendering: function() {
//
//	},
	onPressCreateDataAccount: function () {
		var oEvents = [];
		var sUrl = "http://localhost:5000/users";
		var oDataToCreate = {
			email: sap.ui.getCore().byId("idEmail").getValue(),
			events: JSON.stringify(oEvents),
		
			name: sap.ui.getCore().byId("idName1").getValue(),
			password: sap.ui.getCore().byId("idPass1").getValue()
		};
		
		jQuery.ajax({
			type: "POST",
			url: sUrl,
			data: $.param(oDataToCreate),
  			contentType: 'application/x-www-form-urlencoded',
			success: function() {
				console.log("POST SUCCESS");
			}.bind(this),
			error: function (oError) {
				console.log("ERROR POST");
			}
		});
	},
createCont:function(oEvt){

		
		var oModel =sap.ui.getCore().getModel("model");
		var oData= oModel.getData();
		var oInput=sap.ui.getCore().byId("idName1").getValue();
		var oEmail=sap.ui.getCore().byId("idEmail").getValue();
		var oPass=sap.ui.getCore().byId("idPass1").getValue();
		var oPass2=sap.ui.getCore().byId("idPass11").getValue();
		var oLabel=sap.ui.getCore().byId("idLabel");
        oLabel.setText(oInput);
		
		var ok=1;
       console.log(oInput);
       for(var i=0;i<oData.users['length'];i++){
      	 if(oData.users[i].name==oInput ){
var dialog = new sap.m.Dialog({
        		
				title: "Error",
				state: sap.ui.core.ValueState.Error,
				content: [
				 new sap.m.Label({
					 text: "You have a account yet." }),
			
				
                 new sap.m.Button({
                     type:sap.m.ButtonType.Emphasized,
                     text: "OK",
           	press: function () {
		     dialog.close();}}).addStyleClass("btnError2")]
        });
        	dialog.open();
      		ok--;
         }
      	 
      }
       if(ok==1){
    	   if( oInput!="" && oPass!="" && oEmail!=""){
    		   if( oPass==oPass2){
    			   var id=oData.users['length']+1;
    			   this.onPressCreateDataAccount();
    			   var modelUser=sap.ui.getCore().getModel("user");
    			 
    			  var userData={
					    	 name:oInput,
					    	 email:oEmail,
					    	 password:oPass,
					     };
    			  
     			   
     			     
     			     modelUser.setData(userData);
     			     
    			   
            	   app.to("idtimebee3");
    		   }else{
    			 	var dialog = new sap.m.Dialog({
    	        		
    					title: "Warning",
    					state: sap.ui.core.ValueState.Warning,
    					content:[
    					         new sap.m.Label({ text: "Password don't match..." }),
    	                 new sap.m.Button({
    	            type: sap.m.ButtonType.Emphasized,
    				text: "OK",
    	           	press: function () {
    			     dialog.close();}}).addStyleClass("btnError")]
    	        });
    	        	dialog.open();
    		   }
    		   
               
    		 }else{
    			 var dialog = new sap.m.Dialog({
    	        		
    					title: "Error",
    					state: sap.ui.core.ValueState.Error,
    					content: [
    					 new sap.m.Label({
    						 text: "you need to complete the data." }),
    				
    					
    	                 new sap.m.Button({
    	                     type:sap.m.ButtonType.Emphasized,
    	                     text: "OK",
    	           	press: function () {
    			     dialog.close();}}).addStyleClass("btnError2")]
    	        });
    	        	dialog.open();
   	    	 
       }
       }
      
		
	},
	
/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf timebee.accountcreate
*/
//	onExit: function() {
//
//	}

});