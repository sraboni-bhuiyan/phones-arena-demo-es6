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
                    <button class="btn btn-outline-primary" type="button" onclick="loadPhoneDetail(${phone.slug})">See Details</button>
                </div>
            </div>
        `;
        searchResult.appendChild(div)
    });
}

const loadPhoneDetail = phoneId => {
    console.log(phoneId)
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    console.log(url)
}