let a = document.querySelectorAll("div")
let clock = a[0]



function now(){
    let date = new Date()
    let hours = String(date.getHours()).padStart("2",0)
    let min = String(date.getMinutes()).padStart("2",0)
    let sec = String(date.getSeconds()).padStart("2",0)
    clock.textContent =`${hours}:${min}:${sec}`
    }
now()
setInterval(now, 1000)


let todo_form=document.querySelector("#todo_form")
let todo_input=document.querySelector("#todo")
let list=document.querySelector("#todo_list")
let todolist=[]


let login = document.querySelector("#login input")
let form = document.querySelector("#login")
let inn = document.querySelector("#in")

function click(event){
event.preventDefault()
form.classList.add("hidden")
inn.classList.remove("hidden")
todo_form.classList.remove("hidden")
a[2].classList.remove("hidden")
let id = login.value
inn.innerText = "Welcome" + id
localStorage.setItem("id",id)
}

form.addEventListener("submit",click)

function check(){
    let idcheck = localStorage.getItem("id")
    if (idcheck !==null)
    {
        form.classList.add("hidden")
        inn.classList.remove("hidden")
        a[2].classList.remove("hidden")
        todo_form.classList.remove("hidden")
        inn.innerText = "Welcome" + idcheck
    }
    let list_check=localStorage.getItem("todo")
    if(list_check !==null){
        let parsedlist = JSON.parse(list_check)
        
        todolist=parsedlist
        parsedlist.forEach(set_todo)
    }
}

check()

function todo(event){
    event.preventDefault()
    let todo_obj={
        text : todo_input.value,
        key_id:Date.now()
    }
    set_todo(todo_obj)
    todolist.push(todo_obj)
    
    localStorage.setItem("todo",JSON.stringify(todolist))
    todo_input.value =null

}
todo_form.addEventListener("submit", todo)

function set_todo(value){
    let li = document.createElement("li")
    li.id = value.key_id
    let span = document.createElement("span")
    let btn = document.createElement("button")
    btn.innerText="X"
    span.innerText=value.text
    btn.addEventListener("click", del_list)
    li.appendChild(span)
    li.appendChild(btn)
    todo_list.appendChild(li)
    console.log(todo_list)
}

function del_list(event){
    let list_check=localStorage.getItem("todo")
    if(list_check !==null){
        let parsedlist = JSON.parse(list_check)
        
        todolist=parsedlist
        console.log(parsedlist)
    }
    let target = event.target.parentElement
    target.remove()
    todolist=todolist.filter((todolist)=> todolist.key_id !== parseInt(target.id))
    console.log(target)
    localStorage.setItem("todo",JSON.stringify(todolist))
}


const img = ["0.jpg", "1.jpg", "2.jpg"]
let bg = img[Math.floor(Math.random()*img.length)]
let bgImg = document.createElement("img")
bgImg.src = `img/${bg}`
a[2].appendChild(bgImg)

console.log(a[1])

const api = "2d1796e4d72aaecd8bf32cffe3dc2a54"
function onGeoOk(position){
    let lat = position.coords.latitude
    let lng = position.coords.longitude
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api}&units=metric`
    fetch(url).then(response => response.json().then(data=>{
        let weather=document.querySelector("#weather span:first-child")
        let location=document.querySelector("#weather span:last-child")
        weather.innerText=data.weather[0].main
        console.log(data.name)
        location.innerText=data.name
    } ))
}

function onGeoError(){
    alert()
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError)