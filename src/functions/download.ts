/**
 * Created by abdou on 03/04/17.
 */
function download(text: string, name: string, type: string)
{
    let a:    HTMLAnchorElement;
    let file: Blob;

    a = document.createElement("a");
    file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}
