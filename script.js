// Firebase import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Configuração corrigida do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBNjY8Nqjp_lwYunviYQgFgHX0r8ImNCPA",
  authDomain: "escala-ortopedia.firebaseapp.com",
  projectId: "escala-ortopedia",
  storageBucket: "escala-ortopedia.appspot.com",
  messagingSenderId: "505524734588",
  appId: "1:505524734588:web:a7f1a0464b1df2631717f9"
};

// Inicializa Firebase e Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Criação da tabela
const leitos = [1176,1177,1178,1179,1180,1181,1182,1183,1184,1186,1188,1190,1191,1192,1193,1194,1195,1196,1197,1198];
const corpo = document.getElementById("corpo-tabela");
leitos.forEach((leito, idx) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `<td>${leito}</td><td><input data-id="l${idx}-nome"></td><td><input data-id="l${idx}-diag"></td>${
    [...Array(5)].map((_,i)=>`<td class="small"><input data-id="l${idx}-m${i}"></td>`).join("")
  }<td><input data-id="l${idx}-fluxo"></td><td><input data-id="l${idx}-exames"></td><td><input data-id="l${idx}-alta"></td><td><input data-id="l${idx}-assinatura"></td>`;
  corpo.appendChild(tr);
});

// Salva e carrega localmente
["data"].forEach(id=>{
  const el=document.getElementById(id);
  if(el){
    el.value=localStorage.getItem(id)||"";
    el.oninput=()=>localStorage.setItem(id,el.value);
  }
});

// Carrega valores salvos
window.onload = () => {
  document.querySelectorAll("input[data-id]").forEach(inp=>{
    const key = inp.getAttribute("data-id");
    const valor = localStorage.getItem(key) || "";
    inp.value = valor;
    inp.oninput = () => {
      localStorage.setItem(key, inp.value);
      // Aqui pode adicionar salvar no Firestore também, se quiser
    };
  });
};

