const clientId = 'Bi10Mnj4rw_Bg7F5j6naVA';
const secret = '5DwO4dZ52wIzKncCXRl7xVgdZeiNJveKsvTRSSrcT7HewzHtk5OcNvftCKbnuwQt';
let accessToken;

const Yelp = {
      getAccessToken() {  
        if (accessToken) {
          return new Promise(resolve => resolve(accessToken));
          }
          let url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`;
          return fetch(url,{method:'POST'}).then(response => {return response.json();}).then( 
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
          response => response.json()
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
                  zipCode:business.location.zip_code,
                  category:business.categories,
                  rating:business.rating,
                  reviewCount:business.review_count
                }));
            }
        });
      }
  };



  export default Yelp;
