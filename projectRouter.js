const express = require('express');

const router = express.Router();
const proDB = require('./data/helpers/projectModel');
router.use('/:id', validateProjectId);

// POST requests
router.post('/', valadateProject, (req, res) => {
  proDB
    .insert(req.body)
    .then(proj => {
      res.status(201).json(proj);
    })
    .catch(err => {
      console.log('Add Project Error:', err);
      res
        .status(500)
        .json({ errmessage: 'There was an error creating a project.' });
    });
});

// PUT requests
router.put('/:id', valadateProject, (req, res) => {
  proDB
    .update(req.params.id, req.body)
    .then(proj => {
      res.status(201).json(proj);
    })
    .catch(err => {
      console.log('Add Project Error:', err);
      res
        .status(500)
        .json({ errmessage: 'There was an error Updating the project.' });
    });
});

// Get Requests
router.get('/', (req, res) => {
  proDB
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log('Post get error: ', err);
      res
        .status(500)
        .json({ errorMessage: 'There was an error retrieving the posts.' });
    });
});

router.get('/:id', (req, res) => {
  res.status(200).json(req.proj);
});
router.get('/:id/actions', (req, res) => {
  proDB
    .getProjectActions(req.params.id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      console.log(err);
      res
        .status(400)
        .json({ errorMessage: 'There was an error retriecing the actions' });
    });
});

// DELETE requests
router.delete('/:id', (req, res) => {
  proDB
    .remove(req.params.id)
    .then(proj => {
      res.status(201).end();
    })
    .catch(err => {
      console.log('Delete error: ', err);
      res
        .status(400)
        .json({ errorMessage: 'The project could not be deleted' });
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
function valadateProject(req, res, next) {
  // do your magic!
  if (req.body) {
    if (req.body.name && req.body.description) {
      next();
    } else {
      res.status(400).json({ message: 'Please provide name and description' });
    }
  }
}
module.exports = router;
