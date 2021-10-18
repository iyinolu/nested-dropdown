/* eslint-disable no-unused-vars */
export const TEXT_BLOCK = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac magna non justo hendrerit feugiat. 
  Donec id fermentum mauris. Duis vitae ornare velit. Mauris dapibus, neque vel facilisis hendrerit, 
  libero ligula tempus est, sed gravida nisl nibh ac mi. Donec posuere, dolor et dignissim sagittis, 
  neque sem pulvinar lectus, quis tempor justo odio at augue. Phasellus in cursus dolor, at viverra neque. 
  Maecenas non rutrum nibh. Nam efficitur est ex, eget malesuada est vehicula sit amet. Donec ullamcorper 
  fringilla justo, at dictum massa elementum eleifend. Ut rutrum blandit lorem eu elementum. Donec diam turpis, 
  fringilla egestas scelerisque a, vulputate et nisi. In faucibus libero id enim lobortis, et auctor urna sollicitudin. 
  Proin ac nunc a metus lobortis condimentum ut vitae nunc. In hac habitasse platea dictumst. Vestibulum maximus 
  imperdiet enim id laoreet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
`

export const query = `
  query {
    continents {
      name,
      countries {
        name
        languages {
          name
        }
      }
    }
  }
  `