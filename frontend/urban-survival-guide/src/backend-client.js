import axios from 'axios'

const endpoint = 'http://localhost:5000/'


export function postComment(Comment, date, necessity_id) {
        let config = {
            headers: {
                username: 'User1',
            },
            "crossDomain": true
        }
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

    let config = {
        headers: {
            // retrieve user from localstorage
            username: 'User1',
        },
        "crossDomain": true
    }   
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

