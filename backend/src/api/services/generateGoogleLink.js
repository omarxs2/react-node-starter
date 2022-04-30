const axios = require('axios');

const orderLocationsMapquest = async (locationsList, callback) => {
  const locations = [];
  locationsList.forEach((loc) => (
    locations.push({ latLng: { lat: loc.partner_latitude, lng: loc.partner_longitude } })
  ));
  const MAPQUEST_KEY = 'CIAI5CLXk1DxDQJsAnkOca39HPU8JzGW';
  const mapquestUrl = `https://www.mapquestapi.com/directions/v2/optimizedRoute?outFormat=json&key=${MAPQUEST_KEY}`;
  await axios.post(mapquestUrl, { locations }, { headers: { 'Content-Type': 'application/json' } }).then((res) => callback(res.data.route.locationSequence));
};

module.exports = {
  generateGoogleLink: async (locations) => {
    let URL = 'https://www.google.com/maps/dir/';
    let lat = '';
    let lng = '';
    locations.unshift({ partner_latitude: -6.826633, partner_longitude: 39.252799 });
    locations.push({ partner_latitude: -6.826633, partner_longitude: 39.252799 });

    return new Promise((resolve) => {
      orderLocationsMapquest(locations, (sequence) => {
        if (sequence && sequence.length > 0) {
          sequence.forEach((i) => {
            lat = `${locations[i].partner_latitude},`;
            lng = `${locations[i].partner_longitude}/`;
            URL += ((lat[0] !== '-' ? `+${lat}` : lat) + (lng[0] !== '-' ? `+${lng}` : lng));
          });
        }
        resolve(URL);
      });
    });
  },
};
