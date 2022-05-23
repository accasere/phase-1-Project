
let carrito = [];

function fetchItems() {
  fetch(" http://localhost:3000/articles")
  .then((resp) => resp.json())
  .then(renderItems);
}

  
function renderItems(items) {
  const contGrid = document.querySelector('.contGrid')
  contGrid.setAttribute("class","contGrid")
  
  let index = 1;
  items.forEach(articles => {
    const tablaCart = document.querySelector('.tablaContenido')
    const producto = document.createElement('div')
    const imgCont = document.createElement('div')
    const img = document.createElement('img')

    const contenido = document.createElement('div')
    const titulo = document.createElement('h2')
    titulo.setAttribute("class","titulo")
    const precio = document.createElement('p')
    precio.setAttribute('class','precio')
    const addCart = document.createElement('button')
    
    producto.classList.add('producto')
    imgCont.setAttribute('class','imgCont')
    img.setAttribute('class','picture')
   
    precio.classList.add('precio')
    addCart.classList.add('btnAddCart')
    addCart.setAttribute('value',index)
    addCart.innerHTML = "Add to Cart"

    img.setAttribute('src',articles.img)
    titulo.innerHTML = articles.name;
    precio.innerHTML = articles.price

    
    contGrid.appendChild(producto)
    producto.appendChild(imgCont)
    imgCont.appendChild(img)
    producto.appendChild(contenido)
    
    contenido.appendChild(titulo);
    contenido.appendChild(precio)
    contenido.appendChild(addCart)

    addCart.addEventListener('click',(e) => {
      e.preventDefault();
      let tdGen = document.querySelectorAll('.obtjst')

      const tr = document.createElement('tr')
      const td = document.createElement('td')
      const tdPrice = document.createElement('td')

      td.setAttribute('class','obtjst')
      tr.setAttribute('class','trJs')
      
      td.innerHTML = articles.name
      tdPrice.innerHTML = articles.price


      if (tdGen.length == 0){
        tr.appendChild(td)
        tr.appendChild(tdPrice)
        tablaCart.appendChild(tr)
      } else {
        tdGen.forEach((elem,i) =>{
          tdGen = document.querySelectorAll('.obtjst')
          if(elem.innerHTML == articles.name){
            alert("Item already added to cart")
            tr.removeChild(td)
            tr.removeChild(tdPrice)
            tablaCart.removeChild(tr)
          } else {
            tr.appendChild(td)
            tr.appendChild(tdPrice)
            tablaCart.appendChild(tr)
  
          }

        })

      }

    index++;
    })
  });
}

document.addEventListener('DOMContentLoaded', function() {
  fetchItems();
})

const btnComprar = document.querySelector('.comprarTodo')

btnComprar.addEventListener('click', (e) =>{
  const trJs= document.querySelector('.trJs')
  
  if(trJs.length == 0) {
    alert("No Items for ChekOut")
  } else {
    trJs.remove()
    alert("Items Buyed Successfully")
  }
})


