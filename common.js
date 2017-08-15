$(function() {

  var selectSize,
      selectPrice,
      selectCover,
      endPaper = 0,
      sum = 0,
      qty = 1,
      pageSizes = {
        "20x20": {47: "Digital Paper Type DP II", 53: "Digital Pearl Paper"},
        "19x25": {53: "Digital Paper Type DP II", 57: "Digital Pearl Paper"},
        "20x30": {57: "Digital Paper Type DP II", 65: "Digital Pearl Paper"},
        "25x25": {63: "Digital Paper Type DP II", 69: "Digital Pearl Paper"},
        "30x30": {76: "Digital Paper Type DP II", 85: "Digital Pearl Paper"},
        "35x35": {105: "Digital Paper Type DP II", 117: "Digital Pearl Paper"},
        "30x40": {105: "Digital Paper Type DP II", 117: "Digital Pearl Paper"},
        "40x40": {212: "Digital Paper Type DP II", 238: "Digital Pearl Paper"},
      },
      covers = {
        "20x20": {53: "Обрезная фото обложка", 204: "Фото обложка", 355: "Обложка кож. зам", 587: "Обложка холст"},
        "19x25": {57: "Обрезная фото обложка", 228: "Фото обложка", 373: "Обложка кож. зам", 667: "Обложка холст"},
        "20x30": {65: "Обрезная фото обложка", 254: "Фото обложка", 506: "Обложка кож. зам", 712: "Обложка холст", 1288: "Обложка пластификация"},
        "25x25": {69: "Обрезная фото обложка", 305: "Фото обложка", 525: "Обложка кож. зам", 800: "Обложка холст", 1288: "Обложка пластификация"},
        "30x30": {85: "Обрезная фото обложка", 424: "Фото обложка", 727: "Обложка кож. зам", 992: "Обложка холст", 1473: "Обложка пластификация"},
        "35x35": {525: "Фото обложка", 1051: "Фото обложка", 1126: "Обложка кож. зам", 1682: "Обложка холст"},
        "30x40": {525: "Фото обложка", 1051: "Фото обложка", 1126: "Обложка кож. зам", 1682: "Обложка холст"},
        "40x40": {847: "Фото обложка", 1660: "Фото обложка", 1320: "Обложка кож. зам", 2080: "Обложка холст"},
      },
      endPapers = {
        "20x20": 43,
        "19x25": 53,
        "20x30": 57,
        "25x25": 63,
        "30x30": 94,
        "35x35": 124,
        "30x40": 124,
        "40x40": 169,
      };
      function insertPageSizes(){
        var html,
            size,
            price;
        for(size in pageSizes) {
          for(price in pageSizes[size]){
            html += '<option data-size="' + size + '" data-price="' + price + '">' + size + ' - ' + pageSizes[size][price] + ' ' + price + ' руб.</option>';
          }
        }
        $("#page-size").append(html);
      }

      function changeSize(){
        sum = selectCover = 0;
        qty = 1;
        $("#qty").val("1");

        selectSize = $("#calc option").filter(":selected").data("size");
        selectPrice = $("#calc option").filter(":selected").data("price");

        // console.log(selectSize, selectPrice);
        insertCover();
        recalc();

      }

      function insertCover(){
        var html = "<option selected>Вид обложки</option>",
            price;
        for(price in covers[selectSize]){
            html += '<option data-price="' + price + '">' + covers[selectSize][price] + ' ' + price + ' руб.</option>';
        }
        $("#cover").html(html);
      }

      function changeQty(){
          qty = $("#qty").val();
          if(qty < 1){
            qty = 1;
            $("#qty").val("1");
          }
          recalc();
      }

      function changeCover(){
        selectCover = $("#cover option").filter(":selected").data("price");
        recalc();
      }

      function isNumeric(n){
        return !isNaN(parseFloat(n)) && isFinite(n);
      }

      function recalc(){
        selectPrice = isNumeric(selectPrice) ? selectPrice : 0;
        qty = isNumeric(qty) ? qty : 1;
        selectCover = isNumeric(selectCover) ? selectCover : 0;
        endPaper = isNumeric(endPapers[selectSize]) ? endPapers[selectSize] : 0;
        sum = selectPrice * qty + selectCover + endPaper;
        changeTable();
      }

      function changeTable(){
        $(".page-size").text(selectPrice + " руб.");
        $(".qty").text(qty);
        $(".cover").text(selectCover + " руб.");
        $(".endpaper").text(endPaper + " руб.");
        $(".sum").text(sum + " руб.");
      }

      insertPageSizes();

      $("#page-size").change(function(){
        changeSize();
      });

      $("#qty").change(function(){
        changeQty();  
      });

      $("#cover").change(function(){
        changeCover();
      });
})