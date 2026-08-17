import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCT6O_LKdrMA9uRIK9gJw4tK1yKtKXpbtA",
  authDomain: "planner-biblico-e9f55.firebaseapp.com",
  projectId: "planner-biblico-e9f55",
  storageBucket: "planner-biblico-e9f55.firebasestorage.app",
  messagingSenderId: "763707452594",
  appId: "1:763707452594:web:4d4d8da80f3f120f526dab",
  measurementId: "G-F33E380TX0"
};

const app   = initializeApp(firebaseConfig);
const auth  = getAuth(app);
const db    = getFirestore(app);

// ── PLAN DATA ──
const PLAN = [
  { week:1, days:[{day:1,reading:"Gênesis 1 a 3"},{day:2,reading:"Gênesis 4 a 7"},{day:3,reading:"Gênesis 8 a 11"},{day:4,reading:"Jó 1 a 5"},{day:5,reading:"Jó 6 a 9"},{day:6,reading:"Jó 10 a 13"},{day:7,reading:"Jó 14 a 16"}]},
  { week:2, days:[{day:1,reading:"Jó 17 a 20"},{day:2,reading:"Jó 21 a 23"},{day:3,reading:"Jó 24 a 28"},{day:4,reading:"Jó 29 a 31"},{day:5,reading:"Jó 32 a 34"},{day:6,reading:"Jó 35 a 37"},{day:7,reading:"Jó 38 e 39"}]},
  { week:3, days:[{day:1,reading:"Jó 40 a 42"},{day:2,reading:"Gênesis 12 a 15"},{day:3,reading:"Gênesis 16 a 18"},{day:4,reading:"Gênesis 19 a 21"},{day:5,reading:"Gênesis 22 a 24"},{day:6,reading:"Gênesis 25 e 26"},{day:7,reading:"Gênesis 27 a 29"}]},
  { week:4, days:[{day:1,reading:"Gênesis 30 e 31"},{day:2,reading:"Gênesis 32 a 34"},{day:3,reading:"Gênesis 35 a 37"},{day:4,reading:"Gênesis 38 a 40"},{day:5,reading:"Gênesis 41 e 42"},{day:6,reading:"Gênesis 43 a 45"},{day:7,reading:"Gênesis 46 e 47"}]},
  { week:5, days:[{day:1,reading:"Gênesis 48 a 50"},{day:2,reading:"Êxodo 1 a 3"},{day:3,reading:"Êxodo 4 a 6"},{day:4,reading:"Êxodo 7 a 9"},{day:5,reading:"Êxodo 10 a 12"},{day:6,reading:"Êxodo 13 a 15"},{day:7,reading:"Êxodo 16 a 18"}]},
  { week:6, days:[{day:1,reading:"Êxodo 19 a 21"},{day:2,reading:"Êxodo 22 a 24"},{day:3,reading:"Êxodo 25 a 27"},{day:4,reading:"Êxodo 28 e 29"},{day:5,reading:"Êxodo 30 a 32"},{day:6,reading:"Êxodo 33 a 35"},{day:7,reading:"Êxodo 36 a 38"}]},
  { week:7, days:[{day:1,reading:"Êxodo 39 e 40"},{day:2,reading:"Levítico 1 a 4"},{day:3,reading:"Levítico 5 a 7"},{day:4,reading:"Levítico 8 a 10"},{day:5,reading:"Levítico 11 a 13"},{day:6,reading:"Levítico 14 e 15"},{day:7,reading:"Levítico 16 a 18"}]},
  { week:8, days:[{day:1,reading:"Levítico 19 a 21"},{day:2,reading:"Levítico 22 e 23"},{day:3,reading:"Levítico 24 e 25"},{day:4,reading:"Levítico 26 e 27"},{day:5,reading:"Números 1 e 2"},{day:6,reading:"Números 3 e 4"},{day:7,reading:"Números 5 e 6"}]},
  { week:9, days:[{day:1,reading:"Números 7"},{day:2,reading:"Números 8 a 10"},{day:3,reading:"Números 11 a 13"},{day:4,reading:"Números 14 e 15; Salmo 90"},{day:5,reading:"Números 16 e 17"},{day:6,reading:"Números 18 a 20"},{day:7,reading:"Números 21 e 22"}]},
  { week:10, days:[{day:1,reading:"Números 23 a 25"},{day:2,reading:"Números 26 e 27"},{day:3,reading:"Números 28 a 30"},{day:4,reading:"Números 31 a 32"},{day:5,reading:"Números 33 e 34"},{day:6,reading:"Números 35 e 36"},{day:7,reading:"Deuteronômio 1 e 2"}]},
  { week:11, days:[{day:1,reading:"Deuteronômio 3 e 4"},{day:2,reading:"Deuteronômio 5 a 7"},{day:3,reading:"Deuteronômio 8 a 10"},{day:4,reading:"Deuteronômio 11 a 13"},{day:5,reading:"Deuteronômio 14 a 16"},{day:6,reading:"Deuteronômio 17 a 20"},{day:7,reading:"Deuteronômio 21 a 23"}]},
  { week:12, days:[{day:1,reading:"Deuteronômio 24 a 27"},{day:2,reading:"Deuteronômio 28 e 29"},{day:3,reading:"Deuteronômio 30 e 31"},{day:4,reading:"Deuteronômio 32 a 34; Salmo 91"},{day:5,reading:"Josué 1 a 4"},{day:6,reading:"Josué 5 a 8"},{day:7,reading:"Josué 9 a 11"}]},
  { week:13, days:[{day:1,reading:"Josué 12 a 15"},{day:2,reading:"Josué 16 a 18"},{day:3,reading:"Josué 19 a 21"},{day:4,reading:"Josué 22 a 24"},{day:5,reading:"Juízes 1 e 2"},{day:6,reading:"Juízes 3 a 5"},{day:7,reading:"Juízes 6 e 7"}]},
  { week:14, days:[{day:1,reading:"Juízes 8 e 9"},{day:2,reading:"Juízes 10 a 12"},{day:3,reading:"Juízes 13 a 15"},{day:4,reading:"Juízes 16 a 18"},{day:5,reading:"Juízes 19 a 21"},{day:6,reading:"Rute 1 a 4"},{day:7,reading:"1 Samuel 1 a 3"}]},
  { week:15, days:[{day:1,reading:"1 Samuel 4 a 8"},{day:2,reading:"1 Samuel 9 a 12"},{day:3,reading:"1 Samuel 13 e 14"},{day:4,reading:"1 Samuel 15 a 17"},{day:5,reading:"1 Samuel 18 a 20; Salmo 11,59"},{day:6,reading:"1 Samuel 21 a 24"},{day:7,reading:"Salmos 7,27,31,34,52"}]},
  { week:16, days:[{day:1,reading:"Salmos 56,120,140 a 142"},{day:2,reading:"1 Samuel 25 a 27"},{day:3,reading:"Salmos 17,35,54,63"},{day:4,reading:"1 Samuel 28 a 31; Salmo 18"},{day:5,reading:"Salmos 121,123 a 125,128 a 130"},{day:6,reading:"2 Samuel 1 a 4"},{day:7,reading:"Salmos 6,8 a 10,14,16,19,21"}]},
  { week:17, days:[{day:1,reading:"1 Crônicas 1 e 2"},{day:2,reading:"Salmos 43 a 45,49,84,85,87"},{day:3,reading:"1 Crônicas 3 a 5"},{day:4,reading:"Salmos 73,77,78"},{day:5,reading:"1 Crônicas 6"},{day:6,reading:"Salmos 81,88,92,93"},{day:7,reading:"1 Crônicas 7 a 10"}]},
  { week:18, days:[{day:1,reading:"Salmos 102 a 104"},{day:2,reading:"2 Samuel 5:1-10 e 1 Crônicas 11-12"},{day:3,reading:"Salmos 133"},{day:4,reading:"Salmos 106 e 107"},{day:5,reading:"2 Samuel 5:11-25; 2 Samuel 6:1-23; 1 Crônicas 13-16"},{day:6,reading:"Salmos 1-2,15,22-24,47,68"},{day:7,reading:"Salmos 89,96,100,101,105,132"}]},
  { week:19, days:[{day:1,reading:"2 Samuel 7; 1 Crônicas 17"},{day:2,reading:"Salmos 25,29,33,36,39"},{day:3,reading:"2 Samuel 8-9; 1 Crônicas 18"},{day:4,reading:"Salmos 50,53,60,75"},{day:5,reading:"2 Samuel 10; 1 Crônicas 19; Salmo 20"},{day:6,reading:"Salmos 65 a 67,69 a 70"},{day:7,reading:"2 Samuel 11 e 12; 1 Crônicas 20"}]},
  { week:20, days:[{day:1,reading:"Salmos 32,51,86,122"},{day:2,reading:"2 Samuel 13 a 15"},{day:3,reading:"Salmos 3-4,12-13,28,55"},{day:4,reading:"2 Samuel 16 a 18"},{day:5,reading:"Salmos 26,40,58,61-62,64"},{day:6,reading:"2 Samuel 19 a 21"},{day:7,reading:"Salmos 5,38,41-42"}]},
  { week:21, days:[{day:1,reading:"2 Samuel 22-23; Salmos 57"},{day:2,reading:"Salmos 95,97 a 99"},{day:3,reading:"2 Samuel 24; 1 Crônicas 21-22; Salmos 30"},{day:4,reading:"Salmos 108 a 110"},{day:5,reading:"1 Crônicas 23 a 25"},{day:6,reading:"Salmos 131,138-139,143-145"},{day:7,reading:"1 Crônicas 26 a 29; Salmo 127"}]},
  { week:22, days:[{day:1,reading:"Salmos 111 a 118"},{day:2,reading:"1 Reis 1-2; Salmos 37,71,94"},{day:3,reading:"Salmos 119:1-88"},{day:4,reading:"1 Reis 3-4; 2 Crônicas 1; Salmos 72"},{day:5,reading:"Salmos 119:89-176"},{day:6,reading:"Cantares de Salomão 1 a 8"},{day:7,reading:"Provérbios 1 a 3"}]},
  { week:23, days:[{day:1,reading:"Provérbios 4 a 6"},{day:2,reading:"Provérbios 7 a 9"},{day:3,reading:"Provérbios 10 a 12"},{day:4,reading:"Provérbios 13 a 15"},{day:5,reading:"Provérbios 16 a 18"},{day:6,reading:"Provérbios 19 a 21"},{day:7,reading:"Provérbios 22 a 24"}]},
  { week:24, days:[{day:1,reading:"1 Reis 5-6; 2 Crônicas 2-3"},{day:2,reading:"1 Reis 7; 2 Crônicas 4"},{day:3,reading:"1 Reis 8; 2 Crônicas 5"},{day:4,reading:"2 Crônicas 6-7; Salmos 136"},{day:5,reading:"Salmos 134,146-150"},{day:6,reading:"1 Reis 9; 2 Crônicas 8"},{day:7,reading:"Provérbios 25 e 26"}]},
  { week:25, days:[{day:1,reading:"Provérbios 27 a 29"},{day:2,reading:"Eclesiastes 1 a 6"},{day:3,reading:"Eclesiastes 7 a 12"},{day:4,reading:"1 Reis 10-11; 2 Crônicas 9"},{day:5,reading:"Provérbios 30 e 31"},{day:6,reading:"1 Reis 12 a 14"},{day:7,reading:"2 Crônicas 10 a 12"}]},
  { week:26, days:[{day:1,reading:"1 Reis 15:1-24; 2 Crônicas 13-16"},{day:2,reading:"1 Reis 15:25-34; 1 Reis 16:1-34; 2 Crônicas 17"},{day:3,reading:"1 Reis 17-19"},{day:4,reading:"1 Reis 20-21"},{day:5,reading:"1 Reis 22; 2 Crônicas 18"},{day:6,reading:"2 Crônicas 19 a 23"},{day:7,reading:"Obadias; Salmos 82-83"}]},
  { week:27, days:[{day:1,reading:"2 Reis 1 a 4"},{day:2,reading:"2 Reis 5 a 8"},{day:3,reading:"2 Reis 9 a 11"},{day:4,reading:"2 Reis 12-13; 2 Crônicas 24"},{day:5,reading:"2 Reis 14; 2 Crônicas 25"},{day:6,reading:"Jonas 1 a 4"},{day:7,reading:"2 Reis 15; 2 Crônicas 26"}]},
  { week:28, days:[{day:1,reading:"Isaías 1 a 4"},{day:2,reading:"Isaías 5 a 8"},{day:3,reading:"Amós 1 a 5"},{day:4,reading:"Amós 6 a 9"},{day:5,reading:"2 Crônicas 27; Isaías 9-12"},{day:6,reading:"Miquéias 1 a 7"},{day:7,reading:"2 Crônicas 28; 2 Reis 16-17"}]},
  { week:29, days:[{day:1,reading:"Isaías 13 a 17"},{day:2,reading:"Isaías 18 a 22"},{day:3,reading:"Isaías 23 a 27"},{day:4,reading:"2 Reis 18:1-8; 2 Crônicas 29-31; Salmo 48"},{day:5,reading:"Oseias 1 a 7"},{day:6,reading:"Oseias 8 a 14"},{day:7,reading:"Isaías 28 a 30"}]},
  { week:30, days:[{day:1,reading:"Isaías 31 a 34"},{day:2,reading:"Isaías 35 e 36"},{day:3,reading:"Isaías 37 a 39; Salmos 76"},{day:4,reading:"Isaías 40 a 43"},{day:5,reading:"Isaías 44 a 48"},{day:6,reading:"2 Reis 18:9-37; 2 Reis 19:1-37; Salmos 46,80,135"},{day:7,reading:"Isaías 49 a 53"}]},
  { week:31, days:[{day:1,reading:"Isaías 54 a 58"},{day:2,reading:"Isaías 59 a 63"},{day:3,reading:"Isaías 64 a 66"},{day:4,reading:"2 Reis 20 e 21"},{day:5,reading:"2 Crônicas 32 e 33"},{day:6,reading:"Naum 1 a 3"},{day:7,reading:"2 Reis 22-23; 2 Crônicas 34-35"}]},
  { week:32, days:[{day:1,reading:"Sofonias 1 a 3"},{day:2,reading:"Jeremias 1 a 3"},{day:3,reading:"Jeremias 4 a 6"},{day:4,reading:"Jeremias 7 a 9"},{day:5,reading:"Jeremias 10 a 13"},{day:6,reading:"Jeremias 14 a 17"},{day:7,reading:"Jeremias 18 a 22"}]},
  { week:33, days:[{day:1,reading:"Jeremias 23 a 25"},{day:2,reading:"Jeremias 26 a 29"},{day:3,reading:"Jeremias 30 e 31"},{day:4,reading:"Jeremias 32 a 34"},{day:5,reading:"Jeremias 35 a 37"},{day:6,reading:"Jeremias 38 a 40; Salmos 74,79"},{day:7,reading:"2 Reis 24-25; 2 Crônicas 36"}]},
  { week:34, days:[{day:1,reading:"Habacuque 1 a 3"},{day:2,reading:"Jeremias 41 a 45"},{day:3,reading:"Jeremias 46 a 48"},{day:4,reading:"Jeremias 49 a 50"},{day:5,reading:"Jeremias 51 e 52"},{day:6,reading:"Lamentações 1; 2; 3:1-36"},{day:7,reading:"Lamentações 3:37-66; 4; 5:1-22"}]},
  { week:35, days:[{day:1,reading:"Ezequiel 1 a 4"},{day:2,reading:"Ezequiel 5 a 8"},{day:3,reading:"Ezequiel 9 a 12"},{day:4,reading:"Ezequiel 13 a 15"},{day:5,reading:"Ezequiel 16 e 17"},{day:6,reading:"Ezequiel 18 e 19"},{day:7,reading:"Ezequiel 20 a 21"}]},
  { week:36, days:[{day:1,reading:"Ezequiel 22 e 23"},{day:2,reading:"Ezequiel 24 a 27"},{day:3,reading:"Ezequiel 28 a 31"},{day:4,reading:"Ezequiel 32 a 34"},{day:5,reading:"Ezequiel 35 a 37"},{day:6,reading:"Ezequiel 38 e 39"},{day:7,reading:"Ezequiel 40 e 41"}]},
  { week:37, days:[{day:1,reading:"Ezequiel 42 e 43"},{day:2,reading:"Ezequiel 44 e 45"},{day:3,reading:"Ezequiel 46 a 48"},{day:4,reading:"Joel 1 a 3"},{day:5,reading:"Daniel 1 a 3"},{day:6,reading:"Daniel 4 a 6"},{day:7,reading:"Daniel 7 a 9"}]},
  { week:38, days:[{day:1,reading:"Daniel 10 a 12"},{day:2,reading:"Esdras 1 a 3"},{day:3,reading:"Esdras 4-6; Salmos 137"},{day:4,reading:"Ageu 1 e 2"},{day:5,reading:"Zacarias 1 a 7"},{day:6,reading:"Zacarias 8 a 14"},{day:7,reading:"Ester 1 a 5"}]},
  { week:39, days:[{day:1,reading:"Ester 6 a 10"},{day:2,reading:"Esdras 7 a 10"},{day:3,reading:"Neemias 1 a 5"},{day:4,reading:"Neemias 6 e 7"},{day:5,reading:"Neemias 8 a 10"},{day:6,reading:"Neemias 11-13; Salmo 126"},{day:7,reading:"Malaquias 1 a 4"}]},
  { week:40, days:[{day:1,reading:"Lucas 1; João 1:1-14"},{day:2,reading:"Mateus 1; Lucas 2:1-38"},{day:3,reading:"Mateus 2; Lucas 2:39-52"},{day:4,reading:"Mateus 3; Marcos 1; Lucas 3"},{day:5,reading:"Mateus 4; Lucas 4-5; João 1:15-51"},{day:6,reading:"João 2 a 4"},{day:7,reading:"Marcos 2"}]},
  { week:41, days:[{day:1,reading:"João 5"},{day:2,reading:"Mateus 12:1-21; Marcos 3; Lucas 6"},{day:3,reading:"Mateus 5 a 7"},{day:4,reading:"Mateus 8:1-13; Lucas 7"},{day:5,reading:"Mateus 11"},{day:6,reading:"Mateus 12:22-50"},{day:7,reading:"Mateus 13; Lucas 8"}]},
  { week:42, days:[{day:1,reading:"Mateus 8:14-34; Marcos 4-5"},{day:2,reading:"Mateus 9 e 10"},{day:3,reading:"Mateus 14; Marcos 6; Lucas 9:1-17"},{day:4,reading:"João 6"},{day:5,reading:"Mateus 15; Marcos 7"},{day:6,reading:"Mateus 16; Marcos 8; Lucas 9:18-27"},{day:7,reading:"Mateus 17; Marcos 9; Lucas 9:28-62"}]},
  { week:43, days:[{day:1,reading:"Mateus 18"},{day:2,reading:"João 7 e 8"},{day:3,reading:"João 9:1-41; João 10:1-21"},{day:4,reading:"Lucas 10-11; João 10:22-42"},{day:5,reading:"Lucas 12 e 13"},{day:6,reading:"Lucas 14 e 15"},{day:7,reading:"Lucas 16; Lucas 17:1-10"}]},
  { week:44, days:[{day:1,reading:"João 11"},{day:2,reading:"Lucas 17:11-37; Lucas 18:1-14"},{day:3,reading:"Mateus 19; Marcos 10"},{day:4,reading:"Mateus 20 e 21"},{day:5,reading:"Lucas 18:15-43; Lucas 19:1-48"},{day:6,reading:"Marcos 11; João 12"},{day:7,reading:"Mateus 22; Marcos 12"}]},
  { week:45, days:[{day:1,reading:"Mateus 23; Lucas 20-21"},{day:2,reading:"Marcos 13"},{day:3,reading:"Mateus 24"},{day:4,reading:"Mateus 25"},{day:5,reading:"Mateus 26; Marcos 14"},{day:6,reading:"Lucas 22; João 13"},{day:7,reading:"João 14 a 17"}]},
  { week:46, days:[{day:1,reading:"Mateus 27; Marcos 15"},{day:2,reading:"Lucas 23; João 18-19"},{day:3,reading:"Mateus 28; Marcos 16"},{day:4,reading:"Lucas 24; João 20-21"},{day:5,reading:"Atos 1 a 3"},{day:6,reading:"Atos 4 a 6"},{day:7,reading:"Atos 7 e 8"}]},
  { week:47, days:[{day:1,reading:"Atos 9 e 10"},{day:2,reading:"Atos 11 e 12"},{day:3,reading:"Atos 13 e 14"},{day:4,reading:"Tiago 1 a 5"},{day:5,reading:"Atos 15 e 16"},{day:6,reading:"Gálatas 1 a 3"},{day:7,reading:"Gálatas 4 a 6"}]},
  { week:48, days:[{day:1,reading:"Atos 17; Atos 18:1-18"},{day:2,reading:"1 Tessalonicenses 1-5; 2 Tessalonicenses 1-3"},{day:3,reading:"Atos 18:19-28; Atos 19:1-41"},{day:4,reading:"1 Coríntios 1 a 4"},{day:5,reading:"1 Coríntios 5 a 8"},{day:6,reading:"1 Coríntios 9 a 11"},{day:7,reading:"1 Coríntios 12 a 14"}]},
  { week:49, days:[{day:1,reading:"1 Coríntios 15 e 16"},{day:2,reading:"2 Coríntios 1 a 4"},{day:3,reading:"2 Coríntios 5 a 9"},{day:4,reading:"2 Coríntios 10 a 13"},{day:5,reading:"Atos 20:1-3; Romanos 1-3"},{day:6,reading:"Romanos 4 a 7"},{day:7,reading:"Romanos 8 a 10"}]},
  { week:50, days:[{day:1,reading:"Romanos 11 a 13"},{day:2,reading:"Romanos 14 a 16"},{day:3,reading:"Atos 20:4-38; Atos 21; Atos 22; Atos 23:1-35"},{day:4,reading:"Atos 24 a 26"},{day:5,reading:"Atos 27 e 28"},{day:6,reading:"Colossenses 1-4; Filémon"},{day:7,reading:"Efésios 1 a 6"}]},
  { week:51, days:[{day:1,reading:"Filipenses 1 a 4"},{day:2,reading:"1 Timóteo 1 a 6"},{day:3,reading:"Tito 1 a 3"},{day:4,reading:"1 Pedro 1 a 5"},{day:5,reading:"Hebreus 1 a 6"},{day:6,reading:"Hebreus 7 a 10"},{day:7,reading:"Hebreus 11 a 13"}]},
  { week:52, days:[{day:1,reading:"2 Timóteo 1 a 4"},{day:2,reading:"2 Pedro 1-3; Judas"},{day:3,reading:"1 João 1-5"},{day:4,reading:"2 João; 3 João"},{day:5,reading:"Apocalipse 1 a 5"},{day:6,reading:"Apocalipse 6 a 11"},{day:7,reading:"Apocalipse 12 a 22"}]}
];

const TOTAL_DAYS = PLAN.reduce((total, week) => total + week.days.length, 0);
const SUMMARY_MAX_LENGTH = 1500;

let currentWeek = 1;
let userData = {};
let currentUser = null;
let saveTimer = null;
let lastFocusedElement = null;

const $ = (selector) => document.querySelector(selector);

// ── FIRESTORE ──
function userDocRef(uid) {
  return doc(db, 'users', uid);
}

async function loadUserData(uid) {
  try {
    const snap = await getDoc(userDocRef(uid));
    userData = snap.exists() ? (snap.data().progress || {}) : {};
    setSyncStatus('saved');
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    userData = {};
    setSyncStatus('error');
    showToast('Não foi possível carregar seu progresso.');
  }
}

async function saveUserData() {
  if (!currentUser) return false;

  setSyncStatus('saving');
  try {
    await setDoc(userDocRef(currentUser.uid), { progress: userData }, { merge: true });
    setSyncStatus('saved');
    return true;
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
    setSyncStatus('error');
    showToast('Erro ao sincronizar. Confira sua conexão.');
    return false;
  }
}

function scheduleSave() {
  clearTimeout(saveTimer);
  setSyncStatus('saving');
  saveTimer = setTimeout(() => {
    saveTimer = null;
    saveUserData();
  }, 900);
}

function setSyncStatus(state) {
  const status = $('#sync-status');
  const dot = status?.querySelector('.sync-dot');
  const label = $('#sync-label');
  if (!status || !dot || !label) return;

  status.classList.toggle('error', state === 'error');
  dot.classList.toggle('syncing', state === 'saving');

  if (state === 'saving') label.textContent = 'Salvando...';
  else if (state === 'error') label.textContent = 'Erro ao salvar';
  else label.textContent = 'Sincronizado';
}

// ── AUTH ──
async function signInGoogle() {
  const button = $('#btn-google');
  try {
    if (button) button.disabled = true;
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  } catch (error) {
    if (error.code !== 'auth/popup-closed-by-user') {
      console.error('Erro no login:', error);
      showToast('Erro ao entrar. Tente novamente.');
    }
  } finally {
    if (button) button.disabled = false;
  }
}

async function signOutUser() {
  if (!confirm('Deseja sair da sua conta?')) return;

  if (saveTimer) {
    clearTimeout(saveTimer);
    saveTimer = null;
    await saveUserData();
  }

  await signOut(auth);
  closeUserMenu();
}

onAuthStateChanged(auth, async (user) => {
  showOnlyScreen('loading');

  if (user) {
    currentUser = user;
    await loadUserData(user.uid);
    setupApp(user);
    showOnlyScreen('app');
    return;
  }

  currentUser = null;
  userData = {};
  showOnlyScreen('auth');
});

function showOnlyScreen(screen) {
  const loading = $('#loading-screen');
  const authScreen = $('#auth-screen');
  const appScreen = $('#app-screen');

  loading.hidden = screen !== 'loading';
  authScreen.hidden = screen !== 'auth';
  appScreen.hidden = screen !== 'app';
}

// ── SETUP ──
function setupApp(user) {
  renderUser(user);
  applySavedTheme();

  const storedWeek = Number(localStorage.getItem(currentWeekStorageKey()));
  currentWeek = Number.isInteger(storedWeek) && storedWeek >= 1 && storedWeek <= PLAN.length
    ? storedWeek
    : findSuggestedWeek();

  buildSelect();
  updateStats();
  renderWeek(currentWeek);
}

function renderUser(user) {
  const wrap = $('#user-avatar-wrap');
  wrap.replaceChildren();

  if (user.photoURL) {
    const img = document.createElement('img');
    img.src = user.photoURL;
    img.className = 'user-avatar';
    img.alt = user.displayName ? `Foto de ${user.displayName}` : 'Foto do usuário';
    img.referrerPolicy = 'no-referrer';
    wrap.appendChild(img);
  } else {
    const placeholder = document.createElement('span');
    placeholder.className = 'user-avatar-placeholder';
    placeholder.textContent = (user.displayName || user.email || 'U').charAt(0).toUpperCase();
    wrap.appendChild(placeholder);
  }

  $('#dd-name').textContent = user.displayName || 'Usuário';
  $('#dd-email').textContent = user.email || '';
  $('#header-sub').textContent = `Olá, ${(user.displayName || '').split(' ')[0] || 'leitor'}!`;
}

function applySavedTheme() {
  const isDark = localStorage.getItem('planner-theme') === 'dark';
  document.body.classList.toggle('dark', isDark);
  $('#dark-icon').className = isDark ? 'ti ti-sun' : 'ti ti-moon';
  $('#dark-label').textContent = isDark ? 'Claro' : 'Escuro';
}

// ── USER MENU ──
function toggleUserMenu() {
  const dropdown = $('#user-dropdown');
  const button = $('#user-avatar-wrap');
  const isOpen = dropdown.classList.toggle('open');
  button.setAttribute('aria-expanded', String(isOpen));
}

function closeUserMenu() {
  $('#user-dropdown').classList.remove('open');
  $('#user-avatar-wrap').setAttribute('aria-expanded', 'false');
}

// ── DARK MODE ──
function toggleDark() {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('planner-theme', isDark ? 'dark' : 'light');
  $('#dark-icon').className = isDark ? 'ti ti-sun' : 'ti ti-moon';
  $('#dark-label').textContent = isDark ? 'Claro' : 'Escuro';
}

// ── HELPERS ──
function key(week, day) {
  return `w${week}d${day}`;
}

function currentWeekStorageKey() {
  return currentUser ? `planner-current-week-${currentUser.uid}` : 'planner-current-week';
}

function findSuggestedWeek() {
  const firstIncomplete = PLAN.find((week) =>
    week.days.some((day) => !userData[key(week.week, day.day)]?.done)
  );
  return firstIncomplete?.week || PLAN.length;
}

function getStats() {
  let done = 0;
  let weeksComplete = 0;

  PLAN.forEach((week) => {
    let weekDone = 0;
    week.days.forEach((day) => {
      if (userData[key(week.week, day.day)]?.done) {
        done += 1;
        weekDone += 1;
      }
    });
    if (weekDone === week.days.length) weeksComplete += 1;
  });

  return { done, left: TOTAL_DAYS - done, weeksComplete };
}

function getStreak() {
  const allKeys = PLAN.flatMap((week) => week.days.map((day) => key(week.week, day.day)));
  let latestDoneIndex = -1;

  for (let index = allKeys.length - 1; index >= 0; index -= 1) {
    if (userData[allKeys[index]]?.done) {
      latestDoneIndex = index;
      break;
    }
  }

  if (latestDoneIndex === -1) return 0;

  let streak = 0;
  for (let index = latestDoneIndex; index >= 0; index -= 1) {
    if (!userData[allKeys[index]]?.done) break;
    streak += 1;
  }

  return streak;
}

function updateStats() {
  const stats = getStats();
  const pct = Math.round((stats.done / TOTAL_DAYS) * 100);
  const streak = getStreak();

  $('#stat-done').textContent = stats.done;
  $('#stat-left').textContent = stats.left;
  $('#stat-weeks').textContent = stats.weeksComplete;
  $('#stat-streak').textContent = `${streak} ${streak === 1 ? 'dia' : 'dias'}`;
  $('#global-bar').style.width = `${pct}%`;
  $('#pct-label').textContent = `${pct}%`;

  const progress = $('.progress-bar');
  progress?.setAttribute('aria-valuenow', String(pct));
}

function buildSelect() {
  const select = $('#week-sel');
  select.replaceChildren();

  PLAN.forEach((week) => {
    const option = document.createElement('option');
    option.value = week.week;
    option.textContent = `Semana ${week.week}`;
    select.appendChild(option);
  });

  select.value = String(currentWeek);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

// ── RENDER ──
function renderWeek(weekNum) {
  const weekData = PLAN.find((week) => week.week === weekNum);
  if (!weekData) return;

  const doneDays = weekData.days.filter((day) => userData[key(weekNum, day.day)]?.done).length;

  let html = `
    <section class="week-card" aria-labelledby="week-title-${weekNum}">
      <div class="week-header">
        <div class="week-title" id="week-title-${weekNum}">
          <i class="ti ti-calendar-week icon-inline" aria-hidden="true"></i>Semana ${weekNum}
        </div>
        <div class="week-badge">${doneDays}/${weekData.days.length} dias</div>
      </div>
      <div class="day-list">`;

  weekData.days.forEach((day) => {
    const itemKey = key(weekNum, day.day);
    const entry = userData[itemKey] || {};
    const done = Boolean(entry.done);
    const summary = String(entry.summary || '').slice(0, SUMMARY_MAX_LENGTH);

    html += `
      <article class="day-item${done ? ' done' : ''}" id="item-${itemKey}">
        <button
          class="day-check"
          type="button"
          data-action="toggle-day"
          data-week="${weekNum}"
          data-day="${day.day}"
          aria-pressed="${done}"
          aria-label="${done ? 'Desmarcar' : 'Marcar'} semana ${weekNum}, dia ${day.day} como lido"
          title="${done ? 'Desmarcar' : 'Marcar como lido'}"
        >
          <i class="ti ti-check" aria-hidden="true"></i>
        </button>
        <div class="day-info">
          <div class="day-label">Dia ${day.day}</div>
          <div class="day-reading">${escapeHtml(day.reading)}</div>`;

    if (done) {
      html += `
          <div class="day-summary">
            <div class="day-summary-header">
              <i class="ti ti-pencil icon-sm" aria-hidden="true"></i> Meu resumo
            </div>
            <textarea
              class="summary-textarea"
              id="textarea-${itemKey}"
              data-key="${itemKey}"
              maxlength="${SUMMARY_MAX_LENGTH}"
              placeholder="Escreva aqui o que você aprendeu, refletiu ou sentiu durante essa leitura..."
            >${escapeHtml(summary)}</textarea>
            <div class="char-count" id="count-${itemKey}">${summary.length}/${SUMMARY_MAX_LENGTH} caracteres</div>
          </div>
          <div class="day-actions">
            <button class="btn-sm accent" type="button" data-action="save-summary" data-key="${itemKey}">
              <i class="ti ti-device-floppy icon-sm" aria-hidden="true"></i> Salvar agora
            </button>
            <button class="btn-sm" type="button" data-action="view-summary" data-week="${weekNum}" data-day="${day.day}">
              <i class="ti ti-eye icon-sm" aria-hidden="true"></i> Ver em tela cheia
            </button>
            <button class="btn-sm" type="button" data-action="toggle-day" data-week="${weekNum}" data-day="${day.day}">
              <i class="ti ti-x icon-sm" aria-hidden="true"></i> Desmarcar
            </button>
          </div>`;
    }

    html += `</div></article>`;
  });

  html += `</div></section>`;

  $('#week-container').innerHTML = html;
  $('#btn-prev').disabled = weekNum <= 1;
  $('#btn-next').disabled = weekNum >= PLAN.length;
  $('#week-sel').value = String(weekNum);
}

// ── ACTIONS ──
function toggleDay(week, day) {
  const itemKey = key(week, day);
  const wasDone = Boolean(userData[itemKey]?.done);

  if (!wasDone) {
    userData[itemKey] = {
      ...(userData[itemKey] || {}),
      done: true,
      doneAt: new Date().toISOString(),
    };
    showToast('✅ Leitura marcada! Escreva seu resumo abaixo.');
  } else {
    if (!confirm('Deseja desmarcar esta leitura? Seu resumo será mantido.')) return;
    userData[itemKey] = { ...(userData[itemKey] || {}), done: false };
    showToast('Leitura desmarcada.');
  }

  renderWeek(currentWeek);
  updateStats();
  scheduleSave();
}

function onSummaryInput(itemKey, textarea) {
  const value = textarea.value.slice(0, SUMMARY_MAX_LENGTH);
  userData[itemKey] = { ...(userData[itemKey] || {}), summary: value };

  const counter = document.getElementById(`count-${itemKey}`);
  if (counter) counter.textContent = `${value.length}/${SUMMARY_MAX_LENGTH} caracteres`;

  scheduleSave();
}

async function saveSummary(itemKey) {
  const textarea = document.getElementById(`textarea-${itemKey}`);
  if (!textarea) return;

  userData[itemKey] = {
    ...(userData[itemKey] || {}),
    summary: textarea.value.slice(0, SUMMARY_MAX_LENGTH),
  };

  clearTimeout(saveTimer);
  saveTimer = null;
  const saved = await saveUserData();
  if (saved) showToast('📝 Resumo salvo e sincronizado!');
}

function viewSummary(week, day) {
  const itemKey = key(week, day);
  const entry = userData[itemKey] || {};
  const weekData = PLAN.find((item) => item.week === week);
  const dayData = weekData?.days.find((item) => item.day === day);
  if (!dayData) return;

  $('#modal-title').textContent = `Semana ${week} · Dia ${day}`;

  const body = $('#modal-body');
  const reading = document.createElement('p');
  reading.className = 'modal-reading';

  const strong = document.createElement('strong');
  strong.textContent = 'Leitura: ';
  reading.append(strong, document.createTextNode(dayData.reading));

  const summary = document.createElement('p');
  if (entry.summary) {
    summary.className = 'modal-summary';
    summary.textContent = entry.summary;
  } else {
    summary.className = 'modal-empty';
    summary.textContent = 'Nenhum resumo escrito ainda.';
  }

  body.replaceChildren(reading, summary);

  lastFocusedElement = document.activeElement;
  const overlay = $('#modal-overlay');
  overlay.hidden = false;
  overlay.classList.add('open');
  $('#modal-close').focus();
}

function goToWeek(value) {
  const nextWeek = Number(value);
  if (!Number.isInteger(nextWeek) || nextWeek < 1 || nextWeek > PLAN.length) return;

  currentWeek = nextWeek;
  localStorage.setItem(currentWeekStorageKey(), String(currentWeek));
  renderWeek(currentWeek);
}

function changeWeek(delta) {
  const nextWeek = currentWeek + delta;
  if (nextWeek < 1 || nextWeek > PLAN.length) return;

  goToWeek(nextWeek);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeModal() {
  const overlay = $('#modal-overlay');
  overlay.classList.remove('open');
  overlay.hidden = true;
  lastFocusedElement?.focus?.();
}

let toastTimer;
function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// Mantém os números da interface sincronizados com os dados do plano.
$('#auth-total-days').textContent = String(TOTAL_DAYS);
$('#stat-left').textContent = String(TOTAL_DAYS);

// ── EVENTOS ──
$('#btn-google').addEventListener('click', signInGoogle);
$('#btn-signout').addEventListener('click', signOutUser);
$('#btn-dark').addEventListener('click', toggleDark);
$('#user-avatar-wrap').addEventListener('click', toggleUserMenu);
$('#week-sel').addEventListener('change', (event) => goToWeek(event.target.value));
$('#btn-prev').addEventListener('click', () => changeWeek(-1));
$('#btn-next').addEventListener('click', () => changeWeek(1));
$('#modal-close').addEventListener('click', closeModal);
$('#modal-close-footer').addEventListener('click', closeModal);

$('#week-container').addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;

  const action = button.dataset.action;
  if (action === 'toggle-day') {
    toggleDay(Number(button.dataset.week), Number(button.dataset.day));
  } else if (action === 'save-summary') {
    saveSummary(button.dataset.key);
  } else if (action === 'view-summary') {
    viewSummary(Number(button.dataset.week), Number(button.dataset.day));
  }
});

$('#week-container').addEventListener('input', (event) => {
  if (!event.target.matches('.summary-textarea')) return;
  onSummaryInput(event.target.dataset.key, event.target);
});

$('#modal-overlay').addEventListener('click', (event) => {
  if (event.target === event.currentTarget) closeModal();
});

document.addEventListener('click', (event) => {
  const wrap = $('.user-menu-wrap');
  if (wrap && !wrap.contains(event.target)) closeUserMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !$('#modal-overlay').hidden) closeModal();
});
