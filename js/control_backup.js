var self = this;

function qrCreate(){

	var ipAddress = $('#socketServerIP').val();
	var portNumber = $('#socketServerPort').val();

	var jsonText = 	'{"ip":"' +
					ipAddress +
					'","port":' +
					portNumber +
					'}'
	console.log(jsonText)
	$('#qrcodeCanvas').empty();

	$('#qrcodeCanvas').qrcode({
		text	: jsonText
	});
}

function connect(){
	var pepperIp = $("#pepperIP").val();

    var setupIns_ = function(){
    	self.qims.service("ALTextToSpeech").done(function(ins){
    		self.alTextToSpeech = ins;
        });
        self.qims.service("ALAnimatedSpeech").done(function(ins){
    		self.alAnimatedSpeech = ins;
        });
        self.qims.service("ALMotion").done(function(ins){
        	self.alMotion = ins;
        });
        self.qims.service("ALBehaviorManager").done(function(ins){
        	self.alBehavior = ins;
        });
    	self.qims.service("ALAutonomousLife").done(function(ins){
    		self.alAutonomousLife = ins;
        });
        self.qims.service("ALAudioDevice").done(function(ins){
            self.alAudioDevice = ins;
            self.alAudioDevice.getOutputVolume().done(function(val){
		    self.showAudioVolume(val);
		    });
        });
        self.qims.service("alMotion").done(function(ins){
            self.alMotion = ins;
            self.alMotion.robotIsWakeUp().done(function(val){
		    self.showSleepMode(val);
		    });
        });
        self.qims.service("alAutonomousLife").done(function(ins){
            self.alAutonomousLife = ins;
            self.alAutonomousLife.getState().done(function(val){
		    self.showAutonomousMode(val);
		    });
        });
        self.qims.service("ALMemory").done(function(ins){
    		self.alMemory = ins;

    		qimessagingMemorySubscribe();
        });
    }

	self.qims = new QiSession(pepperIp);
	self.qims.socket()
	// 接続成功
	.on('connect', function () {
		self.qims.service("ALTextToSpeech").done(
				function (tts) {
					tts.say("接続、成功しました");
				}
			);
			setupIns_();
			$(".connectedState > .connected > .connectedText").text("接続成功");
			$(".connectedState > .connected > .glyphicon").removeClass("glyphicon-remove-circle");
			$(".connectedState > .connected > .glyphicon").addClass("glyphicon-transfer");
			$(".connectedState > .connected").css("color","Blue");
		}
	)
	// 接続失敗
	.on('disconnect', function () {
			//self.nowState("切断");
	});
}


function showAudioVolume(val){
	console.log(val);
	$("#pepperVolume").val(val);
}

function changeAudioVolume(){
	var volume = $("#pepperVolume").val();
	volume = Number(volume);
	console.log(Number(volume));
	self.alAudioDevice.setOutputVolume(volume);
	self.hello();
}

function showSleepMode(val){
	console.log(val);
	$("#sleepMode").val(val);
}

function showAutonomousMode(val){
	console.log(val);
	$("#AutonomousMode").val(val);
}

function say(){
	console.log("say");
	var value = $("#sayText").val();
	if ($('input[name=gesture]:checked').val() === 'on') {
		this.alAnimatedSpeech.say(value);
		return;	
	} else {
		this.alTextToSpeech.say(value);
	}
}

function move(to){
	if (self.alMotion){
		console.log("move to");
		switch (to){
			case 0:
				self.alMotion.moveTo(0, 0, 0.5).fail(function(err){console.log(err);});
				break;

			case 1:
				self.alMotion.moveTo(0, 0, -0.5).fail(function(err){console.log(err);});
				break;

			case 2:
				self.alMotion.moveTo(0.3, 0, 0).fail(function(err){console.log(err);});
				break;

			case 3:
				self.alMotion.moveTo(-0.3, 0, 0).fail(function(err){console.log(err);});
				break;
			case 4:
				self.alMotion.moveTo(0, 0, 0).fail(function(err){console.log(err);});
				break;

		}
	}
}

function action(num){
	switch (num){
		case 0:
			self.alBehavior.stopAllBehaviors();
			break;
		case 1:
			self.alBehavior.runBehavior("animation-5ffd19/HighTouch");
			break;
		case 2:
			self.alBehavior.runBehavior("pepper_self_introduction_waist_sample/.");
			break;
		case 3:
			self.alBehavior.runBehavior("pepper_tongue_twister_sample/.");
			break;
		case 4:
			self.alBehavior.runBehavior("animations/Stand/Emotions/Positive/Laugh_1");
			break;
		case 5:
			self.alBehavior.runBehavior("animations/Stand/Emotions/Negative/Sad_1");
			break;
		case 6:
			self.alBehavior.runBehavior("animations/Stand/Gestures/ComeOn_1");
			break;
		case 7:
			self.alBehavior.runBehavior("pepper_anim_sample/d-110-owata");
			break;
		case 8:
			self.alBehavior.runBehavior("pepper_anim_sample/d-110-glad-3");
			break;
		case 9:
			self.alBehavior.runBehavior("animations/Stand/Gestures/Angry_1");
			break;

	}
}

function autonomousSwitch(num){
	switch (num){
		case 0:
			console.log("autonomous:0");
			self.alAutonomousLife.getState().done(function(val){console.log(val)});
			self.alAutonomousLife.setState("disabled");
			break;
		case 1:
			console.log("autonomous:1");
			self.alAutonomousLife.getState().done(function(val){console.log(val)});
			self.alAutonomousLife.setState("solitary");
			break;
		case 2:
			console.log("autonomous:2");
			self.alAutonomousLife.getState().done(function(val){console.log(val)});
			self.alAutonomousLife.setState("interactive");
			break;
		case 3:
			console.log("autonomous:3");
			self.alAutonomousLife.getState().done(function(val){console.log(val)});
			self.alAutonomousLife.setState("safeguard");
			break;
	}
}

function sleepSwitch(bl){
	var status;
	if (bl)
	{
		console.log("ON");
		self.alMotion.wakeUp();

	}else
	{
		console.log("OFF");
		self.alMotion.rest();
	}
}


function qimessagingMemoryEvent(){
	console.log("push!");
	self.alMemory.raiseEvent("PepperQiMessaging/Hey", "1");
}

function qimessagingMemorySubscribe(){
	console.log("subscriber!");
	self.alMemory.subscriber("PepperQiMessaging/Reco").done(function(subscriber)
		{
            subscriber.signal.connect(toTabletHandler);
        }
    );
}


function toTabletHandler(value) {
        console.log("PepperQiMessaging/Recoイベント発生: " + value);
        $(".memory").text(value);
}
