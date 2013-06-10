function ApplicationWindow(input) {
	if(input != "Mapping"){
		var controllers = 4;
		var self = Ti.UI.createWindow({
			title:'Settings',
			backgroundColor:'white'
		});
		
		var controllers = [];
		var controllerCount = 4;
		var view_width = 400;
		var view_height = 225;
		var left_offset = 5;
		var top_offset = 5;
		var element_height = 50;
		var element_width  = 100; 
		var element_width_tf = 250;
		
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
				height: element_height,
				top: top_offset + controller_number.top + controller_number.height + 5,
				width: element_width_tf,
				left: controller_name.width,
				keyboardType: Ti.UI.KEYBOARD_DEFAULT,
				returnKeyType: Ti.UI.RETURNKEY_DONE,
				borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
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
				height: element_height,
				top: top_offset + controller_name.top + controller_name_tf.height + 5,
				width: element_width_tf,
				left: controller_name.width,
				keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
				returnKeyType: Ti.UI.RETURNKEY_DONE,
				borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
				hintText: '192.168.0.10',
			});
			
			var controller_update_btn = Ti.UI.createButton({
				title:'Update',
				height: 25,
				width:'auto',
				right: 10,
				bottom:5,
			});
			
			var controller_clear_btn = Ti.UI.createButton({
				title:'Clear',
				height: 25,
				width:'auto',
				right: controller_update_btn.width - 10,
				bottom:5,
			});
			
			controller.add(controller_number);
			controller.add(controller_name);
			controller.add(controller_name_tf);
			controller.add(controller_ip);
			controller.add(controller_ip_tf);
			controller.add(controller_update_btn);
			controller.add(controller_clear_btn);
			
			controllers.push(controller);
			self.add(controllers[i]);
		}
		
	} else {
		var self = Ti.UI.createWindow({
			title:'Manual Mapping',
			backgroundColor:'white'
		});
	
		var self = Ti.UI.createWindow({
			title:'Manual Mapping',
			backgroundColor:'white'
		});
		
		var button_height = 40;
		var button_width = 200;
		var left_offset = 10;
		var top_offset = 50;
		var button_space = 10;
		var assets = 16;
		
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
		
		var respondingLabel = Ti.UI.createLabel({
			text:L('Respond To Message'),
			height: button_height,
			width: button_width,
			top: 5,
			right: left_offset,
			textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
			color:'#000'
		});
		
		self.add(sendingLabel);
		self.add(respondingLabel);
		
		var sendAssets = [];
		var respondAssets = [];
		/*
		 * Button creating section for assets
		 */
		
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
				
			});
			
			//Responder Assets Buttons
			var tempRespond = Ti.UI.createButton({
				height:button_height,
				width: button_width,
				title:L('Asset'+(i+1)+' R'),
				top: yPos,
				right:left_offset,
			});
			
			//Push button objects onto their arrays
			sendAssets.push(tempSend);
			respondAssets.push(tempRespond);
			
			//Add objects to the window
			self.add(sendAssets[i]);
			self.add(respondAssets[i]);
		}
		
		/*button.addEventListener('click', function() {
			//containingTab attribute must be set by parent tab group on
			//the window for this work
			self.containingTab.open(Ti.UI.createWindow({
				title: L('newWindow'),
				backgroundColor: 'white'
			}));
		});*/
	}
	return self;
};

module.exports = ApplicationWindow;
