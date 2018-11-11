
function islogin(data){
    console.log(data);
    return {
        type:"islogin",
        data
    }
}

function socket(data){
    return {
        type:"socket",
        data
    }
}

function addmes(data){
    return {
        type:'addmes',
        data
    }
}

function scroll(data){
    return {
        type:'scroll',
        data
    }
}

function search(data){
    return {
        type:'search',
        data
    }
}

function selfmes(data){
    return {
        type:'selfmes',
        data
    }
}

function grouplist(data){
    return {
        type:'grouplist',
        data
    }
}
function logindraw(data){
    return {
        type:'logindraw',
        data
    }
}
function nowgroup(data){
    return {
        type:"nowgroup",
        data
    }
}
function groupmes(data){
    return {
        type:'groupmes',
        data
    }
}
function addgrouplist(data){
    return {
        type:'addgrouplist',
        data
    }
}
function deletesearchmes(data){
    return {
        type:'deletesearchmes',
        data
    }
}

const action={
    islogin:islogin,
    socket:socket,
    addmes:addmes,
    scroll:scroll,
    search:search,
    selfmes:selfmes,
    grouplist:grouplist,
    logindraw:logindraw,
    nowgroup:nowgroup,
    groupmes:groupmes,
    addgrouplist:addgrouplist,
    deletesearchmes:deletesearchmes
}
export default action;