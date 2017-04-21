/*轮播图*/
/*
1. 定时器 每隔2秒自动切换图片 且当鼠标划过图片 定时器停止，鼠标划出图片定时器重启。
2. 底部焦点随着图片而改变，点击焦点切换图片。
2. 点击左右箭头切换图片。
*/
function getId(id) {
    return typeof (id) !== 'string' ? "" : document.getElementById(id);
};

/*得到banner图片*/
var banner = getId("banner");
var imgs = banner.getElementsByTagName('img');
var len = imgs.length;
/*得到焦点*/
var dotBox = getId("dots");
var dots = dotBox.children;
/*得到左右箭头*/
var arrows = getId('arrow').children;
var arrowPrev = getId("prev");
var arrowNext = getId("next");

/*得到每一个小菜单,和菜单内容*/
var menus = getId("menuSav").getElementsByTagName('a');
var menuContent = getId('menuContent');
var menuItems = menuContent.children;

console.log(menuContent)
var timer = null;
var index = 0;

/*清除定时器*/
function stopAutoplay() {
    if(timer){
        clearInterval(timer);
    };
};

function sliderImg() {
    /*鼠标移进*/
    banner.onmouseover = function () {
        stopAutoplay();
    }
    /*鼠标移出*/
    banner.onmouseout = function () {
        stopAutoplay();
        timer = setInterval(function () {
            index ++;
            if (index >= len) {
                index = 0
            }
            imgChange();
        },2000)
    };
    banner.onmouseout();

    /*点击焦点切换图片*/
    for(var i=0; i<dots.length; i++){
        dots[i].index = i
        dots[i].onclick = function () {
            index = this.index;
            imgChange();
        };
    };
    dotBox.onmouseover = function () {
        stopAutoplay();
    };
    dotBox.onmouseout = function () {
        banner.onmouseout();
    }

    /*点击左右按钮切换图片*/
    arrowPrev.onclick = function () {
        index--;
        if (index < 0){
            index = len-1;
        }
        imgChange();
    };
    arrowNext.onclick = function () {
        index++;
        if (index >= len) {
            index = 0;
        };
        imgChange();
    }
    for(var i=0; i<arrows.length; i++){
        arrows[i].onmouseover = function () {
            stopAutoplay();
        };
        arrows[i].onmouseout = function () {
            banner.onmouseout();
        };
    };

    /*左侧tab栏切换*/
    for(var i=0; i<menus.length; i++) {
        menus[i].index = i;
        menus[i].onmouseover = function () {
            menuContent.style.display = 'block';
            for (var j=0; j<menus.length; j++) {
                menus[j].className = '';
                menuItems[j].className = 'innerBox';
            }
            this.className = 'hover';
            menuItems[this.index].className = 'innerBox current';
        };

        menus[i].onmouseout = function () {
            menuContent.style.display = 'none';
        };
    }

    /*鼠标移动到菜单时，菜单显示，离开时菜单隐藏*/
    menuContent.onmouseover = function () {
        this.style.display = 'block';
    };
    menuContent.onmouseout = function () {
        this.style.display = 'none';
    }

}
sliderImg();

/*图片切换*/
function imgChange() {
    for(var i=0; i<imgs.length; i++) {
        imgs[i].className = "";
        dots[i].className = "";
    };
    imgs[index].className = "show";
    dots[index].className = "active";
};