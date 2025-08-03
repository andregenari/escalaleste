import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBNjY8Nqjp_lwYunviYQgFgHX0r8ImNCPA",
  authDomain: "escala-ortopedia.firebaseapp.com",
  projectId: "escala-ortopedia",
  storageBucket: "escala-ortopedia.firebasestorage.app",
  messagingSenderId: "505524734588",
  appId: "1:505524734588:web:a7f1a0464b1df2631717f9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const leitos = [1176,1177,1178,1179,1180,1181,1182,1183,1184,1186,1188,1190,1191,1192,1193,1194,1195,1196,1197,1198];
const corpo = document.getElementById("corpo-tabela");

leitos.forEach((leito, idx) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `<td>${leito}</td><td><input data-id="l${idx}-nome"></td><td><input data-id="l${idx}-diag"></td>${
    [...Array(5)].map((_,i)=>`<td class="small"><input data-id="l${idx}-m${i}"></td>`).join("")
  }<td><input data-id="l${idx}-fluxo"></td><td><input data-id="l${idx}-exames"></td><td><input data-id="l${idx}-alta"></td><td><input data-id="l${idx}-assinatura"></td>`;
  corpo.appendChild(tr);
});

const idsExtras = ["data","ramal","enfermeiro","alojamento"];

idsExtras.forEach(id => {
  const el = document.getElementById(id);
  if(el){
    // Sync from Firestore to input
    const docRef = doc(db, "geral", id);
    onSnapshot(docRef, (docSnap) => {
      if(docSnap.exists()){
        el.value = docSnap.data().value || "";
      }
    });
    // Sync from input to Firestore
    el.addEventListener("input", async () => {
      await setDoc(doc(db, "geral", id), { value: el.value });
    });
  }
});

window.onload = () => {
  document.querySelectorAll("input[data-id]").forEach(inp => {
    const dataId = inp.getAttribute("data-id");
    const docRef = doc(db, "tabela", dataId);

    // Atualiza o input ao mudar no Firestore
    onSnapshot(docRef, (docSnap) => {
      if(docSnap.exists()){
        if(inp.value !== docSnap.data().value){
          inp.value = docSnap.data().value || "";
        }
      }
    });

    // Salva no Firestore ao digitar
    inp.addEventListener("input", async () => {
      await setDoc(docRef, { value: inp.value });
    });
  });
};
