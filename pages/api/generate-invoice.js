// import the necessary node libraries
import fs from 'fs';
import puppeteer from 'puppeteer';
import handlers from 'handlebars';

const Invoice = async (req, res,) => {
  // extract the customer name from the req.body object
  // and also set a default name with the logical operator
  const data = JSON.parse(req.body);
  const customerName = data.customer || 'John Doe';
  const customerId = data.id || '123456789';
  const customerAddress = data.address || '1234 Main Street, New York, NY 10001';
  const customerMethod = (data.method === 1) ? 'Credit Card' : 'Cash on Delivery';
  const customerTotal = data.total || 'Rp0.00';
  const customerStatus = (data.status === 0) ? 'Preparing' : (data.status === 1) ? 'On the way' : 'Delivered';
  const customerProducts = data.products || [];

  //customerProducts map
  const customerProductsMap = () => {
    let result = '';
    customerProducts.map((product) => {
      result += `
        ${product.title}
        ${product.quantity}
      `;
    });
    return result;
  }

  try {
    // read our invoice-template.html file using node fs module
    const file = fs.readFileSync('./invoice-template.html', 'utf8');

    // compile the file with handlebars and inject the customerName variable
    const template = handlers.compile(`${file}`);
    const html = template({ 
                    customerName, 
                    customerId, 
                    customerAddress, 
                    customerMethod, 
                    customerTotal,
                    customerStatus,
                    customerProducts,
                    customerProductsMap
                  });

    // simulate a chrome browser with puppeteer and navigate to a new page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // set our compiled html template as the pages content
    // then waitUntil the network is idle to make sure the content has been loaded
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // convert the page to pdf with the .pdf() method
    const pdf = await page.pdf({ format: 'A5' });
    await browser.close();

    // send the result to the client
    res.statusCode = 200;
    res.send(pdf);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export default Invoice;