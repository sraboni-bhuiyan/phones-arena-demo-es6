console.log('connected')

const searchPhone = () => {
    const searchField = document.getElementById("search-field");
    searchText = searchField.value;
    searchField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchPhone(data.data))
}

const displaySearchPhone = phones => {
    const searchResult = document.getElementById("search-result")
    phones.forEach(phone => {
        console.log(phone.slug);
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
            <div class="card p-2 rounded">
                <img src="${phone.image}" class="card-img-top">
                <div class="card-body d-flex flex-column justify-content-center">
                    <h5 class="card-title text-center">${phone.brand}</h5>
                    <h6 class="card-title text-center">${phone.phone_name}</h6>
                    <button class="btn btn-outline-primary" type="button" onclick="loadPhoneDetail('${phone.slug}')">See Details</button>
                </div>
            </div>
        `;
        searchResult.appendChild(div)
    });
}

const loadPhoneDetail = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetail(data.data))
}
const displayPhoneDetail = phone => {
    console.log(phone)
    const phoneDetail = document.getElementById("phone-detail")
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
    <div class="row g-0">
        <div class="col-md-4">
            <img src="${phone.image}" class="img-fluid rounded-start">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h4 class="card-title">${phone.brand}</h4>
                <h5 class="card-title">${phone.name}</h5>
                <p class="card-text">Storage: </p>
                <p class="card-text">Display SIze: </p>
            </div>
        </div>
    </div>
    `;
    phoneDetail.appendChild(div)
}