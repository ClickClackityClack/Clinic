<script setup>
import NAV from "@/components/nav.vue"
import { ref, onMounted, reactive } from 'vue';
import axios from 'axios'
var patients = ref([])
let selectedPatient = ref(null)
onMounted(async () => {
    let res = await fetch("http://localhost:4000/patients")
    patients.value = await res.json()

})


function del(id) {

    fetch(`http://localhost:4000/patients/${id}`, {
        method: "DELETE",

    })
    window.location.reload()
}
function upd(id, form) {
    let data = JSON.stringify(Object.fromEntries(new FormData(form)))
    fetch(`http://localhost:4000/patients/${id}`, {
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
        let x = await fetch(`http://localhost:4000/patients/${query}`)
        patients.value = await x.json()
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
                    <div v-if="patients.length">
                        <table
                            class="table table-success table-striped table-hover"
                            style="box-shadow: -7px 5px 19px #686767; min-width: 900px;"
                        >
                            <thead>
                                <tr>
                                    <td>Name</td>
                                    <td>Last Name</td>
                                    <td>Sex</td>
                                    <td>Address</td>
                                    <td>Zip</td>
                                    <td>Phone</td>
                                    <td>DOB</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(patient, i) in patients">
                                    <td>{{ patient.name }}</td>
                                    <td>{{ patient.lastname }}</td>
                                    <td>{{ patient.sex }}</td>
                                    <td>{{ patient.address }}</td>
                                    <td>{{ patient.zip }}</td>
                                    <td>{{ patient.phone }}</td>
                                    <td>{{ patient.DOB }}</td>
                                    <td>
                                        <button
                                            class="btn btn-light"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            @click="selectedPatient = patient"
                                        >Update</button> /
                                        <button
                                            class="btn btn-warning"
                                            @click="del(patient._id)"
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
                        <h1 class="flex justify-content-center">No patients to display. &#9785;</h1>
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
                        <h5 class="modal-title">Update Patient</h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="upd(selectedPatient?._id, $event.target)">
                            <label style="text-shadow: 1px 1px 3px white;">Name</label>
                            <input
                                type="text"
                                placeholder="Ex.Jack"
                                class="form-control mb-2"
                                :value="selectedPatient?.name"
                                name="name"
                                required
                            />
                            <label style="text-shadow: 1px 1px 3px white;">Last Name</label>
                            <input
                                type="text"
                                placeholder="Ex.Reacher"
                                name="lastname"
                                :value="selectedPatient?.lastname"
                                class="form-control mb-2"
                                required
                            />
                            <label style="text-shadow: 1px 1px 3px white;">Sex</label>
                            <select class="form-select" name="sex">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="PNTA">Prefer not to answer</option>
                            </select>
                            <label style="text-shadow: 1px 1px 3px white;">Address</label>
                            <input
                                type="text"
                                placeholder="5555 NoWhere Rd"
                                class="form-control mb-2"
                                :value="selectedPatient?.address"
                                required
                                name="address"
                            />
                            <label style="text-shadow: 1px 1px 3px white;">Zip Code</label>
                            <input
                                type="text"
                                placeholder="35555"
                                class="form-control mb-2"
                                pattern="[0-9][0-9][0-9][0-9][0-9]"
                                :value="selectedPatient?.zip"
                                maxlength="5"
                                required
                                name="zip"
                            />
                            <label style="text-shadow: 1px 1px 3px white;">Phone</label>
                            <input
                                type="text"
                                placeholder="Ex.222-888-9999"
                                name="phone"
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                :value="selectedPatient?.phone"
                                maxlength="15"
                                class="form-control mb-2"
                                required
                            />
                            <label style="text-shadow: 1px 1px 3px white;">DOB</label>
                            <input type="date" class="form-control mb-2" required name="DOB" />

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
