(function (url,success){
	var head = document.getElementsByTagName("head")[0], done = false;
	var script = document.createElement("script");
	script.src = url;
	script.onload = script.onreadystatechange = function(){
		if ( !done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") ) {
			done = true;
			success();
		}
	};
	head.appendChild(script);
}('http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js',function(){
	var $body = $("body");
	var $a = $("<a href='#'>Edit</a>")
		.css({
			position: "fixed",
			bottom: 0,
			right: 0,
			color: "#E90094",
			"text-decoration": "none",
			background: "#ccc",
			"font-family": "sans-serif",
			padding: "2px 7px",
			"line-height": "20px",
			"z-index": "100",
			"border-radius": "5px 0 0 0",
			"font-size": "14px"
		})
		.click(function(){
			$("form").submit();
			return false;
		})
		.appendTo($body);
}));

