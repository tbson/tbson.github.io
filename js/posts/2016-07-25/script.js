window.onload = function(){
        //do stuff here
	var areas = [];
    var titles = {};
    var indicator = $("#indicators");
    var slides = $("#slides");
    var data = [
    	{
	    	id: 'a1',
	    	tooltip: '<span style="font-size: 11px"><strong>Căn A1 (03)</strong> <br/>Diện tích: <em>80.74m<sup>2</sup></em></span>',
	    	title: 'Căn hộ A1 (03)',
	    	slideImg: [
	    		'xuanmai-03-1.jpg',
	    		'xuanmai-03-2.jpg'
	    	],
	    	slideTitle: [
	    		'Mặt bằng căn hộ số 03 (tầng 16 – tầng 33)',
	    		'Mặt bằng căn hộ số 03 (tầng 7 – tầng 15)'
	    	]
    	}, {
	    	id: 'a2',
	    	tooltip: '<strong>Căn A2 (04)</strong> <br/>Diện tích: <em>67.12m<sup>2</sup></em>',
	    	title: 'Căn hộ A2 (04)',
	    	slideImg: [
	    		'xuanmai-04-1.jpg',
	    		'xuanmai-04-2.jpg'
	    	],
	    	slideTitle: [
	    		'Mặt bằng căn hộ số 04 (tầng 16 – tầng 33)',
	    		'Mặt bằng căn hộ số 04 (tầng 7 – tầng 15)'
	    	]
    	}, {
	    	id: 'a31',
	    	tooltip: '<strong>Căn A3 (05)</strong> <br/>Diện tích: <em>61.37m<sup>2</sup></em>',
	    	title: 'Căn hộ A3 (05)',
	    	slideImg: [
	    		'xuanmai-05-1.jpg',
	    		'xuanmai-05-2.jpg'
	    	],
	    	slideTitle: [
	    		'Mặt bằng căn hộ số 05 (tầng 16 – tầng 33)',
	    		'Mặt bằng căn hộ số 05 (tầng 7 – tầng 15)'
	    	]
    	}, {
	    	id: 'a32',
	    	tooltip: '<strong>Căn A3 (06)</strong> <br/>Diện tích: <em>61.37m<sup>2</sup></em>',
	    	title: 'Căn hộ A3 (06)',
	    	slideImg: [
	    		'xuanmai-06-1.jpg',
	    		'xuanmai-06-2.jpg'
	    	],
	    	slideTitle: [
	    		'Mặt bằng căn hộ số 06 (tầng 16 – tầng 33)',
	    		'Mặt bằng căn hộ số 06 (tầng 7 – tầng 15)'
	    	]
    	}, {
	    	id: 'a4',
	    	tooltip: '<strong>Căn A4 (07)</strong> <br/>Diện tích: <em>45.22m<sup>2</sup></em>',
	    	title: 'Căn hộ A4 (07)',
	    	slideImg: [
	    		'xuanmai-07-1.jpg'
	    	],
	    	slideTitle: [
	    		'Mặt bằng căn hộ số 07 (tầng 16 – tầng 33)'
	    	]
    	}, {
	    	id: 'a5',
	    	tooltip: '<strong>Căn 5A (08)</strong> <br/>Diện tích: <em>75.90m<sup>2</sup></em>',
	    	title: 'Căn hộ 5A (08)',
	    	slideImg: [
	    		'xuanmai-08-1.jpg',
	    		'xuanmai-08-2.jpg'
	    	],
	    	slideTitle: [
	    		'Mặt bằng căn hộ số 08 (tầng 7 – tầng 15)',
	    		'Mặt bằng căn hộ số 08 (tầng 16 – tầng 33)'
	    	]
    	}, {
	    	id: 'a6',
	    	tooltip: '<strong>Căn A6 (09)</strong> <br/>Diện tích: <em>76.29m<sup>2</sup></em>',
	    	title: 'Căn hộ A6 (09)',
	    	slideImg: [
	    		'xuanmai-09-1.jpg'
	    	],
	    	slideTitle: [
	    		'Mặt bằng căn hộ số 09 (tầng 16 – tầng 33)'
	    	]
    	}, {
	    	id: 'a71',
	    	tooltip: '<strong>Căn A7 (10)</strong> <br/>Diện tích: <em>90.83m<sup>2</sup></em>',
	    	title: 'Căn hộ A7 (10)',
	    	slideImg: [
	    		'xuanmai-10-1.jpg'
	    	],
	    	slideTitle: [
	    		'Mặt bằng căn hộ số 10 (tầng 7 – tầng 33)'
	    	]
    	}, {
	    	id: 'a72',
	    	tooltip: '<strong>Căn A7 (01)</strong> <br/>Diện tích: <em>90.69m<sup>2</sup></em>',
	    	title: 'Căn hộ A7 (01)',
	    	slideImg: [
	    		'xuanmai-01-1.jpg',
	    		'xuanmai-01-2.jpg'
	    	],
	    	slideTitle: [
	    		'Mặt bằng căn hộ số 01 (tầng 16 – tầng 33)',
	    		'Mặt bằng căn hộ số 01 (tầng 7 – tầng 15)'
	    	]
    	}, {
	    	id: 'a8',
	    	tooltip: '<strong>Căn A8 (02)</strong> <br/>Diện tích: <em>78.95m<sup>2</sup></em>',
	    	title: 'Căn hộ A8 (02)',
	    	slideImg: [
	    		'xuanmai-02-1.jpg',
	    		'xuanmai-02-2.jpg'
	    	],
	    	slideTitle: [
	    		'Mặt bằng căn hộ tầng 16 – tầng 33',
	    		'Mặt bằng căn hộ số 02 (tầng 16 – tầng 33)'
	    	]
    	}
    ];
    for(var i in data){
    	areas.push({
    		key: data[i].id,
    		toolTip: data[i].tooltip
    	});
    	titles[data[i].id] = data[i].title;
    }
    $('#main-map').mapster({
    	fillOpacity: 0.4,
        fillColor: "d42e16",
        stroke: true,
        strokeColor: "9edd34",
        strokeOpacity: 0.6,
        strokeWidth: 4,
        singleSelect: true,
        mapKey: 'name',
        listKey: 'name',
        showToolTip: true,
        toolTipClose: ["tooltip-click", "area-click", "image-mouseout"],
        areas: areas,
        onClick: function (e) {
	        indicator.empty();
        	slides.empty();

        	var item = [];
        	for(var i in data){
        		if(data[i].id == e.key){
        			item = data[i];
        			break;
        		}
        	}

        	for(var j in item.slideImg){
        		var title = item.slideTitle[j];
        		var img = '/img/posts/2016-07-25/' + item.slideImg[j];
        		if(j == 0){
        			indicator.append('<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>');
        			slides.append('<div class="item active"><img src="' + img + '"><div class="carousel-caption"><h3 style="color: black">'+ title +'</h3></div></div>');

    			}else{
        			indicator.append('<li data-target="#carousel-example-generic" data-slide-to="' + j + '"></li>');
        			slides.append('<div class="item"><img src="' + img + '"><div class="carousel-caption"><h3 style="color: black">'+ title +'</h3></div></div>');
    			}
        	}

        	$("#myModalLabel").text(titles[e.key]);
        	$("#myModal").modal();
        }
    });
};
