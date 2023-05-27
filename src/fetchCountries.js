


export function onFetch(name){
    return  fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`).then(res => {
        if(!res.ok){
            throw new Error(res.status)
        }      
    return res.json()}).then(res => {console.log(res); return res}).catch(err => console.log(err))
}