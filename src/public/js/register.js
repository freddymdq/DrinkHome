
const form = document.getElementById('registerForm');
form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form)
    const obj = {}
    data.forEach((value, key)=>obj[key] = value)
    fetch('/api/session/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(result=>result.json())
    .then(json => console.log(json))
    .then(json => { console.log(json); window.location.href = '/login'; })
    .catch((error) => {
      console.error(error);
    });
});