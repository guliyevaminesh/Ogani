const basketproducts = document.getElementById('basketproducts')

function getBaskets(){
    basketproducts.innerHTML = ''
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    cart.map((item,index) => {
        let removeBox = document.createElement('div')
        removeBox.className = 'rmvBox col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3'
        removeBox.innerHTML=`
        <img src="${item.image}" alt="">
        <p>'${item.name}'</p>
        <p>'${item.price}'</p>
        <button onclick = removefromBasket(${index})>Remove from Basket</button>`
        basketproducts.appendChild(removeBox)
    })
}
getBaskets()

function removefromBasket(index){
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    cart.splice(index,1)
    localStorage.setItem('cart',JSON.stringify(cart))
    getBaskets()
}