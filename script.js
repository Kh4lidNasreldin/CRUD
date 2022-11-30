let title = document.querySelector("#title");
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let total = document.querySelector("#total");
let count = document.querySelector("#count");
let category = document.querySelector("#category");
let submit = document.querySelector("#submit");

let mood = "create";
let updateDataIndex;

function getTotal(){
    if(price.value != ""){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        document.querySelector(".total-box").style.background = "green";
    }
    else{
        document.querySelector(".total-box").style.background = "#041723";
        total.innerHTML = 0;
    }
}

let productData = []
if(localStorage.getItem("localData")){
    productData = JSON.parse(localStorage.getItem("localData"))
}
submit.onclick = function(){
    const data = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }
    if(mood === "create"){
        if (data.count > 1){
            for(let i = 0; i < data.count; i += 1){
                productData.push(data)
            }
        }
        else{
            productData.push(data)
        }
    }else{
        productData[updateDataIndex] = data;
        mood = "create"
        submit.innerHTML = "Create";
        count.style.display = "block";
    }
    localStorage.setItem("localData", JSON.stringify(productData));
    clearInputs();
    displayData();
}

function clearInputs(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

function displayData(){
    let table = "";
    for (let i = 0; i < productData.length; i++){
        table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${productData[i].title}</td>
                        <td>${productData[i].price}</td>
                        <td>${productData[i].taxes}</td>
                        <td>${productData[i].ads}</td>
                        <td>${productData[i].discount}</td>
                        <td>${productData[i].total}</td>
                        <td>${productData[i].category}</td>
                        <td><button onclick="updateData(${i})" class="update">update</button></td>
                        <td><button onclick="deleteData(${i})" class="delete">delete</button></td>
                    </tr>`
    }
    document.getElementById("tbody").innerHTML = table;
}
displayData()

function deleteData(dataIndex){
    productData.splice(dataIndex,1)
    localStorage.localData = JSON.stringify(productData);
    displayData()    
}

function updateData(dataIndex){
    title.value = productData[dataIndex].title;
    price.value = productData[dataIndex].price;
    taxes.value = productData[dataIndex].taxes;
    ads.value = productData[dataIndex].ads;
    discount.value = productData[dataIndex].discount;
    getTotal();
    count.style.display = "none";
    category.value = productData[dataIndex].category;
    submit.innerHTML = `Update Product Number ${dataIndex + 1}`
    updateDataIndex = dataIndex;
    mood = "update"
}