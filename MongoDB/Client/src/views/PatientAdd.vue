<script setup>
import NAV from "@/components/nav.vue"
function addP(e) {
    console.log("Hi")
    let patient = Object.fromEntries(new FormData(e.target))
    fetch("http://localhost:4000/patients", {
        method: "POST",
        body: JSON.stringify(patient),
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
                            @submit="addP"
                        >
                            <h1 style="text-align: center;">Patient Form</h1>
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
                                required
                                name="address"
                            />
                            <label style="text-shadow: 1px 1px 3px white;">Zip Code</label>
                            <input
                                type="text"
                                placeholder="35555"
                                class="form-control mb-2"
                                pattern="[0-9][0-9][0-9][0-9][0-9]"
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
                                maxlength="15"
                                class="form-control mb-2"
                                required
                            />
                            <label style="text-shadow: 1px 1px 3px white;">DOB</label>
                            <input
                                type="date"
                                class="form-control mb-2"
                                required
                                name="DOB"
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
