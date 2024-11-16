import express from 'express';
import ContactController from '../controllers/contactController.js';

// Create an instance of the Express router
const contactRouter = express.Router();

// Initialize the ContactController
const contactController = new ContactController();

/**
 * Route to create a new contact
 * @method POST
 * @access Public
 * @route /api/contacts
 * @description Handles creating a new contact by processing data from the request body.
 */
contactRouter.post('/', contactController.createContact);

/**
 * Route to retrieve all contacts
 * @method GET
 * @access Public
 * @route /api/contacts
 * @description Fetches all contacts from the database and returns them as a JSON response.
 */
contactRouter.get('/', contactController.getAllContacts);

/**
 * Route to update an existing contact by ID
 * @method PUT
 * @access Public
 * @route /api/contacts/:id
 * @description Updates contact details for a specific contact identified by `id` in the request params.
 */
contactRouter.put('/:id', contactController.updateContact);

/**
 * Route to delete a contact by ID
 * @method DELETE
 * @access Public
 * @route /api/contacts/:id
 * @description Deletes a specific contact identified by `id` in the request params.
 */
contactRouter.delete('/:id', contactController.deleteContact);

// Export the router for use in other parts of the application
export default contactRouter;
