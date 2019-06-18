import axios from 'axios'

const endpoint = 'http://localhost:5000/'

const config = {
    headers: {
        username: 'User1',
    },
    "crossDomain": true
}

export function deleteUser(user_id){
    axios.post(endpoint + "deleteuser/"+ user_id, {}, config)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}

export function updateNecessityStatus(nid, status){
    axios.post(endpoint + "necessity/" + nid + "/status", {status: status}, config)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}


export function projectNecessityAttribute(attribute){
    return new Promise(async function(resolve, reject) {
        axios.get(endpoint + "necessity/" + attribute, {}, config)
        .then(function (response) {
            console.log(response);
            resolve(response.data)
        })
        .catch(function (error) {
            console.log(error);
            reject(error)
        });
      });
}


export function getAllAverageUserRatings(attribute){

    return new Promise(async function(resolve, reject) {
        axios.get(endpoint + "avgRatings" + attribute, {}, config)
        .then(function (response) {
            console.log(response);
            resolve(response.data)
        })
        .catch(function (error) {
            console.log(error);
            reject(error)
        });
      });
}

export function join(attribute){
    return new Promise(async function(resolve, reject) {
        axios.post(endpoint + "necessity/join", {table: attribute}, config)
        .then(function (response) {
            console.log(response);
            resolve(response.data)
        })
        .catch(function (error) {
            console.log(error);
            reject(error)
        });
      });
}