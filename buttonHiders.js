        // displays company directory and hides company info
        
        directoryBtn.addEventListener("click", (e) => {
            e.preventDefault();
            document.getElementById("companySection").style.display = "none"
            document.getElementById('directoryTable').style.display = ""
            directoryBtn.style.display = "none";
            CompanyInfoBtn.style.display = "";
            !!document.querySelector("#directoryTable > table") ? console.log("Directory exists") : getDirectory();
        });

        // display company info and hide company directory
        CompanyInfoBtn.addEventListener("click", (e) => {
            e.preventDefault();
            document.getElementById("companySection").style.display = ""
            document.getElementById('directoryTable').style.display = "none"
            directoryBtn.style.display = "";
            CompanyInfoBtn.style.display = "none";
        });