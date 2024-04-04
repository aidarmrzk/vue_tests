<template>
  <div class="board">
    <h3>Ответьте на вопросы</h3>
    <div class="questions-container">
      <QuestionComponent
        v-for="question in questions"
        :key="question.id"
        :question="question"
        :validate="validate[question.id]"
        :disabled="resultStatus"
        :correct="corrects[question.id]"
        @getUserAnswer="getUserAnswer"
       />

       <div class="container-button">
         <button class="exit" @click="logout">Выйти</button>
         <button @click="sendToCheck">Отправить на проверку</button>
       </div>

       <div v-if="resultStatus" class="result">
         <h4>Результат</h4>
         <div class="green">
           <p>Отвечено верно:</p>
           <span>{{ right }}</span>
         </div>
         <div class="red">
           <p>Отвечено неверно:</p>
           <span>{{ wrong }}</span>
         </div>
       </div>
    </div>
  </div>
</template>

<script setup>
import QuestionComponent from '@/components/QuestionComponent.vue'
import { useRouter } from "vue-router";
import {
  questions,
  answers,
  corrects,
  validate,
  getQuestions,
  letValidate,
  checkAnswers,
  right, wrong, resultStatus } from '@/composables/questions.js'
import { onMounted } from 'vue';

const router = useRouter();
const getUserAnswer = (data) => {
  answers.value[data.id] = data.answers;
  validate.value[data.id] = false;
};

const sendToCheck = () => {
  if (letValidate()) {
    checkAnswers();
  }
}

const logout = () => {
  localStorage.removeItem('userData');
  router.push('/');
}

onMounted(() => {
  getQuestions();
})

</script>

<style scoped lang="scss">
.board {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 40px 0 20px;
  h3 {
    margin: 0 0 20px;
  }
  .questions-container {
    display: grid;
    align-items: center;
    gap: 20px;
    .container-button {
      display: flex;
      justify-content: space-between;
      button {
        padding: 12px 16px;
        width: 200px;
        background-color: #fff;
        border: 1px solid #0000004d;
        color: #212529;
        border-radius: .5rem;
        font-size: 15px;
        line-height: 100%;
        cursor: pointer;
        transition: all .3s;
        &.exit {
          width: 120px;
          &:hover {
            color: red;
            border-color: red;
            box-shadow: none;
          }
        }
        &:hover {
          box-shadow: 0 0 5px #0000004d;
        }
      }
    }
    .result {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin: 0 0 0 auto;
      padding: 12px 16px;
      width: 200px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3019607843);
      border-radius: 0.5rem;
      transition: all 0.3s;
      h4 {
        margin: 0 0 5px;
      }
      div {
        display: flex;
        justify-content: space-between;
        gap: 5px;
        &.green {
          color: green;
        }
        &.red {
          color: red;
        }
        p {
          margin: 0;
        }
      }
    }
  }
}
</style>
