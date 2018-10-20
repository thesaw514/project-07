class Helper {
  static baseURL() {
    return 'https://api.foursquare.com/v2';
  }

  static auth() {
    const keys = {
      client_id: 'WLBZWMKYTPYBSB0I0B44XCKBRJOLKJVGAFSMFDYNNKJ5YHDZ',
      client_secret: 'SOBKVU4ONCCN32YOZ2JR0ZVMERMEL1WISQWN2JBBZ1P4VUUR',
      v: '20181019'
    };

    return Object.keys(keys)
      .map(key =>`${key}=${keys[key]}`)
      .join('&');
  }

  static urlBuilder(urlParameters) {
    if(!urlParameters) {
      return '';
    }

    return Object.keys(urlParameters)
      .map(key => `${key}=${urlParameters[key]}`)
      .join('&');
  }

  static headers() {
    return {
      Accept: 'application/json'
    };
  }

  static simpleFetch(endPoint, method, urlParameters) {
    let requestData = {
      method,
      headers: Helper.headers()
    };

    return fetch(
      `${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(urlParameters)}`, requestData)
      .then(res => res.json());
  }
}

export default class SquareAPI {
  static search(urlParameters) {
    return Helper.simpleFetch('/venues/search', 'GET', urlParameters);
  }

  static getVenueDetails(VENUE_ID) {
    return Helper.simpleFetch(`/venues/${VENUE_ID}`,'GET');
  }

  static getVenuePhotos(VENUE_ID) {
    return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, 'GET');
  }
}
