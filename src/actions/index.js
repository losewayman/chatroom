
function islogin(data){
    console.log(data);
    return {
        type:"login",
        data
    }
}

function socket(data){
    console.log(data);
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

const action={
    islogin:islogin,
    socket:socket,
    addmes:addmes,
    scroll:scroll,
    search:search
}
export default action;