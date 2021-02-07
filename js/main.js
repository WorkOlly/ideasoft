"use strict";

(function () {
  "use strict";

  var body = document.querySelector('body'),
      isMobile = false,
      scrollTopPosition,
      browserYou,
      _winWidth = $(window).outerWidth();

  var genFunc = {
    initialized: false,
    initialize: function initialize() {
      if (this.initialized) return;
      this.initialized = true;
      this.build();
    },
    build: function build() {
      // browser
      browserYou = this.getBrowser();

      if (browserYou.platform == 'mobile') {
        isMobile = true;
        document.documentElement.classList.add('mobile');
      } else {
        document.documentElement.classList.add('desktop');
      }

      if (browserYou.browser == 'ie') {
        document.documentElement.classList.add('ie');
      }

      if (navigator.userAgent.indexOf("Edge") > -1) {
        document.documentElement.classList.add('edge');
      }

      if (navigator.userAgent.search(/Macintosh/) > -1) {
        document.documentElement.classList.add('macintosh');
      }

      if (browserYou.browser == 'ie' && browserYou.versionShort < 9 || (browserYou.browser == 'opera' || browserYou.browser == 'operaWebkit') && browserYou.versionShort < 18 || browserYou.browser == 'firefox' && browserYou.versionShort < 30) {
        alert('Обновите браузер');
      }

      if (document.querySelector('.yearN') !== null) {
        this.copyright();
      }
    },
    copyright: function copyright() {
      var yearBlock = document.querySelector('.yearN'),
          yearNow = new Date().getFullYear().toString();

      if (yearNow.length) {
        yearBlock.innerText = yearNow;
      }
    },
    getBrowser: function getBrowser() {
      var ua = navigator.userAgent;

      var bName = function () {
        if (ua.search(/Edge/) > -1) return "edge";
        if (ua.search(/MSIE/) > -1) return "ie";
        if (ua.search(/Trident/) > -1) return "ie11";
        if (ua.search(/Firefox/) > -1) return "firefox";
        if (ua.search(/Opera/) > -1) return "opera";
        if (ua.search(/OPR/) > -1) return "operaWebkit";
        if (ua.search(/YaBrowser/) > -1) return "yabrowser";
        if (ua.search(/Chrome/) > -1) return "chrome";
        if (ua.search(/Safari/) > -1) return "safari";
        if (ua.search(/maxHhon/) > -1) return "maxHhon";
      }();

      var version;

      switch (bName) {
        case "edge":
          version = ua.split("Edge")[1].split("/")[1];
          break;

        case "ie":
          version = ua.split("MSIE ")[1].split(";")[0];
          break;

        case "ie11":
          bName = "ie";
          version = ua.split("; rv:")[1].split(")")[0];
          break;

        case "firefox":
          version = ua.split("Firefox/")[1];
          break;

        case "opera":
          version = ua.split("Version/")[1];
          break;

        case "operaWebkit":
          bName = "opera";
          version = ua.split("OPR/")[1];
          break;

        case "yabrowser":
          version = ua.split("YaBrowser/")[1].split(" ")[0];
          break;

        case "chrome":
          version = ua.split("Chrome/")[1].split(" ")[0];
          break;

        case "safari":
          version = ua.split("Safari/")[1].split("")[0];
          break;

        case "maxHhon":
          version = ua.split("maxHhon/")[1];
          break;
      }

      var platform = 'desktop';
      if (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())) platform = 'mobile';
      var browsrObj;

      try {
        browsrObj = {
          platform: platform,
          browser: bName,
          versionFull: version,
          versionShort: version.split(".")[0]
        };
      } catch (err) {
        browsrObj = {
          platform: platform,
          browser: 'unknown',
          versionFull: 'unknown',
          versionShort: 'unknown'
        };
      }

      return browsrObj;
    }
  };
  genFunc.initialize();
  $(document).on("click", ".js_validate button[type=submit], .js_validate input[type=submit]", function () {
    var valid = validate($(this).parents(".js_validate"));

    if (valid == false) {
      return false;
    }
  });
  /*Function validate*/

  function validate(form) {
    var error_class = "error";
    var norma_class = "pass";
    var e = 0;
    var reg = undefined;
    var email = false;

    function mark(object, expression) {
      if (expression) {
        object.parents('.input-group').addClass(error_class).removeClass('error-email').removeClass(norma_class);
        e++;

        if (email && object.val().length > 0) {
          object.parents('.input-group').addClass('error-email').removeClass(error_class);
        }
      } else object.parents('.input-group').addClass(norma_class).removeClass(error_class).removeClass('error-email');
    }

    form.find("[required]").each(function () {
      switch ($(this).attr("data-validate")) {
        case undefined:
          mark($(this), $.trim($(this).val()).length === 0);
          break;

        case "email":
          email = true;
          reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
          mark($(this), !reg.test($.trim($(this).val())));
          email = false;
          break;

        case "phone":
          reg = /[0-9 -()+]{10}$/;
          mark($(this), !reg.test($.trim($(this).val())));
          break;

        default:
          reg = new RegExp($(this).attr("data-validate"), "g");
          mark($(this), !reg.test($.trim($(this).val())));
          break;
      }
    });
    form.find('.js_valid_select').each(function () {
      var inp = $(this).find('.custom-option');
      var rezalt = 0;

      for (var i = 0; i < inp.length; i++) {
        if ($(inp[i]).hasClass('selection') === true) {
          rezalt = 1;
          break;
        } else {
          rezalt = 0;
        }
      }

      ;

      if (rezalt === 0) {
        $(this).addClass(error_class).removeClass(norma_class);
        e = 1;
      } else {
        $(this).addClass(norma_class).removeClass(error_class);
      }
    });

    if (e == 0) {
      return true;
    } else {
      form.find("." + error_class + " input:first").focus();
      return false;
    }
  } // validation end

})(); // auto height


function heightBlock() {
  $('.js_height-block').each(function (i, e) {
    var elH = e.getElementsByClassName("height");
    var maxHeight = 0;

    for (var i = 0; i < elH.length; ++i) {
      elH[i].style.height = "";

      if (maxHeight < elH[i].clientHeight) {
        maxHeight = elH[i].clientHeight;
      }
    }

    for (var i = 0; i < elH.length; ++i) {
      elH[i].style.height = maxHeight + "px";
    }
  });
} // sticky header


function scrollHeader() {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1) {
      $('header').addClass("sticky");
    } else {
      $('header').removeClass("sticky");
    }
  });
} // show more on success stories


function toggleBlocks() {
  $('.show-hide_btn').click(function () {
    $(this).parents(".success-brunch").find('.js-toggle .col-item:nth-child(n+5)').slideToggle('');
    $(this).toggleClass('show');

    if ($(this).hasClass('show')) {
      $(this).html('Show less');
    } else {
      $(this).html('Show more');
    }
  });
}

$(document).ready(function () {
  heightBlock(); // service tabs

  $('.js-tabs').easytabs({
    animate: true,
    tabActiveClass: "active",
    panelActiveClass: "active",
    panelContext: $('.tabs-container'),
    defaultTab: "li:first-child",
    tabs: "ul.tabs-list > li",
    updateHash: false
  }); // service dropdown on mobile

  $('.js-choice-tab').on('click', function () {
    $('.js-tabs').toggleClass('is-open');
  });
  $('.js-choice-tab').text($('.tabs-item.active').text());
  $('.tabs-item').on('click', function () {
    $('.js-tabs').removeClass('is-open');
    $('.js-choice-tab').text($('.tabs-item.active').text());
  }); // mobile menu

  $(".js-open-menu").on("click", function () {
    $(this).toggleClass("active");
    $("body").toggleClass("mm-open");
    $(".col-nav").toggleClass("open");
    $(".page-overlay").toggleClass("show");
  });
  $('.page-overlay').on('click', function () {
    $("this").removeClass("show");
    $('.js-open-menu').removeClass('active');
    $(".col-nav").removeClass("open");
    $('body').removeClass('mm-open');
  }); // init show more on success stories

  if ($(window).width() < 993) {
    toggleBlocks();
  } else {
    $('.show-hide_block').hide();
  } //fixed header


  scrollHeader(); // dropdown at form

  if ($('.js-select').length) {
    $('.js-select').select2({
      minimumResultsForSearch: Infinity
    });
  } // fancybox


  if ($('.js-fancybox').length) {
    $('.js-fancybox').fancybox({
      touch: false
    });
  } //scroll to anchor


  $(".header-nav__list li").on("click", "a", function (event) {
    $(".header-nav__link").removeClass("active");
    $(".col-nav").removeClass("open");
    $("body").removeClass("mm-open");
    $(".js-open-menu").removeClass("active");
    $(this).addClass("active");
    var id = $(this).prop('hash'),
        top = $(id).offset().top - 65;
    $('body,html').animate({
      scrollTop: top
    }, 500);
  });
});
$(window).resize(function () {
  heightBlock();
}); // callback func sticky header

window.onload = function () {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 500);
}; // cookie policy popup


function getCookie(name) {
  var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function addCookie(name, value, days) {
  var expires = "";

  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }

  var domain = window.location.host;
  document.cookie = name + "=" + (value || "") + expires + "; sameSite=none; secure=true; domain=" + domain + "; path=/;";
}

$(document).ready(function () {
  if (getCookie('cookie_policy') === undefined) {
    var messagePopup = $('#cookie-policy');
    var messageButton = $('#cookie-policy .main-btn');
    messagePopup.css("display", "block");
    messageButton.click(function () {
      document.cookie = "cookie_policy=1";
      messagePopup.css("display", "none");
    });
  }
});