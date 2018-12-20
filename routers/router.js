'use strict'
var express = require('express');
var Student = require('../models/student');
var sRouter = express.Router();
var mailer = require("nodemailer");

sRouter
  .route('/items')
  .post(function (request, response) {

    console.log('POST /items');

    var item = new Student(request.body);

    item.save();

    response.status(201).send(item);
  })

  .get(function (request, response) {

    console.log('GET /items');

    Student.find(function (error, items) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log(items);

      response.json(items);
    });
  });

sRouter
  .route('/items/:id')
  .get(function (request, response) {

    console.log('GET /items/:id');

    var id = request.params.id;

    Student.findOne({
      _id: id
    }, function (error, item) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      // console.log(item);

      response.json(item);

    });
  })

  .put(function (request, response) {

    console.log('PUT /items/:id');

    var id = request.params.id;

    Student.findOne({
      _id: id
    }, function (error, item) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      if (item) {
        item.name = request.body.name;
        item.regno = request.body.regno;
        item.course = request.body.course;
        item.submitted = request.body.submitted;
        item.date = request.body.date;


        item.save();

        response.json("Assignment updated Successfull");
        return;
      }

      response.status(404).json({
        message: 'Item with id ' + id + ' was not found.'
      });
    });
  })

  .patch(function (request, response) {

    console.log('PATCH //:id');

    var id = request.params.id;

    Student.findOne({
      _id: id
    }, function (error, item) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      if (item) {

        for (var property in request.body) {
          if (request.body.hasOwnProperty(property)) {
            if (typeof item[property] !== 'undefined') {
              item[property] = request.body[property];
            }
          }
        }

        // if (request.body.name) {
        //   item.name = request.body.name;
        // }

        // if (request.body.description) {
        //   item.description = request.body.description;
        // }

        // if (request.body.quantity) {
        //   item.quantity = request.body.quantity;
        // }

        item.save();

        response.json(item);
        return;
      }

      response.status(404).json({
        message: 'Student with id ' + id + ' was not found.'
      });
    });
  })

  .delete(function (request, response) {
    id
    console.log('DELETE /items/:id');

    var id = request.params.id;

    Student.findOne({
      _id: id
    }, function (error, item) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      if (item) {
        item.remove(function (error) {

          if (error) {
            response.status(500).send(error);
            return;
          }

          response.status(200).json({
            'message': 'Student with id ' + ' was removed.'
          });
        });
      } else {
        response.status(404).json({
          message: 'Student with id ' + _id + ' was not found.'
        });
      }
    });

  });

sRouter
 .route('/sendmail/:email')
  .get(function (req, res) {

    console.log('GET /sendmail/:email');
    var email = req.params.email;
    var smtpTransport = mailer.createTransport("SMTP", {
      service: "Gmail",
      auth: {
        user: "ritenannynigeria@gmail.com",
        pass: "ritenanny2018"
      }
    });

    var mail = {
      from: "Ritenanny <ritenannynigeria@gmail.com>",
      to: email,
      subject: "Send Email Using Node.js",
      text: "Node.js New world for me",
      html: "<b>Node.js New world for me</b>"
    }

    smtpTransport.sendMail(mail, function (error, response) {
      if (error) {
        console.log(error);
        response.status(404).json({
          'error': true,
          'message': error
        });
      } else {
        res.status(200).json({
          'error': false,
          'message': "Message sent: " + response.message
        });
        console.log("Message sent: " + response.message);
      }

      smtpTransport.close();
    });
  });


module.exports = sRouter;
