document.getElementById('login-btn').addEventListener('click', function (){
const nameInput = document.getElementById('input-name');
 const name = nameInput.value;
const PasswordInput = document.getElementById('input-password');
const password = PasswordInput.value;

if(name === 'admin' && password === 'admin123'){
    
    alert('Login Successful!')
    window.location.assign('./home.html')
}else{
    alert('Wrong Password! Please try again.')
    return;
}
})