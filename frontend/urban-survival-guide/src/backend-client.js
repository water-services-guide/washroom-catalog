import axios from 'axios'

const endpoint = 'http://localhost:5000/'

const config = {
    headers: {
        username: 'User1',
    },
    "crossDomain": true
}

export async function getNecessityDetails(type, necessity_id) {
    console.log("does it even get here?")
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

