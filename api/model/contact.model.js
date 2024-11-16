import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({ firstName: String, lastName: String, email: String, phone: String, company: String, jobTitle: String });

export const Contact = mongoose.model('Contact', contactSchema);