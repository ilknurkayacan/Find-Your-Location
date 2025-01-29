const ui=new UI();

ui.btnLocation.addEventListener("click", ()=>{
    if(navigator.geolocation){
        ui.loading.style.display="block"
        navigator.geolocation.getCurrentPosition(onSuccess,onError)
    }
})

async function onSuccess(position){
    let lat=position.coords.latitude;
    let lng=position.coords.longitude;
    
    const api_key="";
    const url=`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${api_key}`
    
    const response=await fetch(url);
    const data=await response.json();
    const zoneData=data.results[0];
    setKnowledge(zoneData)
}

function onError(err){
    console.log(err)
    ui.loading.style.display="none"
}

function setKnowledge(data){
    console.log(data)
    let html=`  
            <div class="card mb-5">
                <div class="card-header" id="header">
                    <h3>Bulunduğunuz konum bilgisi</h3>
                </div>
                <div class="card-body" id="location">
                    <div class="row">
                        <div class="col-4">Mahalle:</div>
                        <div class="col-8">${data.components.city_district}</div>
                        <hr>
                    </div>
                    <div class="row">
                        <div class="col-4">İlçe:</div>
                        <div class="col-8">${data.components._normalized_city}</div>
                        <hr>
                    </div>
                    <div class="row">
                        <div class="col-4">Şehir:</div>
                        <div class="col-8">${data.components.state}</div>
                        <hr>
                    </div>
                    <div class="row">
                        <div class="col-4">Bölge:</div>
                        <div class="col-8">${data.components.region}</div>
                        <hr>
                    </div>
                    <div class="row">
                        <div class="col-4">Ülke:</div>
                        <div class="col-8">${data.components.country}</div>
                        <hr>
                    </div>
                </div>
            </div>`;

            ui.loading.style.display="none"
            ui.location.insertAdjacentHTML("beforeend",html);
}