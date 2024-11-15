import express from 'express';
import ContactController from '../controllers/contactController.js';

const contactRouter = express.Router();
const contactController = new ContactController();

contactRouter.post('/', contactController.createContact);
contactRouter.get('/', contactController.getAllContacts);
contactRouter.put('/:id', contactController.updateContact);
contactRouter.delete('/:id', contactController.deleteContact);

export default  contactRouter;