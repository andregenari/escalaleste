const leitos = [1176,1177,1178,1179,1180,1181,1182,1183,1184,1186,1188,1190,1191,1192,1193,1194,1195,1196,1197,1198];
const corpo = document.getElementById("corpo-tabela");
leitos.forEach((leito, idx) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `<td>${leito}</td><td><input data-id="l${idx}-nome"></td><td><input data-id="l${idx}-diag"></td>${
    [...Array(5)].map((_,i)=>`<td class="small"><input data-id="l${idx}-m${i}"></td>`).join("")
  }<td><input data-id="l${idx}-fluxo"></td><td><input data-id="l${idx}-exames"></td><td><input data-id="l${idx}-alta"></td><td><input data-id="l${idx}-assinatura"></td>`;
  corpo.appendChild(tr);
});
["data","ramal","enfermeiro","alojamento"].forEach(id=>{
  const el=document.getElementById(id);
  if(el){
    el.value=localStorage.getItem(id)||"";
    el.oninput=()=>localStorage.setItem(id,el.value);
  }
});
window.onload = () => document.querySelectorAll("input[data-id]").forEach(inp=>{
  inp.value = localStorage.getItem(inp.getAttribute("data-id"))||"";
  inp.oninput = ()=>localStorage.setItem(inp.getAttribute("data-id"), inp.value);
});
