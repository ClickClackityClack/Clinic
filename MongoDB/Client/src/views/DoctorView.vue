<script setup>
import NAV from "@/components/nav.vue"
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios'
var doctors = ref([])
let selectedDoctor = ref(null)
onMounted(async () => {
    let res = await fetch("http://localhost:4000/doctors")
    doctors.value = await res.json()

})


function del(id) {

    fetch(`http://localhost:4000/doctors/${id}`, {
        method: "DELETE",

    })
    window.location.reload()
}
function upd(id, form) {
    let data = JSON.stringify(Object.fromEntries(new FormData(form)))
    fetch(`http://localhost:4000/doctors/${id}`, {
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
        let x = await fetch(`http://localhost:4000/doctors/${query}`)
        doctors.value = await x.json()
    }, delayInMilliseconds);

}
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
                    <div v-if="doctors.length">
                        <table
                            class="table table-success table-striped table-hover"
                            style="box-shadow: -7px 5px 19px #686767; min-width: 900px;"
                        >
                            <thead>
                                <tr>
                                    <td>Name</td>
                                    <td>Last Name</td>
                                    <td>Phone</td>
                                    <td>Specialty</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(doctor, i) in doctors">
                                    <td>{{ doctor.name }}</td>
                                    <td>{{ doctor.lastname }}</td>
                                    <td>{{ doctor.phone }}</td>
                                    <td>{{ doctor.Specialty }}</td>
                                    <td>
                                        <button
                                            class="btn btn-light"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            @click="selectedDoctor = doctor"
                                        >Update</button> /
                                        <button
                                            class="btn btn-warning"
                                            @click="del(doctor._id)"
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
                        <h1 class="flex justify-content-center">No Doctors to display. &#9785;</h1>
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
                        <h5 class="modal-title">Update Doctor</h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="upd(selectedDoctor?._id, $event.target)">
                            <label style="text-shadow: 1px 1px 3px white;">Name</label>
                            <input
                                type="text"
                                placeholder="Ex.Jack"
                                :value="selectedDoctor?.name"
                                class="form-control mb-2"
                                name="name"
                                required
                            />
                            <label style="text-shadow: 1px 1px 3px white;">Last Name</label>
                            <input
                                type="text"
                                placeholder="Ex.Reacher"
                                :value="selectedDoctor?.lastname"
                                name="lastname"
                                class="form-control mb-2"
                                required
                            />
                            <label style="text-shadow: 1px 1px 3px white;">Phone</label>
                            <input
                                type="text"
                                placeholder="Ex.222-888-9999"
                                name="phone"
                                :value="selectedDoctor?.phone"
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                maxlength="15"
                                class="form-control mb-2"
                                required
                            />
                            <label style="text-shadow: 1px 1px 3px white;">Specialty</label>
                            <input
                                type="text"
                                class="form-control mb-2"
                                :value="selectedDoctor?.Specialty"
                                required
                                placeholder="Cardiology"
                                name="Specialty"
                            />

                            <button
                                type="submit"
                                class="btn btn-success w-75 align-self-center"
                            >Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
