'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

const succ = function (position) {
  console.log(position);
  const { latitude } = position.coords;
  const { longitude } = position.coords;
  console.log(latitude, longitude);
  //console.log(`https://www.google.com/maps/@v${latitude},c`);

  console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

  const coords = [latitude, longitude];

  // const map = L.map('map').setView([51.505, -0.09], 13);
  const map = L.map('map').setView(coords, 17);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker(coords)
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
      })
    )
    .setPopupContent('You are here')
    .openPopup();

  // console.log(map);
  map.on('click', function (mapEvent) {
    console.log(mapEvent);
    const { lat, lng } = mapEvent.latlng;

    // L.marker(mapEvent.latlng)
    //   .addTo(map)
    //   .bindPopup('You clicked here!')
    //   .openPopup();

    L.marker(mapEvent.latlng)
      .addTo(map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('Workout')
      .openPopup();
  });
};

const err = function () {
  alert('Could not get your location');
};

if (navigator.geolocation) navigator.geolocation.getCurrentPosition(succ, err);
