document.getElementById('warning-msg').style.display = 'none'
document.getElementById('error-msg').style.display = 'none'

/* search phone */
const searchPhone = () => {
    document.getElementById("phone-detail").textContent = ''
    document.getElementById("search-result").textContent = ''
    const searchField = document.getElementById("search-field");
    searchText = searchField.value;
    searchField.value = '';
    /* empty input condition*/
    if (searchText == ''){
        document.getElementById('warning-msg').style.display = 'block'
        document.getElementById('error-msg').style.display = 'none'
    }
    else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => {
            /* wrong input condition checking */
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
/* searched phone display */
const displaySearchPhone = phones => {
    const searchResult = document.getElementById("search-result")
    searchResult.textContent = ''
    console.log(phones)
    const maxTwentyPhones = phones.slice(0, 20);
    maxTwentyPhones.forEach(phone => {
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
            <div class="card p-2 rounded shadow">
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

/* single phone details display */
const loadPhoneDetail = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetail(data.data))
}
const displayPhoneDetail = phone => {
    //console.log(phone)
    document.getElementById('warning-msg').style.display = 'none'
    document.getElementById('error-msg').style.display = 'none'
    const phoneDetail = document.getElementById("phone-detail")
    phoneDetail.textContent = ''
    
        phone.others ? phone.others : 'naiiii';
    
        const div = document.createElement('div')
        div.classList.add('card') 
        div.innerHTML = `
        <div class="row g-0 bg-primary bg-opacity-10 shadow">
            <div class="col-md-4 d-flex align-items-centera">
                <img src="${phone.image}" class="rounded mx-auto d-block">
            </div>
            <div class="col-md-4">
                <div class="card-body">
                    <h4 class="card-title">${phone.brand}</h4>
                    <h5 class="card-title">${phone.name}</h5>
                    <h6 class="card-title">(${phone.releaseDate ? phone.releaseDate:'No release date available'})</h6>
                    <p class="card-text">Chipset: ${phone.mainFeatures.chipSet}</p>
                    <p class="card-text">Display Size: ${phone.mainFeatures.displaySize}</p>
                    <p class="card-text">Memory: ${phone.mainFeatures.memory}</p>
                    <p class="card-text">Storage: ${phone.mainFeatures.storage}</p>
                    <p class="card-text">Sensors: ${phone.mainFeatures.sensors}</p>
                </div>
            </div>
            <div class="col-md-4">
                    <div class="card-body">
                        <h5 class="card-title">Others:</h5>
                        <p class="card-text">Bluetoth: ${phone.others?.Bluetooth ? phone.others.GPS:'Information Not Available'}</p>
                        <p class="card-text">GPS: ${phone.others?.GPS ? phone.others.GPS:'Information Not Available'}</p>
                        <p class="card-text">NFC: ${phone.others?.NFC ? phone.others.GPS:'Information Not Available'}</p>
                        <p class="card-text">Radio: ${phone.others?.Radio ? phone.others.GPS:'Information Not Available'}</p>
                        <p class="card-text">USB: ${phone.others?.USB ? phone.others.GPS:'Information Not Available'}</p>
                        <p class="card-text">WLAN: ${phone.others?.WLAN ? phone.others.GPS:'Information Not Available'}</p>
                    </div>
                </div>
        </div>
        `;
        phoneDetail.appendChild(div)
}