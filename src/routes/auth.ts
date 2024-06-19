import { Router } from 'express';
import { register } from '../controllers/authController';
import { login } from '../controllers/controllerLogin';
import { actualizarCustomer, customerEmail, obtenerAllCustomer } from '../controllers/rudCustomer';

const router = Router();

router.get('/allCustomer', obtenerAllCustomer);
router.get('/customer/:email', customerEmail);
router.post('/register', register);
router.put('/update/:email', actualizarCustomer); 
router.get('/login/:email', login);


export default router;


