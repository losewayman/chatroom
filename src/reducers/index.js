import { combineReducers } from 'redux'

var model = {
    myself:{
        account:'',
        name:'',
        headimg:'',
        autograph:'',
    },
    status:{
        islogin:'',
        logindraw:false
    },
    now:{
        nowgroupid:'',
        nowgroupname:'',
        nowgroupcreater:'',
        information:'',
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
                name:action.data.username,
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
                nowgroupimg:action.data.groupimg
            })
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
            console.log(action);
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