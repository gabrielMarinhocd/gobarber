import { Router, request, response } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentsRepository from '../repositories/AppointementsRepository';

const appointmentsRouter = Router();

appointmentsRouter.get('/appointments', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/appointments', async (request, response) => {
  try {
    const { provider, date } = request.body;
    const parseDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();
    const appointment = await createAppointment.execute({
      date: parseDate,
      provider,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
