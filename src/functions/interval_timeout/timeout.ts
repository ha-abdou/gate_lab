/**
 * Created by abdou on 01/04/17.
 */
function $timeout(func: any, time: number ,timeouts: intervalTimeout[])
{
    let tId: number;
    let i:   number;

    i = timeouts.length;
    tId = setTimeout(function(){
        if(!timeouts[tId].isPause){
            func();
            delete timeouts[tId];
        }
    }, time);
    timeouts.push(<intervalTimeout>{
        //todo stop timeout
        pause:   ()=>{timeouts[i].isPause = true},
        //todo restart timeout
        unPause: ()=>{timeouts[i].isPause = false},
        isPause: false,
        func:    func,
        time:    time,
        startAt: (new Date()).getTime(),
        tId:     tId
    });
    return (i);
}

function $clearTimeout (tId: number ,timeouts: intervalTimeout[])
{
    clearTimeout(timeouts[tId].tId);
    delete timeouts[tId];
}
