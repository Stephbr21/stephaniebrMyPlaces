/**
* @name index.js
* @file Add a small description for this file.
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/

window.addEventListener('load', init, false);

function init() {
	console.log('App running!');
	//1. Declare variables
	var dataManager = new DataManager();
	var navManager = new NavManager(dataManager);
	var netManager = new NetManager(dataManager, navManager);
	dataManager.navManager = navManager;
	netManager.init();

	//2. Initialize variables
	//3. Program Logic
}