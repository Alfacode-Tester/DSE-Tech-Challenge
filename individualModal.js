let currentIndividualInfo = {}

function setIndividualInfo(info){
    document.querySelector("#individualDataGroup").innerHTML = `\n <h3>Individual Data</h3><p><b>Full Name:</b><br>${info.responses[0].body.first_name + " " + (!!info.responses[0].body.middle_name ? info.responses[0].body.middle_name + " " : "") + info.responses[0].body.last_name}</p>\n<p><b>Preferred Name:</b><br>${!!info.responses[0].body.preferred_name ? info.responses[0].body.preferred_name : "N/A"}</p>\n<p><b>ID:</b><br>${info.responses[0].body.id}</p>\n<p><b>Date of Birth:</b><br>${info.responses[0].body.dob}</p>\n<p><b>Ethnicity:</b><br>${!!info.responses[0].body.ethnicity ? info.responses[0].body.ethnicity : "N/A" }</p>\n<p><b>Gender:</b><br>${!!info.responses[0].body.gender ? info.responses[0].body.gender : "N/A" }</p>\n<p><b>Personal Email:</b><br>${info.responses[0].body.emails[0].type === "personal" ? info.responses[0].body.emails[0].data : info.responses[0].body.emails[1].type  === "personal" ? info.responses[0].body.emails[1].data : "N/A" }</p>\n<p><b>Work Email:</b><br>${info.responses[0].body.emails[0].type === "work" ? info.responses[0].body.emails[0].data : info.responses[0].body.emails[1].type  === "work" ? info.responses[0].body.emails[1].data : "N/A" }</p>\n<p><b>Personal Phone Number:</b><br>${info.responses[0].body.phone_numbers[0].type === "personal" ? info.responses[0].body.phone_numbers[0].data : info.responses[0].body.phone_numbers[1].type  === "personal" ? info.responses[0].body.phone_numbers[1].data : "N/A" }</p>\n\n<p><b>Work Phone Number:</b><br>${info.responses[0].body.phone_numbers[0].type === "work" ? info.responses[0].body.phone_numbers[0].data : info.responses[0].body.phone_numbers[1].type  === "work" ? info.responses[0].body.phone_numbers[1].data : "N/A" }</p>\n\n<p><b>Residence:</b><br>${info.responses[0].body.residence.line1}<br>${info.responses[0].body.residence.line2}<br>${info.responses[0].body.residence.city}, ${info.responses[0].body.residence.state} ${info.responses[0].body.residence.postal_code}<br>${!!info.responses[0].body.residence.country ? info.responses[0].body.residence.country : ""}</p>\n\n\n\n\n\n\n\n    </div>\n\n    `
}


// Get the modal
let individualModal = document.getElementById("individualModal");
let emloymentModal = document.getElementById("emloymentModal");


// Get the <span> element that closes the modal
let individualSpan = document.getElementsByClassName("individualClose")[0];
let employmentSpan = document.getElementsByClassName("employmentClose")[0];


function setIndividualModalTrigger(){
    // Get the button that opens the modal
    let individualBtn = document.querySelectorAll("#individualBtn");
    for (var i = 0; i < individualBtn.length; i++) {
        individualBtn[i].addEventListener('click', function() {
            fetch(`http://localhost:8080/individual?employee_id=${this.name}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                currentIndividualInfo = data
                setIndividualInfo(data)
            })
            .catch(error => console.error('Error:', error));

            individualModal.style.display = "block";
        });
    }
}

// When the user clicks on <span> (x), close the modal
individualSpan.onclick = function() {
    individualModal.style.display = "none";
}

employmentSpan.onclick = function() {
    emloymentModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == individualModal || event.target == emloymentModal) {
    individualModal.style.display = "none";
    emloymentModal.style.display = "none";
  }
}
