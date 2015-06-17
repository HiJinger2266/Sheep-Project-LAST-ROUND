$(function() {
    $('.filter-form input[type="radio"]').button({
    icons:{primary:'ui-icon'}
    /* button widget */
    });

    var $container = $('#gallery'),
    $loadMoreButton = $('#load-more'),
    $filter = $('#gallery-filter'),
    addItemCount = 16,
    added = 0,
    allData = [],
    filteredData = [];

    $container.masonry({
    	columnWidth: 230,
    	gutter: 10,
    	itemSelector: '.gallery-item'
    });

    var gallery = ["0013.JPG", "0015.JPG", "0018.JPG", "0023.JPG", "0031.JPG", "0034.JPG", "0036.JPG", "0051.JPG", "0052.JPG", "0064.JPG", "0076.JPG", "0083.JPG", "0087.JPG", "0088.JPG", "0089.JPG", "0092.JPG", "0094.JPG", "0096.JPG", "0112.JPG", "0117.JPG", "0118.JPG", "0122.JPG", "0124.JPG", "0127.JPG", "0142.JPG", "0144.JPG", "0145.JPG", "0150.JPG", "0155.JPG", "0156.JPG", "0157.JPG", "0158.JPG", "0160.JPG", "0171.JPG", "0177.JPG", "0181.JPG", "0183.JPG", "0193.JPG", "0195.JPG", "0198.JPG", "0199.JPG", "0202.JPG", "0203.JPG", "0211.JPG", "0214.JPG", "0217.JPG", "0218.JPG", "0224.JPG", "0226.JPG", "0230.JPG", "0240.JPG", "0242.JPG", "0248.JPG", "0251.JPG", "0259.JPG", "0266.JPG", "0269.JPG", "0270.JPG", "0271.JPG", "0272.JPG"]
    initGallery(gallery);

    $('.gallery-item img').click(function(){
        var s = './img/'+ $(this).attr('src');
        console.log(s);
        $.colorbox({
            href:s,
        })
    });

  //   var duration=300;

  // // $('.service button')
  // // .on('mouseover',function(){
  //   $(this).stop(true).animate({
  //     backgroundColor:'#faee00',
  //     color:'#000'
  //   },duration);
  //   $(this).find('img:first-child').stop(true).animate({
  //     opacity:0
  //   },duration);
  //   $(this).find('img:nth-child(2)').stop(true).animate({
  //     opacity:1
  //   },duration);
  // })

  // .on('mouseout',function(){
  //   $(this).stop(true).animate({
  //     backgroundColor:'#fff',
  //     color:'#01b169'
  //   },duration);
  //   $(this).find('img:first-child').stop(true).animate({
  //     opacity:1
  //   },duration);
  //   $(this).find('img:nth-child(2)').stop(true).animate({
  //     opacity:0
  //   },duration);
  // });


function initGallery(data){
	allData = data;
	filteredData = allData;
	addItems();
	$loadMoreButton.on('click',addItems);
}


function addItems(filter){
	var elements=[],
		slicedData = filteredData.slice(added, added + addItemCount);
		// 切割的陣列.slice(startIndex,切幾分);
		// arr['a','b','c','d','e']
		// arr.slice(0,2) -> ['a','b']

    $.each(slicedData,function(i,item){
        var itemHTML =
        '<li class="gallery-item is-loading">'+
        '<a href="' + item + '">'+
        '<img width="200px"; src="img/' + item + '" alt="">' +
        '<span class="caption"><span class="innter">'+
        '<b class="title">'+ item + '</b>'+
        '</span></span></a></li>';

        elements.push($(itemHTML).get(0));
    });

    $container
    .append(elements)
    .imagesLoaded(function() {
    	$(elements).removeClass('is-loading');
    	$container.masonry('appended',elements);
    });


	added += slicedData.length;
	if(added<filteredData.length){
		$loadMoreButton.show();
	}else{
		$loadMoreButton.hide();
	}
}


function filterItems(){
}


function hoverDirection (e) {
    var $overlay = $(this).find('.caption'),
    side = getMouseDirection(e),
    animateTo,
    positionIn={
        top:'0%',
        left:'0%'
    },
    positionOut = (function (){
        switch(side){
            case 0:
            return {top:'-100%',left:'0%'};
            break;
            case 1:
            return {top:'0%',left:'100%'};
            break;
            case 2:
            return {top:'100%',left:'0%'};
            break;
            default:
            return {top:'0%', left:'-100%'};
            break;
        }
    })();

    if(e.type === 'mouseenter'){
        animateTo = positionIn;
        $overlay.css(positionOut);
    }else{
        animateTo = positionOut;
    }

    $overlay.stop(true).animate(animateTo,250, 'easeOutExpo');
}


// 偵測滑鼠方向的函數
// http://stackoverflow.com/a/3647634
function getMouseDirection (event) {
    //e.pageX, e.pageY => 取得滑鼠事件的座標
    var $el = $(event.currentTarget),
        offset = $el.offset(),
        w = $el.outerWidth(),
        h = $el.outerHeight(),
        x = (event.pageX - offset.left - w / 2) * ((w > h)? h / w: 1),
        y = (event.pageY - offset.top - h / 2) * ((h > w)? w / h: 1),
        direction = Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90  + 3) % 4;
    return direction;
}

});