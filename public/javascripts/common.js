var bedTimeCalculator = function () {

	this.toHoursMin = function(min){
		var t = " AM";
				var hours = Math.floor(min / 60);
				if (hours > 11){
					hours = hours - 12;
					if (hours == 0) {
						hours = 12;
					}
					t = " PM"
				}
				var minutes = min % 60;
				if(hours < 10)
					hours = "0" + hours;

				if(minutes <  10)
					minutes = "0" + minutes;

				return hours + ":" + minutes + t;
	}

	this.loadTimeSlider = function(containerId, onslide){
		$( "#" + containerId).labeledslider({
				value:360,
				min: 0,
				max: 1440,
				step: 5,
				tickInterval : 30,
				slide: onslide
		});
	}
}

var wakeUpAt = function(){
	var self = this;

	this.wakeUpText = "<small>I have to wake up at  </small> ";

	this.bedTimeCalc = new bedTimeCalculator();

	this.wakeUpSlider = function(){
		self.bedTimeCalc.loadTimeSlider("time-slider", function(event, ui){
			$( "#h1-wakeup-at" ).html(self.wakeUpText + self.bedTimeCalc.toHoursMin(ui.value) );

			self.sleepTimeCalc(ui.value);
		});

		var defaultSelectedValue = $( "#time-slider" ).labeledslider( "value" );
		self.sleepTimeCalc(defaultSelectedValue);
		$( "#h1-wakeup-at" ).html(self.wakeUpText +  self.bedTimeCalc.toHoursMin(defaultSelectedValue) );

		$(".ui-slider-handle").focus();
	}

	this.sleepTimeCalc = function(min){
		$('#bedTime').html("");
		var sleepTime = [];

		if(!min){
			min = 0;
		}
		min = parseInt(min);

		for (i = 0; i < 10; i++) {

            min = min - 90;
            if (min < 0) {
                min = (24 * 60) + min;
            }

            if (i == 2 || i == 3 || i == 4 || i == 5) {
                var str = self.bedTimeCalc.toHoursMin(min);

                sleepTime.push(str);
            }
        }
        

        sleepTime.reverse();

        $('#bedTime').append("<ul class='list-group'>");

        for(i=0; i<sleepTime.length; i++){

        	$('#bedTime').append("<li class='list-group-item'><h4> " +  sleepTime[i] + "</h4></li>");
        }

        $('#bedTime').append("</ul>");				
	}

}

