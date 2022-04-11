<script setup>
import NAV from "@/components/nav.vue"
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios'
var appointments = ref([])
let selectedApt = ref(null)
onMounted(async () => {
    let res = await fetch("http://localhost:4000/appointments")
    appointments.value = await res.json()

})


function del(id) {

    fetch(`http://localhost:4000/appointments/${id}`, {
        method: "DELETE",

    })
    window.location.reload()
}
function upd(id, form) {
    let data = JSON.stringify(Object.fromEntries(new FormData(form)))
    fetch(`http://localhost:4000/appointments/${id}`, {
        method: "PUT",
        body: data,
        headers: {
            "content-type": "application/json"
        }

    })
    window.location.reload()
}


function search(query) {
    var delayInMilliseconds = 1000; //1 second
    setTimeout(async function () {
        let x = await fetch(`http://localhost:4000/appointments/${query}`)
        appointments.value = await x.json()
    }, delayInMilliseconds);

}

let doctors = ref([])
function getDoctors() {
    fetch("http://localhost:4000/doctors").then((res) => res.json()).then((data) => {
        doctors.value = data
    })
}

let patients = ref([])
function getPatients() {
    fetch("http://localhost:4000/patients").then((res) => res.json()).then((data) => {
        patients.value = data
    })
}

onMounted(() => {
  getDoctors()
  getPatients()
})

</script>

<template>
<NAV/>
    <div class="container mt-5">
        <div class="row">
            <div class="col-1"></div>
            <div class="col-10">
                <div class="d-flex flex-column align-items-center mt-5">
                    <input
                        type="text"
                        class="form-control mb-2"
                        placeholder="Query"
                        @input="search($event.target.value)"
                        aria-describedby="button-addon2"
                    />
                    <div v-if="appointments.length">
                        <table
                            class="table table-success table-striped table-hover"
                            style="box-shadow: -7px 5px 19px #686767; min-width: 900px;"
                        >
                            <thead>
                                <tr>
                                    <td>Status</td>
                                    <td>Location</td>
                                    <td>Doctor</td>
                                    <td>Patient</td>
                                    <td>Date</td>
                                    <td>Time</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(appointment, i) in appointments">
                                    <td>{{ appointment.status }}</td>
                                    <td>{{ appointment.location }}</td>
                                    <td>{{ appointment.doctor }}</td>
                                    <td>{{ appointment.patient }}</td>
                                    <td>{{appointment.date}}</td>
                                    <td>{{appointment.time}}</td>
                                    <td>
                                        <button
                                            class="btn btn-light"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            @click="selectedApt = appointment"
                                        >Update</button> /
                                        <button
                                            class="btn btn-warning"
                                            @click="del(appointment._id)"
                                        >Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div
                        v-else
                        class="text-center border rounded-2 p-2 mt-5"
                        style="min-width: 800px; max-width: 1200px;border-color: #4D4D4D !important; box-shadow: -2px 1px 25px #686767; color: white;"
                    >
                        <h1 class="flex justify-content-center">No Appointments to display. &#9785;</h1>
                    </div>
                </div>
            </div>
            <div class="col-1"></div>
        </div>
        <div class="modal fade" tabindex="-1" id="exampleModal">
            <div class="modal-dialog">
                <div
                    class="modal-content"
                    style="background-color: #212529 !important; color: white !important;"
                >
                    <div class="modal-header">
                        <h5 class="modal-title">Update Appointment</h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="upd(selectedApt?._id, $event.target)">
                            <label style="text-shadow: 1px 1px 3px white;">Status</label>
                            <select
                                class="form-select"
                                aria-label="Default select example"
                                required
                                name="status"
                            >
                                <option value="Open" selected>Open</option>
                                <option value="Closed">Closed</option>
                                <option value="Delayed">Delayed</option>
                                <option value="Missed">Missed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                            <label style="text-shadow: 1px 1px 3px white;">Location</label>
                            <input
                                type="text"
                                placeholder="Ex.HGF Naples FL"
                                name="location"
                                :value="selectedApt?.location"
                                class="form-control mb-2"
                                required
                            />
                            <label style="text-shadow: 1px 1px 3px white;">Doctor</label>
                            <select
                                class="form-select"
                                aria-label="Default select example"
                                required
                                name="doctor"
                            >
                                <option
                                    v-for="doctor in doctors"
                                    :value="doctor.name"
                                >{{ doctor.name }} , {{ doctor.lastname }}</option>
                            </select>
                            <label style="text-shadow: 1px 1px 3px white;">Patient</label>
                            <select
                                class="form-select"
                                aria-label="Default select example"
                                required
                                name="patient"
                            >
                                <option
                                    v-for="patient in patients"
                                    :value="patient.name"
                                >{{ patient.name }} , {{ patient.lastname }}</option>
                            </select>
                                                        <label style="text-shadow: 1px 1px 3px white;">Date</label>
                            <input type="date" required name="date" class="form-control" :value="selectedApt?.date">
                            <label style="text-shadow: 1px 1px 3px white;">Time</label>
                            <input type="time" required name="time" class="form-control" :value="selectedApt?.time"/>
                            <button
                                type="submit"
                                class="btn btn-success w-75 align-self-center mt-2"
                            >Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
