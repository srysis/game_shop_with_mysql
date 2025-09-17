# Game shop

This is a '*proof-of-concept*' online shop for different types of games.  
It does not have an ability to actually buy games, but this website serves as a 'template' for a potentially existing online shop. 
This is an improved version of [this app](https://github.com/srysis/game_shop) that utilizes MySQL database to fetch data about game products.


## Features 

- Catalog preview in different view modes
- Filters to filter out games by specific genres, 'settings', format, etc.
- Search bar to search games by their name
- A cart to temporarily store products until 'final payment'
- Cart managing that allows to doublecheck if right product was placed in it, delete one or more products, as well as completely wipe the cart
- Each product has their own unique page on which users can read their description, relevant screenshots and check the price
- All relevant data (cart, filters, etc.) as well as some of the UI data is being stored in 'session storage' to allow seamless navigation between pages
- The layout of the page is responsive, allowing for it to be viewed on mobile devices


## Technical information

The Front-End side of this web-application was written using React.js framework.  
It utilizes 'Browser Router' from 'React-Router' package to allow client-side navigation, making it a Single Page Application, without a need for a page reload.
For 'requests' it uses Axios library. Front-End side is being hosted on Netlify.

The Back-End was written with Node.js with installed Express package to handle client requests and respond back with data.
Back-End is being hosted on Vercel.

Finally, as the database it accesses the MySQL database hosted on Aiven.


## Link

The latest version of this app can be viewed [here](https://srysis-game-shop.netlify.app/).


## Credits

All the information as well as assets were taken from corresponding product pages on [Steam Store](https://store.steampowered.com/).
All materials used in this web-site were used with educational purpose and no money are being made off of it.