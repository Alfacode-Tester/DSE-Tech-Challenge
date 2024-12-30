const PORT = 8080;
const express = require("express");
const cors = require("cors");
const axios = require("axios");


// require("dotenv").config();

const app = express();

app.use(cors());


app.get('/create', async (req, res) => {
    let data = JSON.stringify({
        "provider_id": req.query.provider_id,
        'products': ['company', 'directory', 'individual', 'employment']
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.tryfinch.com/sandbox/connections',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Basic ZjAxZjYwOGItMDkzMC00MWE2LWFmMmQtNjY4YTc5ZjJlMDM0OmZpbmNoLXNlY3JldC1zYW5kYm94LWM5SlRfVUtGUk9sLUhyN1RTWlkzdkJtVVVCVEtudjZ3LXBVdzJsUU8='
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        res.json(response.data);
        console.log(JSON.stringify(response.data));
        app.locals.access_token = response.data.access_token;
      })
      .catch((error) => {
        console.log(error);
      });
})

app.get('/delete', async (req, res) => {      
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.tryfinch.com/disconnect',
        headers: { 
          'Finch-API-Version': '2020-09-17', 
          'Authorization': `Bearer ${app.locals.access_token}`
        }
    };
      
      axios.request(config)
      .then((response) => {
        res.json(response.data);
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
})



// // API call to get directory
app.get("/directory", (req, res) => {
  const options = {
    method: "GET",
    url: "https://api.tryfinch.com/employer/directory",
    headers: {
        'Authorization': `Bearer ${app.locals.access_token}`,
        'Content-Type': 'application/json',
        'Finch-API-Version': '2020-09-17'
    }
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error);
    });
});

// // API call to company
app.get("/company", (req, res) => {
    const options = {
      method: "GET",
      url: "https://api.tryfinch.com/employer/company",
      headers: {
          'Authorization': `Bearer ${app.locals.access_token}`,
          'Content-Type': 'application/json',
          'Finch-API-Version': '2020-09-17'
      }
    };
  
    axios
      .request(options)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.json(error);
      });
});






//   API call to individual
app.get("/individual", (req, res) => {
    const axios = require('axios');
    let data = JSON.stringify({
    "requests": [
        {
        "individual_id": req.query.employee_id
        }
    ]
    });

    let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.tryfinch.com/employer/individual',
    headers: { 
        'Finch-API-Version': '2020-09-17', 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${app.locals.access_token}`
    },
    data : data
    };

    axios.request(config)
    .then((response) => {
      res.json(response.data);
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
});

//   API call to employment
app.get("/employment", (req, res) => {
    const axios = require('axios');
    let data = JSON.stringify({
    "requests": [
        {
        "individual_id": req.query.employee_id
        }
    ]
    });

    let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.tryfinch.com/employer/employment',
    headers: { 
        'Finch-API-Version': '2020-09-17', 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${app.locals.access_token}`
    },
    data : data
    };

    axios.request(config)
    .then((response) => {
      res.json(response.data);
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});