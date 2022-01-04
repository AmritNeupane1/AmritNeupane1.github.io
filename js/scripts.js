
var products = {
    'white': {
        
        'plain': {
            'unit_price': 380,
            'photo': 'v-white.jpg' 
        },
        'printed': {
            'unit_price': 675,
            'photo': 'v-white-personalized.jpg' 
        }
    },
    
    'colored': {
        'plain': {
            'unit_price': 450,
            'photo': 'v-color.jpg' 
        },
        'printed': {
            'unit_price': 710,
            'photo': 'v-color-personalized.png' 
        }
    }
}


// Search params

var search_params = {
    "quantity": "",
    "color": "",
    "quality": "",
    "style": "",
}


// Additional pricing rules:

// 1. The prices above are for Basic quality (q150). 
// The high quality shirt (190g/m2) has a 12% increase in the unit price.

// 2. Apply the following discounts for higher quantities: 
    // 1: above 1.000 units - 20% discount
    // 2: above 500 units - 12% discount
    // 3: above 100 units - 5% discount


// Solution:

$(function(){

    function update_params(){
    search_params.quantity=$("#quantity").val();
    search_params.color=$("#color .option-button.selected").attr("id");
    search_params.quality=$("#quality .option-button.selected").attr("id");
    search_params.style=$("#style").val();
        console.log(search_params);
        update_order();
    }
    update_params();
    function update_order(){
        $("#result-style").text(search_params.style);
        $("#result-quality").text($('#'+search_params.quality).text());
        $("#result-color").text(search_params.color);
        $("#result-quantity").text(search_params.quantity);
        
        
        
        var price=products[search_params.color][search_params.style].unit_price;
        var imag=products[search_params.color][search_params.style].photo;
        $("#photo-product").attr("src","img/"+imag);
        if(search_params.quality=="q190"){
            price*=1.12;
        }
        let total=0;
        if(search_params.quantity>=1000){
            total=(search_params.quantity*price)*0.8;
        }
        else if(search_params.quantity>=500){
            total=(search_params.quantity*price)*0.8;
        }
        else if(search_params.quantity>=100){
            total=(search_params.quantity*price)*0.95;
        }
        else total=(search_params.quantity*price);
        
        $("#total-price").text(" "+total.toLocaleString("hi-IN", { maximumFractionDigits: 2,style:"currency", currency:"INR"}));

    }
    $("#quantity").change(function(){
        search_params.quantity=parseInt($("#quantity").val())
        update_order();
    });
    $("#style").change(function(){
        search_params.style=($("#style").val())
        update_order();
    });
    $(".option-button").click(function(){
        var clickedparam=$(this).parent().attr('id');
        var childSelector="#"+ clickedparam +" .option-button"
        $(childSelector).removeClass("selected");
        $(this).addClass("selected");
        var selectedChild="#"+clickedparam + " .option-button.selected";
        search_params[clickedparam]=$(selectedChild).attr('id');
        update_order();
    });
   
  
    
});










