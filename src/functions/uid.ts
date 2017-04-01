/**
 * Created by abdou on 01/04/17.
 */
function uid(){
    return '_' + Math.floor((1 + Math.random()) * 0x100000).toString(16).substring(1)
}
