import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getFirestore, doc, getDoc, setDoc, onSnapshot
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

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
  tr.innerHTML = `
    <td>${leito}</td>
    <td><input data-id="l${idx}-nome" /></td>
    <td><input data-id="l${idx}-diag" /></td>
    ${[...Array(5)].map((_, i) => `<td class="small"><input data-id="l${idx}-m${i}" /></td>`).join("")}
    <td><input data-id="l${idx}-fluxo" /></td>
    <td><input data-id="l${idx}-exames" /></td>
    <td><input data-id="l${idx}-alta" /></td>
    <td><input data-id="l${idx}-assinatura" /></td>`;
  corpo.appendChild(tr);
});

async function salvarFirestore(chave, valor) {
  try {
    const docRef = doc(db, "escala", "dados");
    const snap = await getDoc(docRef);
    let data = snap.exists() ? snap.data() : {};
    data[chave] = valor;
    await setDoc(docRef, data);
  } catch (e) {
    console.error("Erro ao salvar no Firestore:", e);
  }
}

async function carregarFirestore() {
  const docRef = doc(db, "escala", "dados");
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    return snap.data();
  }
  return {};
}

window.onload = async () => {
  const dadosFirebase = await carregarFirestore();

  document.querySelectorAll("input[data-id]").forEach(inp => {
    inp.value = dadosFirebase[inp.getAttribute("data-id")] || localStorage.getItem(inp.getAttribute("data-id")) || "";

    inp.oninput = async () => {
      const chave = inp.getAttribute("data-id");
      const valor = inp.value;
      localStorage.setItem(chave, valor);
      await salvarFirestore(chave, valor);
    };
  });

  const dataInput = document.getElementById("data");
  if (dataInput) {
    dataInput.value = localStorage.getItem("data") || dadosFirebase["data"] || "";
    dataInput.oninput = async () => {
      localStorage.setItem("data", dataInput.value);
      await salvarFirestore("data", dataInput.value);
    };
  }

  onSnapshot(doc(db, "escala", "dados"), (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      for (const [key, value] of Object.entries(data)) {
        const el = document.querySelector(`input[data-id="${key}"]`) || (key === "data" ? document.getElementById("data") : null);
        if (el && el.value !== value) {
          el.value = value;
          localStorage.setItem(key, value);
        }
      }
    }
  });
};

