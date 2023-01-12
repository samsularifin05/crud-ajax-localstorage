$(document).ready(function () {
  getData();
});

function simpan(e) {
  e.preventDefault();
  let form_data = serializeObject($("#form_tambah_users").serializeArray());
  let newdata =
  localStorage.getItem("data") === null
    ? []
    : JSON.parse(localStorage.getItem("data"));

  if(form_data.is_edit === 'true'){
    let cekdata = newdata.map((list)=>{
      if(Number(list.id) === Number(form_data.id)){
        return {
          id : list.id,
          alamat :  form_data.alamat,
          nama : form_data.nama,
          umur : form_data.umur
        }
      }else{
        return {...list}
      }
    })
    localStorage.setItem("data", JSON.stringify(cekdata));
    getAndReset()
  }else{
    let hasilcek = newdata.findIndex(
      (list) => Number(list.id) === Number(form_data.id)
    );
    if (hasilcek === -1) {
      newdata.push(form_data);
      localStorage.setItem("data", JSON.stringify(newdata));
      getAndReset()
    } else {
      alert("Data Sudah Tersedia");
    }
  }

}

function editData(id) {
  // console.log(id)
  let newdata =
    localStorage.getItem("data") === null
      ? []
      : JSON.parse(localStorage.getItem("data"));

  let data = newdata.find((list) => Number(list.id) === Number(id));
  $("#id").attr("readonly", "readonly");
  $("#is_edit").val(true);
  $("#id").val(data.id);
  $("#nama").val(data.nama);
  $("#umur").val(data.umur);
  $("#alamat").val(data.alamat);
  $("#exampleModal").modal("show");
  document.getElementById("title_user").innerHTML = "Edit Data User";
}

function serializeObject(obj) {
  var jsn = {};
  $.each(obj, function () {
    if (jsn[this.name]) {
      if (!jsn[this.name].push) {
        jsn[this.name] = [jsn[this.name]];
      }
      jsn[this.name].push(this.value || "");
    } else {
      jsn[this.name] = this.value || "";
    }
  });
  return jsn;
}

function getAndReset() {
  getData();
  $("#exampleModal").modal("hide");
  $("#form_tambah_users")[0].reset();
}

function hapusElement(id) {
  let dataku = JSON.parse(localStorage.getItem("data") || []);
  let filter = dataku.filter((list) => Number(list.id) !== Number(id));
  localStorage.setItem("data", JSON.stringify(filter));
  getData();
}
function getData() {
  let dataku =
    localStorage.getItem("data") === null
      ? []
      : JSON.parse(localStorage.getItem("data"));
  $("#datanya").html("");
  dataku.forEach((el) => {
    $("#datanya").append(`
      <tr>
        <td> ${el.id} </td>
        <td> ${el.nama} </td>
        <td> ${el.umur} </td>
        <td> ${el.alamat} </td>
        <td class="text-center"> <button type="button" class='btn btn-danger' onclick='hapusElement(${el.id})'> Hapus  </button> &nbsp;
        <button type="button" class='btn btn-primary' onclick='editData(${el.id})'> Edit  </button>
        </td>
      </tr>
    `);
  });
}
