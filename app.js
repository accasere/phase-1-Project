const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter= document.getElementById('template-footer').content
const templateCarrito= document.getElementById('template-cart').content

console.log(templateCarrito)
const fragment = document.createDocumentFragment()

let carrito ={};

document.addEventListener("DOMContentLoaded", () =>{
    fetchData()
})

cards.addEventListener('click', e => {
    addCarrito(e)
})

items.addEventListener('click', e =>{
    bntAction(e)
})

const fetchData = async() =>{
    try{
        const resp = await fetch('http://localhost:3000/articles')
        const data = await resp.json()
        paintCards(data)
    } catch(error){
        console.log(error)
    }
}

const paintCards = data => {
    data.forEach(cards => {
        templateCard.querySelector('h5').textContent = cards.name
        templateCard.querySelector('p').textContent = cards.price
        templateCard.querySelector('img').setAttribute('src',cards.img)
        templateCard.querySelector('.btn').dataset.id = cards.id
        
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    });
    cards.appendChild(fragment)
} 

const addCarrito = e =>{
    
    if(e.target.classList.contains('btn')) {

       setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objeto => {
    
    const product = {
        id: objeto.querySelector('.btn').dataset.id,
        title: objeto.querySelector('h5').textContent,
        price: objeto.querySelector('p').textContent,
        qty:1
    }

    if (carrito.hasOwnProperty(product.id)){
        product.qty = carrito[product.id].qty +1
    }

    carrito[product.id] = {...product}
    paintCart()
    
}

const paintCart =() => {
    items.innerHTML='' //Cleaning our HTML 

    Object.values(carrito).forEach(product =>{
        templateCarrito.querySelector('th').textContent = product.id  

        templateCarrito.querySelector('.nameTitle').textContent = product.title
        let qtyItem = product.qty
      
        templateCarrito.querySelector('.qtyTd').textContent = qtyItem
        templateCarrito.querySelector('span').textContent = product.qty * product.price
        templateCarrito.querySelector('.btnAdd').dataset.id = product.id
        templateCarrito.querySelector('.btnDel').dataset.id = product.id   

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)

    })
    items.appendChild(fragment)

    paintFooter()
}

const paintFooter = () => {
    footer.innerHTML = ''
    if(Object.keys(carrito).length === 0){
        footer.innerHTML= `
        <th scope="row" colspan="5">Cart Empty - Its time to buy!</th>
        `
        return
    }

    const nQty = Object.values(carrito).reduce( (acc,{qty}) => acc + qty, 0 )

    const nPrice = Object.values(carrito).reduce((acc,{qty,price}) => acc + qty *price ,0)
    //console.log(nQty)
    //console.log(nPrice)

    templateFooter.querySelectorAll('td')[0].textContent = nQty
    templateFooter.querySelector('span').textContent = nPrice

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnClear = document.getElementById('empty-cart')
    btnClear.addEventListener('click',()=>{
        carrito = {}
        paintCart()
    })
    console.log(btnClear)
}

const bntAction = e =>{
    //console.log(e.target)
    //Adding more items to cart
    if(e.target.classList.contains('btnAdd')){
        const producto = carrito[e.target.dataset.id]
        producto.qty++
        carrito[e.target.dataset.id] = {...producto}
        paintCart()
    }

    if(e.target.classList.contains('btnDel')){
        const producto = carrito[e.target.dataset.id]
        producto.qty--
        if(producto.qty === 0){
            delete carrito[e.target.dataset.id]
        }
        //carrito[e.target.dataset.id] = {...producto}
        paintCart()
    }
    e.stopPropagation


}
