document.getElementById('warning-msg').style.display = 'none'
document.getElementById('error-msg').style.display = 'none'

const searchPhone = () => {
    const searchField = document.getElementById("search-field");
    searchText = searchField.value;
    searchField.value = '';
    if (searchText == ''){
        document.getElementById('warning-msg').style.display = 'block'
        document.getElementById('error-msg').style.display = 'none'
    }
    else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => {
            if(data.status == false){
                document.getElementById('error-msg').style.display = 'block'
                document.getElementById('warning-msg').style.display = 'none'
                console.log(data.status)
            }
            else{
                document.getElementById('warning-msg').style.display = 'none'
                document.getElementById('error-msg').style.display = 'none'
                displaySearchPhone(data.data)
            }
        })
    }
}

const displaySearchPhone = phones => {
    const searchResult = document.getElementById("search-result")
    searchResult.textContent = ''
    const maxTwentyPhones = phones.slice(0, 20);
    maxTwentyPhones.forEach(phone => {
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
    document.getElementById('warning-msg').style.display = 'none'
    document.getElementById('error-msg').style.display = 'none'
    if(phone.mainFeatures.chipSet){
        console.log(phone.mainFeatures.chipSet)
    }
    else{
        console.log('null')
    }
    const phoneDetail = document.getElementById("phone-detail")
    phoneDetail.textContent = ''
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = `
    <div class="row g-0">
        <div class="col-md-3">
            <img src="${phone.image}" class="img-fluid rounded-start">
        </div>
        <div class="col-md-9">
            <div class="card-body">
                <h4 class="card-title">${phone.brand}</h4>
                <h5 class="card-title">${phone.name}</h5>
                <h6 class="card-title">(${phone.releaseDate})</h6>
                <p class="card-text">Chipset: ${phone.mainFeatures.chipSet}</p>
                <p class="card-text">Display Size: ${phone.mainFeatures.displaySize}</p>
                <p class="card-text">Memory: ${phone.mainFeatures.memory}</p>
                <p class="card-text">Storage: ${phone.mainFeatures.storage}</p>
            </div>
        </div>
    </div>
    `;
    phoneDetail.appendChild(div)
}