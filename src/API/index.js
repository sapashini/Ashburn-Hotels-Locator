
/**** Reference from  FEND Forest Walker walk thourgh!!****/

// A utility class for fetching third party data.
class Utills {
	// A method for base url to fetch third party data.
	static mainURL () {
		return "https://api.foursquare.com/v2"
	}

	// A method for client credentials to fetch third party data.
	static auth () {
		const keys = {
			client_id: "FEHQ14G5KWJUIZKYZPIVYNKDUFWS5S4GP0SUSASGVWOHG4AG",
			client_secret: "SPEAHCTDA14IULG1C2OOJCQLUFU5T45DZ1M1IGSQ1I2PO1GY",
			v: "20182212",
			limit: 10
		};
		return Object.keys(keys).map(key =>`${key}=${keys[key]}`).join("&");
	}

	// A method for specific url to fetch third party data.
	static urlLink (urlPrams) {
		if(!urlPrams) {
			return "";
		}
		return Object.keys(urlPrams).map(key => `${key}=${urlPrams[key]}`).join("&");
	}

	// A method for the third party data headers.
	static headers() {
		return {Accept: "application/json"};
	}

	// A method for fetching third party data.
	static simpleFetch(endPoint,method,urlPrams) {
		let dataToFetch = {
			method,
			headers: Utills.headers()
		};
		return fetch(
			`${Utills.mainURL()}${endPoint}?${Utills.auth()}&${Utills.urlLink(
			urlPrams)}`, dataToFetch
		).then(
			res => res.json()
		)
		.catch(error => {
			alert("Error, while fetching data from Foursquare API... Sorry!");
			console.log("Error trying to get hotels venues!")
		});

	}
}

// A utility class for fetching third party data.
class FourSquareAPI {
	static search(urlPrams) {
		return Utills.simpleFetch("/venues/search","GET",urlPrams);
	}
	static venuesDetails(VENUE_ID) {
		return Utills.simpleFetch(`/venues/${VENUE_ID}`,"GET");
	}
	static venuesPhotos(VENUE_ID) {
		return Utills.simpleFetch(`/venues/${VENUE_ID}/photos`,"GET");
	}
}
export default FourSquareAPI;