function ApplicationWindow(input) {
	var self = Ti.UI.createWindow({
		title:'Manual Mapping',
		backgroundColor:'white'
	});
	
	if(input != "Mapping"){
		var self = Ti.UI.createWindow({
			title:'Settings',
			backgroundColor:'white'
		});
	} else {
		var self = Ti.UI.createWindow({
			title:'Manual Mapping',
			backgroundColor:'white'
		});
		
		var button_height = 20;
		var button_width = 100;
		var left_offset = 10;
		var top_offset = 30;
		var button_space = 0;
		var assets = 16;
		
		/*
		 * Labels creating section for sections
		 */
		var sendingLabel = Ti.UI.createLabel({
			text:L('Send'), 
			height: button_height,
			width: button_width,
			top: 5,
			left: left_offset,
			textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
			color:'#000'
		});
		
		var respondingLabel = Ti.UI.createLabel({
			text:L('Respond'),
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
	}
	Ti.API.info(input)
	
	
	
	/*button.addEventListener('click', function() {
		//containingTab attribute must be set by parent tab group on
		//the window for this work
		self.containingTab.open(Ti.UI.createWindow({
			title: L('newWindow'),
			backgroundColor: 'white'
		}));
	});*/
	
	return self;
};

module.exports = ApplicationWindow;
