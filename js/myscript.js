$(function() {

  var duration=300;

  $('.service button')
  .on('mouseover',function(){
    $(this).stop(true).animate({
      backgroundColor:'#faee00',
      color:'#000'
    },duration);
    $(this).find('img:first-child').stop(true).animate({
      opacity:0
    },duration);
    $(this).find('img:nth-child(2)').stop(true).animate({
      opacity:1
    },duration);
  })

  .on('mouseout',function(){
    $(this).stop(true).animate({
      backgroundColor:'#fff',
      color:'#01b169'
    },duration);
    $(this).find('img:first-child').stop(true).animate({
      opacity:1
    },duration);
    $(this).find('img:nth-child(2)').stop(true).animate({
      opacity:0
    },duration);
  });





// $('.filter-form input[type="radio"]').button({
//     icons:{primary:'ui-icon'}
//     /* button widget */
    // });

    // var $container = $('#gallery'),
    // $loadMoreButton = $('#load-more'),
    // $filter = $('#gallery-filter'),
    // addItemCount = 16,
    // added = 0,
    // allData = [],
    // filteredData = [];

    // $container.masonry({
    //   columnWidth: 230,
    //   gutter: 10,
    //   itemSelector: '.gallery-item'
    // });


  //幻燈片
  var $slides = $('.slideshow').find('img'),
        //find不只找下ㄧ層子元素，而是所有子層都會去找
        slideCount = $slides.length,
        currentIndex = 0;

        // console.log($slides.eq(currentIndex).attr('src'));
        $slides.eq(currentIndex).fadeIn();
    //eq(index) 代表取得jquery物件陣列中的第幾個
    //fadeIn() 則是將display:none不顯示的項目使用淡入呈現

    setInterval(showNextSlide,3000);
    //js原生語法:1.要做的function, 2.間隔時間

    function showNextSlide(){
      var nextIndex = (currentIndex+1)%slideCount;
      $slides.eq(currentIndex).fadeOut();
      //fadeOut() = 淡出
      $slides.eq(nextIndex).fadeIn();
      currentIndex = nextIndex;
    }

    $('.tumbnail').each(function(i,item){
      $(item).click(function(){
        var $lightbox = $('#lightbox');

        var title = $(this).find('.caption').text();
        var des = $(this).find('.des').html();
        $lightbox.find('h1').text(title);
        $lightbox.find('p').html(des);

        var imgPath = $(this).find('img').attr('src');
        $lightbox.find('img').attr('src',imgPath);
        $lightbox.show(500,'swing');
        //$(selector).show(speed,easing,callback);
        //  $lightbox.slideToggle(500,'swing');
      });
    });

    //light box close
    $('body').click(function(e){
      if(e.target.id=='lightbox'){
        $('#lightbox').hide();
      }
    })

    //title bar
    var $window = $(window),//瀏覽器視窗物件
    $nav = $('.nav'),
    navOffsetTop = $nav.offset().top;

    $window.on('scroll',function(){
      if($window.scrollTop()>navOffsetTop){
        //scrollTop()當scroll移動時看他離視窗的頂端有多遠
        $nav.addClass('sticky');
      }else{
        $nav.removeClass('sticky');
      }
    });

    $window.trigger('scroll');
    //trigger(method_name)方法為觸發元素中的任何事件
    //因為有可能重整網頁但沒有觸發scroll事件
    //所以我們一開始就先觸發scroll來檢查offset
    
  });






// var gallery = ["20130813231.JPG", "20130813233.JPG", "20130813234.JPG", "20130813237.JPG", "20130814249.JPG", "20130814252.JPG", "20130814256.JPG", "20130814262.JPG", "20130814263.JPG", "20130815270.JPG", "20130815283.JPG", "20130815285.JPG", "20130815288.JPG", "20130815293.JPG", "20130815300.JPG", "20130815302.JPG", "20130815305.JPG", "20130815315.JPG", "20130815320.JPG", "20130815323.JPG", "20130815333.JPG", "20130815335.JPG", "20130815337.JPG", "20130815342.JPG", "20130815344.JPG", "20130815349.JPG", "20130815361.JPG", "20130815363.JPG", "20130816381.JPG", "20130816384.JPG", "20130816386.JPG", "20130816391.JPG", "20130816399.JPG", "20130816402.JPG", "20130816403.JPG"]
// initGallery(gallery);

// $('.gallery-item img').click(function(){
//   var s = './img/'+ $(this).attr('src');
//   console.log(s);
//   $.colorbox({
//     href:s,
//   })
// });

// function initGallery(data){
//   allData = data;
//   filteredData = allData;
//   addItems();
//   $loadMoreButton.on('click',addItems);
// }

// function addItems(filter){
//   var elements=[],
//   slicedData = filteredData.slice(added, added + addItemCount);
//     // 切割的陣列.slice(startIndex,切幾分);
//     // arr['a','b','c','d','e']
//     // arr.slice(0,2) -> ['a','b']

//     $.each(slicedData,function(i,item){
//       var itemHTML =
//       '<li class="gallery-item is-loading">'+
//       '<a href="' + item + '">'+
//       '<img width="200px"; src="img/' + item + '" alt="">' +
//       '<span class="caption"><span class="innter">'+
//       '<b class="title">'+ item + '</b>'+
//       '</span></span></a></li>';

//       elements.push($(itemHTML).get(0));
//     });

//     $container
//     .append(elements)
//     .imagesLoaded(function() {
//       $(elements).removeClass('is-loading');
//       $container.masonry('appended',elements);
//     });


//     added += slicedData.length;
//     if(added<filteredData.length){
//       $loadMoreButton.show();
//     }else{
//       $loadMoreButton.hide();
//     }
//   }

// function getMouseDirection (event) {
//     //e.pageX, e.pageY => 取得滑鼠事件的座標
//     var $el = $(event.currentTarget),
//         offset = $el.offset(),
//         w = $el.outerWidth(),
//         h = $el.outerHeight(),
//         x = (event.pageX - offset.left - w / 2) * ((w > h)? h / w: 1),
//         y = (event.pageY - offset.top - h / 2) * ((h > w)? w / h: 1),
//         direction = Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90  + 3) % 4;
//     return direction;
// }

// });