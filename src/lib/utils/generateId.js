export function generateId(type){
    let id = '';

    if(type === 'user'){
        id = 'u-' + Math.random().toString(36).substring(2,12)
    } else {
        const now = new Date();
        const year = now.getFullYear().toString();
        const month = (now.getMonth() + 1).toString();
        const day = now.getDate().toString();
        const hours = now.getHours().toString();
        const minutes = now.getMinutes().toString();
        const seconds = now.getSeconds().toString();
        const milliseconds = now.getMilliseconds().toString();

        id = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
    
    }
    
    return id
}