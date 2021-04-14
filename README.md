[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/amamenko/inky-doodle">
    <img src="client/src/images/InkyDoodleLogo.png" alt="Logo" width="350"  />
  </a> 

  <h3 align="center">Inky Doodle</h3>

  <p align="center">
    Interactive Pedigree Single-Page Application (SPA) Integrated with Contentful
    <br />
    <br />
    <a href="https://inkydoodle.ml">View Demo</a>
    ·
    <a href="https://www.youtube.com/watch?v=VPKyCoFkgS0">Watch Video Demo</a>
    ·
    <a href="https://github.com/amamenko/inky-doodle/issues">Report Issue</a> 
    ·
    <a href="https://www.instagram.com/inkydoodle.ml">Follow @inkydoodle.ml</a> 
  </p>
</p>

## Introduction

Inky Doodle is a single-page application (SPA) that illustrates and explores the biological concepts of hybridization and heredity with the use of imaginary species of "Inky Doodles."
The application itself takes the form of a pedigree chart with three generations. The first generation has a left tree and a right tree with spaces for two
sets of parents. These parents can then be bred to form second generation offspring, which can, in turn, be bred to potentialy create third generation offspring.

Second-generation Inky Doodle mates can only produce viable offpspring if either one or both mates are purebreds or, in the case of both second-generation mates being F1 (filial 1) hybrids, if at least one of each mate's parents is of the same species.
The seven possible combinations of the three generations are as follows, where capital letters (e.g. A, B) designate purebred parents, mixed letters (e.g. Ab, Bc) designate hybrids, and
arrows designate breeding to create a new generation:

<p align="center">A, A, A, A &rarr; A, A &rarr; A</p>
<p align="center">A, A, A, B &rarr; A, Ab &rarr; A</p>
<p align="center">A, A, B, B &rarr; A, B &rarr; Ab</p>
<p align="center">A, A, B, C &rarr; A, Bc &rarr; Abac</p>
<p align="center">A, B, A, B &rarr; Ab, Ab &rarr; Ab</p>
<p align="center">A, B, A, C &rarr; Ab, Ac &rarr; Abac</p>
<p align="center">A, B, C, D &rarr; Ab, Cd &rarr; No Match</p>


## UX / UI

<br /> 
<p align="center">
<a href="https://inkydoodle.ml">
    <img  src="client/src/images/ResponsiveDesignImage.png" alt="Inky Doodle Responsiveness Demo Screenshots" width="700" />
</a>
</span>
<br/ >
<br />

The application was built by using React, [Styled Components](https://github.com/styled-components/styled-components), and [NES.css](https://github.com/nostalgic-css/NES.css).
All Inky Doodle information including names, parent information, images, and order number are stored in a [Contentful](https://www.contentful.com/) space and queried as needed by using Contentful's GraphQL API.

Inky Doodles are the intellectual property of Alex Jaloza. Inky Doodle assets, info, and initial design mockups courtesy of Alex Jaloza.

<br />

<p align="center">
  <img  src="client/src/images/PreliminarySketch.PNG" alt="Inky Doodle Preliminary Sketch" width="300" />
  <img src="client/src/images/ProductionScreenshot.png" alt="Inky Doodle Production Screenshot" width="400" /> 
</p>

<br />

Production application added generational title indicators to each individual parent's tree node.

First generation parent dropdowns also highlight names (with appropriate associated Inky Doodle colors) of parent species selected on the opposite side of the tree
to suggest a next selection that will produce a successful generation 3 offspring.

A randomizer button was also added in production that automatically selects first generation parents according to one of the seven breeding combinations mentioned in the introduction.

Project was deployed to [Vercel](https://vercel.com), custom domain acquired from [Freenom](https://www.freenom.com/en/index.html?lang=en).

## Automated Server-side Instagram Posting

The project also incudes an [Express](https://expressjs.com) server that posts a new Inky Doodle from [Contentful](https://www.contentful.com/) with a custom caption (including the Inky Doodle's name, ID number, parents, if any, and its generation) to the [@inkydoodle.ml](https://www.instagram.com/inkydoodle.ml) Instagram page every day at 4PM Eastern Time via [node-cron](https://www.npmjs.com/package/node-cron) and [instagram-web-api](https://www.npmjs.com/package/instagram-web-api). 

The Instagram link and date of posting for that particular Inky Doodle are then automatically stored via [the JavaScript SDK for Contentful's Content Management API](https://www.npmjs.com/package/contentful-management).

The server was deployed to [Heroku](https://www.heroku.com) and the Heroku dyno kept awake with [Kaffeine](https://kaffeine.herokuapp.com).

## Upcoming Features (Dev Branch)

The following additional features are in progress:
  - [X] Landing page
  - [ ] About page
  - [ ] Inky Doodle search functionality
    - [X] Pagination
    - [X] Profiles
    - [X] Instagram Post Links
    - [X] Scheduled Posts
    - [ ] Nested Parents
    - [ ] Nested Children
  - [ ] Circular pedigree tree

## Local Development

To set up this project locally, you can follow the steps below.

### Prerequisites

You will need to have the following software installed:

- npm
- Git
- Node.js

### Installation

1. Get a free Contentful space at [https://www.contentful.com](https://www.contentful.com) and create a model and associated content.
2. Clone the Github repository.
   ```sh
   git clone https://github.com/amamenko/inky-doodle.git
   ```
3. Install all server-side NPM packages.
   ```sh
   npm install
   ```
4. Add your server-side environment variables.
   ```JS
   INSTAGRAM_USERNAME=YOUR INSTAGRAM USERNAME
   INSTAGRAM_PASSWORD=YOUR INSTAGRAM PASSWORD
   CONTENTFUL_SPACE_ID=YOUR CONTENTFUL SPACE ID
   CONTENTFUL_ACCESS_TOKEN=YOUR CONTENTFUL ACCESS TOKEN
   ```
5. `cd` into the client-side directory.
   ```sh
   cd client
   ```
6. Install all client-side NPM packages.
   ```sh
   npm install
   ```
7. Enter your Contentful Content Delivery API credentials as client-side environment variables.
   ```JS
   REACT_APP_SPACE_ID=YOUR CONTENTFUL SPACE ID
   REACT_APP_ACCESS_TOKEN=YOUR CONTENTFUL ACCESS TOKEN
   ```
8. Start the local server.
   ```JS
   npm start
   ```
9. Build for production.
   ```JS
   npm run build
   ```

<!-- CONTRIBUTING -->

## Contributing

Contributions are welcome!

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/MyFeature`).
3. Commit your changes (`git commit -m 'Add my feature'`).
4. Push to the branch (`git push origin feature/MyFeature`).
5. Open a pull request.

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->

## Contact

Avraham (Avi) Mamenko - avimamenko@gmail.com

Project Link: [https://github.com/amamenko/inky-doodle](https://github.com/amamenko/inky-doodle)

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- Alex Jaloza
- [Contentful](https://www.contentful.com/)
- [NES.css](https://github.com/nostalgic-css/NES.css)
- [react-select-nes-css-theme](https://www.npmjs.com/package/react-select-nes-css-theme)
- [Vercel](https://vercel.com)
- [Heroku](https://www.heroku.com)
- [instagram-web-api](https://www.npmjs.com/package/instagram-web-api)
- [Jimp](https://www.npmjs.com/package/jimp)
- [React Icons](https://react-icons.github.io/react-icons)
- [React Spinners](https://www.npmjs.com/package/react-spinners)
- [Best-README-Template](https://github.com/othneildrew/Best-README-Template)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/amamenko/inky-doodle/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/avrahammamenko
