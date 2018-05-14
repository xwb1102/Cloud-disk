const remove = document.getElementById('remove');
const modelTree = document.querySelector('.modal-tree');
const contentTree = document.querySelector('.content');
const cancel = document.querySelector('.cancel');
const iconClose = document.querySelector('.icon_close');
let checkedId = -1; //选中要移动的id
remove.onclick = function(){
    let pid = breadNav.getElementsByTagName('span')[0].dataset.id;
    let arr = t.getChild(pid);
    //框选||勾选的id
    if( arr.some(e=>e.checked) ){
        //把目录树创建起来
        contentTree.innerHTML = renderTree(-1,-1);
        //上面已经将移动弹框里的内容添加上了，下面要做点击背景变色的效果。
        //所以先获取一下，所有的div，也就是后面需要点击的元素。这些元素在生成的时候，都有添加className名为
        //tree-title。所以直接找这个就好了。
        let contentTreeChilds = contentTree.querySelectorAll('.tree-title');
        for(let i=0;i<contentTreeChilds.length;i++){
            contentTreeChilds[i].onclick = function(){
                for(let i=0;i<contentTreeChilds.length;i++){
                    contentTreeChilds[i].style.background = '';
                }
                this.style.background = 'rgba(204, 204,204,1)';
                //得到选中要移动的id；这里的作用是，你点了哪一个，你可以获取到对应的id，这个id就是你要移动的时候
                //被移动的文件夹需要放入的父级的id，所以存起来
                //而且，当时添加的时候，是在下面span身上加的，所以找span
                checkedId = this.children[0].dataset.id;
            }
        }

        let ok = modelTree.querySelector('.ok');//点击确定要移动
        ok.onclick = function(){
            //哪几个是要移动的。
            //这里是找到当前也选中的那些文件夹对应的数据
            let checkedData = arr.filter(e=>e.checked);
            /*
                勾选的id不能和移动到的id一样
                也不能放到自己的子级中
                    我们可以拿到选中数据下的所有数据  下面的arr
                    去判断里面有没有包含checkedId
                    如果包含就说明把老爹放子级
            */
            // console.log(checkedData);

            //当前选中数据的数据线索（当前数据,当前数据的子数据）
            let dataLine = [];
            checkedData.forEach(e=>{
                //每一次的数据线索；； 这里的意思是，找到选中的那个文件夹及其下面所有的文件夹
                let arr = t.getChilds(e.id).concat(data[e.id])
                dataLine.push(...arr);
            });
        
            /*
                如果说所有的线索中都没有移动到的id
                就可以更改pid的值。
            */
           //这里的意思是，我移动的时候，如果点击的那个tree的那个id，也就是那个文件夹，是包含在我需要移动的文件夹里
           //我就不操作，只有不包含在我需要移动的文件夹里的时候，才操作。
            if(!dataLine.some(e=>e.id == checkedId)){
                checkedData.forEach(ee=>{
                    //把选中数据的pid换成点击的id下
                    console.log(checkedId)
                    //这里就很明显了，只需要改变他们的pid并将当前的cheked的值变为false就行了
                    ee.pid = checkedId*1;
                    ee.checked = false;
                });
            }else{
                openFullTip('非法移动,报警了!');
                //alert('站住，你已经被包围了');
            }
            //上面改完了，渲染一下就完事了
            render(pid);
            treeMenu.innerHTML = renderTree(-1,-1);
            modelTree.style.display = 'none';
  
        }
        modelTree.style.display = 'block';
    }else{
        openFullTip('请选择要移动的文件!');
        // alert('请选择要移动的文件');
    }
}
cancel.onclick = iconClose.onclick = function(){
    modelTree.style.display = 'none';
}

