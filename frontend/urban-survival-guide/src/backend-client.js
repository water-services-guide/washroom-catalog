import axios from 'axios'

const endpoint = 'http://localhost:5000/'

const config = {
    headers: {
        username: 'User1',
    },
    "crossDomain": true
}

export function postFavouriteBuilding(necessity_id){
    axios.post(endpoint + "necessity/"+ necessity_id +"/favouritebuilding", {}, config)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}

export function postLike(necessity_id) {
    axios.post(endpoint + "necessity/"+ necessity_id +"/like", {}, config)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
} 

export function postRating(date, necessity_id, rating){
    axios.post(endpoint + "necessity/"+ necessity_id +"/rating", {
        date: date.toLocaleString('en-US'),
        rating: rating
    }, config)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export async function getNecessityDetails(type, necessity_id) {
    return new Promise(async function(resolve, reject) {
        let { data } = await axios.get(endpoint + 'necessity/' + type + "/" + necessity_id, config)
        if(data == null) {
            reject()
        }
        resolve(data)
      });
}


export function postComment(Comment, date, necessity_id) {
        axios.post(endpoint + "necessity/"+ necessity_id +"/comments", {
            date: date.toLocaleString('en-US'),
            comment: Comment
        }, config)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

export function postIncidentReport(date, content, severity, subject, necessity_id) {
    axios.post(endpoint + "necessity/" +necessity_id + "/incidentreport", {
        date: date.toLocaleString('en-US'),
        content: content,
        severity: severity,
        subject: subject
    }, config)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export function postUser(username, password) {
        let data = new FormData();
        data.append('username', username);
        data.append('password', password);
        axios.post(endpoint + "signUp", data, config)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

