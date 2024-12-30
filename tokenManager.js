       // Creates access token
       createProviderBtn.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById("loaderImage").style.display = ""
        document.getElementById("createProviderBtn").style.display = "none"
        document.getElementById("finchLogo").style.display = "none"
        

        selectedProviderId = providerOptions.value

        fetch(`http://localhost:8080/create?provider_id=${selectedProviderId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            getCompany()
            providerSection.style.display = "none";
            descriptorSection.style.display = "none";
            deleteTokenBtn.style.display = "";
            directoryBtn.style.display = "";
        })
        .catch(error => console.error('Error:', error));
    });


    // Deletes access token
    deleteTokenBtn.addEventListener("click", (e) => {
        e.preventDefault();

            fetch('http://localhost:8080/delete', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                if(!!document.querySelector("#directoryTable > table")){
                    document.querySelector("#directoryTable > h2").remove()
                    document.querySelector("#directoryTable > table").remove()
                }
                document.getElementById("companySection").style.display = "none";
                deleteTokenBtn.style.display = "none";
                CompanyInfoBtn.style.display = "none";
                directoryBtn.style.display = "none";
                providerSection.style.display = "";
                descriptorSection.style.display = "";
            })
            .catch(error => console.error('Error:', error));
        });