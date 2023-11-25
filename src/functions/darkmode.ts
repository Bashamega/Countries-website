export function isdark(){
    const root = document.documentElement;
    if(root.style.getPropertyValue('--background-rgb') == '33, 46, 55'){
        return true
    }else{
        return false
    }
}