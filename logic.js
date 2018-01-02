
var items = $("#dicks-calculator span.button").map(function() {
    return [$.map($(this).data(), function(v) {
        return v;
    })];
}).get();

var keys = document.querySelectorAll('#dicks-calculator span.button');
var isTotaled = 0;

for(var i = 0; i < keys.length; i++) {
	

	
	keys[i].onclick = function(e) {
		var input = document.querySelector('.screen');
		var btnVal = $(this).data("price");
		var oldValue = input.innerHTML;

		if (btnVal == "C") {
			$('#dicks-calculator span.button').removeClass('selected');
			$('span.counter').css('display', 'none').text("");
			$('#dicks-calculator span.button').data("count", 0);
			input.innerHTML = 0;
			isTotaled = 0;
		}
		
		else if (btnVal == "R") {
		    console.log("registered R!")
			$('#dicks-calculator span.button').removeClass('selected');
			$('span.counter').css('display', 'none').text("");
			var askValue = prompt("How much cash do you have?");
			
			var intRegex = /^\d+$/;
			var floatRegex = /^((\d+(\.\d *)?)|((\d*\.)?\d+))$/;

			if(intRegex.test(askValue) || floatRegex.test(askValue)) {
			   input.innerHTML = askValue;
				var avalFunds = askValue/1.0954;
				avalFunds = avalFunds.toFixed(2);
				var i = 0;
				while (avalFunds > .10) {
					var item = items[Math.floor(Math.random()*items.length)];
					var itemPrice = item[1];
						if ((item[2] == "onions" || item[2] == "ketchup" || item[2] == "tartar") && item[0] > 2) {
						  	i = i+1;
						   	continue;
						} else if (i > 10){
							break;
						} else if (itemPrice < avalFunds) {
							avalFunds = avalFunds - itemPrice;
							avalFunds = avalFunds.toFixed(2);
							item[0] = item[0] + 1;
							$("#dicks-calculator").find("[data-id='" + item[2] + "']").find('span.counter').css('display', 'block').text(item[0]);
							$("#dicks-calculator").find("[data-id='" + item[2] + "']").addClass('selected');
							input.innerHTML = avalFunds + " left";
							
						}
				}
				
			} else {
			alert("Please enter a number next time, k thanks.");
			}
		
		}
		
		else {
		var itemCt = $(this).data("count");
			if (isTotaled == 0) {
				var newVal = parseFloat(btnVal) * 1.0954 ;
				input.innerHTML = newVal.toFixed(2);
				itemCt = parseFloat(itemCt) + 1;
				$(this).data("count", itemCt);
				$(this).addClass('selected');
				$(this).find('span.counter').css('display', 'block').text(itemCt);
				
			} else if (isTotaled == 1) {
				var removeTax = parseFloat(oldValue) / 1.0954;
				var addItem = removeTax + parseFloat(btnVal) ;
				var newVal = addItem * 1.0954 ;
				input.innerHTML = newVal.toFixed(2);
				itemCt = parseFloat(itemCt) + 1;
				$(this).data("count", itemCt);
				$(this).find('span.counter').css('display', 'block').text(itemCt);
				$(this).addClass('selected');
				
			}
			isTotaled = 1;
			
		}
	}
}
