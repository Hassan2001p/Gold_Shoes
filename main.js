let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');
let search = document.getElementById('search');
let rest = document.getElementById('rest');
let mood = 'create';
let tmp;

function getprices() {
    if (price.value != '') {
        let final = (+price.value - +taxes.value)
        rest.innerHTML = final;
        let result = (+rest.innerHTML + +discount.value)
        total.innerHTML = result;

        total.style.background = "#040"
    } else {
        total.innerHTML = '';
        rest.innerHTML = '';
        total.style.background = "rgb(255, 0, 0)"
    }
}

let newProduct;
if (localStorage.product != null) {
    newProduct = JSON.parse(localStorage.product)
} else {
    newProduct = [];
}
create.onclick = function() {
    let objProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        rest: rest.innerHTML,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (title.value != '' && price.value != '' && category.value != '') {
        if (mood === 'create') {
            newProduct.push(objProduct)
        } else {
            newProduct[tmp] = objProduct;
            mood = 'create';
            create.innerHTML = 'انشاء';
        }
        clearData()
    }



    localStorage.setItem('product', JSON.stringify(newProduct))
    showData()
}

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    rest.innerHTML = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
    total.style.background = "rgb(255, 0, 0)"
}

function showData() {
    let table = '';
    for (let i = 1; i < newProduct.length; i++) {
        table +=
            `<tr>
            <td>
            ${i}
        </td>
        <td>
        ${newProduct[i].title}
        </td>
        <td>
        ${newProduct[i].price}
        </td>
        <td>
        ${newProduct[i].taxes}
        </td>
        <td>
        ${newProduct[i].rest}
        </td>
        <td>
        ${newProduct[i].discount}
        </td>
        <td>
        ${newProduct[i].total}
        </td>
        <td>
        ${newProduct[i].category}
        </td>
        <td>
        ${newProduct[i].count}
        </td>
        <td>
            <button onclick="updateProduct(${i})" id="update">تحديث</button>
        </td>
        <td>
            <button onclick="deleteProduct(${i})" id="delete">مسح</button>
        </td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table
    let deleteAll = document.getElementById('deleteAll')
    if (newProduct.length > 0) {
        deleteAll.innerHTML = `<button onclick="deleteAll(${newProduct.length})">مسح الكل</button>`;
    } else {
        deleteAll.innerHTML = '';
    }
}
showData()

function deleteProduct(i) {
    newProduct.splice(i, 1)
    localStorage.product = JSON.stringify(newProduct)
    showData()
}

function deleteAll() {
    localStorage.clear()
    newProduct.splice(0)
    showData()
}

function updateProduct(i) {
    title.value = newProduct[i].title
    category.value = newProduct[i].category
    count.value = newProduct[i].count
    price.value = newProduct[i].price
    taxes.value = newProduct[i].taxes
        // ads.value = newProduct[i].ads
    discount.value = newProduct[i].discount
    getprices()
    create.innerHTML = 'تحديث';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}

let searchMood = 'title';

function getSearchMood(id) {
    if (id == 'SearchByTitle') {
        searchMood = 'الاسم ';
    } else {
        searchMood = 'الصنف'
    }
    search.focus();
    search.placeholder = `بحث عن طريق ${searchMood}`
    search.value = '';
    showData();
}

function searchData(value) {
    let table = '';
    if (searchMood == 'title') {
        for (let i = 1; i < newProduct.length; i++) {
            if (newProduct[i].title.includes(value.toLowerCase())) {
                table +=
                    `<tr>
                <td>
                ${i}
            </td>
            <td>
            ${newProduct[i].title}
            </td>
            <td>
            ${newProduct[i].price}
            </td>
            <td>
            ${newProduct[i].taxes}
            </td>
            <td>
            ${newProduct[i].rest}
            </td>
            <td>
            ${newProduct[i].discount}
            </td>
            <td>
            ${newProduct[i].total}
            </td>
            <td>
            ${newProduct[i].category}
            </td>
            <td>
            ${newProduct[i].count}
            </td>
            <td>
                <button onclick="updateProduct(${i})" id="update">تحديث</button>
            </td>
            <td>
                <button onclick="deleteProduct(${i})" id="delete">مسح</button>
            </td>
            </tr>
            `
            }
        }
    } else {
        for (let i = 1; i < newProduct.length; i++) {
            if (newProduct[i].category.includes(value.toLowerCase())) {
                table +=
                    `<tr>
                <td>
                ${i}
            </td>
            <td>
            ${newProduct[i].title}
            </td>
            <td>
            ${newProduct[i].price}
            </td>
            <td>
            ${newProduct[i].taxes}
            </td>
            <td>
            ${newProduct[i].rest}
            </td>
            <td>
            ${newProduct[i].discount}
            </td>
            <td>
            ${newProduct[i].total}
            </td>
            <td>
            ${newProduct[i].category}
            </td>
            <td>
            ${newProduct[i].count}
            </td>
            <td>
                <button onclick="updateProduct(${i})" id="update">تحديث</button>
            </td>
            <td>
                <button onclick="deleteProduct(${i})" id="delete">مسح</button>
            </td>
            </tr>
            `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table
}