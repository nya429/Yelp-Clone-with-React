const clientId = 'Bi10Mnj4rw_Bg7F5j6naVA';
const secret = '5DwO4dZ52wIzKncCXRl7xVgdZeiNJveKsvTRSSrcT7HewzHtk5OcNvftCKbnuwQt';
let accessToken;

const Yelp = {
      getAccessToken() {  //why use dot ? .method()
        if (accessToken) {
          return new Promise(resolve => resolve(accessToken));////why ask a promise to hold the place? & why
          }
          let url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`;
          return fetch(url,{method:'POST'}).then(response => {return response.json();}).then( //why not implicit
            jsonResponse => {
                accessToken = jsonResponse.access_token;
            });
        },

      search(term,location,sortBy) {
        return Yelp.getAccessToken().then(
          () => {
            let url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;
            return fetch(url,{
              headers:{Authorization:`Bearer ${accessToken}`}
          });
        }).then(
          response => response.json()  //return
        ).then(
          jsonResponse =>{
            if(jsonResponse.businesses) {
              console.log(jsonResponse.businesses);
              return jsonResponse.businesses.map(business => ({
                  id:business.id,
                  imageSrc:business.image_url,
                  name:business.name,
                  address:business.location.address1,
                  city:business.location.city,
                  state:business.location.state,
                  zipCode:business.zip_code,
                  category:business.categories,
                  rating:business.rating,
                  reviewCount:business.review_count
                }));
            }
        });
      }
  };

  export default Yelp;
