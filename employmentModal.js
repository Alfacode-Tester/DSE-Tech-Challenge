let currentEmploymentInfo = {}

function setEmploymentInfo(info){
    document.querySelector("#employmentDataGroup").innerHTML = `\n        <h3>Employment Data</h3><div style="display: flex;"><div style="flex:1; margin:10px"><p><b>Full Name:</b><br>${info.responses[0].body.first_name + " " + (!!info.responses[0].body.middle_name ? info.responses[0].body.middle_name + " " : "") + info.responses[0].body.last_name}</p>\n<p><b>ID:</b><br>${info.responses[0].body.id}</p>\n<p><b>Source ID:</b><br>${info.responses[0].body.source_id}</p>\n<p><b>Title:</b><br>${info.responses[0].body.title}</p><p><b>Department:</b><br>${!!info.responses[0].body.department ? info.responses[0].body.department.name : "N/A"}</p><p><b>Manager:</b><br>${!!info.responses[0].body.manager ? employeeDirectory.find(x => x.id === info.responses[0].body.manager.id).first_name + " " + employeeDirectory.find(x => x.id === info.responses[0].body.manager.id).last_name + " (" + info.responses[0].body.manager.id + ")" : 'N/A'}</p>\n<p><b>Start Date:</b><br>${!!info.responses[0].body.start_date ? info.responses[0].body.start_date : "N/A"}</p>\n<p><b>End Date:</b><br>${!!info.responses[0].body.end_date ? info.responses[0].body.end_date : "N/A"}</p>\n<p><b>Latest Rehire Date:</b><br>${!!info.responses[0].body.latest_rehire_date ? info.responses[0].body.latest_rehire_date : "N/A"}</p><p><b>Employment Status:</b><br>${!!info.responses[0].body.employment_status ? info.responses[0].body.employment_status : "N/A"}</p><p><b>Employment Type:</b><br>${info.responses[0].body.employment.type}</p></div>\n<div style="flex:1; margin:10px">    \n\n\n\n<p><b>Employment Subtype:</b><br>${info.responses[0].body.employment.subtype}</p>\n\n\n<p><b>Is Active</b><br>${info.responses[0].body.is_active}</p><p><b>Income:</b><br>Amount: ${info.responses[0].body.income.amount}<br>Currency: ${info.responses[0].body.income.currency}<br>Effective Date: ${info.responses[0].body.income.effective_date}<br>Unit: ${info.responses[0].body.income.unit}</p>\n<p><b>Income History:</b><br>Amount: ${!!info.responses[0].body.income_history ? info.responses[0].body.income_history[0].amount : "N/A"}<br>Currency: ${!!info.responses[0].body.income_history ? info.responses[0].body.income_history[0].currency : "N/A"}<br>Effective Date: ${!!info.responses[0].body.income_history ? info.responses[0].body.income_history[0].effective_date : "N/A"}<br>Unit: ${!!info.responses[0].body.income_history ? info.responses[0].body.income_history[0].unit : "N/A"}</p>\n<p><b>Location:</b><br>${info.responses[0].body.location.line1}<br>${info.responses[0].body.location.line2}<br>${info.responses[0].body.location.city}, ${info.responses[0].body.location.state} ${info.responses[0].body.location.postal_code}<br>${!!info.responses[0].body.location.country ? info.responses[0].body.location.country : ""}</p>\n\n<p><b>Class Code:</b><br>${!!info.responses[0].body.class_code ? info.responses[0].body.class_code : "N/A"}</p>\n<p><b>Custom Fields:</b><br>Name: ${!!info.responses[0].body.custom_fields ? info.responses[0].body.custom_fields[0].name : "N/A"}<br>Value: ${!!info.responses[0].body.custom_fields ? info.responses[0].body.custom_fields[0].value : "N/A"}</p></div></div>\n\n\n\n\n\n\n\n    \n\n    `
}

// Get the modal

function setEmploymentModalTrigger(){
    // Get the button that opens the modal
    let employeeBtn = document.querySelectorAll("#employeeBtn");
    for (var i = 0; i < employeeBtn.length; i++) {
        employeeBtn[i].addEventListener('click', function() {
            fetch(`http://localhost:8080/employment?employee_id=${this.name}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                currentEmploymentInfo = data
                setEmploymentInfo(data)
            })
            .catch(error => console.error('Error:', error));

            emloymentModal.style.display = "block";
        });
    }
}
