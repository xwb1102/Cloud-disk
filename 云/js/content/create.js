const create = document.getElementById('create');
create.onclick = function(){
    //这里的操作和别的行为的是一样的，找到当前页面的所有文件夹对应的数据
    let pid = breadNav.getElementsByTagName('span')[0].dataset.id;
    let arr = t.getChild(pid);
    checkedAll.className = '';
    createItem(arr,pid);
}
/*
    虚拟的dom元素
        在碰撞的时候有坑？
*/
let num = 0;
let onOff = true;
function createItem(arr,pid){
        // 这里是说，页面中有东西的时候
        if(arr){
            //这里过滤一下，找到，那些名字里含有'新建文件夹'的，然后将他的长度赋给num用以新建文件夹
            // let filterArr = arr.filter(e=>e.title.includes('新建文件夹'));
            // if(filterArr.length)num++;
            num++;
            if(num==1&&onOff){
                num='';
                onOff = false;
            }
            if(num==1){
                num++;
            }
        }else{
            fEmpty.style.display = 'none';
        }
        let fileName = t.getFileName();
        let div = document.createElement('div');
        div.className = 'file-item';
        let img = document.createElement('img');
        img.src = 'img/folder-b.png';
        let span = document.createElement('span');
        span.className = 'folder-name';
        span.style.display = 'none';
        let input = document.createElement('input');
        input.className = 'editor fileName';
        input.style.display = 'block';
        // input.value = '新建文件夹'+(num?num:'');
        input.value = '新建文件夹'+num;
        input.onblur = function(){
            /*
                1.失焦的时候要看一看兄弟元素的名字有没有重名

                2.必须要有文字,默认为新建文件夹

                3.给个标识证明它就是新建文件夹
                
                当点击创建按钮的时候，循环一下当前目录所有的文件夹名字
                把重复的拿出来，给未失焦的那条数据
            */
            let val = this.value;
            //重名
            if(arr && arr.some(e=>e.title == val)){
                this.focus();
                this.select();
                openFullTip('名字重复!');
            }else{
                //可以添加数据
                // console.log(pid);
                let createId = +new Date;
                data[createId] = {
                    "id": createId,
                    // "pid":pid,
                    pid,
                    "title": val,
                    "type": "file",
                    "checked":false
                }
                render(pid);
                treeMenu.innerHTML = renderTree(-1,-1);
            }
        }
        let i = document.createElement('i');   
        div.appendChild(img);
        div.appendChild(span);
        div.appendChild(input);
        div.appendChild(i);
        folders.appendChild(div);
        input.select();
        //这边生成的需的那个文件夹，会在每次渲染的时候，被清空，看一下，render那句话
}