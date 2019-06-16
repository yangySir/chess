$(function () {
    let flag=true;
    let box=$('.box');
    let black={};
    let white={};
    let blank={};//空白
    let ai=true;
    for(let i=0;i<15;i++){
        for(let j=0;j<15;j++){
           $('<div>').addClass('chess').attr('id',i+'_'+j).appendTo(box);
           blank[i+'_'+j]=true;
        }
    }
    box.on('click','.chess',function () {
        let _this=$(this);
        if($(this).hasClass('black') || $(this).hasClass('white')) {
            return;
        }
        flag=!flag;
        let coords=_this.attr('id');
        if(flag){
                black[coords]=true;
                delete blank[coords];
                $(this).addClass('black');
                if(isSuccess(black,coords)>=5){
                    console.log('black Success');
                    //取消某个事件
                    box.off('click')
            }
            if(ai){
                let pos=aifn();
                white[pos]=true;
                delete blank[pos];
                $('#'+pos).addClass('white');
                if(isSuccess(white,pos)>=5){
                    console.log('white Success');
                    box.off('click')
                }
                flag=!flag;
            }
        }
        else{
                white[coords]=true;
                delete blank[coords];
                $(this).addClass('white');
               if(isSuccess(white,coords)>=5){
                   console.log('white Success');
                   box.off('click')
               }
               if(ai){
                   let pos=aifn();
                   black[pos]=true;
                   delete blank[pos];
                   $('#'+pos).addClass('black');
                   if(isSuccess(black,pos)>=5){
                       console.log('black Success');
                       box.off('click')
                   }
                   flag=!flag;
               }
            }

    });
    function isSuccess(obj,coords) {
        let sp=1,cz=1,yx=1,zx=1;
        let [x,y]=coords.split('_');
        let i=x*1,j=y*1;
        //判断颜色对象里该座标位置是否为真
        //水平右
        while(obj[i+'_'+(++j)]){
              sp++;
        }
        //水平左
        j=y*1;
        while(obj[i+'_'+(--j)]){
            sp++;
        }

        //垂直
        j=y*1;
        while(obj[(++i)+'_'+(j)]){
            cz++;
        }
        i=x*1;
        while(obj[(--i)+'_'+j]){
            cz++;
        }
        //左斜
        i=x*1;j=y*1;
        while(obj[(--i)+'_'+(--j)]){
            zx++;
        }
        i=x*1;j=y*1;
        while(obj[(++i)+'_'+(++j)]){
            zx++;
        }
        //右斜
        i=x*1;j=y*1;
        while(obj[(++i)+'_'+(--j)]){
            yx++;
        }
        i=x*1;j=y*1;
        while(obj[(--i)+'_'+(++j)]){
            yx++;
        }
     return Math.max(sp,cz,zx,yx);
    }
    function aifn() {
        let blackSore=0,whiteSore=0;
        let pos1,pos2;
        //遍历空白对象，计算同等条件下最优
        for(let i in blank){
            let sore=isSuccess(black,i);
            if(sore>=blackSore){
                blackSore=sore;
                pos1=i;
            }
        }
        for(let i in blank){
            let sore=isSuccess(white,i);
            if(sore>=whiteSore){
                whiteSore=sore;
                pos2=i;
            }
        }
        return blackSore>=whiteSore? pos1:pos2;
    }
})