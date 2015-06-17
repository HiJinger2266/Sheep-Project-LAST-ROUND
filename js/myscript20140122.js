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

    var gallery = ["20140122506.JPG", "20140122514.JPG", "20140122569.JPG", "20140122572.JPG", "20140122590.JPG", "20140122591.JPG", "20140122595.JPG", "20140122598.JPG", "20140122600.JPG", "20140122602.JPG", "20140122608.JPG", "20140122615.JPG", "20140122630.JPG", "20140122640.JPG", "20140122659.JPG", "20140122670.JPG", "20140122675.JPG", "20140122685.JPG", "20140122686.JPG", "20140122698.JPG", "20140122700.JPG", "20140122701.JPG", "20140122704.JPG", "20140122710.JPG", "20140122711.JPG", "20140122715.JPG", "20140122717.JPG", "20140122719.JPG", "20140122722.JPG", "20140122724.JPG", "20140122743.JPG", "20140122755.JPG", "20140122762.JPG", "20140123780.JPG", "20140123785.JPG", "20140123807.JPG", "20140123820.JPG", "20140123829.JPG", "20140123836.JPG", "20140123844.JPG", "20140123853.JPG", "20140123867.JPG", "20140123875.JPG", "20140123886.JPG", "20140123894.JPG", "20140123895.JPG", "20140123898.JPG", "20140123909.JPG", "20140123916.JPG", "20140123933.JPG", "20140123960.JPG", "20140123973.JPG", "20140123977.JPG", "20140123983.JPG", "20140123984.JPG", "20140123987.JPG", "20140123990.JPG", "20140123991.JPG", "20140124019.JPG", "20140124031.JPG", "20140124032.JPG", "20140124042.JPG", "20140124047.JPG", "20140124049.JPG", "20140124054.JPG", "20140124062.JPG", "20140124063.JPG", "20140124066.JPG", "20140124069.JPG", "20140124079.JPG", "20140124091.JPG", "20140124105.JPG", "20140124109.JPG", "20140124111.JPG", "20140124112.JPG", "20140124113.JPG", "20140124122.JPG", "20140124138.JPG", "20140124142.JPG", "20140124144.JPG", "全生合照.jpg", "報告1B.jpg", "報告2A.jpg", "報告2B.jpg"]
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