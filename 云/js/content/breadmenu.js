const breadmenu = document.querySelector('.breadmenu');
const breadNav = breadmenu.children[1];
const checkedAll = document.querySelector('#checkedAll');
/*
    <a href="javascript:;">微云</a>
	<span>我的音乐</span>
*/
renderNav(0);
function renderNav(id){
    //先获取传入id的父级和祖宗级，不包括叔叔之类的只有一条线往上
    let arr = t.getParents(id);
    let html = '';
    //这里判断一下，有没有，有才进入
    if(arr){
        //对所有的父级进行操作
        arr.forEach((e,i,all)=>{
            //最后一个为span，别的为a;   先看最后一个，因为最后一个是span。给其添加内容
            //还有一点注意，就是，这个i这个时候是最后一个，所以，span写在a 的前面没有关系，他们的排列是根据
            //i 的位置来的。像下面的写法，span写在了a 的上面，不用担心呈现出来的效果是span在前a在后。
            if(i == all.length-1){
                html += '<span data-id="'+ e.id +'">'+ e.title +'</span>'
            }else{
                //这里添加内容时候将id也加上，后面操作的时候就方便了。
                html += '<a data-id="'+ e.id +'" href="javascript:;">'+ e.title +'</a>'
            }
        });
        // let treeTitle = document.querySelectorAll('span');
        breadNav.innerHTML = html;
        breadNav.onclick = function (ev) {
            let id = ev.target.dataset.id;
            treeTitle.forEach(e => {
                e.style.background = '';
            });
            console.log(treeTitle[0]);
            treeTitle.forEach(e => {
                let pid = e.dataset.id;
                if (pid == id) {
                    e.style.background = 'rgba(204, 204,204,1)';
                }
            })
            if(ev.target.tagName === 'A'){
                /*
                    通过id控制文件夹的内容和面包屑的内容
                */
               //添加内容的时候，已经有id 了，所以点击的时候，就可以找到那个id，并进行渲染。

                render(ev.target.dataset.id);
                renderNav(ev.target.dataset.id);
            }
        }
    }
}