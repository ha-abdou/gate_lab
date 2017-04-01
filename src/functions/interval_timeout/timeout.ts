/**
 * Created by abdou on 01/04/17.
 */
function $timeout(func,time,timeouts){
    var tId = setTimeout(function(){
        //todo if pause == true
        if(timeouts.hasOwnProperty(tId.toString()) && !timeouts[tId].pause){
            func();
            delete timeouts[tId];
        }
    },time);
    //todo push
    timeouts[tId] =  {
        pause: false,
        func:  func,
        time:  time,
        startAt: new Date(),
        tId: tId
    };

    return tId;
}

function $clearTimeout (tId,timeouts) {
    if(timeouts.hasOwnProperty(tId)){
        clearTimeout(timeouts[tId].tId);
        delete timeouts[tId];
    }
}
