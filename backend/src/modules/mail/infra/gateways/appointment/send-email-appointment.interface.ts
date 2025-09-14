export interface AppointmentEmail {
  patientName: string;
  professionalName: string;
  scheduledAt: string;
}

export interface PatientAppointmentEmail extends AppointmentEmail {
  patientEmail: string;
}

export interface ProfessionalAppointmentEmail extends AppointmentEmail {
  professionalEmail: string;
}

export interface SendEmailAppointmentInterface {
  sendPatientEmailAppointment(
    appointmentEmail: PatientAppointmentEmail,
  ): Promise<void>;
  sendProfessionalEmailAppointment(
    appointmentEmail: ProfessionalAppointmentEmail,
  ): Promise<void>;
}
