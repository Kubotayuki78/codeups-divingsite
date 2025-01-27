jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる

  let topBtn = $(".to-top");
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
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      300,
      "swing"
    );
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

  // ハンバーガーメニューボタンがクリックされたときのイベントハンドラを設定
  $(".drawer-icon").click(function () {
    // 現在のbodyタグのoverflowスタイルを確認
    if ($("body").css("overflow") === "hidden") {
      // もしoverflowがhiddenなら、bodyのスタイルを元に戻す
      $("body").css({ height: "", overflow: "" });
    } else {
      // そうでなければ、bodyにheight: 100%とoverflow: hiddenを設定し、スクロールを無効にする
      $("body").css({ height: "100%", overflow: "hidden" });
    }
  });

  $(".drawer-icon").on("click", function () {
    $(".header__inner").toggleClass("active", $(this).hasClass("is-checked"));
  });

  // スムーススクロール (絶対パスのリンク先が現在のページであった場合でも作動)

  $(document).on("click", 'a[href*="#"]', function () {
    let time = 400;
    let header = $("header").innerHeight();
    let target = $(this.hash);
    if (!target.length) return;
    let targetY = target.offset().top - header;
    $("html,body").animate({ sscrollTop: targetY }, time, "swing");
    return false;
  });

  const swiper = new Swiper(".fvSwiper", {
    loop: true,
    allowTouchMove: false,
    clickable: false,
    autoplay: {
      delay: 2000,
    },
    effect: "fade", //追加 フェード機能をONにする
    speed: 2000, //追加
  });

  const swiper2 = new Swiper(".cardSwiper", {
    slidesPerView: "1.264",
    spaceBetween: 20,
    loop: true,
    centeredSlidesBounds: false, //アクティブなスライドを中央に配置
    centeredSlides: false, //スライダーの最初と最後に余白を追加せずスライドが真ん中に配置される

    pagination: {
      // el: ".swiper-pagination",
      // clickable: true,
    },
    breakpoints: {
      768: {
        loop: true, //繰り返し指定
        spaceBetween: 42, //スライド感の余白
        slidesPerView: "3", //一度に表示するスライド枚数

        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      1200: {
        loop: true, //繰り返し指定
        spaceBetween: 42, //スライド感の余白
        slidesPerView: "3.97", //一度に表示するスライド枚数

        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    },
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
        $(this)
          .delay(200)
          .animate({ width: "100%" }, speed, function () {
            image.css("opacity", "1");
            $(this).css({ left: "0", right: "auto" });
            $(this).animate({ width: "0%" }, speed);
          });
        counter = 1;
      }
    });
  });
});
