const express = require('express');

const router = express.Router();
const proDB = require('./data/helpers/projectModel');
const actDB = require('./data/helpers/actionModel');
router.use('/:id', validateActionId);

// POST request
router.post('/', (req, res) => {
  actDB
    .insert(req.body)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      console.log('action add error: ', err);
      res
        .status(500)
        .json({ errorMessage: 'there was a problem adding the action' });
    });
});

// PUT reqest
router.put('/:id', (req, res) => {
  actDB
    .update(req.params.id, req.body)
    .then(action => {
      res.status(200).json(req.body);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: 'there was an error updating the action' });
    });
});

// GET requests
router.get('/:id', (req, res) => {
  actDB
    .get(req.params.id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      console.log('get all actions err: ', err);
      res
        .status(500)
        .json({ errorMessage: 'There was a problem retrieving the action' });
    });
});
router.get('/', (req, res) => {
  actDB
    .get()
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      console.log('get all actions err: ', err);
      res
        .status(500)
        .json({ errorMessage: 'There was a problem retrieving the action' });
    });
});

// DELETE request
router.delete('/:id', (req, res) => {
  actDB
    .remove(req.params.id)
    .then(res.status(200).json({ message: 'action has been deleted' }))
    .catch(err => {
      console.log('delete action error: ', err);
      res
        .status(500)
        .json({ errorMessage: 'there was a problem deleting the action' });
    });
});

// custom middleware
function validateProjectId(req, res, next) {
  // do your magic!
  proDB
    .get(req.params.id)
    .then(proj => {
      if (proj) {
        req.proj = proj;
        next();
      } else {
        res.status(400).json({ message: 'Invalid project id.' });
      }
    })
    .catch(err => {
      err => {
        console.log('Get User By Id Error:', err);
        res
          .status(500)
          .json({ message: `There was a problem retriving the project id` });
      };
    });
}
function validateActionId(req, res, next) {
  // do your magic!
  actDB
    .get(req.params.id)
    .then(action => {
      if (action) {
        req.action = action;
        next();
      } else {
        res.status(400).json({ message: 'Invalid action id.' });
      }
    })
    .catch(err => {
      err => {
        console.log('Get User By Id Error:', err);
        res
          .status(500)
          .json({ message: `There was a problem retriving the project id` });
      };
    });
}
function valadateAction(req, res, next) {
  // do your magic!
  if (req.body) {
    if (req.body.notes && req.body.description && req.body.project_id) {
      next();
    } else {
      res.status(400).json({
        message: 'Please provide project idea, notes,  and description',
      });
    }
  }
}

module.exports = router;
