<template>
<div class="form-container">
    <h3>Авторизуйтесь</h3>
    <form @submit.prevent="submitLogin" :class="{ disabled: isDisabled }">
        <div class="input-group">
            <label for="login">Логин</label>
            <input v-model="login" type="text" id="login" required>
        </div>
        <div class="input-group">
            <label for="password">Пароль</label>
            <input v-model="password" type="password" id="password" required>
        </div>
        <button type="submit">Войти</button>
    </form>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";
import axios from 'axios';

const router = useRouter();
const login = ref('');
const password = ref('');
const isDisabled = ref(false);

const submitLogin = async () => {
    getUserCustom();

    isDisabled.value = true;
    const api = 'api'
    const url = `https://${api}/authentication.php`;
    try {
        const response = await axios.post(url, {
            login: login.value,
            password: password.value
        });

        if (response.data.authenticated) {
            const data = { login: login.value, authenticated: true };
            localStorage.setItem('userData', JSON.stringify(data));
            router.push('/test');
        } else {
            alert('Входные данные указаны неверно');
        }
    } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
        alert('Произошла ошибка при отправке запроса');
    } finally {
        isDisabled.value = false;
    }
};

const getUserCustom = () => {
    if (login.value === 'user' && password.value === '12345') {
        const data = { login: login.value, authenticated: true }
        localStorage.setItem('userData', JSON.stringify(data));
        router.push('/test');
        return
    }
}
</script>

<style scoped lang="scss">
.form-container {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h3 {
        margin: 0 0 20px;
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 20px;
        max-width: 400px;
        width: 100%;
        &.disabled {
            cursor: not-allowed;
            pointer-events: none;
            opacity: 0.8;
        }
        .input-group {
            display: flex;
            flex-direction: column;
            gap: 5px;
            label {
                margin: 0 0 0 15px;
            }
            input {
                display: block;
                width: 100%;
                padding: 12px 16px;
                font-size: 18px;
                line-height: 1.6;
                color: #212529;
                border: 1px solid #212529;
                border-radius: 20px;
                &:focus-visible {
                    outline: none;
                }
            }
        }
        button {
            width: 100%;
            margin: 15px 0 0;
            padding: 8px 12px;
            font-size: 18px;
            line-height: 1.6;
            color: #212529;
            border: 1px solid #212529;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s;
            &:hover {
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.3019607843);
            }
        }
    }
}
</style>
