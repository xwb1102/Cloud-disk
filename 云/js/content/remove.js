const del = document.getElementById('del');
const tanbox = document.getElementById('tanbox');
del.onclick = function(){
    //点击删除按钮的时候获取可视区中的同一级数据;;  这里的意思是，点击的时候，可以找到面包屑上的最后一个
    //span的内容，其中包含着id，找到这个id也就是下面的pid
    let pid = breadNav.getElementsByTagName('span')[0].dataset.id;
    //从pid找到下面的一层子数据，
    let arr = t.getChild(pid);
    //判断这些数据中有没有选中，选中就把弹框打开
    //点击的时候，需要判断，有没有选中删除的文件夹，有选中才弹出，删除框
    if(arr.some(e=>e.checked)){
        tanbox.style.display = 'block';
    }
    //这个弹框点击放在上面if里面也可以，放这里也可以，if里面的话，就是说，弹出来了，才可以点
    //放这里的话，如果隐藏也点击不了，所以关系不大
    tanbox.onclick = function(ev){
        //这里是限定了，必须点到确定按钮的时候，才可以有下面的操作
        if(ev.target.innerHTML == '确定'){
            /*
                循环数组，如果是选中状态的，套拿到选中id下所有的数据
                并且删除
            */
            arr.forEach(e=>{
                if(e.checked){
                    //这里的操作是，我已经拿到了第一层子级数据了，但是，子级的子级，或者再往下，还没有拿到
                    //这里就是干这个的，找到，每一个的子级的子级，就是点击了哪一个文件夹，将里面所有的文件夹，都拿到
                    //后面那个是他自己；
                    let removeArr = t.getChilds(e.id).concat(data[e.id]);
                    //拿到了之后，循环删除一下数据
                    removeArr.forEach(e=>delete data[e.id]);
                }
            });
            //数据删除就重新渲染
            render(pid);
            treeMenu.innerHTML = renderTree(-1,-1);
            tanbox.style.display = 'none';
        }
        
        if(ev.target.innerHTML == '取消' || ev.target.innerHTML == 'X'){
            tanbox.style.display = 'none';
        }

        
    }
}

