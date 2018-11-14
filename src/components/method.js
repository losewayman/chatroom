import axios from 'axios';

function createTime()
    { 
        var now = new Date();
        
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
        
        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
        var ss = now.getSeconds();           //秒
        
        var clock = year + "-";
        
        if(month < 10)
            clock += "0";
        
        clock += month + "-";
        
        if(day < 10)
            clock += "0";
            
        clock += day + " ";
        
        if(hh < 10)
            clock += "0";
            
        clock += hh + ":";
        if (mm < 10) clock += '0'; 
        clock += mm + ":"; 
         
        if (ss < 10) clock += '0'; 
        clock += ss; 
        return(clock); 
}
function reqgroupmes(groupid,callback){
  axios({
    method:'post',
    url:"http://localhost:8110/group/groupmes",
    data:{
      groupid:groupid
    }
  })
  .then((res)=>{
    if(res.data.status===200){
        callback(res.data.data)
    }
  })
  .catch((err)=>{
    console.log(err);
  })
}

const method={
    Time:createTime,
    reqgroupmes:reqgroupmes
}

export default method;