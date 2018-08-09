/**
* @name NetManager
* @extends
* @file netManager.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class NetManager {
	constructor(dataManager, navManager) {
		this.dataManager = dataManager;
		this.navManager = navManager;
		this.url = 'http://localhost:3000/';
	}

	init() {
		this.requestData();
	}

	requestData() {
		var request = new XMLHttpRequest();
		request.open('GET', this.url + 'data', true);
		request.setRequestHeader("Access-Control-Allow-Origin", "*");
		request.onreadystatechange = this.requestDataCallback.bind(this);
		request.send();
	}

	requestDataCallback(e) {
		var request = e.target;
		if (request.readyState == XMLHttpRequest.DONE) {
			if (request.status == 200) {
				var data = JSON.parse(request.responseText);

				var places = data.response.groups[0].items;

				places.forEach(element => {
					this.dataManager.places.push(element);
				});
				this.requestPostNewVenue(places);
				this.requestPostNewCategorie(places);
				// this.putVenue(places);
			} else {
				console.log('Error on request');
			}
		}
	}

	requestPostNewVenue(places) {

		var venuesUpdate = [];
		var newVenueUpdate = {};

		places.forEach(element => {

			var element = element.venue;
			newVenueUpdate = {};

			newVenueUpdate.id = element.id;
			newVenueUpdate.name = element.name;
			newVenueUpdate.address = element.location.address;
			newVenueUpdate.lat = element.location.lat;
			newVenueUpdate.lng = element.location.lng;
			newVenueUpdate.city = element.location.city;
			newVenueUpdate.state = element.location.state;
			newVenueUpdate.country = element.location.country;

			venuesUpdate.push(newVenueUpdate);
		});

		var request = new XMLHttpRequest();
		request.open('POST', this.url + 'data', true);
		request.setRequestHeader('Access-Control-Allow-Origin', '*');
		request.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
		// request.onreadystatechange = this.sendNewVenue.bind(this);
		request.send(JSON.stringify(venuesUpdate));
		this.navManager.showVenues(places);
	}

	requestPostNewCategorie(places) {

		var arrayCategory = [];
		var newCategoryUpdate = {};

		places.forEach(element => {

			var element = element.venue.categories[0];
			newCategoryUpdate = {};

			newCategoryUpdate.id = element.id;
			newCategoryUpdate.name = element.name;
			newCategoryUpdate.pluralName = element.pluralName;
			newCategoryUpdate.shortName = element.shortName;
			newCategoryUpdate.prefix = element.icon.prefix;
			newCategoryUpdate.suffix = element.icon.suffix;
			newCategoryUpdate.primary = element.primary;

			arrayCategory.push(newCategoryUpdate);
		});

		var request = new XMLHttpRequest();
		request.open('PUT', this.url + 'data', true);
		request.setRequestHeader('Access-Control-Allow-Origin', '*');
		request.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
		// request.onreadystatechange = this.sendNewVenue.bind(this);
		request.send(JSON.stringify(arrayCategory));
	}
}
