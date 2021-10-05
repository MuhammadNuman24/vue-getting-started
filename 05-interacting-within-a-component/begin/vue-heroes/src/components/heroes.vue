/* eslint-disable prettier/prettier */
<template>
  <div class="content-container">
    <div class="section content-title-group">
      <h2 class="title">Heroes</h2>
    </div>
    <div class="columns">
      <div class="column is-3">
        <div class="card" v-show="heroes.length">
          <header class="card-header">
            <p class="card-header-title">heroes list</p>
          </header>
          <ul class="list is-hoverable">
            <li v-for="hero in heroes" :key="hero.id">
              <a
                class="list-item"
                @click="selectHero(hero)"
                :class="{ 'is-active': selectedHero === hero }"
              >
                <span>{{ hero.firstName }}</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="notification is-info" v-show="message">{{ message }}</div>
      </div>

      <div class="column is-4" v-if="selectedHero">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">{{ FullName }}</p>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="field">
                <label class="label" for="id">id</label>
                <label class="input" id="id" readonly>{{
                  selectedHero.id
                }}</label>
              </div>
              <div class="field">
                <label class="label" for="firstName">first name</label>
                <input
                  class="input"
                  id="firstName"
                  v-model="selectedHero.firstName"
                />
              </div>
              <div class="field">
                <label class="label" for="lastName">last name</label>
                <input
                  class="input"
                  id="lastName"
                  v-model="selectedHero.lastName"
                />
              </div>
              <div class="field">
                <label class="label" for="description">description</label>
                <input
                  class="input"
                  id="description"
                  v-model="selectedHero.description"
                />
              </div>
              <div class="field">
                <label class="label" for="capeCounter">Cape Counter</label>
                <input
                  class="input"
                  id="capeCounter"
                  type="number"
                  v-model="selectedHero.capeCounter"
                />
              </div>
                  <div class="field">
                <label class="label" for="origindate">Origin Date</label>
                <input
                  class="input"
                  id="origindate"
                  type="date"
                  v-model="selectedHero.origindate"
                />
                <p class="comment">Here is my origin date{{selectedHero.origindate | shortdate}}</p>
              </div>
              <div class="field">
                <label class="label" for="capeMessage">cape message</label>
                <label class="input" name="capeMessage">{{
                  capeMessage
                  }}<label>   
           </div>
           <div>
            </div>
         <div>
          <footer class="card-footer">
            <button
              class="link card-footer-item cancel-button"
              @click="cancelHero()">
              <i class="fas fa-undo"></i>
              <span>Cancel</span>
            </button>
            <button class="link card-footer-item" @click="saveHero()">
              <i class="fas fa-save"></i>
              <span>Save</span>
            </button>
          </footer>
        </div>
  </div>
</template>

<script>
import {format} from 'date-fns';

const inputDateformat = 'YYYY,MM,DD';
const dateFormat='mmm,dd,yyyy';

const ourHeroes = [
  {
    id: 10,
    firstName: 'Ella',
   origindate: format(new Date (1996,11,9), inputDateformat), 
    description: 'fashionista',
    capeMessage: ' ',
  },
  {
    id: 20,
    firstName: 'Madelyn',
   origindate: format(new Date (1998 ,10, 9), inputDateformat),
    description: 'the cat whisperer',
    capeMessage: ' ',
  },
  {
    id: 30,
    firstName: 'Haley',
    origindate: format(new Date (1997 ,7, 9),inputDateformat),
    description: 'pen wielder',
    capeMessage: ' ',
  },
  {
    id: 40,
    firstName: 'Landon',
    origindate: format(new Date(1999, 1 ,9),inputDateformat),
    description: 'arc trooper',
    capeMessage: ' ',
  },
];

export default {
  name: 'Heroes',
  data() {
    return {
      heroes: [],
      selectedHero: undefined,
      message: ' ',
    };
  },
  computed: {
    FullName() {
      return `${this.selectedHero.firstName} ${this.selectedHero.lastName}`;
    },
  },
  created() {
    this.loadHeroes();
  },
  methods: {
    async getHeroes() {
      return new Promise((resolve) => {
        setTimeout(() => resolve(ourHeroes), 1500);
      });
    },
    async loadHeroes() {
      this.heroes = [];
      this.message = 'Getting the heroes.please be patient';
      this.heroes = await this.getHeroes();
      this.message = '';
    },
    handleTheCapes(newValue) {
      const value = parseInt(newValue, 10);
      switch (value) {
        case 0:
          this.capeMessage = 'Where is my cape?';
          break;
        case 1:
          this.capeMessage = 'One is all I need';
          break;
        case 2:
          this.capeMessage = 'Alway have a spare';
          break;
        default:
          this.capeMessage = 'You can never have enough capes';
          break;
      }
    },
    cancelHero() {
      this.selectedHero = undefined;
      this.message = '';
    },
    saveHero() {
      this.message = JSON.stringify(this.selectedHero, null, '\n ');
    },
    selectHero(hero) {
      this.selectedHero = hero;
    },
  },
  watch: {
    'selectedHero.capeCounter' :{
      immediate:true,
    handler(newValue, oldValue) {
      console.log(`Watcher evaluated. old=${oldValue} , new=${newValue}`)
      this.handleTheCapes(newValue)
    }
    }
  },
  filters: {
    shortdate: function(value) {
      return  format(value , dateFormat)
    }
  }
};
</script>