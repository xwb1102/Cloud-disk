/*
    重命名
*/
const rename = document.getElementById('rename');

rename.onclick = function(){
    //这里下面两句的操作，还是一样，拿到当前页的数据
    let pid = breadNav.getElementsByTagName('span')[0].dataset.id;
    let arr = t.getChild(pid);
    //过滤一下，有选中的留下来
    let arr2 = arr.filter(e=>e.checked);
    //这里就是判断一下，有选中的文件夹，并且个数只有一个
    if(arr2.length && arr2.length < 2){
        //通过，找到页面内容区域上的元素。也就是文件夹的元素；
        let divs = folders.children;
        for(let i=0;i<divs.length;i++){
            //这里已经找到了页面上的文件夹元素，再从里面找到className有hov的元素，这个元素就是我们选中的那个文件夹

            if(divs[i].classList.contains('hov')){
                //获取那个文件夹下面的对应内容
                let span = divs[i].getElementsByTagName('span')[0];
                let txt = divs[i].getElementsByTagName('input')[0];
                span.style.display = 'none';
                txt.style.display = 'block';
                txt.select();
                txt.onblur = function(){
                    let val = this.value;
                    //下面是判断是否重名了。拿一个返回值
                    let o = arr.some(e=>{
                        //这里的if是为了排除一下，它自己本身，就是说，有可能操作的时候，重命名的名字，是
                        //之前的那个名字，等同于没有改，但是你聚焦失焦了，所以他会认为你和之前的那些个冲突了
                        //这里就需要将本身给排除了，与其他的title做比较
                        if(e.title != arr2[0].title){
                            //这里就是再做比较了，上面已经排除了自己，现在是与其他的做比较，如果相等那就返回true
                            return e.title == val;
                        }
                    });
                    //重名
                    if(arr && o){
                        openFullTip('命名冲突!');
                        this.focus();
                        this.select();
                    }else{
                        //不重名的时候，改变一下数据里的title为当前写入的input的value值，
                        data[divs[i].dataset.id].title = val;
                        render(pid);
                        treeMenu.innerHTML = renderTree(-1,-1);
                    }
                }
            }
        }
    }else{
        openFullTip('请选择一个文件!');
        // alert('请选择一个重命名的文件');
    }
}
