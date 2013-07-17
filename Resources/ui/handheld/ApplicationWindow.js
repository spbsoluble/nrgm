var testSuperScope = "Can you see me now?";
var sendAssets;
var respondAssets;

var controllerCount = 4;
var controllers = [];
var controllers_data = [];
var sendAssets = [];
var respondAssets = [];
var buttonNames = [];

var client = Ti.Network.createHTTPClient({
		//function called when response data is available
		onload: function(e) {
			//Ti.API.info("Header: " + this.allResponseHeaders);
			//Ti.API.info("Recieved text: " + this.responseText);
			//alert('success');
			;
		},
		onerror : function(e) {
			//Ti.API.info(e.error);
		},
		timeout : 1000 /* in milliseconds */
});

function ApplicationWindow(input) {
	
	if(input != "Mapping"){
		var self = Ti.UI.createWindow({
			title:'Settings',
			backgroundColor:'white'
		});
		
		//Load saved controller Settings
		if(!loadControllerSettings()){
			loadDefaults();
		}
		var view_width = 300;
		var view_height = 225;
		var left_offset = 5;
		var top_offset = 5;
		var element_height = 50;
		var element_width  = 100; 
		var element_width_tf = 200;
		
		var scrollContainer = Ti.UI.createScrollView({
			//backgroundColor: '#F00',
			 contentWidth: 'auto',
			 contentHeight: 'auto',
			 showVerticalScrollIndicator: true,
			 showHorizontalScrollIndicator: true,
			 height: '100%',
			 width: '100%'
		});
		
		for(var i = 0; i < controllerCount; i++){
			var controller = Ti.UI.createView({
				width: view_width,
				height: view_height,
				left: left_offset,
				top: top_offset + (i * view_height + 10),
				//borderRadius: 10,
				//backgroundColor: '#AAA'
			});
			
			var controller_number = Ti.UI.createLabel({
				text: 'Controller '+ (i+1),
				height: element_height,
				width: element_width,
				top:top_offset,
				left: left_offset,
			});
			
			var controller_name = Ti.UI.createLabel({
				text:  'Controller Name: ',
				top: top_offset + controller_number.top + controller_number.height+5,
				left: left_offset,
				height: element_height,
				width: element_width,
				visible: true,
			});
			
			var controller_name_tf = Ti.UI.createTextField({
				name: 'nameField',
				height: element_height,
				top: top_offset + controller_number.top + controller_number.height + 5,
				width: element_width_tf,
				left: controller_name.width,
				keyboardType: Ti.UI.KEYBOARD_DEFAULT,
				returnKeyType: Ti.UI.RETURNKEY_DONE,
				borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
				value : controllers_data[i].name,
				hintText: 'Type in here..'
			});
			
			var controller_ip = Ti.UI.createLabel({
				text: 'IP Address:',
				top: top_offset+ controller_name.top + controller_name.height,
				left: left_offset,
				height: element_height,
				width: element_width,
			});
			
			var controller_ip_tf = Ti.UI.createTextField({
				name: 'ipField',
				height: element_height,
				top: top_offset + controller_name.top + controller_name_tf.height + 5,
				width: element_width_tf,
				left: controller_name.width,
				keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
				returnKeyType: Ti.UI.RETURNKEY_DONE,
				borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
				value: controllers_data[i].ipAddress,
				hintText: '192.168.0.10',
			});
			
			var controller_update_btn = Ti.UI.createButton({
				title:'Update',
				height: 25,
				width:'auto',
				right: 10,
				bottom:5,
				controller: i,
			});
			
			
			controller_update_btn.addEventListener('click', function() {
				//Ti.API.info(this.controller);
				for(var j = 0; j < controllers[this.controller].children.length; j++){
					if(controllers[this.controller].children[j].name == 'nameField'){
						controllers_data[this.controller].name = controllers[this.controller].children[j].value;
						controllers_data[this.controller].user = 'admin';
						controllers_data[this.controller].pass = "nrgmezel";
					} else if (controllers[this.controller].children[j].name == 'ipField'){
						controllers_data[this.controller].ipAddress = controllers[this.controller].children[j].value;
						controllers_data[this.controller].user = 'admin';
						controllers_data[this.controller].pass = "nrgmezel";
					}
				}
				saveControllerSettings();
				loadControllerSettings();
			});
			
			var controller_clear_btn = Ti.UI.createButton({
				title:'Clear',
				height: 25,
				width:'auto',
				right: controller_update_btn.width - 10,
				bottom:5,
				controller: i,
			});
			
			//add components to the controller container
			controller.add(controller_number);
			controller.add(controller_name);
			controller.add(controller_name_tf);
			controller.add(controller_ip);
			controller.add(controller_ip_tf);
			controller.add(controller_update_btn);
			controller.add(controller_clear_btn);
			
			controllers.push(controller);
			
			scrollContainer.add(controllers[i]);
		}
		self.add(scrollContainer);
	} else {
		var self = Ti.UI.createWindow({
			title:'Manual Mapping',
			backgroundColor:'white'
		});
	
		var self = Ti.UI.createWindow({
			title:'Manual Mapping',
			backgroundColor:'white'
		});
		
		var scrollContainer = Ti.UI.createScrollView({
			//backgroundColor: '#F00',
			 contentWidth: 'auto',
			 contentHeight: 'auto',
			 showVerticalScrollIndicator: true,
			 showHorizontalScrollIndicator: true,
			 height: '100%',
			 width: '100%'
		});
		
		var button_height = 40;
		var button_width = 75;
		var left_offset = 10;
		var top_offset = 50;
		var button_space = 10;
		var assets = 16;
		var allBtnTop_offset = 100;
		var naming_offset = 40;
		var sendAllString = "1234";
		var respondAllString = "5678";
		var tf_extra = 55;
		var tf_space = 10;
		
		
		/*
		 * Labels creating section for sections
		 */
		var sendingLabel = Ti.UI.createLabel({
			text:L('Send Message'),
			height: button_height,
			width: button_width,
			top: 5,
			left: left_offset,
			textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
			color:'#000'
		});
		
		var naminingLabel = Ti.UI.createLabel({
			text:L('Asset Name'),
			height: button_height,
			width: button_width,
			top: 5,
			left: left_offset + button_width + naming_offset,
			textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
			color:'#000'
		});
		
		var respondingLabel = Ti.UI.createLabel({
			text:L('Respond To Message'),
			height: button_height,
			width: button_width,
			top: 5,
			right: left_offset,
			textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
			color:'#000'
		});
		
		scrollContainer.add(sendingLabel);
		scrollContainer.add(naminingLabel);
		scrollContainer.add(respondingLabel);
		
		
		/*
		 * Button creating section for assets
		 */
		
		var sendAll_btn = Ti.UI.createButton({
			height: button_height,
			width: button_width,
			title:L('SEND ALL ON'),
			top: allBtnTop_offset,
			left: (button_width + (button_width/2)),
			backgroundSelectedImage: 'green.png',
			state: 'OFF',
			borderRadius: 5,
			borderColor : '#000',
		});
		
		sendAll_btn.addEventListener('click', function(){
			for(var i = 0; i < sendAssets.length; i++){
				//switchAll(controllers_data[i],sendAllString,this.state);
				sendAssets[i].state = this.state;
				sendAssets[i].fireEvent('click');
			}
			
			if(this.state == 'ON'){
				this.title = 'SEND ALL ON';
				this.state = 'OFF';
				this.backgroundImage='';

			} else {
				this.title = 'SEND ALL OFF';
				this.state = 'ON';
				this.backgroundImage='green.png';
			}
			
			
			
			/*for(var i = 0; i < respondAssets.length; i++){
					sendAssets[i].state = this.state;
					sendAssets[i].backgroundImage=this.backgroundImage;
					sendAssets[i].borderRadius = 5;
					sendAssets[i].borderColor = '#000';
					//Ti.API.info(respondAssets[i].state);
					//Ti.API.info(respondAssets[i].backgroundImage); 
			}
			
			for(var i = 0; i < controllers_data.length; i++){
				switchAll(controllers_data[i],sendAllString,this.state);
			}*/
		});
		
		var respondAll_btn = Ti.UI.createButton({
			height: button_height,
			width: button_width,
			title:L('RESPOND ALL ON'),
			top: allBtnTop_offset+2 + (button_height*2) + button_space,
			left: (button_width + (button_width/2)),
			backgroundSelectedImage: 'red.jpg',
			state: 'OFF',
			borderRadius: 5,
			borderColor : '#000',
		});
		
		respondAll_btn.addEventListener('click', function(){
			for(var i = 0; i < respondAssets.length; i++){
				//switchAll(controllers_data[i],sendAllString,this.state);
				respondAssets[i].state = this.state;
				respondAssets[i].fireEvent('click');
			}
			
			if(this.state == 'ON'){
				this.title = 'RESPOND ALL ON';
				this.state = 'OFF';
				this.backgroundImage='';
			} else {
				this.title = 'RESPOND ALL OFF';
				this.state = 'ON';
				this.backgroundImage='red.jpg';
			}
			
			
			/*for(var i = 0; i < controllers_data.length; i++){
				switchAll(controllers_data[i],respondAllString,this.state);
			}
			
			for(var i = 0; i < respondAssets.length; i++){
					respondAssets[i].state = this.state;
					respondAssets[i].backgroundImage=this.backgroundImage;
					respondAssets[i].borderRadius = 5;
					respondAssets[i].borderColor = '#000';
					//Ti.API.info(respondAssets[i].state);
					//Ti.API.info(respondAssets[i].backgroundImage); 
			}
			
			for(var i = 0; i < controllers_data.length; i++){
				switchAll(controllers_data[i],respondAllString,this.state);
			}*/
		});
		
		//scrollContainer.add(sendAll_btn);
		//scrollContainer.add(respondAll_btn);

		
		for(var i = 0; i < assets; i++){
			var yPos = top_offset;
			if(i != 0){
				yPos = sendAssets[i-1].top+button_height+button_space;
			}
			
			
			//Sender Assets Buttons
			var tempSend = Ti.UI.createButton({
				height:button_height,
				width: button_width,
				title:L('Asset'+(i+1)+' S'),
				top: yPos,
				left:left_offset,
				state: 'OFF',
				controller: Math.floor(i / 8),
				outlet: (i % 8),
				backgroundSelectedImage: 'green.png',
				borderRadius : 5,
				borderColor : '#000',
			});
			
			var tempSend_tf = Ti.UI.createTextField({
				height:button_height,
				width: button_width + tf_extra,
				title:L('Asset'+(i+1)+' S'),
				top: yPos,
				left: left_offset + button_width + tf_space,
				state: 'OFF',
				controller: Math.floor(i / 8),
				outlet: (i % 8),
				backgroundSelectedImage: 'green.png',
				borderColor : '#000',
				assetNumber : i,
				textAlign: 'center',
				value: 'Asset ' + (i + 1),
			});
			
			tempSend.addEventListener('click', function() {
				//Ti.API.info("Controller number: " + this.controller);
				//Ti.API.info(controllers_data[this.controller].ipAddress);
				if(this.state == 'OFF'){
					this.state = 'ON';
					//this.backgroundColor = '#00C';
					//this.backgroundGradient = { type:'linear', colors: [{color:'#f1f1f1', position:0.0}, {color:'#d3d3d3',position:1.0}] };
					this.backgroundImage = 'green.png';
					this.borderRadius = 5;
				} else {
					this.state = 'OFF';
					this.backgroundImage = '';
					this.backgroundColor = '#FFF';
				}
				switchOutlet(controllers_data[this.controller], this.outlet, this.state);
			});
			
			tempSend_tf.addEventListener('change', function(){
				Ti.API.info("hi");
				sendAssets[this.assetNumber].title = this.value + ' S';
				respondAssets[this.assetNumber].title = this.value + ' R';
				saveButtonSettings();

			});
			
			//Responder Assets Buttons
			var tempRespond = Ti.UI.createButton({
				height:button_height,
				width: button_width,
				title:L('Asset'+(i+1)+' R'),
				top: yPos,
				right:left_offset,
				state: 'OFF',
				controller: Math.floor(i / 8),
				outlet: (i % 8),
				backgroundSelectedImage : 'red.jpg',
				borderRadius : 5,
				borderColor : '#000',
			});
			
			tempRespond.addEventListener('click', function() {
				//Ti.API.info("Controller number: " + this.controller);
				//Ti.API.info(controllers_data[this.controller].ipAddress);
				if(this.state == 'OFF'){
					this.state = 'ON';
					this.backgroundImage = 'red.jpg';
					this.borderRadius = 5;
				} else {
					this.state = 'OFF';
					this.backgroundImage = '';
					this.backgroundColor = '#FFF';
				}
				switchOutlet(controllers_data[this.controller], this.outlet, this.state);
			});
			
			//Push button objects onto their arrays
			sendAssets.push(tempSend);
			respondAssets.push(tempRespond);
			buttonNames.push(tempSend_tf);
			
			//Add objects to the window
			scrollContainer.add(buttonNames[i]);
			scrollContainer.add(sendAssets[i]);
			scrollContainer.add(respondAssets[i]);
		}
		var leftAll = Ti.UI.createButtonBar({
			labels: ['All ON', 'All OFF'],
			style : Titanium.UI.iPhone.SystemButtonStyle.BAR,
    		backgroundColor : '#005577',
    		width:100,
		});
		
		leftAll.addEventListener('click', function(e){
			//Ti.API.info(e);
			//Ti.API.info(e.index);
			if(e.index != 0){
				
				for(var i = 0; i < controllers_data.length/2; i++){
					switchAll(controllers_data[i], 'OFF');
				}
				
				for(var i = 0; i < sendAssets.length; i++){
					//switchAll(controllers_data[i],sendAllString,this.state);
					sendAssets[i].state = 'OFF';	//off because switch does opposite
					sendAssets[i].backgroundImage = '';
				}
			} else {
				//send data first
				for(var i = 0; i < controllers_data.length/2; i++){
					switchAll(controllers_data[i], 'ON');
				}
				
				for(var i = 0; i < sendAssets.length; i++){
					//switchAll(controllers_data[i],sendAllString,this.state);
					sendAssets[i].state = 'ON';	//off because switch does opposite
					sendAssets[i].backgroundImage = 'green.png';
				}
			}
		});
		
		var rightAll = Ti.UI.createButtonBar({
			labels: ['All ON', 'All OFF'],
			style : Titanium.UI.iPhone.SystemButtonStyle.BAR,
    		backgroundColor : '#005577',
    		width:100,
		});
		
		rightAll.addEventListener('click', function(e){
			//Ti.API.info(e);
			//Ti.API.info(e.index);
			//send data first
			if(e.index != 0){
				for(var i = Math.floor(controllers_data.length/2)-1; i < controllers_data.length; i++){
					switchAll(controllers_data[i], 'OFF');
				}
				
				//update graphics
				for(var i = 0; i < respondAssets.length; i++){
					//switchAll(controllers_data[i],sendAllString,this.state);
					respondAssets[i].state = 'OFF';	//off because switch does opposite
					respondAssets[i].backgroundImage = '';
				}
			} else {
				//send data first
				for(var i = Math.floor(controllers_data.length/2)-1; i < controllers_data.length; i++){
					switchAll(controllers_data[i], 'ON');
				}
				//update graphics
				for(var i = 0; i < respondAssets.length; i++){
					//switchAll(controllers_data[i],sendAllString,this.state);
					respondAssets[i].state = 'ON';	//off because switch does opposite
					respondAssets[i].backgroundImage = 'red.jpg';
				}
			}
		});
		
		self.setLeftNavButton(leftAll);
		self.setRightNavButton(rightAll);
		self.add(scrollContainer);
		loadButtonSettings();
	}
	
	
	function loadButtonSettings(){
		var Settings = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'Settings');
			
		//if settings file doesn't exist then load default data'
		if(!Settings.exists()){
			Ti.API.info("Created Settings: " + Settings.createDirectory());
		}
		//else load settings file
		var settingsFile = Titanium.Filesystem.getFile(Settings.resolve(),'Buttons.settings');
		
		if(!settingsFile.exists()){
			Ti.API.info("Created Settings: " + settingsFile.createFile());
			return false;	
		}
		//parse the string into a JSON object if no values found throws exception and loads nothing 
		try{
			var setts = JSON.parse(settingsFile.read());
		} catch (err) {
			//Ti.API.info('Loaded from settings file FAILED');
			return false;
		}
		for(var i = 0; i < setts.length; i++){
			buttonNames[i].value = setts[i].value;
		}
		//Ti.API.info('Loaded from settings file');
		return true;
	}
	
	function saveButtonSettings(){
		data = [];
		for(var i = 0; i < assets; i++){
			data[i] = {
				'value' : buttonNames[i].value,
			}
		}
		
		var Settings = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'Settings');
		if(!Settings.exists()){
			Ti.API.info("Created Settings: " + Settings.createDirectory());
		}
		Ti.API.info('Settings ' + Settings);
		var newFile = Titanium.Filesystem.getFile(Settings.resolve(),'Buttons.settings');
	
		//If the settings file doesn't exist then create the file
		if(!newFile.exists()){
			Ti.API.info("Created Settings: " + newFile.createFile());	
		}
		
		newFile.write(JSON.stringify(data));
	    //Ti.API.info('newfile: '+newFile.read());
	    var setts = JSON.parse(newFile.read());
	    return true;
			
	}
	
	
	/*
		 * Function: switchOutlet
		 * Purpose: turns a single outlet on or off based on the outlet status in 'outlets'
		 * @param: outletNumber - the number of the outlet to switch
		 * @param: e - the sender of the event, in this case it's the button object 
		 * @return
		 */
	function switchOutlet(controller,outletNumber,state,e){
			try{
				
				var url = "http://" + controller.ipAddress + "/outlet?";
				//Ti.API.info(url);
				//Ti.API.info(controller.user);
				//Ti.API.info(controller.pass);
				var status = state;
				//if the outlet is currently on then turn it off
				//Ti.API.info(url+(outletNumber+1)+'='+state);
				client.open('GET', url+(outletNumber+1)+'='+state);
				//add auth header
				client.setRequestHeader('Authorization','Basic ' + Ti.Utils.base64encode(controller.user+":"+controller.pass));		
			} catch(err) {
				//if anything bad happens try again
				client.open('GET', url+outletNumber+'='+state);
				client.setRequestHeader('Authorization','Basic ' + Ti.Utils.base64encode(controller.user+":"+controller.pass));	
			} finally {
				//finally send the request
				if(controller.state == "ON"){
					controller.state = "OFF";
				} else {
					controller.state = "ON";
				}
				client.send();
			}
	}
	
	function switchAll(controller,state){
			try{
				
				var url = "http://" + controller.ipAddress + "/outlet?";
				//Ti.API.info(url);
				//Ti.API.info(controller.user);
				//Ti.API.info(controller.pass);
								//if the outlet is currently on then turn it off
				Ti.API.info(url+'a'+'='+state);
				client.open('GET', url+'a'+'='+state);
				//add auth header
				client.setRequestHeader('Authorization','Basic ' + Ti.Utils.base64encode(controller.user+":"+controller.pass));		
			} catch(err) {
				//if anything bad happens try again
				Ti.API.info(url+'a'+'='+state);
				client.open('GET', url+'a'+'='+state);
				client.setRequestHeader('Authorization','Basic ' + Ti.Utils.base64encode(controller.user+":"+controller.pass));	
			} finally {
				//finally send the request
				/*if(controller.state == "ON"){
					controller.state = "OFF";
				} else {
					controller.state = "ON";
				}*/
				client.send();
			}
	}
	
	function loadDefaults(){
		for(var i = 0; i < controllerCount; i++){
			controllers_data[i] = [];
			controllers_data[i].number = i;
			controllers_data[i].name = 'Controller ' + (i+1);
			controllers_data[i].user = 'admin';
			controllers_data[i].pass = 'nrgmezel';
			controllers_data[i].ipAddress = '192.168.10.'+(i+10);
		}
		//Ti.API.info('Loaded default settings');
	}
	
	function loadControllerSettings(){
		var Settings = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'Settings');
			
		//if settings file doesn't exist then load default data'
		if(!Settings.exists()){
			//Ti.API.info("Created Settings: " + Settings.createDirectory());
		}
		//else load settings file
		var settingsFile = Titanium.Filesystem.getFile(Settings.resolve(),'Controllers.settings');
		
		if(!settingsFile.exists()){
			//Ti.API.info("Created Settings: " + settingsFile.createFile());
			return false;	
		}
		//parse the string into a JSON object if no values found throws exception and loads nothing 
		try{
			var setts = JSON.parse(settingsFile.read());
		} catch (err) {
			//Ti.API.info('Loaded from settings file FAILED');
			return false;
		}
		for(var i = 0; i < controllerCount; i++){
			controllers_data[i] = [];
			controllers_data[i].number = setts[i].number;
			controllers_data[i].name = setts[i].name;
			controllers_data[i].user = setts[i].user;
			controllers_data[i].pass = setts[i].pass;
			controllers_data[i].ipAddress = setts[i].ipAddress;
		}
		//Ti.API.info('Loaded from settings file');
		return true;
	}
	
	function updateButtonURLs(){
		
	}
	
	/*
	 * function: saveContrllerSettings
	 * purpose: saves the working settings for the DIN controllers in use.
	 */
	function saveControllerSettings(){
		data = [];
		for(var i = 0; i < controllerCount; i++){
			value = controllers_data[i];
			data[i] = {
				'number' : controllers_data[i].number,
				'name' : controllers_data[i].name,
				'user' : 'admin',//controllers_data[i].user,
				'pass' : 'nrgmezel',//controllers_data[i].pass,
				'ipAddress' : controllers_data[i].ipAddress,
			}
		}
		
		var Settings = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'Settings');
		if(!Settings.exists()){
			//Ti.API.info("Created Settings: " + Settings.createDirectory());
		}
		//Ti.API.info('Settings ' + Settings);
		var newFile = Titanium.Filesystem.getFile(Settings.resolve(),'Controllers.settings');
	
		//If the settings file doesn't exist then create the file
		if(!newFile.exists()){
			//Ti.API.info("Created Settings: " + newFile.createFile());	
		}
		
		newFile.write(JSON.stringify(data));
	    //Ti.API.info('newfile: '+newFile.read());
	    var setts = JSON.parse(newFile.read());
	    return true;
			
	}
	return self;
};

module.exports = ApplicationWindow;
