/**
* @name Component
* @extends
* @file Component.js
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/
class Component {
	constructor(model, parent, dataManager) {
		this.model = model;
		this.parent = parent;
		this.dataManager = dataManager;
		this.container = document.createElement('div');
	}
}