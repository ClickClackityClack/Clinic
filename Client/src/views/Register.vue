<script setup>import { shallowReadonly , onMounted } from 'vue';
onMounted(async () => {
    let res = await fetch("http://localhost:4000/users")
    let q = await res.json()
    if (q.length == 0) {
        let admin = {
            name: "Admin",
            email: "Admin@gmail.com",
            password: "Admin"
        }
        fetch("http://localhost:4000/users", {
            method: "POST",
            body: JSON.stringify(admin),
            headers: {
                "content-type": "application/json"
            }
        })
    }

})
async function addU(e) {
    let user = Object.fromEntries(new FormData(e.target))
    if (await search(user.admin) == "false") {
        Swal.fire('Invalid Admin Password')
        return
    }
    delete user.admin;
    let x = await noDup(user)
    console.log(x)
    if(x == "true"){
        return
    }
    fetch("http://localhost:4000/users", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "content-type": "application/json"
        }
    })
}

async function noDup(ev) {
    let status = "true"
    delete ev.password
    let obj = ev
    let query = JSON.stringify(obj)
    let x = await fetch(`http://localhost:4000/users/noDup`, {
        method: "POST" ,
    body: query ,
    headers: {
        "content-type" : "application/json"
    }
    })
    let q = await x.json()
    console.log(q)
    if (q.length == 0) {
        status = "false"
    }
    if(status == "true"){
        Swal.fire("Already taken")
    }
    return status
}

async function search(query) {
    let status = "true"
    let x = await fetch(`http://localhost:4000/users/${query}`)
    let q = await x.json()
    console.log(q)
    if (q.length == 0) {
        status = "false"
    }
    console.log(status)
    return status
}
</script>

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <div
                    class="d-flex flex-column align-items-center mt-5"
                    style="background-color: silver;border: solid black 2px; border-radius: 50px;box-shadow: -7px 5px 50px black;"
                >
                    <form @submit.prevent="addU">
                        <h3 style="text-align: center;" class="mt-4">Health Group Florida</h3>
                        <div class="form-outline mb-4 mt-1">
                            <input
                                type="text"
                                class="form-control"
                                name="fullname"
                                required
                            />
                            <label class="form-label" for="form2Example1">Full Name</label>
                        </div>
                        <div class="form-outline mb-4 mt-1">
                            <input
                                type="email"
                                class="form-control"
                                name="email"
                                required
                            />
                            <label class="form-label" for="form2Example1">Email address</label>
                        </div>

                        <!-- Password input -->
                        <div class="form-outline mb-4">
                            <input
                                type="password"
                                class="form-control"
                                name="admin"
                                required
                            />
                            <label class="form-label" for="form2Example2">Admin password</label>
                        </div>

                        <div class="form-outline mb-4">
                            <input
                                type="password"
                                class="form-control"
                                name="password"
                                required
                            />
                            <label class="form-label" for="form2Example2">Password</label>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block mb-4">Register</button>

                        <!-- Register buttons -->
                        <div class="text-center">
                            <p>
                                Go back
                                <a href="/">Login</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <div class="col-3"></div>
        </div>
    </div>
</template>
