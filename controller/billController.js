const connection = require('../connection');
const ejs = require('ejs');
const pdf = require('html-pdf');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

const billController = {
  generateReport: (req, res) => {
    const generatedUuid = uuid.v1();
    const { name, email, contactNumber, paymentMethod, total, productDetails, createdBy } = req.body;
    console.log(req.body);

    try {
      let productDetailsReport = JSON.parse(productDetails);

      // SQL query is wrapped in a callback to handle the asynchronous operation
      const sql = "INSERT INTO bill (name, email, uuid, contactNumber, paymentMethod, total, productDetails,createdBy) VALUES (?, ?, ?, ?, ?, ?, ?,'true')";
      connection.query(sql, [name, email, generatedUuid, contactNumber, paymentMethod, total, productDetails], (err, data) => {
        if (err) {
          res.status(500).json({ msg: err.message });
        }else {
          // Rendering and PDF generation is performed inside the query callback
          ejs.renderFile(path.join(__dirname, '../router/report.ejs'), {
            productDetails: productDetailsReport,
            name: name,
            email: email,
            contactNumber: contactNumber,
            paymentMethod: paymentMethod,
            totalAmount: total,
          }, (err, renderedData) => {
            if (err) {
              res.status(500).json({ msg: err.message });
            } else {
              // Convert to PDF using html-pdf and save it to the 'generated_pdf' directory
              pdf.create(renderedData).toFile('./generated_pdf/' + generatedUuid + ".pdf", (err, data) => {
                if (err) {
                  res.status(500).json({ msg: err.message });
                } else {
                  res.status(200).json({ msg: "created pdf successfully", uuid: generatedUuid });
                }
              });
            }
          });
        }
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = billController;
