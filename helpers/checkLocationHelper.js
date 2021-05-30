'use strict';

function getCountryFromLocationData(locationData) {
  return locationData.country.iso_code;
}

function isCountryAllowed(countryCode, countryWhitelist) {
  if (countryCode in countryWhitelist) {
    return true;
  }
  return false;
}

module.exports = {
  getCountryFromLocationData,
  isCountryAllowed,
};
