
function islogin(data){
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
function information(data){
    return {
        type:"information",
        data
    }
}
function deleteinf(data){
    return {
        type:'deleteinf',
        data
    }
}
function groupdraw(data){
    return {
        type:'groupdraw',
        data
    }
}
function changeimg(data){
    return {
        type:'changeimg',
        data
    }
}
function nowimg(data){
    return {
        type:'nowimg',
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
    nowgroup:nowgroup,
    groupmes:groupmes,
    addgrouplist:addgrouplist,
    deletesearchmes:deletesearchmes,
    information:information,
    deleteinf:deleteinf,
    groupdraw:groupdraw,
    changeimg:changeimg,
    nowimg:nowimg
}
export default action;