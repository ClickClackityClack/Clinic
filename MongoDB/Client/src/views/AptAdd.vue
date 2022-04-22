<script setup>
import NAV from "@/components/nav.vue"
import { onMounted, ref, reactive } from 'vue';
async function addA(e) {
    console.log("Hi")
    let appointment = Object.fromEntries(new FormData(e.target))
    let test = await search(appointment.date)
    console.log(test)
    if (test == "false") {
        Swal.fire('That date is already taken')
        return
    }
    fetch("http://localhost:4000/appointments", {
        method: "POST",
        body: JSON.stringify(appointment),
        headers: {
            "content-type": "application/json"
        }
    })

}

async function search(query) {
    let status = "true"
    let x = await fetch(`http://localhost:4000/appointments/${query}`)
    let q = await x.json()
    if (q.length != 0) {
        console.log("if")
        status = "false"
    }
    console.log
    return status
}


let doctors = ref([])
function getDoctors() {
    fetch("http://localhost:4000/doctors").then((res) => res.json()).then((data) => {
        console.log(data)
        doctors.value = data
    })
}

let patients = ref([])
function getPatients() {
    fetch("http://localhost:4000/patients").then((res) => res.json()).then((data) => {
        console.log(data)
        patients.value = data
    })
}

onMounted(() => {
    getPatients()
    getDoctors();
})
</script>

<template>
<NAV/>
    <div class="container mt-5">
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <div class="d-flex flex-column align-items-center mt-5">
                    <div
                        class="border border-2 rounded mt-3"
                        style="border-color: #4D4D4D !important; box-shadow: -7px 5px 19px #686767;"
                    >
                        <form
                            class="m-4 text-light d-flex flex-column"
                            style="width:474px;"
                            @submit.prevent="addA"
                        >
                            <h1 style="text-align: center;">Appointment Form</h1>
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
                            <input type="date" required name="date" class="form-control" />
                            <label style="text-shadow: 1px 1px 3px white;">Time</label>
                            <input type="time" required name="time" class="form-control" />
                            <button
                                type="submit"
                                class="btn btn-success w-75 align-self-center mt-2"
                            >Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-3"></div>
        </div>
    </div>
</template>
