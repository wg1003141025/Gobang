$(function () {
    let qipan = $('.qipan');
    let flag = true;
    let hei = {},
        bai = {};
    let blank = {};
    let ai = true;

    for(let i = 0;i < 15;i++){
        qipan.append('<i>');
        qipan.append('<b>');
        for(let j = 0;j < 15;j++){
            blank[i+'_'+j] = true;
            $('<span>').appendTo(qipan).addClass('qizi').attr('id',i+'_'+j).data('pos',{x:i,y:j});
        }
    }
    qipan.on('click','.qizi',function () {
        if($(this).hasClass('hei') || $(this).is('.bai')){
            return;
        }
        let data = $(this).data('pos');     //获取/保存当前元素的位置
        delete blank[data.x+'_'+data.y];    //人机自动判断所需要，删掉已有位置
        if(flag){
            $(this).addClass('hei');
            hei[data.x+"_"+data.y]=true;
            if(isSuccess(data,hei)>=5){
                alert('黑棋胜');
                // console.log('hei');
                qipan.off();
            }
            if(ai){
                let pos = position();
                // console.log(pos);
                $('#'+pos.x+'_'+pos.y).addClass('bai');
                bai[pos.x+'_'+pos.y] = true;
                delete blank[pos.x+'_'+pos.y];
                if(isSuccess(pos,bai) >= 5){
                    alert('白棋胜');
                    // console.log('bai');
                    qipan.off();
                }
                return;
            }
        }else{
            $(this).addClass('bai');
            bai[data.x+"_"+data.y]=true;
            if(isSuccess(data,bai)>=5){
                alert('白棋胜');
                // console.log('bai');
                qipan.off();
            }
        }
        flag = !flag;
    });

    function position(){
        let score1 = 0 , score2 = 0 , pos1 = null , pos2 = null;
        for (let i in blank){
            let obj = {x:i.split('_')[0] , y:i.split("_")[1]};
            if(isSuccess(obj,hei) > score1){
                score1 = isSuccess(obj,hei);
                pos1 = obj;
            }
            if(isSuccess(obj,bai) > score2){
                score2 = isSuccess(obj,bai);
                pos2 = obj;
            }
        }
        return score1 > score2 ? pos1 : pos2;
    }
    function isSuccess(pos , obj) {
        let hen = 1 , shu  =1 ,  zx = 1 , yx =1 ;
        let x = pos.x , y = pos.y;

        while (obj[x+"_"+(++y)]){
            hen++
        }
        y = pos.y;
        while (obj[x+"_"+(--y)]){
            hen++
        }
        x = pos.x , y = pos.y;
        while (obj[(++x)+"_"+y]){
            shu++
        }
        x = pos.x;
        while (obj[(--x)+"_"+y]){
            shu++
        }

        x = pos.x , y = pos.y;

        while (obj[(--x)+"_"+(--y)]){
            zx++
        }
        x = pos.x , y = pos.y;
        while (obj[(++x)+"_"+(++y)]){
            zx++
        }
        x = pos.x , y = pos.y;
        while (obj[(--x)+"_"+(++y)]){
            yx++
        }
        x = pos.x , y = pos.y;
        while (obj[(++x)+"_"+(--y)]){
            yx++
        }
        return Math.max(hen,shu,zx,yx)
    }
});