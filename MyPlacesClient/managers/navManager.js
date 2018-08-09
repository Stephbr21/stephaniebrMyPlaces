/**
* @name NavManager
* @extends
* @file navManager.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class NavManager {
	/**
	* @param {data type} name - description.
	*/
	constructor(dataManager) {
		this.dataManager = dataManager;
		this.dataComponent = document.getElementById('dataComponent');
	}

	showVenues() {
		this.dataManager.places.forEach(element => {
			console.log("create UI");
			// var venueComponent = new VenueComponent(element, this.venueComponent, this.dataManager);
		});
	}
}