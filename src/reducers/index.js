import { combineReducers } from 'redux'

var model = {
    myself:{
        account:'',
        name:'',
        password:'',
        headimg:'',
        sex:'',
        birthday:'',
        autograph:'',
    },
    group:{
        grouplist:[],
        groupmes:[],
        socket:'',
        groupinformation:'',
        showdiv:'',
        searchmes:''
    },
    status:{
        islogin:true,
        nowgroup:''
    }
    
}

function myself(state,action){
    switch (action.type){
        
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
            return Object.assign({},state,{groupmes:list});
        }
        case 'socket' : {
            return Object.assign({},state,{socket:action.data});
        }
        case 'scroll' : {
            return Object.assign({},state,{showdiv:action.data})
        }
        case 'search' : {
            return Object.assign({},state,{searchmes:action.data})
        }
        default :{
            return  Object.assign({},state);
        }
    }
}

function status(state,action){
    switch (action.type){
        
        default :{
            return  Object.assign({},state);
        }
    }
}




export default function todoApp(state=model, action) {
    return {
        myself:myself(state.myself,action),
        group:group(state.group,action),
        status:status(state.status,action),
    }
}