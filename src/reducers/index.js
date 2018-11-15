var model = {
    myself:{
        account:'',
        username:'',
        headimg:'',
        autograph:'',
    },
    status:{
        islogin:'',
        groupdraw:false
    },
    now:{
        nowgroupid:'',
        nowgroupname:'',
        nowgroupcreater:'',
        nowgroupimg:'',
        information:[{},{}],
        index:0
    },
    group:{
        grouplist:[],
        groupmes:[],
        searchmes:[]
    },
    center:{
        socket:'',
        showdiv:'',
    },
}    

function myself(state,action){
    switch (action.type){
        case 'selfmes' : {
            return Object.assign({},state,{
                account:action.data.account,
                username:action.data.username,
                headimg:action.data.headimg,
                autograph:action.data.autograph
            })
        }
        default :{
            return  Object.assign({},state);
        }
    }
}

function status(state,action){
    switch (action.type){
        case 'islogin' : {
            return Object.assign({},state,{islogin:action.data})
        }
        case 'logindraw' : {
            return Object.assign({},state,{logindraw:action.data})
        }
        case 'groupdraw' : {
            return Object.assign({},state,{groupdraw:action.data})
        }
        default :{
            return  Object.assign({},state);
        }
    }
}

function now(state,action){
    switch (action.type){
        case 'nowgroup' :{
            return Object.assign({},state,{
                nowgroupid:action.data.id,
                nowgroupname:action.data.groupname,
                nowgroupcreater:action.data.creater,
                nowgroupimg:action.data.groupimg,
                index:action.data.index
            })
        }
        case 'information' : {
            return Object.assign({},state,{ information:action.data })
        }
        case 'nowimg' : {
            return Object.assign({},state,{nowgroupimg:action.data})
        }
        default :{
            return  Object.assign({},state);
        }
    }
}

function group(state,action){
    switch (action.type){
        case 'addmes' : {
            var list = state.groupmes;
            list.push(action.data);
            return Object.assign({},state,{groupmes:list})
        }
        case 'addgrouplist' : {
            var grlist = state.grouplist;
            grlist.push(action.data);
            return Object.assign({},state,{grouplist:grlist})
        }
        case 'changeimg' : {
            var changelist = state.grouplist;
            changelist[action.data.index].groupimg = action.data.img;
            return Object.assign({},state,{grouplist:changelist})
        }
        case 'deletesearchmes' : {
            var grsearch = state.searchmes;
            grsearch.splice(action.data,1);
            return Object.assign({},state,{searchmes:grsearch})
        }
        case 'deleteinf' : {
            var lists  =state.grouplist;
            lists.splice(action.data,1);
            return Object.assign({},state,{grouplist:lists})
        }
        case 'search' : {
            return Object.assign({},state,{searchmes:action.data})
        }
        case 'grouplist' : {
            return Object.assign({},state,{grouplist:action.data})
        }
        case 'groupmes' : {
            return Object.assign({},state,{groupmes:action.data})
        }
        default :{
            return  Object.assign({},state);
        }
    }
}

function center(state,action){
    switch (action.type){
        case 'socket' : {
            return Object.assign({},state,{socket:action.data})
        }
        case 'scroll' : {
            return Object.assign({},state,{showdiv:action.data})
        }
        default :{
            return  Object.assign({},state)
        }
    }
}



export default function todoApp(state=model, action) {
    return {
        myself:myself(state.myself,action),
        status:status(state.status,action),
        now:now(state.now,action),
        group:group(state.group,action),
        center:center(state.center,action)
    }
}