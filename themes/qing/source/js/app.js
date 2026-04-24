/*!========================================================================
 *  hexo-theme-snippet: app.js v1.0.0
 * ======================================================================== */
window.onload = function() {
    var $body = document.body,
        $mnav = document.getElementById("mnav"), //获取导航三角图标
        $mainMenu = document.getElementById("main-menu"), //手机导航
        $process = document.getElementById('process'), //进度条
        $ajaxImgs = document.querySelectorAll('.img-ajax'), //图片懒加载
        $commentsCounter = document.getElementById('comments-count'),
        $gitcomment = document.getElementById("gitcomment"),
        $backToTop = document.getElementById("back-to-top"),
        $toc = document.getElementById("article-toc"),
        timer = null;

    //设备判断
    var isPC = true;
    (function(designPercent) {
        function params(u, p) {
            var m = new RegExp("(?:&|/?)" + p + "=([^&$]+)").exec(u);
            return m ? m[1] : '';
        }
        if (/iphone|ios|android|ipod/i.test(navigator.userAgent.toLowerCase()) == true && params(location.search, "from") != "mobile") {
            isPC = false;
        }
    })();

    //手机菜单导航
    $mnav.onclick = function(){
        var navOpen = $mainMenu.getAttribute("class");
        if(navOpen.indexOf("in") != '-1'){
            $mainMenu.setAttribute("class","collapse navbar-collapse");
        } else {
            $mainMenu.setAttribute("class","collapse navbar-collapse in");
        }
    };

    //首页文章图片懒加载
    function imgsAjax($targetEles) {
        if (!$targetEles) return;
        var _length = $targetEles.length;
        if (_length > 0) {
            var scrollBottom = getScrollTop() + window.innerHeight;
            for (var i = 0; i < _length; i++) {
                (function(index) {
                    var $this = $targetEles[index];
                    var $this_offsetZero = $this.getBoundingClientRect().top + window.pageYOffset - document.documentElement.clientTop;
                    if (scrollBottom >= $this_offsetZero && $this.getAttribute('data-src') && $this.getAttribute('data-src').length > 0) {
                        if ($this.nodeName.toLowerCase() === 'img') {
                            $this.src = $this.getAttribute('data-src');
                            $this.style.display = 'block';
                            
                            // Remove Zhui loading wrapper when image loads
                            $this.onload = function() {
                                var loadingWrapper = this.previousElementSibling;
                                if (loadingWrapper && loadingWrapper.classList.contains('img-ajax-loading')) {
                                    loadingWrapper.style.display = 'none';
                                }
                            };
                        } else {
                            var imgObj = new Image();
                            imgObj.onload = function() {
                                $this.innerHTML = "";
                            };
                            imgObj.src = $this.getAttribute('data-src');
                            $this.style.backgroundImage = "url(" + $this.getAttribute('data-src') + ")";
                        }
                        $this.removeAttribute('data-src'); //为了优化，移除
                    }
                })(i);
            }
        }
    }

    //获取滚动高度
    function getScrollTop() {
        return ($body.scrollTop || document.documentElement.scrollTop);
    }
    //滚动回调
    var scrollCallback = function() {
        if ($process) {
            $process.style.width = (getScrollTop() / ($body.scrollHeight - window.innerHeight)) * 100 + "%";
        }
        (isPC && getScrollTop() >= 300) ? $backToTop.removeAttribute("class","hide") : $backToTop.setAttribute("class","hide");
        imgsAjax($ajaxImgs);
    };
    scrollCallback();

    //监听滚动事件
    window.addEventListener('scroll', function() {
        if($toc){
            var top = $toc.offsetTop;
            var left = $toc.offsetLeft;
            var width = $toc.offsetWidth;
            if(getScrollTop() <= top){
                $toc.style = "";
            } else {
                $toc.style.position = "fixed";
                $toc.style.top = "5px";
                $toc.style.left = left + "px";
                $toc.style.width = width + "px"
            }
        }
        clearTimeout(timer);
        timer = setTimeout(function fn() {
            scrollCallback();
        }, 200);
    });

    //返回顶部
	$backToTop.onclick = function() {
	    cancelAnimationFrame(timer);
	    timer = requestAnimationFrame(function fn() {
	        var sTop = getScrollTop();
	        if (sTop > 0) {
	            $body.scrollTop = document.documentElement.scrollTop = sTop - 50;
	            timer = requestAnimationFrame(fn);
	        } else {
	            cancelAnimationFrame(timer);
	        }
	    });
	};

    // Hide Zhui Global Loading
    var $globalLoading = document.getElementById('zhui-global-loading');
    if ($globalLoading) {
        $globalLoading.style.display = 'none';
    }

    //文章详情页图片自动添加 alt 描述
    function addImageCaptions() {
        var postContent = document.querySelector('.post-content');
        if (!postContent) return;
        
        var images = postContent.querySelectorAll('img');
        for (var i = 0; i < images.length; i++) {
            var img = images[i];
            var altText = img.getAttribute('alt');
            
            // Skip if no alt text or if it's already inside a figure with figcaption
            if (!altText || altText.trim() === '' || img.parentNode.nodeName.toLowerCase() === 'figure') {
                continue;
            }
            
            // Check if caption already exists to avoid duplicates
            if (img.nextSibling && img.nextSibling.className === 'image-caption') {
                continue;
            }
            
            // If image is inside a div with text-align center (common in markdown), append to the div instead
            var parent = img.parentNode;
            var isCenterDiv = parent.nodeName.toLowerCase() === 'div' && 
                             (parent.getAttribute('align') === 'center' || parent.style.textAlign === 'center');
                             
            // Create a span element for the caption
            var caption = document.createElement('span');
            caption.className = 'image-caption';
            caption.innerText = altText;
            
            if (isCenterDiv) {
                // If it's a center div, append it inside the div after the image
                if (img.nextSibling) {
                    parent.insertBefore(caption, img.nextSibling);
                } else {
                    parent.appendChild(caption);
                }
            } else {
                // Otherwise insert it after the image
                if (img.nextSibling) {
                    parent.insertBefore(caption, img.nextSibling);
                } else {
                    parent.appendChild(caption);
                }
            }
        }
    }
    addImageCaptions();

    // 初始化 medium-zoom
    if (typeof mediumZoom === 'function') {
        var zoom = mediumZoom('.post-content img:not(.no-zoom), #post-gallery img:not(.no-zoom)', {
            margin: 24
        });
    }

};