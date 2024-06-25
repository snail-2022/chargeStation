



// 导航栏高亮与移除
const systemLink = document.getElementById('daohanglandebiaoti');
const navLinks = document.querySelectorAll('.navbar ul li a');

systemLink.addEventListener('click', function(event) {
    event.preventDefault(); // 阻止默认跳转行为
    navLinks.forEach(link => link.classList.remove('active'));
});

navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // 阻止默认跳转行为
        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    });
});
// 导航栏高亮与移除

// 获取左右按钮和图片列表
let imgSum = 6      //图片数量
let index = 0       //当前显示图片索引

let focuSpans = document.querySelectorAll('.div-carousel-focus span')
let leftButton = document.querySelector('.div-carousel-left')
let rightButton = document.querySelector('.div-carousel-right')
let items = document.querySelector('.div-carousel-items')
let process, process1, process2

function showImg(nowIndex) {
    for(let i = 0; i < focuSpans.length; i++) {
        focuSpans[i].classList.remove('active')
    }
    focuSpans[(nowIndex >= 6)? 0: nowIndex].classList.add('active')
    // 模板字符串
    items.style.left = `${-100 * nowIndex}%`
}

function initListener() {
    // 下方按钮
    focuSpans.forEach(function(el, i){
        el.addEventListener('click', function() {
            clearTimeout(process1)
            clearTimeout(process2)
            clearInterval(process)
            index = i
            showImg(index)
            carousel()
        })
    })
}

// 自动轮播
function carousel() {
    process = setInterval(function(){
        index++
        showImg(index)
        // 显示的是第一张时（即尾部填充的最后一张）
        if( imgSum == index) {
            // 取消过渡，移动到第一张
            process1 = setTimeout(function(){
                index = 0
                items.style.transition = 'none'
                items.style.left = '0'
            }, 501)
            // 恢复过渡
            process2 = setTimeout(function() {
                items.style.transition = '.5s ease-in-out'
            }, 511)
        }
    }, 3000)
}
initListener()
carousel()
// 获取左右按钮和图片列表
// 鼠标点击事件
// 鼠标点击事件
// 鼠标点击事件
function bg3() {
    var rs = Math.floor(Math.random() * (170 - 100) + 100);
    var gs = Math.floor(Math.random() * (170 - 100) + 100);
    var bs = Math.floor(Math.random() * (100 - 90) + 90);
    return "rgb(" + rs + ',' + gs + ',' + bs + ")";
}

var as = ["富强", "民主", "文明", "和谐", "自由", "平等", "公正", "法制", "爱国", "敬业", "诚信", "友善"];

// 绑定到整个文档的点击事件
document.addEventListener('click', function (e) {
    var spans = document.createElement("h6");
    spans.textContent = as[Math.floor(Math.random() * as.length)];
    spans.style.position = "absolute";
    spans.style.color = bg3();
    spans.style.transition = "all .5s"; // 更改为 all 以包括 opacity 和 transform

    // 获取当前滚动偏移量
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

    spans.style.left = (e.clientX + scrollLeft) + 'px'; // 加上水平滚动偏移量
    spans.style.top = (e.clientY + scrollTop) + 'px'; // 加上垂直滚动偏移量

    // 初始状态
    spans.style.opacity = "0";
    spans.style.transform = "translateY(0) scale(1)";

    // 添加到文档
    document.body.appendChild(spans);

    // 动画效果
    setTimeout(function () {
        spans.style.opacity = "1";
        spans.style.transform = "translateY(-50px) scale(1.5)";
    }, 100);

    setTimeout(function () {
        spans.style.opacity = "0";
        spans.style.transform = "translateY(-200px) scale(0)";

        // 当动画完成后，从DOM中移除元素
        setTimeout(function () {
            spans.parentNode.removeChild(spans);
        }, 500);
    }, 500);
});

// 鼠标点击事件
// 鼠标点击事件
// 鼠标点击事件