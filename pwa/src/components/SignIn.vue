<template>
    <div>
        <h1>Sign in</h1>
        <form @submit="checkValidation">
            <div>
                <label for="email">Email</label>
                <input
                    v-model="email"
                    type="email"
                    name="email"
                    placeholder="john@doe.com"
                />
            </div>
            <div>
                <label for="password">Password</label>
                <input
                    v-model="password"
                    type="password"
                    name="password"
                    placeholder="********"
                />
            </div>
            <button type="submit">Send</button>
        </form>
    </div>
</template>

<script lang="ts">
import axios from 'axios'
import { API_ENDPOINT } from '../utils/environment'

export default {
    data() {
        return {
            email: null,
            password: null,
        }
    },
    methods: {
        checkValidation($event: SubmitEvent) {
            $event.preventDefault()
            axios.post(`${API_ENDPOINT}/auth`, {
                email: this.email,
                password: this.password,
            })
        },
    },
}
</script>
