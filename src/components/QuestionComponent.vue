<template>
<div class="question-card" :class=" {validate: validate, disabled: disabled}">
    <p>{{ question.text }}</p>
    <ul>
        <li v-for="option, index in question.options" :key="index">
            <input
                type="checkbox"
                v-model="selectedOptions[index]"
                @change="getUserAnswer"
            >
            <span
                :class="{
                    'error-text':selectedOptions[index] && disabled && correct[index] !== selectedOptions[index],
                    'succes-text': correct[index] && disabled
                }"
            >
                {{ option }}
            </span>
        </li>
    </ul>
    <span class="validate-text" v-if="validate">Выберите хотя бы один ответ</span>
</div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted  } from 'vue'; 

const props = defineProps(['question', 'validate', 'disabled', 'correct']);

const emits = defineEmits(['getUserAnswer']);

const question = ref(props.question);
const selectedOptions = ref({});

const getUserAnswer = () => {
    const data = { id: question.value.id, answers: {...selectedOptions.value} };
    emits('getUserAnswer', data);
}

onMounted(() => {
    selectedOptions.value = Array(question.value.options.length).fill(false);
    getUserAnswer();
});
</script>

<style scoped lang="scss">
.question-card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 23px;
    box-shadow: 0 0 5px #0000004d;
    border-radius: .5rem;
    transition: all .3s;
    &.validate {
        border: 1px solid red;
    }
    &.disabled {
        cursor: not-allowed;
        pointer-events: none;
        opacity: 0.8;
    }
    p {
        font-size: 16px;
        margin: 0;
        color: #212529;
    }
    ul {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin: 0;
        padding: 0;
        list-style: none; 
        li {
            display: flex;
            gap: 5px;
            input {
                margin: 0;
                height: 16px;
                aspect-ratio: 1;
                cursor: pointer;
            }
        }
    }
    .validate-text {
        position: absolute;
        bottom: 5px;
        color: red;
        font-size: 14px;
        text-transform: lowercase;
        font-variant: small-caps;
    }
    .succes-text {
        color: green;
    }
    .error-text {
        color: red;
    }
}
</style>
