function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("sortTable");
  console.log("Hola");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

$(function() {
  $("#modelo").on("change", function() {
    var value = $(this).val().toLowerCase();
    console.log($(this).text().toLowerCase().indexOf(value))
    console.log($(this).text().toLowerCase())

    

    $("#myTable tr").filter(function() {$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

// $(document).ready(function(){
//   $("#modelo").on("change", function() {
//     var value = $(this).val().toLowerCase();
//     $("#myTable tr").filter(function() {
//       $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
//     });
//   });
// });
// var objMonth=null;
// var cloneObj;
// $(document).ready(function (){
//     cloneObj= $("#example1").clone(); 
    
//     $("#modelo").on('change', function() {
//     var selectedYear=($("option:selected", this).text());
//         if (selectedYear!="Select Year"){
   
//         for (var a in data){

//           if (data[a].model == selectedYear) {

//             // var jsonValue = data[a].metrics;
//             $("#myTable tr").filter(function() {
//               $(this).toggle($(this).text().toLowerCase().indexOf(selectedYear) > -1)
//             });

//             // $("#example1").replaceWith(cloneObj.clone());
  
//             // $('#example1').columns({
//             //   data: jsonValue
//             // });
//             return false;
//           }
//         }
//         }else{
//         alert("Please Select Model please");
//         }
    
//     });
//  });

$.ajax({
	// url : 'data/front_finance.json',
	dataType : 'json',
	success : function (json) {

		var customer = $('#example1').columns({
				data : json,
				schema : [{
						"header" : "Model",
						"key" : "model",
						"template" : "{{model}}"
					}, {
						"header" : "R1",
						"key" : "R1",
						"template" : '{{R1}}'
					}, {
						"header" : "R2",
						"key" : "R2",
						"template" : '{{R2}}'
					}, {
						"header" : "RL",
						"key" : "RL",
						"template" : '{{RL}}'
					}, 
				]
			});
	}
});


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

function askInstruction() {
  if($("#instBool").val == 1){
    $("#instructions").hide();
  }else{
    $("#instructions").show();
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
  // console.log(modelo)
  // console.log(data)

  if(modelo == "BART - BillSum"){
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
  }else if(modelo == "BART - GovReport"){
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
  }else{
    $("#result_text").val("Modelo no Funcional.");
  }
  
  //   submitResume(input_text);
}

document.getElementById("file-button").addEventListener("click", openDialog);
document.getElementById("file-input").addEventListener("change", submitFile);
document.getElementById("resume-button").addEventListener("click", askResume);
// document.getElementById("instrucciones-button").addEventListener("click", askInstruction);