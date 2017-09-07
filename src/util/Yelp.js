const clientId = 'Bi10Mnj4rw_Bg7F5j6naVA';
const secret = '5DwO4dZ52wIzKncCXRl7xVgdZeiNJveKsvTRSSrcT7HewzHtk5OcNvftCKbnuwQt';

let accessToken;


const Yelp = {
      getAccessToken() {  //why use dot ? .method()
        if(accessToken) {
          return new Promise(resolve => resolve(accessToken));////why ask a promise to hold the place? & why
          }
          let url = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id='+ clientId + '&client_secret=' + secret;
          return fetch(url,{method:'POST'}).then(response => response.json()).then(
            jsonResponse => {
                accessToken = jsonResponse.access_token;
            });
        },
      search(term,location,sortBy) {
        return Yelp.getAccessToken().then(accessToken => {
          let url ='https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=TERM&location=LOCATION&sort_by=SORT_BY';
          return fetch(url,{
            headers:{Authorization:`Bearer ${accessToken}`},
          });
        }).then(response => response.json()).then(jsonResponse =>{
            if(jsonResponse.businesses) {

              return jsonResponse.business.map(business => {
                id:business.id,
                imageSrc:business.imageSrc,
                name:business.name,
                address:business.address,
                city:business.city,
                state:business.ctate,
                zipCode:business.zipCode,
                category:business.category,
                rating:business.rating,
                reviewCount:business.reviewCount
              });
            }
        })
      }


  };

  export default Yelp;
