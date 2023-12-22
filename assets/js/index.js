const featuredproducts = document.getElementById('featuredproducts')
const pagination = document.getElementById('pagination')
const sortedproducts = document.getElementById('sortedproducts')
const Prokind = document.getElementById('Prokind')
const ProductForm = document.getElementById('ProductForm')
const productName = document.getElementById('productName')
const productTitle = document.getElementById('productTitle')
const productPrice = document.getElementById('productPrice')

function getProducts () {
    let page = 1
    let limit = 8 
    let skip = (page - 1) * limit

    axios.get(`https://65680f2a9927836bd97406ef.mockapi.io/food/products?page=${page}&limit=${limit}&skip=${skip}`)
    .then(res =>{
        products = res.data
        products.map(item =>{
            let product = document.createElement('div')
            product.className = 'proBox col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3'
            product.innerHTML = `
            <img src="${item.image}" alt="">
            <p>'${item.name}'</p>
            <p>'${item.price}'</p>
            <button onclick = AddtoBasket(${item.id})>Add to cart</button>
            `
            featuredproducts.appendChild(product)
        })
        page++
    })
}
pagination.addEventListener('click',getProducts)
getProducts()

function AddtoBasket(id){
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    cart.push(products.find(item => item.id == id))
    localStorage.setItem('cart',JSON.stringify(cart))
}


function SortedProducts(){
    sortedproducts.innerHTML = ''
    featuredproducts.style.display = 'none'
    sortedproducts.style.display = 'flex'
    let selectvalue = Prokind.value
    
    if(selectvalue==="1"){
        let page = 1
        let limit = 8 
        let skip = (page - 1) * limit
    
        axios.get(`https://65680f2a9927836bd97406ef.mockapi.io/food/products?page=${page}&limit=${limit}&skip=${skip}`)
        .then(res =>{
            products = res.data
           let sortPro = products.sort((a,b) => a.price - b.price )
            sortPro.map(item =>{
                let product = document.createElement('div')
                product.className = 'proBox col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3'
                product.innerHTML = `
                <img src="${item.image}" alt="">
                <p>'${item.name}'</p>
                <p>'${item.price}'</p>
                <button onclick = AddtoBasket(${item.id})>Add to cart</button>
                `
                sortedproducts.appendChild(product)
            })
            page++
        })
    }
}
Prokind.addEventListener('change',SortedProducts)


ProductForm.addEventListener('submit',function(event){
    event.preventDefault();
    axios.post('https://65680f2a9927836bd97406ef.mockapi.io/food/products',{
        Productname:productName.value,
        Producttitle:productTitle.value,
        Productprice:productPrice.value
    }).then(res => {
        console.log(res);
    })
    })
