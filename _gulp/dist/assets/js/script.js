"use strict";

jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる

  var topBtn = $(".to-top");
  topBtn.hide();

  // ボタンの表示設定
  $(window).scroll(function () {
    if ($(this).scrollTop() > 70) {
      // 指定px以上のスクロールでボタンを表示
      topBtn.fadeIn();
    } else {
      // 画面が指定pxより上ならボタンを非表示
      topBtn.fadeOut();
    }
  });

  // ボタンをクリックしたらスクロールして上に戻る
  topBtn.click(function () {
    $("body,html").animate({
      scrollTop: 0
    }, 300, "swing");
    return false;
  });

  //ドロワーメニュー
  $(".js-drawer").click(function () {
    if ($(".js-drawer").hasClass("is-checked")) {
      $(".js-drawer").removeClass("is-checked");
      // $("html").toggleClass("is-fixed");
      $(".js-sp-nav").fadeOut(300);
    } else {
      $(".js-drawer").addClass("is-checked");
      // $("html").toggleClass("is-fixed");
      $(".js-sp-nav").fadeIn(300);
    }
  });

  // スムーススクロール (絶対パスのリンク先が現在のページであった場合でも作動)

  $(document).on("click", 'a[href*="#"]', function () {
    var time = 400;
    var header = $("header").innerHeight();
    var target = $(this.hash);
    if (!target.length) return;
    var targetY = target.offset().top - header;
    $("html,body").animate({
      sscrollTop: targetY
    }, time, "swing");
    return false;
  });
  var swiper = new Swiper(".fvSwiper", {
    loop: true,
    allowTouchMove: false,
    clickable: false,
    autoplay: {
      delay: 3000
    }
  });
  var swiper2 = new Swiper(".cardSwiper", {
    slidesPerView: "1.2",
    spaceBetween: 20,
    loop: true,
    centeredSlidesBounds: false,
    //アクティブなスライドを中央に配置
    centeredSlides: false,
    //スライダーの最初と最後に余白を追加せずスライドが真ん中に配置される

    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    breakpoints: {
      768: {
        loop: true,
        //繰り返し指定
        spaceBetween: 42,
        //スライド感の余白
        slidesPerView: "3",
        //一度に表示するスライド枚数

        navigation: {
          nextEl: ".campaign-swiper-arrow__next",
          prevEl: ".campaign-swiper-arrow__prev"
        }
      },
      1200: {
        loop: true,
        //繰り返し指定
        spaceBetween: 42,
        //スライド感の余白
        slidesPerView: "3.97",
        //一度に表示するスライド枚数

        navigation: {
          nextEl: ".campaign-swiper-arrow__next",
          prevEl: ".campaign-swiper-arrow__prev"
        }
      }
    }
  });

  //要素の取得とスピードの設定
  var box = $(".js-colorbox"),
    speed = 700;

  //.colorboxの付いた全ての要素に対して下記の処理を行う
  box.each(function () {
    $(this).append('<div class="color"></div>');
    var color = $(this).find($(".color")),
      image = $(this).find("img");
    var counter = 0;
    image.css("opacity", "0");
    color.css("width", "0%");
    //inviewを使って背景色が画面に現れたら処理をする
    color.on("inview", function () {
      if (counter == 0) {
        $(this).delay(200).animate({
          width: "100%"
        }, speed, function () {
          image.css("opacity", "1");
          $(this).css({
            left: "0",
            right: "auto"
          });
          $(this).animate({
            width: "0%"
          }, speed);
        });
        counter = 1;
      }
    });
  });
});