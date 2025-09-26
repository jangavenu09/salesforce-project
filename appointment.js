import { LightningElement, track, wire } from 'lwc';
import getDoctors from '@salesforce/apex/DoctorController.getAvailableDoctors';
import createAppointment from '@salesforce/apex/AppointmentController.createAppointment';

export default class AppointmentBooking extends LightningElement {
    @track doctorId;
    @track dateTime;
    @track message;

    @wire(getDoctors) doctors;

    handleDoctorChange(event) {
        this.doctorId = event.target.value;
    }

    handleDateChange(event) {
        this.dateTime = event.target.value;
    }

    handleBook() {
        createAppointment({ doctorId: this.doctorId, dateTime: this.dateTime })
            .then(() => {
                this.message = 'Appointment booked successfully!';
            })
            .catch(error => {
                this.message = 'Error: ' + error.body.message;
            });
    }
}
