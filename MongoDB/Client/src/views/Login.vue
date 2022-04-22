<script setup>
async function search(e) {
    let status = "true"
    let obj = Object.fromEntries(new FormData(e.target))
    let query = JSON.stringify(obj)
    let x = await fetch(`http://localhost:4000/users/validate`, {
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
    localStorage.clear()
    localStorage.setItem("C-User", query);
    }
    window.location.href = '/home'
    return status
}
</script>

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
                <div class="d-flex flex-column align-items-center mt-5" style="background-color: silver;border: solid black 2px; border-radius: 50px;box-shadow: -7px 5px 50px black;">
                    <form @submit.prevent="search">
                        <h3 style="text-align: center;" class="mt-4">Health Group Florida</h3>
                        <div class="form-outline mb-4 mt-1">
                            <input type="email" id="form2Example1" name="email" class="form-control" />
                            <label class="form-label" for="form2Example1">Email address</label>
                        </div>

                        <!-- Password input -->
                        <div class="form-outline mb-4">
                            <input type="password" id="form2Example2" name="password" class="form-control" />
                            <label class="form-label" for="form2Example2">Password</label>
                        </div>

                        <!-- Submit button -->
                        <button type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>

                        <!-- Register buttons -->
                        <div class="text-center">
                            <p>
                                Admin Registration
                                <a href="register">Register</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <div class="col-3"></div>
        </div>
    </div>
</template>
