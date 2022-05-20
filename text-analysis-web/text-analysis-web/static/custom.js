function submitFile(evt) {
  const file = evt.target.files[0];
  let reader = new FileReader();
  reader.onload = function () {
    const thisText = reader.result;
    $("#input_text").val(thisText);
  };
  reader.readAsText(file);
}

function submitResume(message) {
  $.post("/send", { message: message }, handle_response);
  function handle_response(data) {
    $("#result_text").val(data.message);
  }
}

function openDialog() {
  $("#input_text").val("");
  $("#result_text").val("");
  document.getElementById("file-input").click();
}

function askResume() {
  $("#result_text").val("");
  const input_text = $("#input_text").val();
  if (!input_text) {
    return;
  }
  var data = {
    "text": input_text
  } 
  const modelo = $("#modelo").val();
  console.log(modelo)
  console.log(data)

  if(modelo == "T5_Billsum_short"){
    fetch(`http://127.0.0.1:5000/predict/`,{
      method:'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((json) => $("#result_text").val(
        json.output));
  }else if(modelo == "DistilBart_GovReport_long"){
    fetch(`http://127.0.0.1:5000/predict2/`,{
    method:'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then((json) => $("#result_text").val(
      json.output));
  }
  
  //   submitResume(input_text);
}

document.getElementById("file-button").addEventListener("click", openDialog);
document.getElementById("file-input").addEventListener("change", submitFile);
document.getElementById("resume-button").addEventListener("click", askResume);
