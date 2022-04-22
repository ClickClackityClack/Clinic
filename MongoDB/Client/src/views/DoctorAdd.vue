<script setup>
import NAV from "@/components/nav.vue"
function addD(e) {
    console.log("Hi")
    let doctor = Object.fromEntries(new FormData(e.target))
    fetch("http://localhost:4000/doctors", {
        method: "POST",
        body: JSON.stringify(doctor),
        headers: {
            "content-type": "application/json"
        }
    })
}
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
                            @submit="addD"
                        >
                            <h1 style="text-align: center;">Doctor Form</h1>
                            <label style="text-shadow: 1px 1px 3px white;">Name</label>
                            <input
                                type="text"
                                placeholder="Ex.Jack"
                                class="form-control mb-2"
                                name="name"
                                required
                            />
                            <label style="text-shadow: 1px 1px 3px white;">Last Name</label>
                            <input
                                type="text"
                                placeholder="Ex.Reacher"
                                name="lastname"
                                class="form-control mb-2"
                                required
                            />
                            <label style="text-shadow: 1px 1px 3px white;">Phone</label>
                            <input
                                type="text"
                                placeholder="Ex.222-888-9999"
                                name="phone"
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                maxlength="15"
                                class="form-control mb-2"
                                required
                            />
                            <label style="text-shadow: 1px 1px 3px white;">Specialty</label>
                            <input
                                type="text"
                                class="form-control mb-2"
                                required
                                placeholder="Cardiology"
                                name="Specialty"
                            />

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
