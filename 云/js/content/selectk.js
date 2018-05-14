const folderContent = document.querySelector('.folder-content'); /*放框的*/
folders.onmousedown = function(ev){
    //为了防止点到文件夹身上,只要目标点不是folders就不能创建kuang
    if(ev.target.className !== 'folders')return;
    let disX = ev.pageX;
    /*
        可视区坐标的位置 - folders的绝对top位置 + 面包屑的高度 = 实际的位置
    */
    let disY = ev.pageY ;
    //创建框
    let div = document.createElement('div');
    //为了查看碰撞结果
    let checkedsArr = [];

    
    //这边是先找到，当前页面有几多文件夹，碰撞使用
    let foldersChild = folders.children;
    for(let i=0;i<foldersChild.length;i++){
        let id = foldersChild[i].dataset.id;
        if(data[id]!=undefined){
            //checkedsArr就是当前页面的所有文件夹对应数据的数组
            checkedsArr.push(data[id]); //页面中当前的数据
        }
    }
    div.className = 'kuang';
    div.style.cssText = `left:${disX}px;top:${disY - folders.getBoundingClientRect().top + breadmenu.offsetHeight}px`;
   //这里是将生成的选框div放在了，生成文件夹那个div的上一层，这样做可以减少很多麻烦
    folderContent.appendChild(div);

    document.onmousemove = function(ev){
        div.style.width = Math.abs(ev.pageX - disX) + 'px';
        div.style.height = Math.abs(ev.pageY - disY) + 'px';
        let l = Math.min(disX,ev.pageX);
        let t2 = Math.min(disY,ev.pageY);
        
        for(let i=0;i<foldersChild.length;i++){
            //控制数据的选中状态
            let id = foldersChild[i].dataset.id;
            //这边就很巧妙了，直接使用碰撞的true或者false的返回值，给碰到的那个文件夹对应的数据加上相应的返回值；
            
            let onOff = t.bong(div,foldersChild[i]);
            //这边只改变数据不渲染
            data[id].checked = onOff;
            /*
                class名的添加或者删除
            */
           //下边两个的话就是改变看的到的内容，而不是操作数据，直接判断，碰到就加上hov没有就不加
            foldersChild[i].className = onOff?'file-item hov':'file-item';
            foldersChild[i].getElementsByTagName('i')[0].className = onOff?'checked':'';
            // console.log(checkedsArr.every(e=>e.checked),checkedsArr)
            if(checkedsArr.length){
                /*
                    *** 如果在空数组的情况下使用了every,直接返回true;
                */
               //这里的操作就是在框选的时候，看看是否全选了，
                checkedAll.className = checkedsArr.every(e=>e.checked)?'checked':'';
            }else{
                checkedAll.className = '';
            }
            
        }

        div.style.left = l + 'px';
        div.style.top = t2 - section.offsetTop + 'px';
        return false;
    };
    document.onmouseup = function(){
        console.log(checkedsArr);
        div.remove();
        document.onmousemove = document.onmouseup = null;
    };
   
}