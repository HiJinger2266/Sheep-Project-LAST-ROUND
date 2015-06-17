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

    var gallery = ["20140604871.JPG", "20140604889.JPG", "20140604914.JPG", "20140604942.JPG", "20140604019.JPG", "20140604044.JPG", "20140604077.JPG", "20140604080.JPG", "20140604084.JPG", "20140604090.JPG", "20140604112.JPG", "20140604136.JPG", "20140604143.JPG", "20140604149.JPG", "20140604150.JPG", "20140604151.JPG", "20140604157.JPG", "20140604171.JPG", "20140604177.JPG", "20140604179.JPG", "20140604181.JPG", "20140604182.JPG", "20140604193.JPG", "20140604216.JPG", "20140604221.JPG", "20140604231.JPG", "20140604233.JPG", "20140604234.JPG", "20140604246.JPG", "20140604251.JPG", "20140604254.JPG", "20140604272.JPG", "20140604273.JPG", "20140604276.JPG", "20140604294.JPG", "20140604298.JPG", "20140604302.JPG", "20140604312.JPG", "20140604325.JPG", "2014-6-4-18-0-30-pic23.jpg",]
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