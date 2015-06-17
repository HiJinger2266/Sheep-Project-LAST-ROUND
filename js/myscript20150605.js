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

    var gallery = ["DSC_1067.JPG", "DSC_1086.JPG", "DSC_1113.JPG", "DSC_1132.JPG", "DSC_1133.JPG", "DSC_1143.JPG", "DSC_1145.JPG", "DSC_1147.JPG", "DSC_1159.JPG", "DSC_1163.JPG", "DSC_1179.JPG", "DSC_1193.JPG", "DSC_1207.JPG", "DSC_1219.JPG", "DSC_1221.JPG", "DSC_1230.JPG", "DSC_1234.JPG", "DSC_1238.JPG", "DSC_1251.JPG", "DSC_1260.JPG", "DSC_1264.JPG", "DSC_1283.JPG", "DSC_1303.JPG", "DSC_1308.JPG", "DSC_1314.JPG", "DSC_1316.JPG", "DSC_1321.JPG", "DSC_1323.JPG", "DSC_1324.JPG", "DSC_1326.JPG", "DSC_1327.JPG", "DSC_1329.JPG", "DSC_1339.JPG", "DSC_1350.JPG", "DSC_1354.JPG", "DSC_1355.JPG", "DSC_1370.JPG", "DSC_1371.JPG", "DSC_1372.JPG", "DSC_1385.JPG", "DSC_1399.JPG", "DSC_1409.JPG", "DSC_1427.JPG", "DSC_1454.JPG", "DSC_1456.JPG", "DSC_1538.JPG", "DSC_1585.JPG", "DSC_1597.JPG", "DSC_1601.JPG", "DSC_1629.JPG", "DSC_1634.JPG", "DSC_1636.JPG", "DSC_1652.JPG", "DSC_1659.JPG", "DSC_1660.JPG", "DSC_1674.JPG", "DSC_1681.JPG", "DSC_1682.JPG", "DSC_1698.JPG", "DSC_1737.JPG"]
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