const readline = require('readline-sync');
const request = require('request');
const fs = require('fs');
// const apiKey = readline.question("Google API Key?");
const apiKey = '';

// const latitude = readline.question("Latitude?");
const latitude = "39.80105340458913"

// const longitude = readline.question("Longitude?");
const longitude = "-86.16140483906247"

// const radius = readline.question("Radius?");
const radius = "10";
const rad = radius * 1609.34;

const types = ['church', 'synagogue', 'mosque', 'hindu_temple']

var places = [];

var page = 1;

console.log(`You are searching ${rad} meters from ${latitude}, ${longitude} using ${apiKey}`);

function nextPage(token) {
    page += 1;
    setTimeout(function() {getPlaces(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${token}&key=${apiKey}`)},1000);
}

function getDetails(place_id) {
    console.log(place_id);
};

function getPlaces(url) {
    request(url, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred 
        if (response.statusCode == 200) {
            console.log(page);
            var data = JSON.parse(body); // Print the HTML for the Google homepage.
            console.log(data);
            places = places.concat(data.results);
            if (data.next_page_token){
                nextPage(data.next_page_token);
            } else {
                console.log(places.length);
                fs.writeFile(`${types[3]}.txt`, JSON.stringify(places), (err) => {
                    if (err) throw err;
                    console.log('Places saved!');
                });
            }
        }
    });
}

function init() {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${rad}&rankby=prominence&type=${types[3]}&key=${apiKey}`
    getPlaces(url);
}

init();

/*
https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords}&rankby=location&type=${types[0]}&key=${apiKey}
https://maps.googleapis.com/maps/api/place/details/json?placeid=#{place_id}&key=#{api_key}
*/

