require([
	"dojo/ready",
	"dojo/dom", "dojo/dom-style",
	"dijit/layout/BorderContainer", "dijit/layout/ContentPane", 	
	"GoldenBear/Test"
], function(
	ready,
	dom, domStyle,
	BorderContainer, ContentPane,
	Test
){
	ready(function() {
		setTimeout(function() {
			domStyle.set(dom.byId('app-splash'), 'display', 'none');
		}, 250);
	});
});
