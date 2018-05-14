/*
    1.微云下有 id:0
        我的音乐  pid:0
        我的文档  pid:0
    渲染

    传入一个ID给你，你给我这个ID下的所有子级
    
*/
const folders = document.querySelector('.folders');
const fEmpty = document.querySelector('.f-empty');
render(0);
function render(id){
    //每次渲染前将之前的渲染内容清空
    folders.innerHTML = '';
    //拿到某个id下的所有子数据，这里是进行赋址的操作，如果操作了arr，那data也会改变
    let arr = t.getChild(id);
    //如果没有子级arr为null，null就不能循环。这里意味着已经到最后一层了
    if(!arr){
        fEmpty.style.display = 'block';
        checkedAll.className = '';
        return;
    }else{
        fEmpty.style.display = 'none';
        /*
            只要点击了checked之后，一定会走render
        */
        //渲染的时候判断，下面数据的checked的值是否全为true。
        checkedAll.className = arr.every(e=>e.checked)?' checked':'';
        //拿到了所有的子级数据了，接下来就是渲染了。
        arr.forEach(e=>{
            //用生成元素的方法进行操作，可以达到控制哪个就是哪个的效果；
            let div = document.createElement('div');
            //这里用三目进行判断，如果这条数据里的cheked为true，则就将hov加给div，如果没有就没有。
            div.className = 'file-item' + `${e.checked?' hov':''}`;
            //给每个div加上id,用以后面的操控，查找。
            div.dataset.id = e.id;
    
            let img = document.createElement('img');
            img.src = 'img/folder-b.png';

            /*
                双击进去
                当双击图片的时候把当前的数据(同一层)和点进去的子级数据(下一层数据checked都清空)

            */
            img.ondblclick = function (){
                arr.forEach(e=>e.checked = false);
                //这里外面因为调用了forEach了。所以点到那个img，就可以获取到对应那条数据
                //自然下标加id就可以找到那个id了
                let childArr = t.getChild(e.id);
                //这里加了个判断是为了防止最后一层的时候，如果没有会报错，所以有的时候才清。
                if(childArr){
                    childArr.forEach(e=>e.checked = false);
                };
                //点击哪个文件夹，tree那边对应的那一层的父级也变颜色
                let treeTitle = document.querySelectorAll('span');
                let id = e.id;
                treeTitle.forEach(e => {
                    e.style.background = '';
                });
                treeTitle.forEach(e=>{
                    let pid = e.dataset.id;
                    if(pid == id){
                        e.style.background = 'rgba(204, 204,204,1)';
                    }
                })
                // treeTitle.forEach((e,i) => {
                //         treeTitle.forEach(e => {
                //             e.style.background = '';
                //         })
                //         i = id;
                //         treeTitle[i].style.background = 'rgba(204, 204,204,1)';
                //         render(id);
                //         renderNav(id);
                // })
                //这里的话，改变id了。就重新渲染一下；
                //找到了那个id渲染一下，就可以重新加载页面了。
                render(e.id);
                renderNav(e.id);
            }
    
            let span = document.createElement('span');
            span.className = 'folder-name';
            span.innerHTML = e.title;
    
            let input = document.createElement('input');
            input.className = 'editor';
            input.value =  e.title;
    
            let i = document.createElement('i');
            i.onclick = function(){
                // i.classList.toggle('checked');
                // if(i.classList.contains('checked')){
                //     div.classList.add('hov');
                // }else{
                //     div.classList.remove('hov');
                // }
                // console.log(arr);
                //这边的这个操作就很骚了，直接要相反值，就可以动态的改变对应的checked的值
                e.checked = !e.checked;
                render(id);
            }
            //加class
            i.className = e.checked?'checked':'';
    
            div.appendChild(img);
            div.appendChild(span);
            div.appendChild(input);
            div.appendChild(i);
            folders.appendChild(div);
        });
        //点击全选的时候
        checkedAll.onclick = function(){
            /*
                当没有数据的时候就不能全选
                只有有数据的时候才有全选操作。
            */
            if(fEmpty.style.display == 'none'){
                let onOff = this.classList.toggle('checked');
                //上面将全选存在onOff中，通过onOff来控制当前页面的文件夹的状态
                arr.forEach(e=>e.checked = onOff);
                //数据改变了，重新渲染就完事了
                render(id);
            }
        }
    }
  
}


