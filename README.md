# Dual Vision Events Website

A five-page static website for Dual Vision Events, an event equipment hire business based in Bridgemead, Gqeberha. The website lets visitors learn about the business, view equipment and daily prices, send an enquiry and contact the business.

## Website pages

- `index.html` – home page and featured equipment.
- `pages/about.html` – business background, vision and mission.
- `pages/products.html` – equipment catalogue with search, category filtering, sorting, image lightbox and FAQ accordion.
- `pages/enquiries.html` – equipment, services, sponsorship and volunteering enquiries.
- `pages/contact.html` – contact details, interactive map and general contact form.

## Main features

- Responsive navigation menu for smaller screens.
- Product search, category filter and sorting by name or price.
- Image preview lightbox that can be opened by mouse or keyboard and closed with Escape.
- FAQ accordion on the catalogue page.
- Leaflet map with a business location marker.
- Contact and enquiry forms with required fields, JavaScript checks and clear error messages.
- Equipment hire estimate based on the selected daily price, quantity and number of days.
- Page titles, descriptions, headings and descriptive image alternative text for basic SEO and accessibility.

## Project structure

```text
DualVisionEvents/
  index.html
  pages/
    about.html
    products.html
    enquiries.html
    contact.html
  assets/
    css/style.css
    js/script.js
    js/products.js
    js/enquiry.js
    js/contact.js
    images/
  README.md
  CHANGELOG.md
  references.md
```

## How to run the website

1. Download or clone the project folder.
2. Open the folder in Visual Studio Code.
3. Open `index.html` in a browser, or use the Live Server extension.
4. Keep the folder structure unchanged so the CSS, JavaScript and image paths continue to work.

The website uses HTML, CSS and plain JavaScript. No build process or package installation is required. An internet connection is needed for Google Fonts, Leaflet and OpenStreetMap map tiles.

## Forms and submission behaviour

The forms validate information in the browser. When a valid contact form is submitted, the visitor's default email application opens with a prepared message addressed to `dualvision.events@gmail.com`. The enquiry form displays a response and an estimated equipment hire cost where applicable, then provides a link to prepare an email.

These forms do not send data to a server or save submissions in a database. The visitor must press Send in their email application. A real online submission system would require a server-side form service or backend. The `mailto:` method is used because this is a static first-year project without a backend.

## Important business information to verify before publishing

- The map coordinates in `assets/js/contact.js` are approximate Gqeberha coordinates. Confirm and replace them with the exact business pin before publishing the live site.
- Check that catalogue prices and available stock still match the business before making the website public.
- The Facebook link currently opens a Facebook search result. Replace it with the exact business page URL if one is available.
- The map, Google Fonts and external libraries need an internet connection.

## Testing checklist

Test each item in a browser before submission:

- Open all five pages and check that navigation, images and CSS load.
- Test the mobile menu at a narrow screen width.
- Search for a product, select each category, sort by name and price, and test a search with no matches.
- Open a product image using a mouse and keyboard; close it with the close button, background or Escape key.
- Open and close each FAQ question.
- Zoom and pan the map and check the marker popup on desktop and mobile.
- Submit each form with missing or invalid information and check the error messages.
- Submit a valid contact form and confirm the email application opens with the prepared details.
- Submit a valid equipment enquiry and check the estimate calculation. Also test service, sponsorship and volunteering enquiries.
- Check the website at desktop and mobile widths and test the deployed website after publishing.

## Part 2 feedback

Add each item from the lecturer's Part 2 feedback to `CHANGELOG.md`, including the issue, the correction made and how it was retested. The actual Part 2 feedback sheet was not included with the project files available for this update, so no feedback items have been invented.

## Deployment

The site can be hosted on GitHub Pages or another static hosting service. Upload the complete project folder, including all HTML, CSS, JavaScript and image files. After deployment, open the live URL and repeat the testing checklist. The GitHub repository link and the live website URL are separate submission items.
