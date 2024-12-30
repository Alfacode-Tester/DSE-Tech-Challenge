function setCompanyInfo(){
    document.getElementById("companySection").style.display = "";
    document.getElementById("companyName").innerText = companyInfo.legal_name;
    document.getElementById("companyId").innerText = companyInfo.id;
    document.getElementById("routingNum").innerText = !!companyInfo.accounts.length ? companyInfo.accounts[0].routing_number : "N/A";
    document.getElementById("ein").innerText = !!companyInfo.ein ? companyInfo.ein : "N/A";
    document.getElementById("locations").innerHTML = `${companyInfo.locations[0].line1}<br>${companyInfo.locations[0].line2}<br>${companyInfo.locations[0].city}, ${companyInfo.locations[0].state} ${companyInfo.locations[0].postal_code}<br>${!!companyInfo.locations[0].country ? companyInfo.locations[0].country : ""}`
    document.getElementById("companyEmail").innerText = !!companyInfo.primary_email ? companyInfo.primary_email : "N/A";
    document.getElementById("companyPhone").innerText = !!companyInfo.primary_phone_number ? companyInfo.primary_phone_number : "N/A";
    document.getElementById("entityType").innerText = !!companyInfo.entity && !!companyInfo.entity.type ? companyInfo.entity.type : "N/A";
    document.getElementById("entitySub").innerText = !!companyInfo.entity && !!companyInfo.entity.subtype ? companyInfo.entity.subtype : "N/A";
    document.getElementById("mainDepartments").innerHTML = !!companyInfo.departments.length && !!companyInfo.departments[0].name && !!companyInfo.departments[0].parent ? `${companyInfo.departments[0].name} (Parent department is ${companyInfo.departments[0].parent.name}) <br> ${companyInfo.departments[1].name} (Parent department is ${companyInfo.departments[1].parent.name}) <br> ${companyInfo.departments[2].name} (Parent department is ${companyInfo.departments[2].parent.name}) <br> ${companyInfo.departments[3].name} (Parent department is ${companyInfo.departments[3].parent.name})<br>` : !!companyInfo.departments.length && !!companyInfo.departments[0].name && !companyInfo.departments[0].parent ? `${companyInfo.departments[0].name} <br> ${companyInfo.departments[1].name} <br> ${companyInfo.departments[2].name} <br> ${companyInfo.departments[3].name}<br>` : "N/A"
}

function getCompany(){
    fetch('http://localhost:8080/company', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        companyInfo = data
        setCompanyInfo()
        document.getElementById("loaderImage").style.display = "none"
        document.getElementById("createProviderBtn").style.display = ""
        document.getElementById("finchLogo").style.display = ""
    })
    .catch(error => console.error('Error:', error));
}