function directoryTable(employees){
    const newTable = document.createElement("table");
    newTable.innerHTML = "<thead><th>Name</th><th>ID</th><th>Is Active</th><th>Department</th><th>Manager</th><th>Individual Data</th><th>Employment Data</th></thead>";
    for(employee of employees){
        const newRow = document.createElement("tr");
        const empName = document.createElement("td");
        const empId = document.createElement("td");
        const empActive = document.createElement("td");
        const empDepartment = document.createElement("td");
        const empManager = document.createElement("td");
        const empIndividual = document.createElement("td");
        const empData = document.createElement("td");
        empName.textContent = !!employee.first_name ? employee.first_name + " " + employee.middle_name + " " + employee.last_name : "N/A";
        empId.textContent = !!employee.id ? employee.id : "N/A";  
        empActive.textContent = !!employee.is_active ? employee.is_active : "N/A";  
        empDepartment.textContent = !!employee.department ? employee.department.name : "N/A";
        empManager.textContent = !!employee.manager ? employees.find(x => x.id === employee.manager.id).first_name + " " + employees.find(x => x.id === employee.manager.id).last_name : 'N/A';    
        empIndividual.innerHTML = `<button id="individualBtn" name="${employee.id}" >See Individual Data</button>`
        empData.innerHTML = `<button id="employeeBtn" name="${employee.id}" >See Employment Data</button>`
        newRow.appendChild(empName);
        newRow.appendChild(empId);
        newRow.appendChild(empActive);
        newRow.appendChild(empDepartment);
        newRow.appendChild(empManager);
        newRow.appendChild(empIndividual);
        newRow.appendChild(empData);
        newTable.appendChild(newRow);
    }

    const target = document.getElementById('directoryTable');

    const newHeader = document.createElement("h2");
    newHeader.innerHTML = "Employee Directory:"
    target.appendChild(newHeader);

    
    target.appendChild(newTable);
}

function getDirectory(){
    fetch('http://localhost:8080/directory', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        employeeDirectory = data.individuals
        directoryTable(data.individuals)
        directoryBtn.style.display = "none";
        CompanyInfoBtn.style.display = "";
        setIndividualModalTrigger()
        setEmploymentModalTrigger()
    })
    .catch(error => console.error('Error:', error));
}