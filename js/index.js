let shopModule = (function () {
    let ary = [];
    let getData = function getData() {
        let xhr = new XMLHttpRequest;
        xhr.open('get', '../json/product.json',false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let data = JSON.parse(xhr.response);
                ary = data;
                render(data);
            }
        };
        xhr.send()
    }

    let render = function render(data = []) {
        let str = ``;
        data.forEach((item, index) => {
            let { img, title, hot, time, price } = item;
            str += `
            <div class="card" style="width: 18rem;">
            <img src="${img}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">价格：￥${price}元</p>
                <p class="card-text">热度：${hot}</p>
                <p class="card-text">时间：${time}</p>
                <a href="#" class="btn btn-primary">立即购买</a>
            </div>
        </div>
         `;
        });

        let product = document.querySelector('.product');
        product.innerHTML = str;
    }

    let sortShop = function sortShop(ary) {
        let li_list = document.querySelectorAll('.nav-item');
        console.log(li_list)
        Array.from(li_list);
        li_list.forEach((item, index) => {
            item.flag = -1;
            // 价格排序
            if (index == 0) {
                item.onclick = function () {
                    this.flag *= -1;
                    ary.sort((a, b) => {
                        return (a.price - b.price) * this.flag;
                    });
                 
                    render(ary);
                }
            }else if(index==1){
                item.onclick=function(){
                    this.flag *= -1;
                    ary.sort((a, b) => {
                        return (a.hot - b.hot) * this.flag;
                    });
               
                    render(ary);
                }
            }else{
                item.onclick=function(){
                    this.flag *= -1;
                    ary.sort((a, b) => {
                        return (a=a.time.split('-').join('')- (b=b.time.split('-').join(''))) * this.flag;
                    });
                    debugger
                    render(ary);
                }
            }

        })
    }

    return {
        init() {
            getData();
            sortShop(ary);
        }
    }
})();
shopModule.init()