// /**
// * @name VenueComponent
// * @extends
// * @file venueComponent.js
// * @author Esteban Padilla <ep@estebanpadilla.com>
// * @version 1.0.0
// */
// class VenueComponent extends Component {

//     constructor(model, parent, element, dataManager) {
//         super(model, parent, element, dataManager);
//         this.container.className = 'venueComponent';
//         console.log(element);

//         //Create html elements
//         this.id = document.createElement('p');
//         this.name = document.createElement('p');
//         this.address = document.createElement('p');
//         this.lat = document.createElement('p');
//         this.lng = document.createElement('p');
//         this.city = document.createElement('p');
//         this.state = document.createElement('p');
//         this.country = document.createElement('p');

//         //Add html elements
//         this.container.appendChild(this.id);
//         this.container.appendChild(this.name);
//         this.container.appendChild(this.address);
//         this.container.appendChild(this.lat);
//         this.container.appendChild(this.lng);
//         this.container.appendChild(this.city);
//         this.container.appendChild(this.state);
//         this.container.appendChild(this.country);

//         //Add data to html element
//         this.name.innerHTML = element.places.venue.name;
//         console.log(this.name);

//     }
// }