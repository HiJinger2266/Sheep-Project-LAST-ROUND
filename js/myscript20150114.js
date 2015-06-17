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

    var gallery = ["20150114066.JPG", "20150114081.JPG", "20150114096.JPG", "20150114099.JPG", "20150114120.JPG", "20150114123.JPG", "20150114148.JPG", "20150114152.JPG", "20150114162.JPG", "20150114168.JPG", "20150114169.JPG", "20150114173.JPG", "20150114181.JPG", "20150114185.JPG", "20150114200.JPG", "20150114204.JPG", "20150114210.JPG", "20150114216.JPG", "20150114223.JPG", "20150114230.JPG", "20150114234.JPG", "20150114237.JPG", "20150114238.JPG", "20150114241.JPG", "20150114247.JPG", "20150114251.JPG", "20150114258.JPG", "20150114264.JPG", "20150114265.JPG", "20150114274.JPG", "20150114282.JPG", "20150114287.JPG", "20150114288.JPG", "20150114300.JPG", "20150114306.JPG", "20150114309.JPG", "20150114330.JPG", "20150114333.JPG", "20150114338.JPG", "20150114340.JPG", "20150114342.JPG", "20150114347.JPG", "20150114354.JPG", "20150114358.JPG", "20150114361.JPG", "20150114364.JPG", "20150114373.JPG", "20150114379.JPG", "20150114386.JPG", "20150114393.JPG", "20150114417.JPG", "20150114425.JPG", "20150114426.jpg", "20150114431.JPG", "20150114445.JPG", "20150114447.JPG", "20150114448.JPG", "20150114460.JPG", "20150114467.JPG", "20150114491.JPG"]
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