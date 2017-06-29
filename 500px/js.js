/// <reference path="jquery.js" />
window.onload = function () {
    window.params =
	{
	    interval: -1,
	    category: '',
	};
    animate();
    parseUrl();
    if (!checkParams()) {
        alert('Wrong interval or wrong category given');
        return;
    }
    prepareThings();
}
function checkParams() {
    var params = window.params;
    if (params.category == null || params.category == undefined)
        return false;
    params.category = params.category.toLowerCase();
    if (params.category != 'popular' &&
		params.category != 'upcoming' &&
		params.category != 'fresh' &&
		params.category != 'editors' &&
		params.category != 'custom') return false;
    if (params.interval == null || params.interval == undefined)
        return false;
    if (params.interval < 5)
        return false;
    return true;
}
function getUrl() {
    var par = window.params;
    var url = "./fetch.php?url=https://500px.com/";
    if (par.category != "custom")
        return url + par.category + ".rss";
    else
        return url + "search.rss?q="
            + ((par.q == undefined) ? "" : par.q)
            + "&type=photos&categories="
            + ((par.categories == undefined) ? "" : par.categories)
            + "&sort="
            + ((par.sort == undefined) ? "" : par.sort);
}
function prepareThings() {
    var params = window.params;
    params.images = [];
    params.quotes = [];
    params.quotes.pointer = 0;
    params.images.readies = 0;
    params.images.pointer = 0;
    $.ajax({
        url: getUrl(),
        dataType: 'xml',
        success: function (data) {
            $(data).find('channel>item').each(function (i, value) {
                var title = $(value).find('title').html();
                alert(title);
                // title here recieves the value of undefined in IE affects item.title in code below
                var item = {};
                if (params.category == "custom") {
                    item.title = title;
                    item.author = $(value).find('author').html();
                    item.title+=" - "+item.author;
                }
                else {
                    item.author = title.substring(title.lastIndexOf(' by ') + 4);
                    item.title = title.substring(0, title.length - item.author.length - 4)+" - "+item.author;
                }
                var img = new Image();
                img.onload = function () {
                    params.images.readies++;
                    console.log(params.images.readies + " ready of " + params.images.length);
                }
                img.onerror = function () {
                    params.images.readies++;
                    console.log(params.images.readies + " ready of " + params.images.length);
                }
                if (params.category == "custom")
                {
                    img.src=$(value).find('content').attr('url');
                    //Img does not properly load on Firefox and IE
                }
                else
                {
                    img.src = $($(value).find('description').text()).find('img').attr('src');
                }
                params.images.push(img);
                item.image = img;
                params.quotes.push(item);
            });
        }
    });
    waitABit();
}
function shuffle(a) {
    var j, x, i;    
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}
function getNextImage() {
    return window.params.quotes
    [window.params.quotes.pointer].image.src;
}
function getNextQuote() {
    return window.params.quotes
    [window.params.quotes.pointer].title;
}
function getNextAuthor() {
    return window.params.quotes
    [window.params.quotes.pointer].author;
}
function waitABit() {
    if (window.params.images.readies == 0 || window.params.images.readies < window.params.images.length) {
        setTimeout(waitABit, 100);
        return;
    }
    else {
        var bimage = $('#backimg');
        var fimage = $('#frontimg');
        var image = getNextImage();
        bimage.attr('src', image);
        fimage.attr('src', image);
        fimage.addClass('blur');
        var nextQuote = getNextQuote();
        var nextAuthor = getNextAuthor();
        $('.wrapper').html(nextQuote);
        $('#author').html(nextAuthor);
        window.onresize = handleResize;
        handleResize();
        setTimeout(startAnimation, 1000);
    }
}
function startAnimation() {
    var fcontainer = $('#frontcontainer');
    var quota = $('#quote');
    var author = $('#author');
    var bimage = $('#backimg');
    var fimage = $('#frontimg');
    var nextImage = getNextImage();
    var nextQuote = getNextQuote();
    var nextAuthor = getNextAuthor();
    window.params.quotes.pointer = (++window.params.quotes.pointer) % window.params.quotes.length;
    fimage.css('transition', '2s opacity');
    fimage.addClass('blur');
    bimage.removeClass('blur');
    fimage.addClass('show');
    fimage.one('transitionend',
        function () {
            //start showing 
            fimage.hide();
            bimage.css('transition', '' + (window.params.interval - 2) + 's transform');
            bimage.addClass('move');
            fimage.css('transition', '');
            fimage.removeClass('show');
            bimage.one('transitionend',
				function () {
				    //next slide
				    fimage.addClass('move');
				    fimage.removeClass('blur');
				    fimage.show();
				    bimage.attr('src', nextImage)
				    bimage.css('transition', '');
				    bimage.removeClass('move');
				    bimage.addClass('blur');
				    fcontainer.css('transition', '3s opacity');
				    fcontainer.addClass('show');
				    fcontainer.one('transitionend', function () {
				        //after faded out
				        quota.css('transition', '');
				        quota.toggleClass('fadein');
				        $('.wrapper').html(nextQuote);
				        author.css('transition', '');
				        author.toggleClass('showup');
				        author.toggleClass('showuptext');
				        author.html(nextAuthor);
				        fimage.css('transition', 'none');
				        fimage.removeClass('move');
				        fimage.addClass('blur');
				        fimage.attr('src', nextImage)
				        fcontainer.css('transition', '');
				        fcontainer.removeClass('show');
				        startAnimation();
				        return;
				    });
				    return;
				});
        });
    setTimeout(function () {
        quota.css('transition', '1.5s opacity');
        quota.toggleClass('fadein');
        author.css('transition', '1s transform');
        author.toggleClass('showup');
        author.one('transitionend',
            function () {
                author.css('transition', '0.5s color');
                author.toggleClass('showuptext');
            });

    }, 1500);
    // var quoteOpacityTween=new TWEEN.Tween({opacity:0})
    // .to({opacity:1},1500).onUpdate(function(){quota.css('opacity',this.opacity)}).delay(2000);
    // quoteOpacityTween.start();
    // var authorTween=new TWEEN.Tween({pos:-100})
    // .to({pos:-30},1000).onUpdate(function(){author.style.transform='translateX('+this.pos+'%)'}).delay(2500);
    // authorTween.onComplete(function(){
    // 	var opacityTween=new TWEEN.Tween({opacity:0})
    // 	.to({opacity:1},500).onUpdate(function(){author.style.color='rgba(255,255,255,'+this.opacity+')'})
    // opacityTween.start();
    // });
    // authorTween.start();
}
function handleResize() {
    $(document.body).css('width', window.innerWidth);
    $(document.body).css('height', window.innerHeight);
    $('#border').css('width', window.innerWidth - 10);
    $('#border').css('height', window.innerHeight - 10);
    var container = $('.container');
    var author = $('#author');
    var quote = $('#quote');
    container.css('opacity', 0);
    author.css('font-size', getValue(20));
    quote.css('font-size', getValue(15));
    author.css('padding-right', getValue(20));
    quote.css('line-height', getValue(25) + 'px');
    quote.css('min-height', getValue(50));
    new TWEEN.Tween({ opacity: 0 }).to({ opacity: 1 }, 500).onUpdate(function () { container.css('opacity', this.opacity) }).start();

}
function getValue(value) {
    return parseInt(window.innerHeight * value / 384.0)
}
function parseUrl() {
    /// Pattern to get (key=value) pairs from GET request
    var pattern = /(\w{1,}=\w{1,})/g;
    var results = window.location.href.match(pattern);
    var obj = {};

    if (results != null) {
        for (var i = 0; i < results.length; i++) {
            var chunks = results[i].split('=');
            obj[chunks[0]] = chunks[1];
        }
    }
    window.params = obj;
}
function animate() {
    TWEEN.update();
    requestAnimationFrame(animate);
}