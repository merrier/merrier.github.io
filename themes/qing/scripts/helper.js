function lazyImage(post) {
    var content = post.content.toString();
    var imgRe = /<img.*?\ssrc=[\'\"]\S+[\'\"]\s.*?>/gim;
    var urlRe = /(http:|https:|\/|\.)\S+(?="\s)/i;
    var imgUrlsArr = content.match(imgRe);
    var data = [];
    imgUrlsArr&&imgUrlsArr.forEach(function (item) {
        item.match(urlRe) && data.push(item.match(urlRe)[0]);
    });
    return data;
}

hexo.extend.helper.register('lazyImage',lazyImage);

hexo.extend.helper.register('getPostImage', function(post) {
    var theme = this.theme;
    var urls = lazyImage(post) || [];
    var random = 0;
    if (urls.length > 0) {
        random = Math.floor(Math.random() * (urls.length));
    }
    
    var urls2 = theme.defaultImgs || [];
    var random2 = 0;
    if(urls2.length > 0){
        random2 = Math.floor(Math.random() * (urls2.length));
    }
    
    return post.img || (urls.length > 0 && urls[random]) || (urls2.length > 0 && urls2[random2]) || '';
});

hexo.extend.helper.register('getCategoriesArgs', function(theme) {
    return {
        showcount: theme.cate_config.show_count,
        transform: function(name){
            return '<i class="fa" aria-hidden="true">'+name+'</i>';
        },
        show_current: theme.cate_config.show_current
    };
});

hexo.extend.helper.register('getArchivesArgs', function(theme) {
    return {
        show_count: theme.arch_config.show_count,
        type: theme.arch_config.type,
        order: theme.arch_config.order,
        format: theme.arch_config.format,
        transform: function (name) {
            return '<i class="fa" aria-hidden="true">'+ name + '</i>';
        }
    };
});


