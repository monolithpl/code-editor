	var snapper = new Snap({
		element: document.getElementById('content'),
		disable: 'right'
	});
			
	var Store = window.Locally.Store, store = new Store({ compress: true });	
	
	//(function(F,i,r,e,b,u,g,L,I,T,E){if(F.getElementById(b))return;E=F[i+'NS']&&F.documentElement.namespaceURI;E=E?F[i+'NS'](E,'script'):F[i]('script');E[r]('id',b);E[r]('src',I+g+T);E[r](b,u);(F[e]('head')[0]||F[e]('body')[0]).appendChild(E);E="new Image";E[r]('src',I+L);})(document,'createElement','setAttribute','getElementsByTagName','FirebugLite','4','content/firebug-lite-dev.js','skin/xp/sprite.png','http://fbug.googlecode.com/svn/lite/branches/flexBox/','#startOpened');
	
	//(function(F,i,r,e,b,u,g,L,I,T,E){if(F.getElementById(b))return;E=F[i+'NS']&&F.documentElement.namespaceURI;E=E?F[i+'NS'](E,'script'):F[i]('script');E[r]('id',b);E[r]('src',I+g+T);E[r](b,u);(F[e]('head')[0]||F[e]('body')[0]).appendChild(E);E="new Image";E[r]('src',I+L);})(document,'createElement','setAttribute','getElementsByTagName','FirebugLite','4','content/firebug-lite-dev.js','skin/xp/sprite.png','http://fbug.googlecode.com/svn/lite/branches/firebug1.4/','#startOpened');
	//if(!window.firebug){window.firebug=document.createElement("script");firebug.setAttribute("src","js/firebug-lite-compressed.js");document.body.appendChild(firebug);(function(){if(window.firebug.version){firebug.init();window.firebug.win.hide();}else{setTimeout(arguments.callee)}})();void (firebug);if(window.debug&&debug.setCallback){(function(){if(window.firebug&&window.firebug.version){debug.setCallback(function(b){var a=Array.prototype.slice.call(arguments,1);firebug.d.console.cmd[b].apply(window,a)},true)}else{setTimeout(arguments.callee,100)}})()}};
		
    ace.require("ace/ext/language_tools");
    var htmleditor = ace.edit("htmleditor");
	htmleditor.$blockScrolling = Infinity;
    htmleditor.session.setMode("ace/mode/html");
	htmleditor.getSession().setUseWrapMode(true)
    htmleditor.setTheme("ace/theme/tomorrow");
    htmleditor.setOptions({
        enableBasicAutocompletion: true,
		fontSize: "16pt",
		showPrintMargin: false,
        enableSnippets: true,
        enableLiveAutocompletion: true
    });

	var csseditor = ace.edit("csseditor");
	csseditor.$blockScrolling = Infinity;
    csseditor.session.setMode("ace/mode/css");
	csseditor.getSession().setUseWrapMode(true)
    csseditor.setTheme("ace/theme/kuroir");
    csseditor.setOptions({
        enableBasicAutocompletion: true,
		fontSize: "16pt",
		showPrintMargin: false,
        enableSnippets: true,
        enableLiveAutocompletion: true
    });
	var jseditor = ace.edit("jseditor");
	jseditor.$blockScrolling = Infinity;
    jseditor.session.setMode("ace/mode/javascript");
	jseditor.getSession().setUseWrapMode(true)
    jseditor.setTheme("ace/theme/monokai");
    jseditor.setOptions({
        enableBasicAutocompletion: true,
		fontSize: "16pt",
		showPrintMargin: false,
        enableSnippets: true,
        enableLiveAutocompletion: true
    });
	
	
	$('.state').change(function () {
		$(this).parent().find('.state').each(function () {
			if (this.checked) {
				$(this).attr('aria-selected', 'true');
			} else {
				$(this).removeAttr('aria-selected');
			}
		});
	});
	
	
	function resizeFrame() {
		return $('#resultframe').height($(window).height());
	};
	$(window).resize(resizeFrame);
		
	$("document").ready(function() {
		$("#tabresult").click(function(event) {
			var previewDoc = window.frames[0].document;
			var html   = ace.edit("htmleditor").getSession().getValue();
			var css    = ace.edit("csseditor").getSession().getValue();
			var script = ace.edit("jseditor").getSession().getValue();
			
			var libz = "js/jquery.min.js";
			
			previewDoc.write("<!DOCTYPE html>");
			previewDoc.write("<html>");
			previewDoc.write("<head>");
			previewDoc.write("<style type='text/css'>" + css + "</style>");
			previewDoc.write("<script src=" + libz + " type='text/javascript'></script>");
			previewDoc.write("<script></script>");
			previewDoc.write("<script type='text/javascript'>window.onload = function() {" + script + "}</script>");
			previewDoc.write("</head>");
			previewDoc.write("<body>");
			previewDoc.write(html);       
			previewDoc.write("</body>");
			previewDoc.write("</html>");
			previewDoc.close();
		});
		$("#tabtidy").click(function(event) {
			var html = ace.edit("htmleditor").getSession().getValue();
			var html2 = style_html(html);
			ace.edit("htmleditor").getSession().setValue(html2);
			
			var css = ace.edit("csseditor").getSession().getValue();
			var css2 = css_beautify(css);
			ace.edit("csseditor").getSession().setValue(css2);
			
			var js = ace.edit("jseditor").getSession().getValue();
			var js2 = js_beautify(js);
			ace.edit("jseditor").getSession().setValue(js2);
		});
		$("#tabsave").click(function(event) {
			store.set('example', [htmleditor.getValue(),csseditor.getValue(),jseditor.getValue()]);
		});
		$("#tabopen").click(function(event) {
			var openfile = store.get('example');
			htmleditor.setValue(openfile[0]);
			csseditor.setValue(openfile[1]);
			jseditor.setValue(openfile[2]);
			$("#tabresult").click();
		});
		 $("#tabex").click(function(event) {
			htmleditor.setValue("<h1>Ripple Click Effect</h1><ul><li><a>Dashboard</a></li><li><a>My Account</a></li><li><a>Direct Messages</a></li><li><a>Chat Rooms</a></li><li><a>Settings</a></li><li><a>Logout</a></li></ul>");
			csseditor.setValue("@import url(http://fonts.googleapis.com/css?family=Montserrat|Bitter);ul li,ul li a{position:relative}.ink,ul li a{display:block}*{margin:0;padding:0}body{background:url(assets/b1.png) center center no-repeat fixed;background-size:cover}h1{font:400 32px/32px Bitter;color:#fff;text-align:center;padding:85px 100px}ul{background:#fff;border-top:6px solid #70c1c1;width:200px;margin:0 auto}ul li{list-style-type:none;overflow:hidden}ul li a{font:400 14px/28px Montserrat;color:#3d8e8e;padding:10px 15px;text-decoration:none;cursor:pointer;user-select:none}.ink{position:absolute;background:#b7e0e0;border-radius:100%;transform:scale(0)}.ink.animate{animation:ripple .65s linear}@keyframes ripple{100%{opacity:0;transform:scale(2.5)}}");
			jseditor.setValue('var parent, ink, d, x, y;$("ul li a").click(function(e){parent = $(this).parent();if(parent.find(".ink").length === 0);parent.prepend("<span class=ink></span>");ink = parent.find(".ink");ink.removeClass("animate");if(!ink.height() && !ink.width()){d = Math.max(parent.outerWidth(), parent.outerHeight());ink.css({height: d, width: d});}x = e.pageX - parent.offset().left - ink.width()/2;y = e.pageY - parent.offset().top - ink.height()/2;ink.css({top: y+"px", left: x+"px"}).addClass("animate");});');
			$("#tabtidy").click();
		});
		resizeFrame();
		
	});