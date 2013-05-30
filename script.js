window.addEventListener("load", function() {
	document.getElementById("supported").addEventListener("click", checkRichNotifications);
	document.getElementById("basic").addEventListener("click", createNotification);
	document.getElementById("image").addEventListener("click", createNotification);
	document.getElementById("list").addEventListener("click", createNotification);
	document.getElementById("button").addEventListener("click", createNotification);
	document.getElementById("delayed").addEventListener("click", createNotification);

	chrome.notifications.onButtonClicked.addListener(buttonClicked);

});

var notID = 0;
notificationsID = [];
function getNextId(){
	return String(notID++);
}
var notificationOptions = {
	"basic" : {
		type : "basic", // template type
		title : "Anne",
		message : "Lorem ispum",
		iconUrl  : chrome.runtime.getURL("images/1.png") // check if we need it locally 
	},
	"image" : {
		type : "image", // template type
		title : "Anne",
		message : "Lorem ispum",
		iconUrl  : chrome.runtime.getURL("images/1.png"),
		imageUrl : chrome.runtime.getURL("images/4.png")
	},
	"list" : {
		type : "list",
		title: "Anne",
		message: "Item list",
		iconUrl  : chrome.runtime.getURL("images/1.png"), 
		items: [
			{ title: "Item1", message: "This is item 1"},
			{ title: "Item2", message: "This is item 2"},
			{ title: "Item3", message: "This is item 3"},
			{ title: "Item4", message: "This is item 4"},
			{ title: "Item5", message: "This is item 5"},
			{ title: "Item6", message: "This is item 6"},
		]
	},
	"button" : {
		type : "basic", // template type
		title : "Anne",
		message : "Lorem ispum",
		iconUrl  : chrome.runtime.getURL("images/1.png"), // check if we need it locally
		buttons : [{
				title: "Reply",
				iconUrl : chrome.runtime.getURL("images/reply.png")
			},
			{
				title: "Reply2",
				iconUrl : chrome.runtime.getURL("images/3.png")
			}
		] 
	},
	"delayed" : {
		type : "basic", 
		title : "Anne",
		message : "Lorem ispum",
		iconUrl  : chrome.runtime.getURL("images/1.png"), 
		eventTime  : (Date.now() + 100000)
	},
}
function checkRichNotifications(){
	if(webkitNotifications.createHTMLNotification){
		console.error("Rich Notifications are not enabled");

	}		
	console.error("Rich Notifications are Enabled in your enviroment");
}

function createNotification(event){
	var sourceElement = event.srcElement.id;
	console.log("Element Clicked ", sourceElement);
	var options = notificationOptions[sourceElement];
	if(sourceElement === "image"){
		//options.imageUrl = getImage();
	}
	console.log("Options", options);
	var id = getNextId();
	options.priority = getPriority();
	chrome.notifications.create(id, options, creationCallback);
	notificationsID.push({
		sourceElement : sourceElement,
		id : id
	});

}
function getImage(){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://i.talk.to/6187760603683670755.jpg', true);
	xhr.responseType = 'blob';
	xhr.onload = function(e) {
	  return window.webkitURL.createObjectURL(this.response);
	};

	xhr.send();
}
function getPriority(){
	return document.getElementById("pri").options.selectedIndex - 2;
}
function creationCallback(){
	console.log("Sucessfully created notification");
}
function buttonClicked(){
	console.log("User clicked a button", arguments);
}